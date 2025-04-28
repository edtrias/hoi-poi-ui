import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { getOverrides, useClasses } from '../../../utils/overrides';

import RadioControl from './RadioControl';
import Label from '../../forms/Label';

import { createUseStyles } from '../../../utils/styles';
import styles from './styles';
const useStyles = createUseStyles(styles, 'RadioGroup');

function RadioGroup({
    classes: classesProp,
    overrides: overridesProp,
    className: classNameProp,
    onBlur,
    label,
    hint,
    isFullWidth,
    labelMode = 'horizontal',
    orientation = 'vertical',
    onChange = () => {},
    value = null,
    options = [],
    isReadOnly = false,
}) {
    const classes = useClasses(useStyles, classesProp);
    // Overrides
    const override = getOverrides(overridesProp, RadioGroup.overrides);

    // Classes
    const rootClassName = classnames(
        classes.root,
        {
            [classes.isReadOnly]: isReadOnly,
            [classes[`${labelMode}Label`]]: labelMode,
            [classes[orientation]]: orientation,
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
        className: classes.Label,
        hint,
        ...override.Label,
    };

    return (
        <div {...rootProps} {...override.root}>
            {label && <Label {...labelProps}>{label}</Label>}
            <div className={formControlClassName} {...override.formControl}>
                {options.map((option) => (
                    <RadioControl
                        key={option.value}
                        onClick={isReadOnly ? undefined : onChange}
                        overrides={overridesProp}
                        isReadOnly={isReadOnly}
                        option={option}
                        value={value}
                        onChange={onChange}
                        onBlur={onBlur}
                        classes={classesProp}
                        className={classes.radioControl}
                    />
                ))}
            </div>
        </div>
    );
}

RadioGroup.overrides = ['root', 'Radio', 'formControl', 'Label'];

RadioGroup.propTypes = {
    /** Custom className for styling purposes. Allows applying additional CSS classes to the component. */
    className: PropTypes.string,
    /** Object with custom style overrides for inner elements. Enables deep customization of component parts. */
    overrides: PropTypes.object,
    /** Function called when radio selection changes. Receives the selected option's value as a parameter. */
    onChange: PropTypes.func,
    /** Array of options to display as radio buttons. Each option must have a label and value property. */
    options: PropTypes.arrayOf(
        PropTypes.shape({
            /** Text to display next to the radio button. Describes what the option represents. */
            label: PropTypes.string,
            /** Value associated with this option. Can be any data type and will be passed to onChange when selected. */
            value: PropTypes.any,
        }),
    ),
    /** Currently selected value. Should match one of the values in the options array. */
    value: PropTypes.any,
    /** Text to be displayed as the group's label. Identifies the purpose of the radio group. */
    label: PropTypes.string,
    /** Determines how the group label is positioned relative to the radio buttons.
     * 'horizontal' places the label beside the buttons, 'vertical' places it above. */
    labelMode: PropTypes.oneOf(['horizontal', 'vertical']),
    /** Defines how radio buttons are arranged.
     * 'vertical' stacks radio buttons vertically, 'horizontal' arranges them in a row. */
    orientation: PropTypes.oneOf(['horizontal', 'vertical']),
    /** Info popover or tooltip text that provides additional context for the radio group. */
    hint: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    /** When true, prevents user from changing the radio selection. The entire group becomes non-interactive. */
    isReadOnly: PropTypes.bool,
    /** When true, component will take up 100% of the available width. Useful for responsive layouts. */
    isFullWidth: PropTypes.bool,
};

export default React.memo(RadioGroup);
