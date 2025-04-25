import React, { useMemo, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { getOverrides, useClasses } from '../../../utils/overrides';
import { createUseStyles, useTheme } from '../../../utils/styles';

import Select from '../../forms/Select';

import styles from './styles';
const useStyles = createUseStyles(styles, 'SearchBar');

function SearchBar({
    classes: classesProp,
    children,
    overrides: overridesProp,
    className: classNameProp,
    loadOptions,
    onChangeType,
    typeOptions,
    type,
    inputValue,
    onBlurSearch,
    useAsSimpleSearch,
    hideDropdownIndicator,
    isMulti,
    customOption,
    customTypeOption,
    keepInputValueOnBlur = true,
    forceBlurOnEnter = true,
    allowMultipleTypes = false,
    selectedTypesLiteral = '%@ Selected',
    selectedTypesPlaceholder = 'Selected...',
    hideSelectedOptions = false,
    shouldSetValueOnChange = false,
    focusDefaultOption = true,
    ...props
}) {
    const theme = useTheme();
    const classes = useClasses(useStyles, classesProp);
    const actionsControlRef = useRef([]);

    const defaultOverrides = useMemo(
        () => ({
            Select: {
                overrides: {
                    control: {
                        style: {
                            backgroundColor: theme.colors.transparent,
                            borderRadius: 0,
                            borderColor: `${theme.colors.transparent} ${theme.colors.transparent} ${theme.colors.grey[800]} !important`,
                        },
                    },
                    controlFocused: {
                        style: {
                            backgroundColor: theme.colors.actionMinor[50],
                        },
                    },
                    placeholder: {
                        style: {
                            color: theme.colors.grey[800],
                        },
                    },
                },
            },
        }),
        [],
    );

    // Overrides
    const override = getOverrides({ ...defaultOverrides, ...overridesProp }, SearchBar.overrides);

    // Classes
    const rootClassName = classnames(classes.root, classNameProp);

    const rootProps = {
        ...props,
        className: rootClassName,
    };

    const TypeSelector = useMemo(() => {
        if (!onChangeType) return null;
        const typeClassname = classnames(classes.typeSelector, {
            [classes.typeSelectorWithValue]: !!type && !allowMultipleTypes,
        });
        return (
            <>
                <div className={classes.typeDivider} {...override.typeDivider} />
                <Select
                    className={typeClassname}
                    onChange={onChangeType}
                    options={typeOptions}
                    value={type}
                    onlyText
                    size={props.size}
                    dropdownWidth="250px"
                    isSearchable={false}
                    isMulti={allowMultipleTypes}
                    customOption={customTypeOption}
                    showNumSelected={allowMultipleTypes}
                    numSelectedLiteral={selectedTypesLiteral}
                    placeholder={selectedTypesPlaceholder}
                    autoComplete="nope" // must be an invalid value
                    role="representation"
                    classes={{
                        inputComponents: classes.typeSelectorInput,
                        singleValue: classes.typeSingleValue,
                        small: classes.typeSmall,
                    }}
                    {...override.TypeSelector}
                />
            </>
        );
    }, [
        onChangeType,
        classes.typeSelector,
        classes.typeSelectorWithValue,
        classes.typeDivider,
        classes.typeSelectorInput,
        classes.typeSingleValue,
        classes.typeSmall,
        type,
        allowMultipleTypes,
        override.typeDivider,
        override.TypeSelector,
        typeOptions,
        props.size,
        customTypeOption,
        selectedTypesLiteral,
        selectedTypesPlaceholder,
    ]);

    // handleOnBlurSearch can be triggered in two differen scenarios
    // those scenarios are on blur through onInputCange and on press enter via onKeyDown
    const handleOnBlurSearch = useCallback(
        (value, action) => {
            if (action.action && typeof action.action === 'string') {
                actionsControlRef.current.push(action.action);
                setTimeout(() => {
                    if (action.action === 'input-blur') {
                        if (!actionsControlRef.current.includes('set-value')) {
                            onBlurSearch && onBlurSearch(value);
                        }
                        actionsControlRef.current = [];
                    }
                });
            }
        },
        [onBlurSearch],
    );

    return (
        <div {...rootProps} {...override.root}>
            <Select
                loadOptions={loadOptions}
                isFuzzy
                afterControl={TypeSelector}
                isFullWidth
                keepInputValueOnBlur={keepInputValueOnBlur || useAsSimpleSearch}
                forceBlurOnEnter={forceBlurOnEnter}
                useAsSimpleSearch={useAsSimpleSearch}
                hideDropdownIndicator={hideDropdownIndicator}
                onBlurSearch={handleOnBlurSearch}
                isMulti={isMulti}
                customOption={customOption}
                inputValue={inputValue}
                hideSelectedOptions={hideSelectedOptions}
                shouldSetValueOnChange={isMulti ? true : shouldSetValueOnChange}
                focusDefaultOption={focusDefaultOption}
                withoutFilter
                autoComplete="nope" // must be an invalid value
                role="representation"
                {...override.Select}
                {...props}
            />
        </div>
    );
}

SearchBar.overrides = ['root', 'typeDivider', 'TypeSelector', 'Select'];

SearchBar.propTypes = {
    /** Custom CSS class for styling */
    className: PropTypes.string,
    /** Object with custom style overrides */
    overrides: PropTypes.object,
    /** Callback function triggered when the type selector value changes */
    onChangeType: PropTypes.func,
    /** Allow multiple types selection */
    allowMultipleTypes: PropTypes.bool,
    /** Text format for displaying selected types count (e.g., "3 Selected") */
    selectedTypesLiteral: PropTypes.string,
    /** Placeholder text for type selector when multiple types are allowed */
    selectedTypesPlaceholder: PropTypes.string,
    /** Array of options for the type selector */
    typeOptions: PropTypes.arrayOf(
        PropTypes.shape({
            /** Display text for the option */
            label: PropTypes.string,
            /** Value of the option */
            value: PropTypes.any,
            /** When true, the option cannot be selected */
            isDisabled: PropTypes.bool,
            /** URL for an image to display with the option */
            src: PropTypes.string,
            /** Custom icon element to display with the option */
            icon: PropTypes.element,
            /** Icon type name for using a predefined icon */
            iconType: PropTypes.string,
            /** Secondary text displayed below the main label */
            subLabel: PropTypes.string,
        }),
    ),
    /** Currently selected type or types */
    type: PropTypes.any,
    /** Current value for the search input */
    inputValue: PropTypes.string,
    /** When true, maintains the input value after the field loses focus */
    keepInputValueOnBlur: PropTypes.bool,
    /** When true, blurs the input when Enter key is pressed */
    forceBlurOnEnter: PropTypes.bool,
    /** Callback function triggered when the search field loses focus */
    onBlurSearch: PropTypes.func,
    /** It allows using the Select as a simple input for search uses */
    useAsSimpleSearch: PropTypes.bool,
    /** When true, hides the dropdown arrow indicator */
    hideDropdownIndicator: PropTypes.bool,
    /** When true, allows multiple selections */
    isMulti: PropTypes.bool,
    /** Function to customize the option row */
    customOption: PropTypes.func,
    /** Function to customize the option row in the optionType selector */
    customTypeOption: PropTypes.func,
    /** When true, already selected options won't appear in the dropdown */
    hideSelectedOptions: PropTypes.bool,
    /** If false, the selected value won't be set as selected. Useful if your goal is just to pick an option without showing it on the input */
    shouldSetValueOnChange: PropTypes.bool,
    /** Enable/disable focusing first option of the select */
    focusDefaultOption: PropTypes.bool,
    /** Function that returns options based on the search text */
    loadOptions: PropTypes.func,
};

export default React.memo(SearchBar);
