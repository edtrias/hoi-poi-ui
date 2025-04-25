import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { getOverrides, useClasses } from '../../../utils/overrides';
import { createUseStyles } from '../../../utils/styles';

import Icon from '../Icon';

import styles from './styles';
const useStyles = createUseStyles(styles, 'IconMultiple');

const SIZES = ['huge', 'big', 'large', 'medium', 'small'];

function IconMultiple({
    classes: classesProp,
    overrides: overridesProp,
    className: classNameProp,
    size = 'medium',
    firstIcon,
    firstProps = {},
    secondIcon,
    secondProps = {},
    ...props
}) {
    const classes = useClasses(useStyles, classesProp);
    // Overrides
    const override = getOverrides(overridesProp, IconMultiple.overrides);

    // Classes
    const rootClassName = classnames(classes.root, classNameProp, classes[size]);

    const secondSize = useMemo(() => {
        const index = SIZES.findIndex((s) => size === s);
        return SIZES[index + 1] || 'small';
    }, [size]);

    const rootProps = {
        ...props,
        className: rootClassName,
    };

    return (
        <div {...rootProps} {...override.root}>
            <Icon
                name={firstIcon}
                size={size}
                className={classes.FirstIcon}
                {...override.FirstIcon}
                {...firstProps}
            />
            <Icon
                name={secondIcon}
                className={classes.SecondIcon}
                size={secondSize}
                {...override.SecondIcon}
                {...secondProps}
            />
        </div>
    );
}

IconMultiple.overrides = ['root', 'FirstIcon', 'SecondIcon'];

IconMultiple.propTypes = {
    /** Content to render inside the component */
    children: PropTypes.node,
    /** Custom CSS class for styling the component container */
    className: PropTypes.string,
    /**
     * Object with custom style overrides for inner elements.
     * You can override styles for 'root', 'FirstIcon', and 'SecondIcon'.
     */
    overrides: PropTypes.object,
    /**
     * Name of the first/primary icon to display.
     * Uses the standard icon names from the Icon component.
     */
    firstIcon: PropTypes.string.isRequired,
    /**
     * Name of the second/overlay icon to display at the bottom-right.
     * Uses the standard icon names from the Icon component.
     */
    secondIcon: PropTypes.string.isRequired,
    /**
     * Size of the primary icon. The secondary icon will be automatically sized one step smaller.
     * Options: 'huge', 'big', 'large', 'medium', 'small'
     */
    size: PropTypes.oneOf(['huge', 'big', 'large', 'medium', 'small']),
    /**
     * Additional props to pass to the first icon component.
     * Can include any valid props for the Icon component, such as color.
     */
    firstProps: PropTypes.object,
    /**
     * Additional props to pass to the second icon component.
     * Can include any valid props for the Icon component, such as color.
     */
    secondProps: PropTypes.object,
};

export default React.memo(IconMultiple);
