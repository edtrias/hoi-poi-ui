import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

import Input from '../Input';
import InputGroup from '../InputGroup';
import CheckboxGroup from '../CheckboxGroup';
import RadioGroup from '../RadioGroup';
import Select from '../Select';
import Slider from '../Slider';
import Multiplier from '../Multiplier';

const FIELD_MAP = {
    text: Input,
    inputGroup: InputGroup,
    checkboxGroup: CheckboxGroup,
    radioGroup: RadioGroup,
    select: Select,
    slider: Slider,
    multiplier: Multiplier,
};

function FieldControl({
    overrides: overridesProp,
    className: classNameProp,
    labelMode,
    isFullWidth,
    isReadOnly,
    field,
    onChange,
    onFocus,
    onBlur,
    value,
    error,
    customFields,
    ...props
}) {
    const onChangeField = useCallback(
        (input) => {
            const value = input && input.target ? input.target.value : input;
            onChange && onChange(value, field);
        },
        [onChange, field],
    );

    const onFocusField = useCallback(
        (input) => {
            const value = input && input.target ? input.target.value : input;
            onFocus && onFocus(value, field);
        },
        [onFocus, field],
    );

    const onBlurField = useCallback(
        (input) => {
            const value = input && input.target ? input.target.value : input;
            onBlur && onBlur(value, field);
        },
        [onBlur, field],
    );

    if (!field || !field.type) return null;
    let Field = FIELD_MAP[field.type];
    let component = customFields && customFields[field.type];
    if (!Field && component) Field = Input;
    if (!Field) return null;

    const fieldProps = {
        ...field,
        labelMode,
        isFullWidth,
        isReadOnly,
        onChange: onChangeField,
        onFocus: onFocusField,
        onBlur: onBlurField,
        className: classNameProp,
        value,
        error,
        customFields,
        component,
        overrides: overridesProp,
    };
    let attrs = field.attrs || {};
    return <Field {...fieldProps} {...attrs} />;
}

FieldControl.defaultProps = {
    labelMode: 'horizontal',
    isFullWidth: false,
    error: '',
    field: {},
};

FieldControl.propTypes = {
    /** Native form class */
    labelMode: PropTypes.string,
    isFullWidth: PropTypes.bool,
    isReadOnly: PropTypes.bool,
    value: PropTypes.any,
    error: PropTypes.string,
    className: PropTypes.string,
    customFields: PropTypes.object,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    field: PropTypes.shape({
        label: PropTypes.string,
        labelMode: PropTypes.string,
        isFullWidth: PropTypes.string,
        name: PropTypes.string,
        type: PropTypes.string,
        placeholder: PropTypes.string,
        hint: PropTypes.string,
        isRequired: PropTypes.bool,
        isReadOnly: PropTypes.bool,
        className: PropTypes.string,
        attrs: PropTypes.object,
    }).isRequired,
};

export default React.memo(FieldControl);
