import React, { useMemo, useRef, useLayoutEffect, useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import RModal from 'react-modal';

import { getOverrides, useClasses } from '../../../utils/overrides';
import Text from '../../typography/Text';
import Link from '../../typography/Link';
import Icon from '../../general/Icon';
import Button from '../../general/Button';

import { createUseStyles } from '../../../utils/styles';
import styles from './styles';
const useStyles = createUseStyles(styles, 'Modal');

const SIZES = {
    tiny: 320,
    small: 440,
    medium: 640,
    large: 960,
    big: 1120,
    huge: 1280,
    full: '90%',
};

function Modal({
    children,
    classes: classesProp,
    overrides: overridesProp,
    className: classNameProp,
    overlayClassName,
    title,
    isOpen,
    height,
    width,
    cancelText,
    middleButtonText,
    confirmText,
    deleteText,
    onCancel,
    onMiddleButton,
    onConfirm,
    onDelete,
    isMiddleButtonDisabled,
    isMiddleButtonLoading,
    isConfirmDisabled,
    isConfirmLoading,
    onAfterOpen,
    onAfterClose,
    onRequestClose,
    getContentRef,
    headerComponent,
    preComponent,
    postComponent,
    footerComponent,
    size = 'medium',
    useAutoHeight = true,
    useAutoWidth = true,
    useContentStaticHeight = false,
    shouldCloseOnOverlayClick = true,
    shouldCloseOnEsc = true,
    useCornerClose = true,
    useHeader = true,
    closeTimeoutMS = 300,
}) {
    const modalRef = useRef();
    const maxHeight = useMemo(() => {
        const base = width || SIZES[size];
        const baseReduced = base * 0.2;
        const newHeight = base + baseReduced;
        return newHeight;
    }, [width, size]);
    const [autoHeight, setAutoHeight] = useState(maxHeight);
    const [autoWidth, setAutoWidth] = useState(width || SIZES[size]);
    const autoHeightRef = useRef(maxHeight);
    const prevIsOpenRef = useRef(isOpen);
    const isFirstLoadRef = useRef(true);
    const classes = useClasses(useStyles, classesProp);
    // Overrides
    const override = getOverrides(overridesProp, Modal.overrides);

    // Classes
    const rootClassName = classnames(classes.root, classNameProp);
    const overlayClassNames = classnames(classes.overlay, overlayClassName);

    const onResize = useCallback(() => {
        setTimeout(() => {
            const node = modalRef?.current?.node;
            const overlay = node?.querySelector('.ReactModal__Overlay');

            if (!overlay) return;

            if (useAutoWidth) {
                const defaultWidth = width || SIZES[size];
                const marginWidth = overlay.clientWidth * 0.2;
                const maxModalWidthWithMargins = overlay.clientWidth - marginWidth;

                if (defaultWidth > maxModalWidthWithMargins) {
                    setAutoWidth(maxModalWidthWithMargins);
                } else {
                    setAutoWidth(defaultWidth);
                }
            }

            if (useAutoHeight) {
                if (overlay.clientHeight < maxHeight + 20) {
                    const marginHeight = overlay.clientHeight * 0.2;
                    const maxModalHeightWithMargins = overlay.clientHeight - marginHeight;
                    if (autoHeightRef.current === maxModalHeightWithMargins) return;
                    autoHeightRef.current = maxModalHeightWithMargins;
                    setAutoHeight(maxModalHeightWithMargins);
                } else {
                    if (autoHeightRef.current === maxHeight) return;
                    autoHeightRef.current = maxHeight;
                    setAutoHeight(maxHeight);
                }
            }
        });
    }, [maxHeight, useAutoHeight, useAutoWidth, size, width]);

    useLayoutEffect(() => {
        if (!useAutoWidth && !useAutoHeight) return;
        if (isOpen && (isFirstLoadRef.current || isOpen !== prevIsOpenRef.current)) {
            onResize();
        }
        prevIsOpenRef.current = isOpen;
        isFirstLoadRef.current = false;
    }, [isOpen, onResize, useAutoWidth, useAutoHeight]);

    useLayoutEffect(() => {
        if (!useAutoWidth && !useAutoHeight) return;
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, [onResize, useAutoWidth, useAutoHeight]);

    let rootContentStyle = useMemo(() => {
        let finalHeight = size === 'full' ? '90%' : 'auto';
        if (height) finalHeight = height;

        return {
            width: useAutoWidth ? autoWidth : width || SIZES[size],
            height: finalHeight,
            maxWidth: '100%',
            maxHeight: '100%',
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        };
    }, [useAutoWidth, autoWidth, width, size, height]);

    const rootProps = {
        ariaHideApp: false,
        isOpen,
        style: {
            content: rootContentStyle,
        },
        overlayClassName: overlayClassNames,
        onAfterOpen,
        onAfterClose,
        onRequestClose,
        shouldCloseOnOverlayClick,
        shouldCloseOnEsc,
        closeTimeoutMS,
        contentRef: getContentRef,
        ...override.root,
    };

    const contentStyles = useMemo(() => {
        if (size === 'full' || height) return { height: '100%' };
        if (!useContentStaticHeight && !useAutoHeight) return {};
        if (useContentStaticHeight) return { height: autoHeight };
        else return { maxHeight: autoHeight };
    }, [height, size, useContentStaticHeight, useAutoHeight, autoHeight]);

    const showFooter = onConfirm || onCancel || onDelete || footerComponent;

    const renderTitle = useMemo(() => {
        if (typeof title === 'string') {
            return (
                <Text type="body" bold className={classes.title} {...override.title}>
                    {title}
                </Text>
            );
        }
        return title;
    }, [classes.title, override.title, title]);

    return (
        <RModal className={rootClassName} {...rootProps} ref={modalRef}>
            <div className={classes.container} style={contentStyles} {...override.container}>
                {useHeader && (
                    <div className={classes.header} {...override.header}>
                        {renderTitle}
                        {headerComponent}
                        {useCornerClose && (
                            <Icon
                                color="currentColor"
                                size="large"
                                name="close"
                                className={classes.closeIcon}
                                onClick={onRequestClose}
                                {...override.closeIcon}
                            />
                        )}
                    </div>
                )}
                {preComponent && (
                    <div className={classes.preComponent} {...override.preComponent}>
                        {preComponent}
                    </div>
                )}
                <div className={classes.content} {...override.content}>
                    {children}
                </div>
                {postComponent && (
                    <div className={classes.postComponent} {...override.postComponent}>
                        {postComponent}
                    </div>
                )}
                {showFooter && (
                    <div className={classes.footer} {...override.footer}>
                        {footerComponent && (
                            <div className={classes.footerComponent} {...override.footerComponent}>
                                {footerComponent}
                            </div>
                        )}
                        <div className={classes.footerLeft} {...override.footerLeft}>
                            {onDelete && (
                                <Link
                                    className={classes.deleteButton}
                                    onClick={onDelete}
                                    {...override.deleteButton}
                                >
                                    {deleteText}
                                </Link>
                            )}
                        </div>
                        <div className={classes.footerRight} {...override.footerRight}>
                            {onCancel && (
                                <Button
                                    type="terciary"
                                    className={classes.cancelButton}
                                    onClick={onCancel}
                                    isDisabled={isConfirmLoading}
                                    {...override.cancelButton}
                                >
                                    {cancelText}
                                </Button>
                            )}
                            {onMiddleButton && (
                                <Button
                                    type="secondary"
                                    className={classes.middleButton}
                                    onClick={onMiddleButton}
                                    isDisabled={isMiddleButtonDisabled || false}
                                    isLoading={isMiddleButtonLoading}
                                    {...override.middleButton}
                                >
                                    {middleButtonText}
                                </Button>
                            )}
                            {onConfirm && (
                                <Button
                                    className={classes.confirmButton}
                                    onClick={onConfirm}
                                    isDisabled={isConfirmDisabled || false}
                                    isLoading={isConfirmLoading}
                                    {...override.confirmButton}
                                >
                                    {confirmText}
                                </Button>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </RModal>
    );
}

Modal.overrides = [
    'root',
    'title',
    'header',
    'container',
    'content',
    'preComponent',
    'postComponent',
    'footer',
    'footerLeft',
    'footerRight',
    'footerComponent',
    'closeIcon',
    'cancelButton',
    'middleButton',
    'confirmButton',
    'deleteButton',
];

Modal.propTypes = {
    /** Custom CSS class for styling the modal container */
    className: PropTypes.string,
    /** Custom CSS class for styling the modal overlay */
    overlayClassName: PropTypes.string,
    /**
     * Object with custom style overrides for inner elements.
     * You can override styles for 'root', 'title', 'header', 'container', 'content',
     * 'preComponent', 'postComponent', 'footer', 'footerLeft', 'footerRight',
     * 'footerComponent', 'closeIcon', 'cancelButton', 'middleButton', 'confirmButton',
     * 'deleteButton'.
     */
    overrides: PropTypes.object,
    /** Content to be displayed inside the modal */
    children: PropTypes.any,
    /**
     * Title text or component to display in the modal header.
     * If a string is provided, it will be rendered as a Text component with bold styling.
     */
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    /** Controls whether the modal is open or closed */
    isOpen: PropTypes.bool,
    /**
     * Modal width in any valid CSS unit.
     * Overrides the predefined size presets.
     */
    width: PropTypes.string,
    /**
     * Modal height in any valid CSS unit.
     * When specified, the modal will use a fixed height.
     */
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    /**
     * Predefined size preset for the modal width.
     * - tiny: 320px
     * - small: 440px
     * - medium: 640px (default)
     * - large: 960px
     * - big: 1120px
     * - huge: 1280px
     * - full: 90% of viewport
     */
    size: PropTypes.oneOf(['tiny', 'small', 'medium', 'large', 'big', 'huge', 'full']),
    /**
     * When true, the modal height will automatically adjust based on screen size.
     * Default is true.
     */
    useAutoHeight: PropTypes.bool,
    /**
     * When true, the modal width will automatically adjust based on screen size.
     * Default is true.
     */
    useAutoWidth: PropTypes.bool,
    /**
     * When true, the content area will have a fixed height.
     * Default is false, allowing content to overflow with scrolling.
     */
    useContentStaticHeight: PropTypes.bool,
    /**
     * Function called when the cancel button is clicked.
     * When specified, a cancel button is displayed in the footer.
     */
    onCancel: PropTypes.func,
    /**
     * Function called when the confirm button is clicked.
     * When specified, a confirm button is displayed in the footer.
     */
    onConfirm: PropTypes.func,
    /**
     * Function called when the middle button is clicked.
     * When specified, a middle button is displayed in the footer.
     */
    onMiddleButton: PropTypes.func,
    /**
     * Function called when the delete link is clicked.
     * When specified, a delete link is displayed in the footer.
     */
    onDelete: PropTypes.func,
    /** Text for the confirm button */
    confirmText: PropTypes.string,
    /** Text for the middle button */
    middleButtonText: PropTypes.string,
    /** Text for the cancel button */
    cancelText: PropTypes.string,
    /** Text for the delete link */
    deleteText: PropTypes.string,
    /** When true, the middle button is disabled */
    isMiddleButtonDisabled: PropTypes.bool,
    /** When true, the middle button displays a loading spinner */
    isMiddleButtonLoading: PropTypes.bool,
    /** When true, the confirm button is disabled */
    isConfirmDisabled: PropTypes.bool,
    /** When true, the confirm button displays a loading spinner */
    isConfirmLoading: PropTypes.bool,
    /** Function called after the modal has opened */
    onAfterOpen: PropTypes.func,
    /** Function called after the modal has closed */
    onAfterClose: PropTypes.func,
    /**
     * Function called when the modal is requested to be closed
     * (either by clicking on overlay, close icon, or pressing ESC).
     * Required for the modal to close properly.
     */
    onRequestClose: PropTypes.func,
    /**
     * When true, clicking the overlay will trigger onRequestClose.
     * Default is true.
     */
    shouldCloseOnOverlayClick: PropTypes.bool,
    /**
     * When true, pressing the ESC key will trigger onRequestClose.
     * Default is true.
     */
    shouldCloseOnEsc: PropTypes.bool,
    /**
     * When true, displays a close icon in the top-right corner.
     * Default is true.
     */
    useCornerClose: PropTypes.bool,
    /**
     * When true, displays the header section with title.
     * Default is true.
     */
    useHeader: PropTypes.bool,
    /**
     * Time in milliseconds for the closing animation.
     * Default is 300.
     */
    closeTimeoutMS: PropTypes.number,
    /** Custom component to render in the header alongside the title */
    headerComponent: PropTypes.element,
    /** Component to render between the header and content area */
    preComponent: PropTypes.element,
    /** Component to render between the content and footer area */
    postComponent: PropTypes.element,
    /** Custom component to render in the footer */
    footerComponent: PropTypes.element,
    /** Function that returns a ref to the modal content element */
    getContentRef: PropTypes.func,
};

export default React.memo(Modal);
