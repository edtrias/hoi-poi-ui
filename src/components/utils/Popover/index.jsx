import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import RCTooltip from 'rc-tooltip';

import { getOverrides, useClasses } from '../../../utils/overrides';

import { createUseStyles } from '../../../utils/styles';
import styles from './styles';
const useStyles = createUseStyles(styles, 'Popover');

function Popover({
    children,
    classes: classesProp,
    overrides: overridesProp,
    className: classNameProp,
    content,
    getRef,
    getContentRef,
    placement = 'top',
    trigger = ['click'],
    ...props
}) {
    const classes = useClasses(useStyles, classesProp);
    // Overrides
    const override = getOverrides(overridesProp, Popover.overrides);

    // Classes
    const rootClassName = classnames(classes.root, classNameProp);

    const rootProps = {
        ref: (ref) => getRef && getRef(ref),
        prefixCls: 'hoi-poi-popover',
        transitionName: 'hoi-poi-popover--fade',
        trigger,
        overlayClassName: rootClassName,
        overlay: getContentRef ? <div ref={(ref) => getContentRef(ref)}>{content}</div> : content,
        placement,
        ...props,
    };

    return (
        <RCTooltip {...rootProps} {...override.root}>
            {children}
        </RCTooltip>
    );
}

Popover.overrides = ['root'];

Popover.propTypes = {
    /** Custom className for styling purposes */
    className: PropTypes.string,
    /** Object with custom style overrides for inner elements */
    overrides: PropTypes.object,
    /** Content to be displayed inside the popover (text, HTML, or React component) */
    content: PropTypes.any,
    /** Array of interaction types that will trigger the popover to show */
    trigger: PropTypes.arrayOf(PropTypes.string),
    /** Controls the position of the popover relative to the trigger element */
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
    /** Function to get a reference to the popover component */
    getRef: PropTypes.func,
    /** Function to get a reference to the popover content element */
    getContentRef: PropTypes.func,
};

export default React.memo(Popover);
