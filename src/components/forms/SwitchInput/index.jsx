import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { createUseStyles } from '../../../utils/styles';
import { getOverrides, useClasses } from '../../../utils/overrides';

import InputWrapper from '../components/InputWrapper';
import Switch from '../Switch';

import styles from './styles';

const useStyles = createUseStyles(styles, 'SwitchInput');

function SwitchInput({
    children,
    classes: classesProp,
    overrides: overridesProp,
    className: classNameProp,
    error,
    checked,
    isRange,
    value,
    isFullWidth,
    labelMode = 'horizontal',
    onChange = () => {},
    isReadOnly = false,
    ...props
}) {
    const classes = useClasses(useStyles, classesProp);

    // Overrides
    const override = getOverrides(overridesProp, SwitchInput.overrides);

    // Classes
    const rootClassName = classnames(
        classes.root,
        {
            [classes.isReadOnly]: isReadOnly,
            [classes.vertical]: labelMode === 'vertical',
            [classes.isFullWidth]: isFullWidth,
        },
        classNameProp,
    );

    const onSwitch = useCallback(() => {
        onChange && onChange(!value);
    }, [onChange, value]);

    const switchProps = {
        className: classes.switchinput,
        onChange: onSwitch,
        checked: !!value,
        isDisabled: isReadOnly,
        ...override.Switch,
    };

    return (
        <InputWrapper
            {...props}
            error=""
            info=""
            isFullWidth={isFullWidth}
            labelMode={labelMode}
            className={rootClassName}
            overrides={overridesProp}
            classes={{ Label: classes.Label, formControl: classes.formControl }}
        >
            <Switch {...switchProps} />
        </InputWrapper>
    );
}

SwitchInput.overrides = ['root', 'Switch', 'overlay', 'overlayLabel'];

SwitchInput.propTypes = {
    /** Custom CSS class for styling */
    className: PropTypes.string,
    /** Object with custom style overrides for inner elements */
    overrides: PropTypes.object,
    /** Text to be displayed as the input's label */
    label: PropTypes.string,
    /** Determines how the label is positioned relative to the switch ('horizontal' or 'vertical') */
    labelMode: PropTypes.oneOf(['horizontal', 'vertical']),
    /** Current state of the switch (true for on, false for off) */
    value: PropTypes.any,
    /** Function called when the switch is toggled, receives the new value as parameter */
    onChange: PropTypes.func,
    /** Tooltip or informational text displayed in an info icon next to the label */
    hint: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    /** Error message displayed below the component, also triggers error styling when present */
    error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    /** When true, prevents user from toggling the switch */
    isReadOnly: PropTypes.bool,
    /** When true, the component takes up the full width of its container */
    isFullWidth: PropTypes.bool,
};

export default React.memo(SwitchInput);
