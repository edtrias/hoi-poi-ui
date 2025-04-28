import React, { useRef, useCallback, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Flatpickr from 'react-flatpickr';
import flatpickr from 'flatpickr';
import flatpickrl10n from 'flatpickr/dist/l10n';

import { getOverrides, useClasses } from '../../../utils/overrides';
import Input from '../Input';
import Icon from '../../general/Icon';

import { createUseStyles } from '../../../utils/styles';
import styles from './styles';
const useStyles = createUseStyles(styles, 'DatePicker');

// Old browser and Safari fix fix
(() => {
    if (document.getElementById('flatpickr')) return;
    const styleTag = document.createElement('style');
    styleTag.id = 'flatpickr';
    const headTag = document.getElementsByTagName('head')[0];
    headTag.insertBefore(styleTag, headTag.childNodes[0]);
})();

function DatePicker({
    children,
    classes: classesProp,
    overrides: overridesProp,
    className: classNameProp,
    name,
    formatDate,
    isFullWidth,
    minDate,
    maxDate,
    customComponent,
    labelMode = 'vertical',
    outputType = 'object',
    onChange = () => {},
    value = '',
    dateFormat = '',
    lang = 'en',
    isReadOnly = false,
    calendarButtonLabel = 'Today',
    placeholder = 'Select date',
    ...props
}) {
    const flatpickrRef = useRef();
    const todayButtonRef = useRef();
    const classes = useClasses(useStyles, classesProp);

    // Overrides
    const override = getOverrides(overridesProp, DatePicker.overrides);

    // Classes
    const rootClassName = classnames(
        classes.root,
        {
            [classes.isFullWidth]: isFullWidth,
        },
        classNameProp,
    );

    const flatpickrOptions = useMemo(() => {
        return {
            dateFormat: dateFormat || 'd M Y',
            formatDate,
            locale: flatpickrl10n[lang],
            clickOpens: !isReadOnly,
            time_24hr: true,
            minDate,
            maxDate,
            disableMobile: true,
            ...override.flatpickrOptions,
        };
    }, [dateFormat, formatDate, isReadOnly, lang, maxDate, minDate, override.flatpickrOptions]);

    const onChangeDate = useCallback(
        (date) => {
            if (isReadOnly) return;
            const formattedDate =
                outputType === 'string'
                    ? flatpickr.formatDate(date[0], flatpickrOptions.dateFormat)
                    : date[0];
            onChange && onChange(formattedDate, name);
        },
        [flatpickrOptions.dateFormat, isReadOnly, name, onChange, outputType],
    );

    // Remove handler
    const onInputChange = useCallback(() => {
        if (isReadOnly) return;
        onChange && onChange(undefined, name);
    }, [isReadOnly, name, onChange]);

    const shouldDisableToday = useMemo(() => {
        if (minDate || maxDate) {
            const today = new Date();
            if (minDate && minDate.getTime() > today.getTime()) return true;
            if (maxDate && maxDate.getTime() < today.getTime()) return true;
        }
        return false;
    }, [minDate, maxDate]);

    const todayClicked = useCallback(() => {
        if (shouldDisableToday) return;
        const today = new Date(new Date().setHours(0, 0, 0, 0));
        onChangeDate([today]);
        flatpickrRef.current.flatpickr.close();
    }, [onChangeDate, shouldDisableToday]);

    const onReady = useCallback(
        (_, __, fp) => {
            fp.calendarContainer.classList.add(classes.container);
            if (fp.rContainer) {
                const div = document.createElement('div');
                const classNames = [classes.todayContainer];
                if (shouldDisableToday) classNames.push(classes.todayContainerDisabled);
                div.className = classNames.join(' ');
                div.addEventListener('click', todayClicked);
                div.innerHTML = calendarButtonLabel;
                todayButtonRef.current = {
                    element: div,
                    function: todayClicked,
                };
                fp.rContainer.appendChild(div);
            }
        },
        [
            classes.container,
            classes.todayContainer,
            classes.todayContainerDisabled,
            shouldDisableToday,
            todayClicked,
            calendarButtonLabel,
        ],
    );

    useEffect(() => {
        if (todayButtonRef.current) {
            todayButtonRef.current.element.removeEventListener(
                'click',
                todayButtonRef.current.function,
            );
            todayButtonRef.current.element.addEventListener('click', todayClicked);
            todayButtonRef.current.function = todayClicked;
        }
    }, [classes.todayContainer, classes.todayContainerDisabled, todayClicked]);

    useEffect(() => {
        if (todayButtonRef.current) {
            const classNames = [classes.todayContainer];
            if (shouldDisableToday) classNames.push(classes.todayContainerDisabled);
            todayButtonRef.current.element.className = classNames.join(' ');
        }
    }, [classes.todayContainer, classes.todayContainerDisabled, shouldDisableToday]);

    const onClick = useCallback((e) => {
        setTimeout(() => flatpickrRef.current.flatpickr.open());
    }, []);

    const inputOverride = useMemo(
        () => ({
            formControl: {
                onClick: !isReadOnly ? onClick : undefined,
            },
        }),
        [isReadOnly, onClick],
    );

    const flatpickrRender = useCallback(
        ({ className, value }, ref) => {
            const formatValue =
                value && outputType === 'object'
                    ? formatDate
                        ? formatDate(value, flatpickrOptions.dateFormat)
                        : flatpickr.formatDate(value, flatpickrOptions.dateFormat)
                    : value;
            if (customComponent) {
                const CustomComponent = customComponent;
                return (
                    <CustomComponent
                        {...props}
                        inputRef={ref}
                        value={formatValue}
                        className={className}
                        onClick={onClick}
                    />
                );
            }
            return (
                <Input
                    {...props}
                    value={formatValue}
                    className={className}
                    isReadOnly={isReadOnly}
                    isFullWidth={isFullWidth}
                    onChange={onInputChange}
                    overrides={{ input: { ref }, ...inputOverride }}
                    placeholder={placeholder}
                    postComponent={
                        !isReadOnly && (
                            <div className={classes.calendarIcon} onClick={onClick}>
                                <Icon name="calendar" color="currentColor" />
                            </div>
                        )
                    }
                />
            );
        },
        [
            classes.calendarIcon,
            flatpickrOptions.dateFormat,
            formatDate,
            inputOverride,
            isFullWidth,
            isReadOnly,
            onClick,
            onInputChange,
            outputType,
            placeholder,
            props,
            customComponent,
        ],
    );

    const key = `flatpickr-${name || 'anon'}--${isReadOnly ? 'read-only' : 'active'}`;

    return (
        <Flatpickr
            className={rootClassName}
            ref={flatpickrRef}
            key={key}
            options={flatpickrOptions}
            render={flatpickrRender}
            overrides={overridesProp}
            value={value}
            onReady={onReady}
            onChange={onChangeDate}
            {...override.flatpickr}
        />
    );
}

DatePicker.overrides = ['root', 'input', 'flatpickr', 'flatpickrOptions'];

DatePicker.propTypes = {
    /** Custom className for styling purposes */
    className: PropTypes.string,
    /** Object with custom style overrides for inner elements */
    overrides: PropTypes.object,
    /** Function called when date selection changes with selected date as parameter */
    onChange: PropTypes.func,
    /** Function called when the input receives focus */
    onFocus: PropTypes.func,
    /** Function called when the input loses focus */
    onBlur: PropTypes.func,
    /** Function called when Enter key is pressed while input is focused */
    onEnter: PropTypes.func,
    /** HTML id attribute assigned to the input element */
    id: PropTypes.string,
    /** HTML name attribute assigned to the input element */
    name: PropTypes.string,
    /** Current selected date (can be Date object, ISO string, or formatted string) */
    value: PropTypes.any,
    /** Text to be displayed as the input's label */
    label: PropTypes.string,
    /** Determines how the label is positioned relative to the input */
    labelMode: PropTypes.oneOf(['horizontal', 'vertical']),
    /** When true, component will take up 100% of the available width */
    isFullWidth: PropTypes.bool,
    /** Tooltip text displayed in an info icon next to the label */
    hint: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    /** Error message displayed below the component, also triggers error styling when present */
    error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    /** Informational message displayed below the component */
    info: PropTypes.string,
    /** When true, displays an asterisk next to the label indicating the field is required */
    isRequired: PropTypes.bool,
    /** When true, prevents user from changing the input value */
    isReadOnly: PropTypes.bool,
    /** Determines the format of the onChange callback value ('object' returns Date object, 'string' returns formatted string) */
    outputType: PropTypes.oneOf(['object', 'string']),
    /** Text displayed when no date is selected */
    placeholder: PropTypes.string,
    /** Language code used for localization (e.g., 'en', 'es', 'fr') */
    lang: PropTypes.string,
    /** Date format string using flatpickr's tokens (e.g., 'Y-m-d' for YYYY-MM-DD) */
    dateFormat: PropTypes.string,
    /** Custom function to format displayed date (receives Date object and format string) */
    formatDate: PropTypes.func,
    /** Custom text for the "Today" button in calendar */
    calendarButtonLabel: PropTypes.string,
    /** Earliest selectable date */
    minDate: PropTypes.instanceOf(Date),
    /** Latest selectable date */
    maxDate: PropTypes.instanceOf(Date),
    /** Custom component to replace the default input element */
    customComponent: PropTypes.elementType,
};

export default React.memo(DatePicker);
