import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { getOverrides, useClasses } from '../../../utils/overrides';
import Label from '../Label';
import CheckboxControl from './CheckboxControl';

import { createUseStyles } from '../../../utils/styles';
import styles from './styles';
const useStyles = createUseStyles(styles, 'CheckboxGroup');

function CheckboxGroup({
    classes: classesProp,
    overrides: overridesProp,
    className: classNameProp,
    onBlur,
    label,
    hint,
    error,
    isFullWidth,
    color,
    labelMode = 'horizontal',
    onChange = () => {},
    value = {},
    options = [],
    isReadOnly = false,
}) {
    const classes = useClasses(useStyles, classesProp);
    // Overrides
    const override = getOverrides(overridesProp, CheckboxGroup.overrides);

    // Classes
    const rootClassName = classnames(
        classes.root,
        {
            [classes.isReadOnly]: isReadOnly === true,
            [classes[labelMode]]: labelMode,
            [classes.errored]: error,
        },
        classNameProp,
    );

    const formControlClassName = classnames(classes.formControl, {
        [classes.isFullWidth]: isFullWidth,
    });

    const rootProps = {
        className: rootClassName,
    };

    const labelProps = {
        className: classnames(classes.Label, {
            [classes.isFullWidth]: isFullWidth,
        }),
        hint,
        ...override.Label,
    };

    const onChangeCheckbox = useCallback(
        (option) => {
            onChange &&
                onChange({
                    ...value,
                    [option]: !value[option],
                });
            onBlur &&
                onBlur({
                    ...value,
                    [option]: !value[option],
                });
        },
        [onBlur, onChange, value],
    );

    const hasErrorObj = useMemo(() => {
        return !error || typeof error !== 'object' ? false : Object.entries(error).length > 0;
    }, [error]);

    return (
        <div {...rootProps} {...override.root}>
            {label && <Label {...labelProps}>{label}</Label>}
            <div className={formControlClassName} {...override.formControl}>
                {options.map((option, i) => (
                    <CheckboxControl
                        key={option.value}
                        option={option}
                        value={value[option.value]}
                        isReadOnly={Array.isArray(isReadOnly) ? isReadOnly[i] : isReadOnly}
                        onChange={onChangeCheckbox}
                        color={color}
                        overrides={overridesProp}
                        error={hasErrorObj ? error[option.value] : undefined}
                    />
                ))}
                {error && !hasErrorObj && (
                    <div className={classes.error} {...override.error}>
                        {error}
                    </div>
                )}
            </div>
        </div>
    );
}

CheckboxGroup.overrides = [
    'root',
    'error',
    'Checkbox',
    'checkboxLabel',
    'checkboxControl',
    'formControl',
    'Label',
];

CheckboxGroup.propTypes = {
    /** Custom className for styling purposes. Allows applying additional CSS classes. */
    className: PropTypes.string,
    /** Object with custom style overrides for inner elements. Enables deep customization. */
    overrides: PropTypes.object,
    /** Function called when checkbox selections change with the new selections object as parameter.
     * Receives an updated object with option values as keys and boolean states as values. */
    onChange: PropTypes.func,
    /** Array of options to display as checkboxes. Each option must have a label and value property,
     * and can optionally include a hint object with title and body. */
    options: PropTypes.arrayOf(
        PropTypes.shape({
            /** Text to display next to the checkbox. Describes what the option represents. */
            label: PropTypes.string,
            /** Unique identifier for the option, used as key in the value object. Must be unique within the group. */
            value: PropTypes.string,
            /** Tooltip information to display next to the checkbox. Provides additional context for the option. */
            hint: PropTypes.shape({
                /** Title of the tooltip. Displayed in bold at the top of the tooltip. */
                title: PropTypes.string,
                /** Main content of the tooltip. Provides detailed explanation about the option. */
                body: PropTypes.string,
            }),
        }),
    ),
    /** Object containing the current state of all checkboxes with option values as keys and boolean states as values.
     * For example: { "option1": true, "option2": false } */
    value: PropTypes.object,
    /** Error message displayed below the component, or object with option values as keys and error messages as values.
     * When passing an object, errors are displayed under the specific checkbox. */
    error: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    /** Text to be displayed as the group's label. Identifies the purpose of the checkbox group. */
    label: PropTypes.string,
    /** Determines how the group label is positioned relative to the checkboxes.
     * 'horizontal' places the label beside the checkboxes, 'vertical' places it above. */
    labelMode: PropTypes.oneOf(['horizontal', 'vertical']),
    /** Tooltip text displayed in an info icon next to the label. Provides additional context for the entire group. */
    hint: PropTypes.string,
    /** When true or an array of booleans, prevents user from changing the checkbox state.
     * Pass an array to disable specific checkboxes while leaving others enabled. */
    isReadOnly: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
    /** When true, component will take up 100% of the available width. Useful for responsive layouts. */
    isFullWidth: PropTypes.bool,
    /** Theme color to use for the checkboxes. Controls the appearance of checkboxes when selected. */
    color: PropTypes.string,
    /** Function called when checkboxes lose focus. Receives the same updated object as onChange. */
    onBlur: PropTypes.func,
};

export default React.memo(CheckboxGroup);
