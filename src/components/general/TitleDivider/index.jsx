import React, { memo, useMemo } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { getOverrides, useClasses } from '../../../utils/overrides';

import Text from '../../typography/Text';
import { createUseStyles } from '../../../utils/styles';
import styles from './styles';

const useStyles = createUseStyles(styles, 'TitleDivider');

const TitleDivider = ({
    classes: classesProp,
    overrides: overridesProp,
    className: classNameProp,
    type = 'subtitle',
    children,
    ...props
}) => {
    const classes = useClasses(useStyles, classesProp);
    const override = getOverrides(overridesProp, TitleDivider.overrides);

    const rootProps = useMemo(
        () => ({
            ...props,
            className: classNames(classes.root, classNameProp),
        }),
        [classNameProp, classes.root, props],
    );

    return (
        <div {...rootProps} {...override.root}>
            <Text type={type} className={classes.text} {...override.Text}>
                {children}
            </Text>
        </div>
    );
};

TitleDivider.overrides = ['root', 'Text'];

TitleDivider.propTypes = {
    /** Custom CSS class for styling the root element */
    className: PropTypes.string,
    /** Overrides for the component parts' styles */
    overrides: PropTypes.object,
    /** Typography style to apply to the text content */
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
    /** Text content to display in the divider */
    children: PropTypes.node,
};

export default memo(TitleDivider);
