import React, { useCallback, useRef, useMemo } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Modal from 'react-modal';
import Text from '../../typography/Text';
import { getOverrides, useClasses } from '../../../utils/overrides';

import { createUseStyles } from '../../../utils/styles';
import styles from './styles';
const useStyles = createUseStyles(styles, 'Drawer');

function getTransitionEndEventName() {
    const transitions = {
        transition: 'transitionend',
        OTransition: 'oTransitionEnd',
        MozTransition: 'transitionend',
        WebkitTransition: 'webkitTransitionEnd',
    };
    let bodyStyle = document.body.style;
    for (let transition in transitions) {
        if (bodyStyle[transition] !== undefined) {
            return transitions[transition];
        }
    }
}
const transitionEndEventName = getTransitionEndEventName();

function Drawer({
    children,
    classes: classesProp,
    overrides: overridesProp,
    className: classNameProp,
    isOpen,
    onAfterOpen,
    onRequestClose,
    contentStyles,
    style,
    onTransitionEnds,
    width = '500px',
    side = 'right',
    closeTimeout = 500,
    shouldCloseOnOverlayClick = false,
    shouldCloseOnEsc = false,
    hideOverlay = false,
}) {
    const classes = useClasses(useStyles, classesProp);
    // Overrides
    const override = getOverrides(overridesProp, Drawer.overrides);
    const drawerRef = useRef(document);

    // Classes
    const rootClassName = classnames(classes.root, classes[side], classNameProp);

    let contentStyle = { width };
    if (side && ['top', 'bottom'].includes(side)) contentStyle = { height: width };

    const onAfterOpenCb = useCallback(() => {
        if (!onTransitionEnds && !onAfterOpen) return;
        if (onAfterOpen) return onAfterOpen();

        const drawerTransitionEl = drawerRef.current.querySelector(`.${classes.root}`);
        drawerTransitionEl.addEventListener(transitionEndEventName, onTransitionEnds);
        return () =>
            drawerTransitionEl.removeEventListener(transitionEndEventName, onTransitionEnds);
    }, [classes.root, onAfterOpen, onTransitionEnds]);

    const hideOverlayStyles = useMemo(() => {
        if (!hideOverlay) return {};

        return { width, backgroundColor: 'rgba(0, 0, 0, 0)' };
    }, [hideOverlay, width]);

    const overlaySide = useMemo(() => {
        const capitalizedSide = side.charAt(0).toUpperCase() + side.slice(1);
        return `overlay${capitalizedSide}`;
    }, [side]);

    const rootProps = {
        ariaHideApp: false,
        isOpen,
        closeTimeoutMS: closeTimeout,
        style: {
            content: {
                ...contentStyle,
                ...(contentStyles || {}),
            },
            overlay: {
                ...hideOverlayStyles,
            },
            ...style,
        },
        overlayClassName: classes[overlaySide],
        onRequestClose,
        shouldCloseOnOverlayClick,
        shouldCloseOnEsc,
        ...override.root,
    };

    return (
        <Modal onAfterOpen={onAfterOpenCb} className={rootClassName} {...rootProps}>
            <Text className={classes.Text} {...override.Text}>
                {children}
            </Text>
        </Modal>
    );
}

Drawer.overrides = ['root', 'Text'];

Drawer.propTypes = {
    /** Custom CSS class for styling the drawer container */
    className: PropTypes.string,
    /**
     * Object with custom style overrides for inner elements.
     * You can override styles for 'root' and 'Text'.
     */
    overrides: PropTypes.object,
    /** Content to be displayed inside the drawer */
    children: PropTypes.any,
    /** Controls whether the drawer is open or closed */
    isOpen: PropTypes.bool.isRequired,
    /**
     * Width of the drawer panel. Can be specified in any valid CSS unit.
     * For top/bottom drawers, this controls the height.
     */
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    /**
     * Determines which side of the screen the drawer appears from.
     * Currently supports 'right' and 'left'.
     */
    side: PropTypes.oneOf(['right', 'left']),
    /**
     * When true, the semi-transparent overlay behind the drawer will be hidden.
     * Useful for non-modal-like drawers.
     */
    hideOverlay: PropTypes.bool,
    /** Milliseconds to wait before closing the drawer */
    closeTimeout: PropTypes.number,
    /**
     * Function that will be called after the drawer has opened.
     * Useful for focusing elements or triggering animations.
     */
    onAfterOpen: PropTypes.func,
    /**
     * Function that will be called when the drawer is requested to be closed
     * (either by clicking on overlay or pressing ESC).
     * You must implement this to handle closing the drawer.
     */
    onRequestClose: PropTypes.func,
    /**
     * Function that will be called after the drawer has opened and transition has ended.
     * Useful for sequencing animations or operations after the drawer is fully visible.
     */
    onTransitionEnds: PropTypes.func,
    /**
     * When true, clicking the overlay will trigger onRequestClose.
     * You must implement onRequestClose for this to work.
     */
    shouldCloseOnOverlayClick: PropTypes.bool,
    /**
     * When true, pressing the ESC key will trigger onRequestClose.
     * You must implement onRequestClose for this to work.
     */
    shouldCloseOnEsc: PropTypes.bool,
    /**
     * Additional styles to be applied to the drawer content container.
     * These styles will be merged with the default styles.
     */
    contentStyles: PropTypes.object,
};

export default React.memo(Drawer);
