import React, { forwardRef, memo, useState, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { getOverrides, useClasses } from '../../../utils/overrides';
import Icon from '../../general/Icon';
import InputWrapper from '../components/InputWrapper';

import { createUseStyles } from '../../../utils/styles';
import styles from './styles';
const useStyles = createUseStyles(styles, 'Input');

const directionKeys = ['ArrowLeft', 'ArrowUp', 'ArrowRight', 'ArrowDown'];
const deleteKeys = ['Backspace', 'Delete'];
const integerRegEx = /^[+-]$|^[-+]?\d+$/;
const decimalRegEx = /^[+-]$|^[+-]?\d+[,.]?\d*$/;

const types = {
    integer: 'text',
    decimal: 'text',
    title: 'text',
};

const Input = forwardRef(
    (
        {
            children,
            classes: classesProp,
            overrides: overridesProp,
            className: classNameProp,
            onCopy,
            onFocus,
            onBlur,
            onEnter,
            id,
            name,
            placeholder,
            error,
            isFullWidth,
            preComponent,
            postComponent,
            component,
            label,
            isRequired,
            labelMode = 'vertical',
            type = 'text',
            onChange = () => {},
            value = '',
            isReadOnly = false,
            isCopyable = false,
            hideClear = false,
            numberDecimals = 2,
            ...props
        },
        ref,
    ) => {
        const [focused, setFocused] = useState(false);
        const classes = useClasses(useStyles, classesProp);
        const override = getOverrides(overridesProp, Input.overrides);

        const rootClassName = classnames(
            classes.root,
            {
                [classes.isReadOnly]: isReadOnly,
                [classes.isReadAndDuplicable]: isCopyable && isReadOnly,
                [classes.focused]: focused,
                [classes.error]: error,
                [classes.custom]: component,
                [classes.title]: type === 'title',
                [classes.isFullWidth]: isFullWidth,
            },
            classNameProp,
        );

        const handleOnFocus = useCallback(
            (e) => {
                if (isReadOnly) return;
                setFocused(true);
                const finalValue = e.target.value || '';
                onFocus && onFocus(finalValue, e);
            },
            [onFocus, isReadOnly],
        );

        const handleOnBlur = useCallback(
            (e) => {
                if (isReadOnly) return;
                if (type === 'integer' && e?.target?.value) {
                    if (!integerRegEx.test(e.target.value) || isNaN(parseInt(e.target.value, 10))) {
                        e.target.value = '';
                    }
                }

                if (type === 'decimal' && e?.target?.value) {
                    if (!decimalRegEx.test(e.target.value) || isNaN(parseFloat(e.target.value))) {
                        e.target.value = '';
                    } else {
                        const hasComa = e.target.value.includes(',');

                        let newValue = parseFloat(e.target.value.replace(',', '.')).toFixed(
                            numberDecimals,
                        );

                        if (hasComa) newValue = newValue.toString().replace('.', ',');
                        e.target.value = newValue;
                    }
                }
                setFocused(false);
                const finalValue = e?.target?.value || '';
                onBlur && onBlur(finalValue, e);
            },
            [isReadOnly, onBlur, type, numberDecimals],
        );

        const handleOnKeyDown = useCallback(
            (e) => {
                if (e.key === 'Enter') {
                    const finalValue = e.target.value || '';
                    onEnter && onEnter(finalValue, e);
                }

                if (
                    (e.key === 'v' && e.ctrlKey) ||
                    (e.key === 'c' && e.ctrlKey) ||
                    (e.key === 'x' && e.ctrlKey) ||
                    e.key === 'Tab'
                ) {
                    return;
                }

                const newValue = `${e.target.value}${e.key}`;

                if (type === 'integer') {
                    if (directionKeys.includes(e.key)) return;
                    else if (deleteKeys.includes(e.key)) return;
                    else if (integerRegEx.test(newValue)) return;
                    else {
                        e.preventDefault();
                        return;
                    }
                }

                if (type === 'decimal') {
                    if (directionKeys.includes(e.key)) return;
                    else if (deleteKeys.includes(e.key)) return;
                    else if (decimalRegEx.test(newValue)) return;
                    else {
                        e.preventDefault();
                        return;
                    }
                }
            },
            [onEnter, type],
        );

        const handleOnKeyUp = useCallback((e) => {
            if (e.key === 'x' && e.ctrlKey) {
                e.target.value = '';
            }
        }, []);

        const handleOnChange = useCallback(
            (e, action) => {
                const finalValue = e?.target?.value || '';
                onChange && onChange(finalValue, e, { action });
            },
            [onChange],
        );

        let inputProps = useMemo(() => {
            return {
                id,
                name,
                className: classes.input,
                type: types[type] || type,
                placeholder: isReadOnly ? null : placeholder,
                value: value,
                onChange: isReadOnly ? undefined : handleOnChange,
                onFocus: handleOnFocus,
                onBlur: handleOnBlur,
                onKeyDown: handleOnKeyDown,
                onKeyUp: handleOnKeyUp,
                ref,
                ...props,
                ...override.input,
            };
        }, [
            props,
            id,
            name,
            classes.input,
            type,
            placeholder,
            value,
            isReadOnly,
            handleOnChange,
            handleOnFocus,
            handleOnBlur,
            handleOnKeyDown,
            handleOnKeyUp,
            ref,
            override.input,
        ]);

        if (component) {
            inputProps.isReadOnly = isReadOnly;
            if (isFullWidth) inputProps.isFullWidth = isFullWidth;
        } else inputProps.readOnly = isReadOnly;

        // Remove content post component
        const postComponentClick = useCallback(() => {
            handleOnChange(null, 'clear');
        }, [handleOnChange]);

        const copyValue = useCallback(() => {
            const textField = document.createElement('textarea');
            textField.innerText = value;
            document.body.appendChild(textField);
            textField.select();
            document.execCommand('copy');
            textField.remove();
            onCopy && onCopy();
        }, [onCopy, value]);

        const compIsReadOnly = useMemo(() => <Icon name="lockOutline" size="medium" />, []);

        const compIsCopyable = useMemo(
            () => <Icon name="contentCopy" onClick={copyValue} />,
            [copyValue],
        );

        const shouldSeparate = isCopyable || isReadOnly || postComponent;

        let newPostComponent = useMemo(() => {
            let postComponentsArray = [];
            if (value && !isReadOnly && !hideClear) {
                postComponentsArray.push(
                    <div
                        key="close"
                        className={`${classes.postComponentClose} ${classes.isClickable} ${classes.clear}`}
                        {...override.postComponentClose}
                    >
                        <Icon
                            name={type === 'title' ? 'close' : 'closeSmall'}
                            size="large"
                            onClick={postComponentClick}
                        />
                        {shouldSeparate && (
                            <div className={classes.clearSeparator} {...override.clearSeparator} />
                        )}
                    </div>,
                );
            }

            if (isCopyable) {
                postComponentsArray.push(
                    <div
                        key="copy"
                        className={`${classes.postComponentCopy}`}
                        {...override.postComponentCopy}
                    >
                        {compIsCopyable}
                    </div>,
                );
            }

            if (isReadOnly) {
                postComponentsArray.push(
                    <div
                        key="readOnly"
                        className={classes.postComponentReadOnly}
                        {...override.postComponentReadOnly}
                    >
                        {compIsReadOnly}
                    </div>,
                );
            }

            if (postComponent) {
                postComponentsArray.push(
                    <div
                        key="custom"
                        className={`${classes.customPostComponent}`}
                        {...override.customPostComponent}
                    >
                        {postComponent}
                    </div>,
                );
            }
            return postComponentsArray;
        }, [
            value,
            isReadOnly,
            hideClear,
            isCopyable,
            postComponent,
            classes.postComponentClose,
            classes.isClickable,
            classes.clear,
            classes.clearSeparator,
            classes.postComponentCopy,
            classes.postComponentReadOnly,
            classes.customPostComponent,
            override.postComponentClose,
            override.clearSeparator,
            override.postComponentCopy,
            override.postComponentReadOnly,
            override.customPostComponent,
            type,
            postComponentClick,
            shouldSeparate,
            compIsCopyable,
            compIsReadOnly,
        ]);

        const Component = component;

        return (
            <InputWrapper
                {...props}
                label={label}
                labelMode={labelMode}
                error={error}
                className={rootClassName}
                overrides={overridesProp}
                isFullWidth={isFullWidth}
                isRequired={isRequired}
            >
                <div className={classes.inputComponents} {...override.inputComponents}>
                    {preComponent && (
                        <div className={classes.preComponent} {...override.preComponent}>
                            {preComponent}
                        </div>
                    )}
                    {!component && <input {...inputProps} />}
                    {component && <Component {...inputProps} />}
                    {newPostComponent.length > 0 && (
                        <div className={classes.postComponent} {...override.postComponent}>
                            {newPostComponent}
                        </div>
                    )}
                </div>
            </InputWrapper>
        );
    },
);

Input.overrides = ['root', 'input', 'preComponent', 'postComponent', 'inputComponents'];

Input.propTypes = {
    /** Custom className for styling purposes */
    className: PropTypes.string,
    /** Object with custom style overrides for inner elements */
    overrides: PropTypes.object,
    /** Text to be displayed as the input's label */
    label: PropTypes.string,
    /** Determines how the label is positioned relative to the input */
    labelMode: PropTypes.oneOf(['horizontal', 'vertical']),
    /** When true, input will take up 100% of the available width */
    isFullWidth: PropTypes.bool,
    /** Tooltip text displayed in an info icon next to the label */
    hint: PropTypes.string,
    /** Error message displayed below the input, also triggers error styling when present */
    error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    /** Informational message displayed below the input */
    info: PropTypes.string,
    /** When true, displays an asterisk next to the label indicating the field is required */
    isRequired: PropTypes.bool,
    /** Function called when input value changes with the new value as parameter */
    onChange: PropTypes.func,
    /** Function called when input receives focus */
    onFocus: PropTypes.func,
    /** Function called when input loses focus */
    onBlur: PropTypes.func,
    /** Function called when Enter key is pressed while input is focused */
    onEnter: PropTypes.func,
    /** HTML id attribute assigned to the input element */
    id: PropTypes.string,
    /** HTML name attribute assigned to the input element */
    name: PropTypes.string,
    /** HTML input type (text, password, etc.) or component-specific types (title, integer, decimal) */
    type: PropTypes.string,
    /** Current value of the input */
    value: PropTypes.any,
    /** Text displayed when the input is empty */
    placeholder: PropTypes.string,
    /** Number of decimal places to allow/display for decimal type inputs */
    numberDecimals: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    /** Function called when the copy button is clicked */
    onCopy: PropTypes.func,
    /** When true, prevents user from editing the input */
    isReadOnly: PropTypes.bool,
    /** When true, displays a copy button to copy the input's content */
    isCopyable: PropTypes.bool,
    /** When true, hides the clear button for clearing the input */
    hideClear: PropTypes.bool,
    /** Function to access the input's DOM reference */
    ref: PropTypes.func,
    /** Component rendered at the beginning of the input field */
    preComponent: PropTypes.any,
    /** Component rendered at the end of the input field */
    postComponent: PropTypes.any,
    /** Custom component to replace the default input element */
    component: PropTypes.any,
};

export default memo(Input);
