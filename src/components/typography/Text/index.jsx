import React, { forwardRef, useRef, useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { getOverrides, useClasses } from '../../../utils/overrides';
import { createUseStyles } from '../../../utils/styles';
import Tooltip from '../../utils/Tooltip';

import styles from './styles';

const useStyles = createUseStyles(styles, 'Text');

const Text = forwardRef(
    (
        {
            children,
            useTooltip,
            bold = false,
            medium = false,
            color,
            withDivider,
            isHighlighted,
            classes: classesProp,
            overrides: overridesProp,
            className: classNameProp,
            as = 'span',
            type = 'body',
            isTruncated = false,
            strikethrough = false,
            ...props
        },
        ref,
    ) => {
        const [tooltipContent, setTooltipContent] = useState(null);
        const defaultRef = useRef(null);
        const classes = useClasses(useStyles, classesProp);

        const rootClassName = classnames(classes.root, classNameProp, classes[type], {
            [classes.bold]: bold,
            [classes.medium]: !bold && medium,
            [classes.truncated]: isTruncated,
            [classes.divider]: withDivider,
            [classes.highlighted]: isHighlighted,
            [classes.strikethrough]: strikethrough,
        });

        const override = getOverrides(overridesProp, Text.overrides);

        const rootProps = useMemo(
            () => ({
                ...props,
                ...override.root,
            }),
            [override.root, props],
        );

        useEffect(() => {
            const finalRef = ref || defaultRef;
            if (useTooltip && finalRef.current?.offsetWidth < finalRef.current?.scrollWidth)
                setTooltipContent(<span>{children}</span>);
        }, [children, useTooltip, ref]);

        const style = useMemo(() => (!!color ? { color } : {}), [color]);

        const textContainer = useMemo(() => {
            const Tag = as || 'span';
            return (
                <Tag ref={ref || defaultRef} className={rootClassName} style={style} {...rootProps}>
                    {children}
                </Tag>
            );
        }, [as, children, ref, rootClassName, rootProps, style]);

        if (useTooltip)
            return (
                <Tooltip placement="top" content={tooltipContent}>
                    {textContainer}
                </Tooltip>
            );

        return textContainer;
    },
);

Text.overrides = ['root', 'Loader'];

Text.propTypes = {
    /** HTML element to render the text as (div, span, h1, etc.) */
    as: PropTypes.oneOf([
        'div',
        'span',
        'strong',
        'em',
        'p',
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'h6',
        'pre',
        'blockquote',
        'label',
        'li',
    ]),
    /** Custom className for styling purposes */
    className: PropTypes.string,
    /** Typography style variant to apply (affects font size, weight, etc.) */
    type: PropTypes.oneOf([
        'h1', // Largest heading
        'h2', // Second-level heading
        'h3', // Third-level heading
        'h4', // Fourth-level heading
        'h5', // Fifth-level heading
        'h6', // Smallest heading
        'subtitle1', // Larger subtitle style
        'subtitle', // Standard subtitle style
        'body1', // Larger body text
        'body', // Standard body text (default)
        'button', // Text styled for buttons
        'caption', // Small text for captions
        'captionMedium', // Small text with medium weight
        'badges', // Text styled for badges/tags
        'overline', // Uppercase small text, often used above headings
    ]),
    /** Custom text color (hex, RGB, or named color) */
    color: PropTypes.string,
    /** Object with custom style overrides for inner elements */
    overrides: PropTypes.object,
    /** Content to be displayed inside the text component */
    children: PropTypes.node,
    /** When true, adds an ellipsis if text overflows its container */
    isTruncated: PropTypes.bool,
    /** When true, displays text with bold (700) font weight */
    bold: PropTypes.bool,
    /** When true, displays text with medium (500) font weight (only applied if bold=false) */
    medium: PropTypes.bool,
    /** When true, adds a line through the text (strikethrough) */
    strikethrough: PropTypes.bool,
    /** When true, shows full text in a tooltip when hovered (automatically enabled when truncated) */
    useTooltip: PropTypes.bool,
    /** When true, displays a divider line below the text */
    withDivider: PropTypes.bool,
    /** When true, displays text with a highlighted background */
    isHighlighted: PropTypes.bool,
};

export default React.memo(Text);
