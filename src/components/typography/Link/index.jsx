import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { getOverrides, useClasses } from '../../../utils/overrides';
import { createUseStyles } from '../../../utils/styles';

import styles from './styles';

const useStyles = createUseStyles(styles, 'Link');

function Link({
    children,
    classes: classesProp,
    overrides: overridesProp,
    className: classNameProp,
    onClick,
    isDisabled,
    href,
    target,
    bold,
    variation,
    type = 'body',
    isTruncated = false,
    underline = false,
    ...props
}) {
    const classes = useClasses(useStyles, classesProp);

    //Overrides
    const override = getOverrides(overridesProp, Link.overrides);

    // Classes
    const rootClassName = classnames(classes.root, classNameProp, classes[type], {
        [classes.isDisabled]: isDisabled,
        [classes.truncated]: isTruncated,
        [classes.bold]: bold,
        [classes.underline]: underline,
        [classes.primary]: variation === 'primary',
    });

    const rootProps = useMemo(
        () => ({
            ...props,
            className: rootClassName,
            onClick: isDisabled ? null : onClick,
            ...override.root,
        }),
        [isDisabled, onClick, override.root, props, rootClassName],
    );

    if (href) {
        return (
            <a href={href} target={target} {...rootProps}>
                {children}
            </a>
        );
    } else {
        return (
            <button type="button" {...rootProps}>
                {children}
            </button>
        );
    }
}

Link.overrides = ['root'];

Link.propTypes = {
    /** Custom className to apply to the component */
    className: PropTypes.string,
    /** Override the styles of any part of the component. See available override elements in the Component Tree section of the Readme */
    overrides: PropTypes.object,
    /** Function called when the link is clicked */
    onClick: PropTypes.func,
    /** Content to be displayed within the link */
    children: PropTypes.node.isRequired,
    /** Typography style to apply to the link text. Inherits all text styling options from the design system */
    type: PropTypes.oneOf([
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'h6',
        'subtitle1',
        'subtitle',
        'body1',
        'body',
        'button',
        'caption',
        'captionMedium',
        'badges',
        'overline',
    ]),
    /** When true, the link appears inactive and doesn't respond to interaction */
    isDisabled: PropTypes.bool,
    /** URL that the link navigates to. When provided, renders as an <a> tag instead of a button */
    href: PropTypes.string,
    /** Specifies where to open the linked document. Only applies when href is provided */
    target: PropTypes.string,
    /** When true, adds an ellipsis to text that overflows its container */
    isTruncated: PropTypes.bool,
    /** When true, applies a bold font weight to the text */
    bold: PropTypes.bool,
    /** When true, adds underline styling on hover */
    underline: PropTypes.bool,
    /** Color variation for the link. 'primary' applies the primary action color */
    variation: PropTypes.oneOf(['primary']),
};

export default React.memo(Link);
