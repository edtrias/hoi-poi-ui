import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { getOverrides, useClasses } from '../../../utils/overrides';
import Text from '../../typography/Text';

import { createUseStyles } from '../../../utils/styles';
import styles from './styles';
const useStyles = createUseStyles(styles, 'Badge');

function Badge({
    classes: classesProp,
    children,
    overrides: overridesProp,
    className: classNameProp,
    variant,
    isTruncated,
    useTooltip,
    type = 'default',
    ...props
}) {
    const classes = useClasses(useStyles, classesProp);
    // Overrides
    const override = getOverrides(overridesProp, Badge.overrides);

    // Classes
    const rootClassName = classnames(
        classes.root,
        {
            [classes[type]]: type,
            [classes[variant]]: variant,
        },
        classNameProp,
    );

    const rootProps = {
        ...props,
        className: rootClassName,
    };

    return (
        <div {...rootProps} {...override.root}>
            <Text
                type="caption"
                className={classes.Text}
                {...override.Text}
                isTruncated={isTruncated}
                useTooltip={useTooltip}
            >
                {children}
            </Text>
        </div>
    );
}

Badge.overrides = ['root', 'Text'];

Badge.propTypes = {
    /** Content to be displayed inside the badge */
    children: PropTypes.node.isRequired,
    /** Custom CSS class for styling */
    className: PropTypes.string,
    /** Object with custom style overrides for inner elements */
    overrides: PropTypes.object,
    /** Visual style of the badge to indicate different states or categories */
    type: PropTypes.oneOf([
        'error',
        'default',
        'info',
        'success',
        'warning',
        'ongoing',
        'promotion',
        'semanticPositive',
        'semanticNegative',
        'semanticInfo',
        'semanticFocus',
        'actionMinor',
    ]),
    /** Alternative visual style that inverts the badge's colors */
    variant: PropTypes.oneOf(['inverted']),
    /** When true, text that doesn't fit will be truncated with an ellipsis */
    isTruncated: PropTypes.bool,
    /** When true, displays the full text in a tooltip when hovering over a truncated badge */
    useTooltip: PropTypes.bool,
};

export default React.memo(Badge);
