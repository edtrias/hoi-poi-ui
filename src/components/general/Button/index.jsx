import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { getOverrides, useClasses } from '../../../utils/overrides';
import Loader from '../../general/Loader';
import Text from '../../typography/Text';

import { createUseStyles } from '../../../utils/styles';
import styles from './styles';
const useStyles = createUseStyles(styles, 'Button');

const LOADER_SIZES = {
    big: 'small',
    medium: 'tiny',
    small: 'mini',
};

function Button({
    children,
    classes: classesProp,
    overrides: overridesProp,
    className: classNameProp,
    onClick,
    size,
    type,
    color,
    isDisabled,
    isFullWidth,
    isLoading,
    href,
    target,
    ...props
}) {
    const classes = useClasses(useStyles, classesProp);
    // Overrides
    const override = getOverrides(overridesProp, Button.overrides);

    // Classes
    const rootClassName = classnames(
        classes.root,
        {
            [classes[type]]: type,
            [classes.white]: !color,
            [classes.primary]: color === 'primary',
            [classes.danger]: color === 'danger',
            [classes.grey]: color === 'grey',
            [classes.small]: size === 'small',
            [classes.big]: size === 'big',
            [classes.disabled]: isDisabled || isLoading,
            [classes.fullWidth]: isFullWidth,
        },
        classNameProp,
    );

    const wrapperLabelClass = classnames({
        [classes.labelLoading]: isLoading,
    });

    const rootProps = {
        ...props,
        className: rootClassName,
        onClick: isDisabled || isLoading ? null : onClick,
    };

    const content = (
        <span className={wrapperLabelClass}>
            {isLoading && (
                <div className={classes.loader}>
                    <Loader
                        size={LOADER_SIZES[size]}
                        color={['outlined', 'squared-outlined'].includes(type) ? color : 'white'}
                        {...override.Loader}
                    />
                </div>
            )}
            <Text className={classes.Text} {...override.Text}>
                {children}
            </Text>
        </span>
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
}

Button.overrides = ['root', 'Text', 'Loader'];

Button.defaultProps = {
    size: 'medium',
    type: 'filled',
    overrides: {},
};

Button.propTypes = {
    className: PropTypes.string,
    overrides: PropTypes.object,
    onClick: PropTypes.func,
    children: PropTypes.node.isRequired,
    size: PropTypes.oneOf(['big', 'medium', 'small']),
    type: PropTypes.oneOf(['filled', 'outlined', 'squared', 'squared-outlined']),
    color: PropTypes.oneOf(['primary', 'danger', 'white', 'grey']),
    isDisabled: PropTypes.bool,
    /** Use the whole container */
    isFullWidth: PropTypes.bool,
    isLoading: PropTypes.bool,
    /** Render the component as a tag <a/> with href */
    href: PropTypes.string,
    /** native <a/> target */
    target: PropTypes.string,
};

export default React.memo(Button);
