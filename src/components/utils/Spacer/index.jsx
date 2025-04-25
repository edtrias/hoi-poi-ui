import React, { memo } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { getOverrides } from '../../../utils/overrides';

const Spacer = ({ x = 0, y = 0, overrides: overridesProp, className: classNameProp }) => {
    // Overrides
    const override = getOverrides(overridesProp, Spacer.overrides);

    // Classes
    const rootClassName = classnames(classNameProp);

    const style = {
        margin: `${y * 4}px ${x * 4}px`,
    };

    return <div className={rootClassName} style={style} {...override.root} />;
};

Spacer.overrides = ['root'];

Spacer.propTypes = {
    /** Horizontal space multiplier (x * 4px) */
    x: PropTypes.number,
    /** Vertical space multiplier (y * 4px) */
    y: PropTypes.number,
    /** Custom className for styling purposes */
    className: PropTypes.string,
    /** Object with custom style overrides for inner elements */
    overrides: PropTypes.object,
};

export default memo(Spacer);
