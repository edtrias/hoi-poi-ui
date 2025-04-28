import React, { memo } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { getOverrides, useClasses } from '../../../utils/overrides';

import RadioBoxControl from './RadioBoxControl';

import { createUseStyles } from '../../../utils/styles';
import styles from './styles';
const useStyles = createUseStyles(styles, 'RadioBoxGroup');

const RadioBoxGroup = ({
    classes: classesProp,
    overrides: overridesProp,
    className: classNameProp,
    onBlur,
    onChange = () => {},
    value = null,
    options = [],
    isReadOnly = false,
    ...props
}) => {
    const classes = useClasses(useStyles, classesProp);
    // Overrides
    const override = getOverrides(overridesProp, RadioBoxGroup.overrides);

    // Classes
    const rootClassName = classnames(
        classes.root,
        {
            [classes.isReadOnly]: isReadOnly,
        },
        classNameProp,
    );

    return (
        <div className={rootClassName} {...override.root}>
            {options.map((option) => (
                <RadioBoxControl
                    key={option.value}
                    overrides={overridesProp}
                    isReadOnly={isReadOnly}
                    option={option}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    {...props}
                />
            ))}
        </div>
    );
};

RadioBoxGroup.overrides = ['root', 'RadioBox', 'radioBoxControl'];

RadioBoxGroup.propTypes = {
    /** Custom CSS class for styling the root container */
    className: PropTypes.string,
    /** Object with custom style overrides */
    overrides: PropTypes.object,
    /** Callback function triggered when the selected option changes */
    onChange: PropTypes.func,
    /** Array of option objects that define the available radio box choices */
    options: PropTypes.arrayOf(
        PropTypes.shape({
            /** Icon name to display in the RadioBox */
            icon: PropTypes.string,
            /** Title text for the RadioBox */
            title: PropTypes.string,
            /** Descriptive text for the RadioBox */
            text: PropTypes.string,
            /** Unique identifier for the option */
            value: PropTypes.string,
            /** Optional custom content to display when the option is selected */
            children: PropTypes.node,
            /** When true, this individual option cannot be selected */
            isReadOnly: PropTypes.bool,
            /** Custom CSS class for the individual option */
            className: PropTypes.string,
            /** Object with style overrides for the individual option */
            overrides: PropTypes.object,
        }),
    ),
    /** Current selected value */
    value: PropTypes.string,
    /** When true, all options in the group are disabled and cannot be selected */
    isReadOnly: PropTypes.bool,
    /** Callback function triggered when the option loses focus */
    onBlur: PropTypes.func,
};

export default memo(RadioBoxGroup);
