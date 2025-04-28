import React, { memo, useMemo } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { getOverrides, useClasses } from '../../../utils/overrides';

import { createUseStyles } from '../../../utils/styles';
import styles from './styles';

const useStyles = createUseStyles(styles, 'Divider');

const Divider = ({
    classes: classesProp,
    overrides: overridesProp,
    className: classNameProp,
    ...props
}) => {
    const classes = useClasses(useStyles, classesProp);
    const override = getOverrides(overridesProp, Divider.overrides);

    const rootProps = useMemo(
        () => ({
            ...props,
            className: classNames(classes.root, classNameProp),
        }),
        [classNameProp, classes.root, props],
    );

    return <div {...rootProps} {...override.root} />;
};

Divider.overrides = ['root'];

Divider.propTypes = {
    /** Custom CSS class for styling the divider */
    className: PropTypes.string,
    /** Object with custom style overrides for the root element */
    overrides: PropTypes.object,
};

export default memo(Divider);
