import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { getOverrides, useClasses } from '../../../utils/overrides';
import RadioBox from '../RadioBox';

import { createUseStyles } from '../../../utils/styles';
import styles from './styles';
const useStyles = createUseStyles(styles, 'RadioBoxControl');

function RadioBoxControl({
    classes: classesProp,
    overrides: overridesProp = {},
    className: classNameProp,
    value,
    onBlur,
    onChange = () => {},
    option = {},
    isReadOnly = false,
    ...props
}) {
    const classes = useClasses(useStyles, classesProp);
    // Overrides
    const override = getOverrides(overridesProp, RadioBoxControl.overrides);

    const {
        value: optionValue,
        isReadOnly: optionIsReadOnly,
        overrides: optionOverrides,
        ...optionProps
    } = option;

    const onChangeRadio = useCallback(() => {
        onChange && onChange(optionValue);
        onBlur && onBlur(optionValue);
    }, [onBlur, onChange, optionValue]);

    return (
        <div
            className={classes.radioBoxControl}
            onClick={isReadOnly || optionIsReadOnly ? undefined : onChangeRadio}
            {...override.radioBoxControl}
        >
            <RadioBox
                {...props}
                {...optionProps}
                checked={value === optionValue}
                isReadOnly={isReadOnly || optionIsReadOnly}
                overrides={{ ...overridesProp.radioBox, ...optionOverrides }}
            />
        </div>
    );
}

RadioBoxControl.overrides = ['radioBoxControl', 'radioBox'];

RadioBoxControl.propTypes = {
    /** Object with custom style overrides */
    overrides: PropTypes.object,
    /** Callback function triggered when the option is selected */
    onChange: PropTypes.func,
    /** Configuration object for the RadioBox option */
    option: PropTypes.shape({
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
    /** Currently selected value */
    value: PropTypes.string,
    /** When true, the option cannot be selected */
    isReadOnly: PropTypes.bool,
    /** Callback function triggered when the option loses focus */
    onBlur: PropTypes.func,
};

export default React.memo(RadioBoxControl);
