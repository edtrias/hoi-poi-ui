import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import RCTooltip from 'rc-tooltip';

import { getOverrides, useClasses } from '../../../utils/overrides';
import { createUseStyles } from '../../../utils/styles';
import styles from './styles';
const useStyles = createUseStyles(styles, 'Tooltip');

function Tooltip({
    children,
    classes: classesProp,
    overrides: overridesProp,
    className: classNameProp,
    content,
    placement = 'top',
    ...props
}) {
    const classes = useClasses(useStyles, classesProp);
    // Overrides
    const override = getOverrides(overridesProp, Tooltip.overrides);

    // Classes
    const rootClassName = classnames(classes.root, classNameProp);

    const rootProps = {
        ...props,
        prefixCls: 'hoi-poi-tooltip',
        transitionName: 'hoi-poi-tooltip--fade',
        trigger: ['hover'],
        overlayClassName: rootClassName,
        overlay: content,
        placement,
    };

    if (content === undefined || content === null) return children;

    return (
        <RCTooltip {...rootProps} {...override.root}>
            {children}
        </RCTooltip>
    );
}

Tooltip.overrides = ['root'];

Tooltip.propTypes = {
    /** Custom className for styling purposes */
    className: PropTypes.string,
    /** Object with custom style overrides for inner elements */
    overrides: PropTypes.object,
    /** The content to be displayed inside the tooltip (text, HTML, or React component) */
    content: PropTypes.any,
    /** Controls the position of the tooltip relative to the target element */
    placement: PropTypes.oneOf([
        'top', // Above the element, centered
        'topLeft', // Above the element, aligned to the left
        'topRight', // Above the element, aligned to the right
        'bottom', // Below the element, centered
        'bottomLeft', // Below the element, aligned to the left
        'bottomRight', // Below the element, aligned to the right
        'left', // To the left of the element, centered
        'leftTop', // To the left of the element, aligned to the top
        'leftBottom', // To the left of the element, aligned to the bottom
        'right', // To the right of the element, centered
        'rightTop', // To the right of the element, aligned to the top
        'rightBottom', // To the right of the element, aligned to the bottom
    ]),
};

export default React.memo(Tooltip);
