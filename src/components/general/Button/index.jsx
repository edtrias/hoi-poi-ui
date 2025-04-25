import React, { forwardRef, memo, useMemo } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { getOverrides, useClasses } from '../../../utils/overrides';
import Loader from '../../general/Loader';
import Icon from '../../general/Icon';
import Text from '../../typography/Text';

import { createUseStyles, useTheme } from '../../../utils/styles';
import styles from './styles';
const useStyles = createUseStyles(styles, 'Button');

const LOADER_SIZES = {
    big: 'tiny',
    medium: 'tiny',
    small: 'mini',
};
const ALLOWED_LOADING_TYPES = ['primary', 'primary-error'];

const Button = forwardRef(
    (
        {
            children,
            classes: classesProp,
            overrides: overridesProp,
            className: classNameProp,
            onClick,
            isDisabled,
            isFullWidth,
            isLoading,
            href,
            target,
            icon,
            size = 'medium',
            type = 'primary',
            iconPosition = 'left',
            ...props
        },
        ref,
    ) => {
        const theme = useTheme();
        const classes = useClasses(useStyles, classesProp);
        // Overrides
        const override = getOverrides(overridesProp, Button.overrides);

        // Classes
        const rootClassName = classnames(
            classes.root,
            {
                [classes.primary]: type === 'primary',
                [classes.primaryError]: type === 'primary-error',
                [classes.secondary]: type === 'secondary',
                [classes.secondaryError]: type === 'secondary-error',
                [classes.terciary]: type === 'terciary',
                [classes.dashed]: type === 'dashed',
                [classes.promotion]: type === 'promotion',
                [classes.primarySoft]: type === 'primary-soft',
                [classes.text]: type === 'text',
                [classes[size]]: size,
                [classes.disabled]: isDisabled,
                [classes.loading]: isLoading && ALLOWED_LOADING_TYPES.includes(type),
                [classes.fullWidth]: isFullWidth,
                [classes.iconLeft]: icon && iconPosition === 'left',
                [classes.iconRight]: icon && iconPosition === 'right',
                [classes.iconOnly]: icon && !children,
                [classes.href]: href,
            },
            classNameProp,
        );

        const rootProps = useMemo(
            () => ({
                ref,
                ...props,
                className: rootClassName,
                onClick: isDisabled || isLoading ? null : onClick,
            }),
            [props, ref, rootClassName, isDisabled, isLoading, onClick],
        );

        const iconProps = useMemo(() => {
            const properties = { size: 'medium', name: icon };
            switch (type) {
                case 'text':
                case 'secondary':
                    return {
                        ...properties,
                        color: theme.colors.actionMajor[500],
                    };
                case 'secondary-error':
                    return {
                        ...properties,
                        color: theme.colors.semantic.negative500,
                    };
                case 'dashed':
                case 'terciary':
                    return {
                        ...properties,
                        color: theme.colors.textLight.secondary,
                    };
                case 'promotion':
                    return {
                        ...properties,
                        color: theme.colors.textLight.primary,
                    };
                case 'primary':
                case 'primary-error':
                default:
                    return {
                        ...properties,
                        color: theme.colors.primary.white,
                    };
            }
        }, [icon, theme, type]);

        const content = (
            <div className={classes.content}>
                {isLoading && ALLOWED_LOADING_TYPES.includes(type) && (
                    <div className={classes.loaderContainer}>
                        <Loader size={LOADER_SIZES[size]} color="white" {...override.Loader} />
                    </div>
                )}
                {icon && iconPosition === 'left' && (
                    <div className={classes.icon} {...override.icon}>
                        <Icon {...iconProps} />
                    </div>
                )}
                {children && (
                    <Text className={classes.Text} {...override.Text}>
                        {children}
                    </Text>
                )}
                {icon && iconPosition === 'right' && (
                    <div className={classes.icon} {...override.icon}>
                        <Icon {...iconProps} />
                    </div>
                )}
            </div>
        );

        if (href) {
            return (
                <a href={href} target={target} {...rootProps} {...override.root}>
                    {content}
                </a>
            );
        } else {
            return (
                <button {...rootProps} type="button" {...override.root}>
                    {content}
                </button>
            );
        }
    },
);

Button.overrides = ['root', 'Text', 'Loader'];

Button.propTypes = {
    /** Custom className for styling purposes */
    className: PropTypes.string,
    /** Object with custom style overrides for inner elements */
    overrides: PropTypes.object,
    /** Function called when the button is clicked */
    onClick: PropTypes.func,
    /** Content to be displayed inside the button */
    children: PropTypes.node.isRequired,
    /** Determines the button size - affects padding, font size, and overall dimensions */
    size: PropTypes.oneOf(['big', 'medium', 'small']),
    /** Visual style variant of the button */
    type: PropTypes.oneOf([
        'primary', // Default, emphasized action
        'primary-soft', // Softer version of primary
        'primary-error', // For destructive primary actions
        'secondary', // Less emphasized action
        'secondary-error', // For destructive secondary actions
        'terciary', // Minimal emphasis
        'dashed', // With dashed border
        'promotion', // For promotional/special actions
        'text', // Text-only appearance
    ]),
    /** When true, the button cannot be clicked and appears grayed out */
    isDisabled: PropTypes.bool,
    /** When true, button will take up 100% of the available width */
    isFullWidth: PropTypes.bool,
    /** When true, displays a loading spinner and disables clicks */
    isLoading: PropTypes.bool,
    /** Renders the button as an anchor tag with this URL */
    href: PropTypes.string,
    /** Specifies where to open the linked document (for href buttons) */
    target: PropTypes.string,
    /** Icon name to display from the icon library */
    icon: PropTypes.string,
    /** Controls the position of the icon relative to the button text */
    iconPosition: PropTypes.oneOf(['left', 'right']),
};

export default memo(Button);
