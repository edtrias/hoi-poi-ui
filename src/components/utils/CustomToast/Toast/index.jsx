import React, { memo, useMemo, Fragment, useCallback } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Text from '../../../typography/Text';
import Link from '../../../typography/Link';
import Icon from '../../../general/Icon';
import { useClasses } from '../../../../utils/overrides';
import { createUseStyles, useTheme } from '../../../../utils/styles';
import { Transition } from '../transitions';
import { TYPES } from '../constants';
import styles from './styles';
const useStyles = createUseStyles(styles, 'Toast');

const Toast = memo(
    ({
        classes: classesProp,
        className: classNameProp,
        override,
        id,
        type,
        onClick,
        closeOnClick,
        closeButton,
        useDefaultCloseButton,
        onClose,
        title,
        text,
        icon,
        isActive,
        clearDeletedToast,
        onClickLink,
        linkText,
        transition = 'slide',
        content = null,
    }) => {
        const theme = useTheme();
        const classes = useClasses(useStyles, classesProp);
        const rootClassName = classnames(
            classes.root,
            {
                [classes[TYPES.success]]: !content && type === TYPES.success,
                [classes[TYPES.warning]]: !content && type === TYPES.warning,
                [classes[TYPES.error]]: !content && type === TYPES.error,
                [classes[TYPES.info]]: !content && type === TYPES.info,
            },
            classNameProp,
        );

        const handleOnClose = useCallback(
            (e) => {
                e.stopPropagation();
                onClose();
            },
            [onClose],
        );

        const handleOnClick = useCallback(() => {
            if (onClick) onClick();
            if (!closeOnClick) return;
            onClose();
        }, [closeOnClick, onClose, onClick]);

        const handleOnClickLink = useCallback(
            (e) => {
                e.stopPropagation();
                onClickLink();
            },
            [onClickLink],
        );

        const toastContent = useMemo(() => {
            return (
                <Fragment>
                    <div className={classes.header}>
                        <Text className={classes.title} type="subtitle" bold>
                            {title}
                        </Text>
                        {closeButton && closeButton}
                        {!closeButton && useDefaultCloseButton && (
                            <Icon
                                className={classes.close}
                                name="close"
                                size="large"
                                onClick={handleOnClose}
                            />
                        )}
                    </div>
                    {!text && content}
                    {!content && (
                        <div className={classes.content}>
                            <Text
                                className={classes.text}
                                type="caption"
                                color={theme.colors.utility.textSecondary}
                            >
                                {text}
                            </Text>
                            {onClickLink && linkText && (
                                <Link
                                    className={classes.link}
                                    type="caption"
                                    onClick={handleOnClickLink}
                                >
                                    {linkText}
                                </Link>
                            )}
                        </div>
                    )}
                </Fragment>
            );
        }, [
            classes,
            content,
            text,
            title,
            handleOnClose,
            closeButton,
            useDefaultCloseButton,
            onClickLink,
            handleOnClickLink,
            linkText,
            theme,
        ]);

        const iconType = useMemo(() => {
            const icons = {
                [TYPES.success]: { name: 'taskChecked', color: theme.colors.semantic.positive500 },
                [TYPES.warning]: { name: 'warning', color: theme.colors.semantic.focus500 },
                [TYPES.error]: { name: 'error', color: theme.colors.semantic.negative500 },
                [TYPES.info]: { name: 'info', color: theme.colors.semantic.info500 },
            };

            if (!icons[type]) return null;

            return <Icon name={icons[type].name} color={icons[type].color} />;
        }, [type, theme]);

        const toastWrapperClassName = classnames(classes.toastWrapper, {
            [classes.withIcon]: !!iconType || !!icon,
        });

        return (
            <Transition
                transition={transition}
                transitionKey={id}
                show={isActive}
                timeout={300}
                onExited={() => clearDeletedToast(id)}
            >
                <div className={rootClassName} {...override.Toast} onClick={handleOnClick}>
                    {(iconType || icon) && (
                        <div className={toastWrapperClassName} {...override.ToastWrapper}>
                            <div className={classes.iconBox}>{iconType || icon}</div>
                            <div className={classes.contentBox}>{toastContent}</div>
                        </div>
                    )}
                    {!iconType && !content && !icon && (
                        <div className={toastWrapperClassName} {...override.ToastWrapper}>
                            {toastContent}
                        </div>
                    )}
                    {!title && !icon && !iconType && content}
                </div>
            </Transition>
        );
    },
);

Toast.propTypes = {
    /** Custom className to apply to the toast */
    className: PropTypes.string,
    /** Override the styles of any part of the component */
    overrides: PropTypes.object,
    /** Unique identifier for this specific toast instance */
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    /** Container ID where this toast will be rendered */
    containerId: PropTypes.any,
    /** Custom React element to display as the toast content, replacing the default layout */
    content: PropTypes.element,
    /** Main message text of the toast */
    text: PropTypes.string,
    /** Header text displayed at the top of the toast */
    title: PropTypes.string,
    /** Toast notification type, affects styling and icon */
    type: PropTypes.oneOf(['success', 'warning', 'error', 'info']),
    /** Custom icon to display instead of the default type icon */
    icon: PropTypes.node,
    /** Custom close button element to replace the default one */
    closeButton: PropTypes.element,
    /** Custom className for the close button */
    closeButtonClassName: PropTypes.string,
    /** When true, clicking on the toast will dismiss it */
    closeOnClick: PropTypes.bool,
    /** Determines toast ordering in the container. When true, new toasts appear at the top */
    newestOnTop: PropTypes.bool,
    /** Controls automatic dismissal. False disables auto-close, a number sets the duration in milliseconds */
    autoClose: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
    /** When true, displays the default close button. When false, no close button is shown unless closeButton prop is provided */
    useDefaultCloseButton: PropTypes.bool,
    /** Function called when the toast is clicked */
    onClick: PropTypes.func,
    /** Function called when the toast is closed */
    onClose: PropTypes.func,
    /** Function called when the link in the toast is clicked */
    onClickLink: PropTypes.func,
    /** Text for the clickable link that can be displayed in the toast */
    linkText: PropTypes.string,
    /** Animation type for toast appearance/disappearance */
    transition: PropTypes.oneOf(['slide', 'fade']),
    /** Whether the toast is currently visible */
    isActive: PropTypes.bool,
    /** Function to clear toast after transition */
    clearDeletedToast: PropTypes.func,
};

export default Toast;
