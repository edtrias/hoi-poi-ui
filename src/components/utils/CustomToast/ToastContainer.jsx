import React, { memo, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import ToastGroup from './ToastGroup';
import { getOverrides, useClasses } from '../../../utils/overrides';
import { createUseStyles } from '../../../utils/styles';
import { useToastContainer, useToastAutoClose } from './hooks';
import { POSITION } from './constants';
import { CLEAR_TOAST, publish } from '../../../utils/eventBuser';
import styles from './styles';
import { TransitionGroup } from './transitions';
const useStyles = createUseStyles(styles, 'ToastContainer');

const DEFAULT_CLOSE_TIME = 4000;

const ToastContainer = memo(
    ({
        classes: classesProp,
        className: classNameProp,
        overrides: overridesProp,
        autoClose = false,
        useDefaultCloseButton,
        transition,
        preComponent,
        postComponent,
        containerId,
        position = 'topRight',
        newestOnTop = true,
        closeOnClick = false,
    }) => {
        const { toasts, setToasts, clearDeletedToast } = useToastContainer({
            position,
            transition,
            autoClose,
            useDefaultCloseButton,
            closeOnClick,
            newestOnTop,
            containerId,
        });

        const classes = useClasses(useStyles, classesProp);

        const override = getOverrides(overridesProp, ToastContainer.overrides);
        const rootClassName = classnames(classes.root, {}, classNameProp);

        useToastAutoClose({
            toasts,
            setToasts,
            autoClose,
            autoCloseTime:
                autoClose && typeof autoClose !== 'boolean' && !isNaN(autoClose)
                    ? autoClose
                    : DEFAULT_CLOSE_TIME,
        });

        const removeToast = useCallback((id) => {
            publish(CLEAR_TOAST, { id });
        }, []);

        const rootProps = useMemo(() => {
            const props = {};
            props.id = containerId || 'hoi-poi-ui-toast-container';
            return props;
        }, [containerId]);

        return (
            <div className={rootClassName} {...rootProps} {...override.root}>
                <TransitionGroup className={classes.TransitionGroup}>
                    {Object.entries(POSITION).map(([key, value]) => {
                        const finalPreComponent = preComponent?.[key];
                        const finalPostComponent = postComponent?.[key];
                        return (
                            <ToastGroup
                                key={key}
                                position={key}
                                toasts={toasts[value] || []}
                                removeToast={removeToast}
                                clearDeletedToast={clearDeletedToast}
                                preComponent={finalPreComponent}
                                postComponent={finalPostComponent}
                                override={override}
                            />
                        );
                    })}
                </TransitionGroup>
            </div>
        );
    },
);

ToastContainer.overrides = ['root', 'ToastGroup', 'Toast', 'ToastWrapper'];

ToastContainer.propTypes = {
    /** Custom className to apply to the container */
    className: PropTypes.string,
    /** Override the styles of any part of the component. See available override elements in Component Tree section */
    overrides: PropTypes.object,
    /** Custom React element to display as the toast content */
    content: PropTypes.element,
    /** Custom close button element to replace the default one */
    closeButton: PropTypes.element,
    /** Custom className for the close button */
    closeButtonClassName: PropTypes.string,
    /** When true, clicking on a toast will dismiss it */
    closeOnClick: PropTypes.bool,
    /** When true, new toasts are added at the top of the stack. When false, they're added at the bottom */
    newestOnTop: PropTypes.bool,
    /** Position where toasts will appear. Determines the corner/edge of the screen */
    position: PropTypes.oneOf([
        'topLeft',
        'topCenter',
        'topRight',
        'bottomLeft',
        'bottomCenter',
        'bottomRight',
    ]),
    /** Components to display above toast groups in specified positions */
    preComponent: PropTypes.shape({
        topLeft: PropTypes.element,
        topCenter: PropTypes.element,
        topRight: PropTypes.element,
        bottomLeft: PropTypes.element,
        bottomCenter: PropTypes.element,
        bottomRight: PropTypes.element,
    }),
    /** Components to display below toast groups in specified positions */
    postComponent: PropTypes.shape({
        topLeft: PropTypes.element,
        topCenter: PropTypes.element,
        topRight: PropTypes.element,
        bottomLeft: PropTypes.element,
        bottomCenter: PropTypes.element,
        bottomRight: PropTypes.element,
    }),
    /** Controls automatic dismissal of toasts. False disables auto-close, a number sets the duration in milliseconds */
    autoClose: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
    /** When true, displays the default close button. When false, no close button is shown unless closeButton prop is provided */
    useDefaultCloseButton: PropTypes.bool,
    /** Animation type for toast appearance/disappearance */
    transition: PropTypes.oneOf(['slide', 'fade']),
    /** Unique identifier for this container, used when multiple containers exist */
    containerId: PropTypes.string,
};

export default ToastContainer;
