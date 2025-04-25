import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { getOverrides, useClasses } from '../../../utils/overrides';
import { createUseStyles } from '../../../utils/styles';
import styles from './styles';
import Text from '../../typography/Text';

const useStyles = createUseStyles(styles, 'InputGroup');

function InputGroup({
    children,
    classes: classesProp,
    overrides: overridesProp,
    className: classNameProp,
    onClick,
    onChange,
    onBlur,
    onFocus,
    inputs,
    showMore,
    showMoreLabel,
    label,
    labelMode,
    hint,
    error,
    isFullWidth,
    isReadOnly,
    isRequired,
    isVertical,
    ...props
}) {
    // Classes
    const override = getOverrides(overridesProp, InputGroup.overrides);
    const classes = useClasses(useStyles, classesProp);

    // State
    const [focused, setFocused] = useState(false);
    const [mustShow, setMustShow] = useState(false);

    // Callbacks
    const onInputFocus = useCallback(
        (...args) => {
            setFocused(true);
            if (onFocus) onFocus(...args);
        },
        [onFocus],
    );

    const onInputBlur = useCallback(
        (...args) => {
            setFocused(false);
            if (onBlur) onBlur(...args);
        },
        [onBlur],
    );

    const onShowMoreClick = useCallback(() => {
        setMustShow(true);
    }, []);

    const handleOnClick = useCallback(
        (e) => {
            if (onClick) onClick(e);
        },
        [onClick],
    );

    const rootClassName = classnames(
        classes.root,
        {
            [classes.isReadOnly]: isReadOnly,
            [classes.focused]: focused,
            [classes.errored]: error,
            [classes.vertical]: isVertical,
            [classes.isFullWidth]: isFullWidth,
        },
        classNameProp,
    );

    const onInputChange = useCallback(
        (value, input) => {
            let newInputs = [...inputs];
            newInputs[input.id] = {
                ...newInputs[input.id],
                value,
            };
            if (onChange) onChange(newInputs);
        },
        [inputs, onChange],
    );

    const renderInput = useCallback(
        (input, key) => {
            let inputWithProps = React.cloneElement(input.input, {
                error,
                isRequired,
                isReadOnly,
                key,
                value: input.value,
                onChange: (value) => onInputChange(value, input),
                onFocus: onInputFocus,
                onBlur: onInputBlur,
                onClick: handleOnClick,
                ...(input.input.props || {}),
            });
            return inputWithProps;
        },
        [isRequired, isReadOnly, error, onInputChange, onInputFocus, onInputBlur, handleOnClick],
    );

    const renderInputs = useCallback(() => {
        if (inputs) {
            let renderedInputs = [];
            if (showMore && !mustShow) {
                let inputsToRender = inputs.filter((input) => !input.hidden && input.show);
                renderedInputs = inputsToRender.map((input, idx) => renderInput(input, idx));
                let showMoreElement = (
                    <div
                        key="showMore"
                        onClick={onShowMoreClick}
                        className={classnames(classes.showMore, {
                            [classes.isFullWidth]: isFullWidth,
                        })}
                    >
                        <span className={classes.showMoreIcon}>+</span> {showMoreLabel}
                    </div>
                );
                if (renderedInputs.length < inputs.filter((input) => !input.hidden).length) {
                    renderedInputs.push(showMoreElement);
                }
            } else {
                let inputsToRender = inputs.filter((input) => !input.hidden);
                renderedInputs = inputsToRender.map((input, idx) => renderInput(input, idx));
            }
            return renderedInputs;
        } else if (children) {
            return React.cloneElement(children, {
                error,
                isRequired,
                isReadOnly,
                onFocus: onInputFocus,
                onBlur: onInputBlur,
                onClick: handleOnClick,
            });
        }
    }, [
        classes,
        children,
        error,
        inputs,
        showMore,
        mustShow,
        renderInput,
        onShowMoreClick,
        showMoreLabel,
        isFullWidth,
        isReadOnly,
        isRequired,
        onInputFocus,
        onInputBlur,
        handleOnClick,
    ]);

    return (
        <div className={rootClassName} {...override.root}>
            {label && (
                <div className={classes.formControl} {...override.formControl}>
                    <Text className={classes.Label} {...override.label}>
                        {label}
                        {isRequired && '*'}
                    </Text>
                </div>
            )}
            <div
                className={classnames(classes.inputsContainer, {
                    [classes.horizontal]: labelMode === 'horizontal',
                })}
                {...override.inputsContainer}
            >
                <div className={classes.inputs} {...override.inputs}>
                    {renderInputs()}
                </div>
                {hint && (
                    <div className={classes.formControl} {...override.formControl}>
                        <Text
                            className={classnames(classes.error, { [classes.errored]: !!error })}
                            {...override.error}
                        >
                            {error || hint}
                        </Text>
                    </div>
                )}
            </div>
        </div>
    );
}

InputGroup.overrides = [
    'root',
    'formControl',
    'label',
    'error',
    'inputsContainer',
    'inputs',
    'field',
];

InputGroup.defaultProps = {
    labelMode: 'horizontal',
    onChange: () => {},
    overrides: {},
    showMoreLabel: 'Show more',
};

InputGroup.propTypes = {
    /** Children to be rendered within the input group. Can be a single input component or multiple components. */
    children: PropTypes.node,
    /** Object with custom styles classes. Allows for custom styling of the component beyond the default theme. */
    classes: PropTypes.object,
    /** Override component styles with a custom class. Useful for applying global styles to the component. */
    className: PropTypes.string,
    /** Array of input objects to be rendered in the group. Each object should have id, input, and optional value, show, and hidden properties. */
    inputs: PropTypes.arrayOf(
        PropTypes.shape({
            /** Unique identifier for the input. Required for tracking inputs in the group. */
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            /** React component to render. This should be a form control component. */
            input: PropTypes.node.isRequired,
            /** Current value of the input. Will be controlled by the InputGroup. */
            value: PropTypes.any,
            /** If true, the input will be shown when using progressive disclosure (showMore). */
            show: PropTypes.bool,
            /** If true, the input will not be rendered at all. */
            hidden: PropTypes.bool,
        }),
    ),
    /** Enables the "show more" functionality for progressive disclosure. When true, only inputs with show:true will be visible initially. */
    showMore: PropTypes.bool,
    /** Label for the "show more" button. Used when showMore is true. */
    showMoreLabel: PropTypes.string,
    /** Label for the input group. Displayed above or beside the inputs depending on labelMode. */
    label: PropTypes.string,
    /** Defines label position: 'horizontal' (label beside inputs) or 'vertical' (label above inputs). */
    labelMode: PropTypes.oneOf(['horizontal', 'vertical']),
    /** Error text to display below the input group. When provided, the group will be styled to indicate an error state. */
    error: PropTypes.string,
    /** Hint text to display below the input group when there's no error. Provides additional context to the user. */
    hint: PropTypes.string,
    /** Indicates that the group is required in a form. Displays an asterisk next to the label. */
    isRequired: PropTypes.bool,
    /** Makes the input group read-only. Prevents interaction with all inputs in the group. */
    isReadOnly: PropTypes.bool,
    /** Makes the component take up the full width of its container. Useful for responsive layouts. */
    isFullWidth: PropTypes.bool,
    /** Handler for when inputs change. Called with the updated inputs array. */
    onChange: PropTypes.func,
    /** Handler for when "show more" is clicked. Use to perform additional actions when expanding inputs. */
    onShowMore: PropTypes.func,
    /** Handler for when the input group is clicked. Triggered on all click events within the group. */
    onClick: PropTypes.func,
    /** Handler for when the input group gains focus. Called when any input in the group receives focus. */
    onFocus: PropTypes.func,
    /** Handler for when the input group loses focus. Called when focus leaves any input in the group. */
    onBlur: PropTypes.func,
    /** Renders inputs in a vertical layout instead of the default horizontal layout. */
    isVertical: PropTypes.bool,
    /** Object with custom styles for overriding the component appearance. Allows for deeper customization than classes. */
    overrides: PropTypes.shape({
        /** Styles applied to the root element. */
        root: PropTypes.object,
        /** Styles applied to the form control wrapper. */
        formControl: PropTypes.object,
        /** Styles applied to the label element. */
        label: PropTypes.object,
        /** Styles applied to the inputs container. */
        inputsContainer: PropTypes.object,
        /** Styles applied to the inputs wrapper. */
        inputs: PropTypes.object,
        /** Styles applied to the error text. */
        error: PropTypes.object,
    }),
};

export default React.memo(InputGroup);
