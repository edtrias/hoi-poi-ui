import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { useClasses } from '../../../utils/overrides';
import { createUseStyles } from '../../../utils/styles';
import styles from './styles';
const useStyles = createUseStyles(styles, 'Loader');

function Loader({ classes: classesProp, className, size = 'medium', color = 'primary' }) {
    const classes = useClasses(useStyles, classesProp);
    const rootClassName = classnames(className, classes.root, [classes[color]], [classes[size]]);

    return <div className={rootClassName} />;
}

Loader.propTypes = {
    /** Custom CSS class for styling the loader container */
    className: PropTypes.string,
    /**
     * Size of the loader.
     * Available options from smallest to largest:
     * 'mini', 'tiny', 'small', 'medium', 'large', 'big', 'huge', 'massive'
     */
    size: PropTypes.oneOf(['mini', 'tiny', 'small', 'medium', 'large', 'big', 'huge', 'massive']),
    /**
     * Color variant for the loader.
     * - 'primary': Blue based on actionMajor color (default)
     * - 'actionMinor': Purple based on actionMinor color
     * - 'danger': Red based on negative/error colors
     * - 'white': White color for use on dark backgrounds
     */
    color: PropTypes.oneOf(['primary', 'actionMinor', 'danger', 'white']),
};

export default React.memo(Loader);
