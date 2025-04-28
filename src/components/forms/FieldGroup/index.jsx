import React, { memo, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { getOverrides, useClasses } from '../../../utils/overrides';
import InputWrapper from '../components/InputWrapper';

import { createUseStyles } from '../../../utils/styles';
import styles from './styles';
const useStyles = createUseStyles(styles, 'FieldGroup');

const FieldGroup = memo(
    ({
        children,
        classes: classesProp,
        overrides: overridesProp,
        className: classNameProp,
        error,
        inputProps,
        divider,
        isFullWidth,
        onChange = () => {},
        value = [],
        inputs = [],
        dividerText = '',
        fieldsMode = 'horizontal',
        ...props
    }) => {
        const classes = useClasses(useStyles, classesProp);
        const override = getOverrides(overridesProp, FieldGroup.overrides);

        const rootClassName = classnames(
            classes.root,
            {
                [classes.error]: error,
                [classes.isFullWidth]: isFullWidth,
                [classes.alignLabelTop]: fieldsMode === 'vertical',
            },
            classNameProp,
        );

        const rangeWrapperClassName = classnames(classes.rangeWrapper, {
            [classes.verticalFieldsMode]: fieldsMode === 'vertical',
        });

        const onChangeInput = useCallback(
            (newValue, index, event, info) => {
                let changedValue = [...value];
                changedValue[index] = newValue;
                onChange && onChange(changedValue, newValue, index, event, info);
            },
            [onChange, value],
        );

        const Inputs = useMemo(() => {
            return inputs.reduce((inputNodes, Input, index) => {
                let props = {};

                if (inputProps && Array.isArray(inputProps) && inputProps[index])
                    props = inputProps[index];
                else if (inputProps) props = inputProps;

                inputNodes.push(
                    <Input
                        key={index}
                        isFullWidth={isFullWidth}
                        error={!!error}
                        onChange={(value, event, info) => onChangeInput(value, index, event, info)}
                        value={value[index]}
                        {...props}
                    />,
                );

                // Adding dividers
                if (inputs[index + 1] && fieldsMode !== 'vertical' && (divider || dividerText)) {
                    if (divider)
                        inputNodes.push(
                            <div
                                key={`${index}-divider`}
                                className={classes.divider}
                                {...override.divider}
                            >
                                {divider}
                            </div>,
                        );
                    else if (dividerText)
                        inputNodes.push(
                            <div
                                key={`${index}-divider`}
                                className={classes.divider}
                                {...override.divider}
                            >
                                <span className={classes.dividerText} {...override.dividerText}>
                                    {dividerText}
                                </span>
                            </div>,
                        );
                }

                return inputNodes;
            }, []);
        }, [
            classes.divider,
            classes.dividerText,
            divider,
            dividerText,
            error,
            inputProps,
            inputs,
            isFullWidth,
            onChangeInput,
            override.divider,
            override.dividerText,
            value,
            fieldsMode,
        ]);

        return (
            <InputWrapper
                {...props}
                error={error}
                isFullWidth={isFullWidth}
                className={rootClassName}
                overrides={overridesProp}
            >
                <div className={rangeWrapperClassName} {...override.rangeWrapper}>
                    {Inputs}
                </div>
            </InputWrapper>
        );
    },
);

FieldGroup.overrides = ['root', 'rangeWrapper', 'divider', 'dividerText'];

FieldGroup.propTypes = {
    /** Custom className for styling purposes. Allows applying additional CSS classes to the component. */
    className: PropTypes.string,
    /** Object with custom style overrides for inner elements. Enables deep customization of component parts. */
    overrides: PropTypes.object,
    /** Text to be displayed as the field group's label. Appears above or beside the inputs based on labelMode. */
    label: PropTypes.string,
    /** Determines how the label is positioned relative to the field group.
     * 'horizontal' places the label beside the inputs, 'vertical' places it above. */
    labelMode: PropTypes.oneOf(['horizontal', 'vertical']),
    /** Determines how the input fields within the group are arranged.
     * 'horizontal' arranges fields side by side, 'vertical' stacks them vertically. */
    fieldsMode: PropTypes.oneOf(['horizontal', 'vertical']),
    /** When true, the field group will take up 100% of the available width. Useful for responsive layouts. */
    isFullWidth: PropTypes.bool,
    /** Tooltip text displayed in an info icon next to the label. Provides additional context for the field group. */
    hint: PropTypes.string,
    /** Error message displayed below the component. Also triggers error styling when present.
     * Can be a boolean or string - when true, only applies error styling without showing a message. */
    error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    /** Informational message displayed below the component. Used for non-error guidance text. */
    info: PropTypes.string,
    /** When true, displays an asterisk next to the label indicating the field group is required. */
    isRequired: PropTypes.bool,
    /** Function called when any input value changes within the group.
     * Receives five parameters: complete value array, changed value, index of changed input, event, and additional info. */
    onChange: PropTypes.func,
    /** Array of current values for all inputs in the group. Each index corresponds to an input component. */
    value: PropTypes.array,
    /** Array of input components to be rendered within the group, or a single node.
     * Each component should accept standard form control props like onChange, value, error, etc. */
    inputs: PropTypes.oneOfType([PropTypes.array, PropTypes.node]),
    /** Props to pass to the input components. Can be an array for individual customization or an object to apply to all fields.
     * For array form, each item corresponds to the input at the same index. */
    inputProps: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    /** Custom component to use as divider between inputs. Renders between each input in horizontal mode. */
    divider: PropTypes.any,
    /** Text to use as divider between inputs. Alternative to custom divider component. */
    dividerText: PropTypes.string,
};

export default FieldGroup;
