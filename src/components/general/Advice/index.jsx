import React, { useMemo, useRef, useLayoutEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Collapse } from 'react-collapse';

import Button from '../Button';
import Icon from '../Icon';
import Text from '../../typography/Text';
import { getOverrides, useClasses } from '../../../utils/overrides';

import { createUseStyles, useTheme } from '../../../utils/styles';
import styles from './styles';
const useStyles = createUseStyles(styles, 'Advice');

function Advice({
    children,
    classes: classesProp,
    className: classNameProp,
    overrides: overridesProp,
    title,
    dismissText,
    onDismiss,
    showIcon = false,
    showCollapse = true,
    type = 'default',
    defaultCollapsed = true,
    isDismissable = false,
    ...props
}) {
    const theme = useTheme();
    const classes = useClasses(useStyles, classesProp);
    const [isEllipsisActive, setEllipsisActive] = useState(false);
    const [isOpened, setIsOpened] = useState(!defaultCollapsed);
    const textEl = useRef(null);

    useLayoutEffect(() => {
        if (title) return;
        const el = textEl.current;
        setEllipsisActive(el.offsetWidth < el.scrollWidth);

        // Handling resize windows
        const handleResize = () => setEllipsisActive(el.offsetWidth < el.scrollWidth);
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [textEl, children, setEllipsisActive, title]);

    // Overrides
    const override = getOverrides(overridesProp, Advice.overrides);

    // Classes
    const rootClassName = classnames(
        classes.root,
        {
            [classes[type]]: type,
            [classes.isOpened]: isOpened,
        },
        classNameProp,
    );

    const rootProps = {
        ...props,
        className: rootClassName,
    };

    const iconProps = useMemo(() => {
        const properties = { size: 'medium' };
        switch (type) {
            case 'error':
            case 'semanticNegative':
                return {
                    ...properties,
                    name: 'warningOutline',
                    color: theme.colors.semantic.negative500,
                };
            case 'success':
            case 'semanticPositive':
                return {
                    ...properties,
                    name: 'thickEnabled',
                    color: theme.colors.semantic.positive600,
                };
            case 'warning':
            case 'semanticFocus':
                return {
                    ...properties,
                    name: 'warningRounded',
                    color: theme.colors.semantic.focusCustom600,
                };
            case 'info':
            case 'semanticInfo':
                return {
                    ...properties,
                    name: 'infoOutlined',
                    color: theme.colors.semantic.info600,
                };
            case 'default':
            default:
                return {
                    ...properties,
                    name: 'infoOutlined',
                    color: theme.colors.textLight.secondary,
                };
        }
    }, [
        theme.colors.semantic.info600,
        theme.colors.semantic.positive600,
        theme.colors.textLight.secondary,
        theme.colors.semantic.negative500,
        theme.colors.semantic.focusCustom600,
        type,
    ]);

    const toggleCollapsing = useCallback(() => {
        setIsOpened(!isOpened);
    }, [isOpened]);

    const showCollapsingIcon = isEllipsisActive || title;

    return (
        <div {...rootProps}>
            <div className={classes.wrap}>
                {showIcon && (
                    <div className={classes.icon} {...override.icon}>
                        <Icon {...iconProps} />
                    </div>
                )}

                {!showCollapse && (
                    <Text
                        className={classes.Text}
                        {...override.Text}
                        overrides={{ root: { ref: textEl } }}
                    >
                        {children}
                    </Text>
                )}

                {showCollapse && (
                    <Collapse isOpened={isOpened || false} {...override['react-collapse']}>
                        <div className={classes.collapseContainer} {...override.collapseContainer}>
                            <div className={classes.textContainer} {...override.textContainer}>
                                <Text
                                    isTruncated={!isOpened}
                                    className={classes.Text}
                                    bold={!!title}
                                    {...override.Text}
                                    overrides={{ root: { ref: textEl } }}
                                >
                                    {!title && children}
                                    {title && title}
                                </Text>
                                {title && (
                                    <div className={classes.withTitleContainer}>
                                        <Text
                                            className={classes.Text}
                                            {...override.Text}
                                            overrides={{ root: { ref: textEl } }}
                                        >
                                            {children}
                                        </Text>
                                    </div>
                                )}
                            </div>
                            {showCollapsingIcon && (
                                <span
                                    onClick={toggleCollapsing}
                                    className={classes.dropdownIcon}
                                    {...override.dropdownIcon}
                                >
                                    <Icon name="arrowDropDown" />
                                </span>
                            )}
                        </div>
                    </Collapse>
                )}
            </div>
            {isDismissable && (
                <Button
                    className={classes.dismiss}
                    onClick={onDismiss}
                    type="terciary"
                    size="small"
                >
                    {dismissText}
                </Button>
            )}
        </div>
    );
}

Advice.overrides = [
    'root',
    'icon',
    'textContainer',
    'collapseContainer',
    'Text',
    'dropdownIcon',
    'react-collapse',
];

Advice.propTypes = {
    /** Content to be displayed in the advice component */
    children: PropTypes.node.isRequired,
    /** Optional title for the advice, renders in bold above the main content */
    title: PropTypes.any,
    /** Custom CSS class for styling */
    className: PropTypes.string,
    /** Object with custom style overrides for inner elements */
    overrides: PropTypes.object,
    /** When true, displays an appropriate icon based on the advice type */
    showIcon: PropTypes.bool,
    /** When true, enables collapsing/expanding of long content with a dropdown icon */
    showCollapse: PropTypes.bool,
    /** Controls whether long content is initially collapsed (true) or expanded (false) */
    defaultCollapsed: PropTypes.bool,
    /** Sets the visual style and icon of the advice based on its purpose */
    type: PropTypes.oneOf([
        'semanticPositive',
        'semanticNegative',
        'semanticInfo',
        'semanticFocus',
        'default',
        'error',
        'info',
        'success',
        'warning',
    ]),
    /** When true, displays a dismiss button that can remove the advice */
    isDismissable: PropTypes.bool,
    /** Text displayed on the dismiss button when isDismissable is true */
    dismissText: PropTypes.string,
    /** Function called when the dismiss button is clicked */
    onDismiss: PropTypes.func,
};

export default React.memo(Advice);
