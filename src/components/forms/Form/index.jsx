import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { getOverrides } from '../../../utils/overrides';

import FieldControl from '../components/FieldControl';
import Section from '../../general/Section';

function Form({
    overrides: overridesProp,
    className: classNameProp,
    isReadOnly,
    onSubmit,
    onChange,
    onFocus,
    onBlur,
    customFields,
    orientation,
    labelMode = 'horizontal',
    isFullWidth = false,
    errors = {},
    values = {},
    schema = [],
    useNativeForm = false,
}) {
    // Overrides
    const override = getOverrides(overridesProp, Form.overrides);

    const onChangeField = useCallback(
        (value, field) => {
            let newValues = {
                ...values,
                [field.name]: value,
            };

            if (field.type === 'inputGroup') {
                newValues = {
                    ...values,
                    ...value,
                };
            }

            onChange && onChange(newValues, field, value);
        },
        [values, onChange],
    );

    const onFocusField = useCallback(
        (value, field) => {
            onFocus &&
                onFocus(
                    {
                        ...values,
                        [field.name]: value,
                    },
                    field,
                    value,
                );
        },
        [onFocus, values],
    );

    const onBlurField = useCallback(
        (value, field) => {
            onBlur &&
                onBlur(
                    {
                        ...values,
                        [field.name]: value,
                    },
                    field,
                    value,
                );
        },
        [onBlur, values],
    );

    const onEnterField = useCallback(
        (value, field) => {
            onSubmit &&
                onSubmit(
                    {
                        ...values,
                        [field.name]: value,
                    },
                    field,
                    value,
                );
        },
        [onSubmit, values],
    );

    const content = schema.map((section, index) => (
        <Section
            key={index}
            title={section.title}
            className={section.className}
            isExpandable={section.isExpandable}
            orientation={orientation}
            {...override.Section}
        >
            {section.fields.map((field) => {
                let value = values && values[field.name] ? values[field.name] : undefined;
                if (field.type === 'inputGroup') {
                    value = values;
                }
                return (
                    <FieldControl
                        key={field.name}
                        labelMode={field.labelMode || labelMode}
                        isFullWidth={field.isFullWidth || isFullWidth}
                        isReadOnly={isReadOnly || field.isReadOnly}
                        field={field}
                        value={value}
                        error={errors[field.name]}
                        onEnter={onEnterField}
                        onChange={onChangeField}
                        onFocus={onFocusField}
                        onBlur={onBlurField}
                        className={field.className}
                        customFields={customFields}
                        overrides={overridesProp}
                    />
                );
            })}
        </Section>
    ));

    const withForm = (children) => (
        <form className={classNameProp} action="" autoComplete="off" {...override.root}>
            {children}
        </form>
    );

    const withDiv = (children) => (
        <div className={classNameProp} {...override.root}>
            {children}
        </div>
    );

    if (useNativeForm) return withForm(content);
    return withDiv(content);
}

Form.overrides = ['root', 'Section'];

Form.propTypes = {
    /** Custom CSS class for the form wrapper */
    className: PropTypes.string,
    /** Defines how labels are positioned relative to fields ('horizontal' or 'vertical') */
    labelMode: PropTypes.string,
    /** When true, fields take up 100% of the available width */
    isFullWidth: PropTypes.bool,
    /** When true, all fields will be in read-only mode */
    isReadOnly: PropTypes.bool,
    /** Object containing the current values of all form fields */
    values: PropTypes.object,
    /** Object containing validation error messages keyed by field name */
    errors: PropTypes.object,
    /** Callback triggered when any field value changes */
    onChange: PropTypes.func,
    /** Callback triggered when a field loses focus */
    onBlur: PropTypes.func,
    /** Callback triggered on form submission */
    onSubmit: PropTypes.func,
    /** Object mapping custom field types to React components */
    customFields: PropTypes.object,
    /** When true, renders an HTML form element instead of a div */
    useNativeForm: PropTypes.bool,
    /** Array of section objects that define the form structure and fields */
    schema: PropTypes.arrayOf(
        PropTypes.shape({
            /** Title of the section displayed as a header */
            title: PropTypes.string,
            /** Custom CSS class for the section */
            className: PropTypes.string,
            /** When true, the section can be collapsed/expanded */
            isExpandable: PropTypes.bool,
            /** Array of field definitions within this section */
            fields: PropTypes.arrayOf(
                PropTypes.shape({
                    /** Label text displayed for the field */
                    label: PropTypes.string,
                    /** Overrides the form's default labelMode for this field */
                    labelMode: PropTypes.string,
                    /** Overrides the form's default isFullWidth for this field */
                    isFullWidth: PropTypes.bool,
                    /** Unique field identifier used as the key in values and errors objects */
                    name: PropTypes.string,
                    /** Field type determines which component to render */
                    type: PropTypes.string,
                    /** Placeholder text for input fields */
                    placeholder: PropTypes.string,
                    /** Helper text displayed below the field */
                    hint: PropTypes.string,
                    /** When true, validation will check for a non-empty value */
                    isRequired: PropTypes.bool,
                    /** When true, this field will be in read-only mode */
                    isReadOnly: PropTypes.bool,
                    /** Additional props passed directly to the field component */
                    attrs: PropTypes.object,
                    /** Custom CSS class for the field wrapper */
                    className: PropTypes.string,
                }),
            ),
        }),
    ).isRequired,
    /** Defines the layout direction of form sections ('horizontal' or 'vertical') */
    orientation: PropTypes.oneOf(['horizontal', 'vertical']),
};

export default React.memo(Form);
