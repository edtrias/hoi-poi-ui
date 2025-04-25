import React, { memo, useState, useCallback, useMemo, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { getOverrides, useClasses } from '../../../utils/overrides';
import { createFilter, filterKeyValue } from './utils'; // Local utils
import InputWrapper from '../components/InputWrapper';
import { default as RSelect } from 'react-select';
import AsyncSelect from 'react-select/async';

import Input from './components/Input';
import Control from './components/Control';
import DropdownIndicator from './components/DropdownIndicator';
import ClearIndicator from './components/ClearIndicator';
import LockIndicator from './components/LockIndicator';
import CustomIndicator from './components/CustomIndicator';
import SingleValue from './components/SingleValue';
import MultiValueLabel from './components/MultiValueLabel';
import MultiValueRemove from './components/MultiValueRemove';
import LoadingIndicator from './components/LoadingIndicator';
import Menu from './components/Menu';
import MenuList from './components/MenuList';
import MenuSingle from './components/MenuSingle';
import MenuMulti from './components/MenuMulti';
import Group from './components/Group';
import GroupHeading from './components/GroupHeading';
import Option from './components/Option';
import ValueContainer from './components/ValueContainer';
import { isEqual } from '../../../utils/arrays';

import { createUseStyles, useTheme } from '../../../utils/styles';
import styles from './styles';

const useStyles = createUseStyles(styles, 'Select');

function groupsAreEqual(options, innerOptions) {
    return options
        .map((group, i) => isEqual(group?.options, innerOptions[i]?.options))
        .reduce((allEqual, el) => allEqual && el, true);
}

const Select = memo(
    ({
        error,
        classes: classesProp,
        overrides: overridesProp,
        className: classNameProp,
        isFullWidth,
        isFuzzy,
        isMulti,
        isRequired,
        placeholder,
        placeholderReadOnly,
        options,
        defaultSearch,
        defaultValue,
        inputValue,
        forceBlurOnEnter,
        keepInputValueOnBlur,
        keepInputFocused,
        keepValueOnInputChange,
        useAsSimpleSearch,
        onBlur,
        onBlurSearch,
        onEnter,
        onKeyDown,
        customFilter,
        loadOptions,
        loadingMessage,
        noOptionsMessage,
        actions,
        onClickAction,
        dropDownIcon,
        clearIcon,
        lockIcon,
        dropdownWidth,
        afterControl,
        beforeControl,
        customOption,
        highlightMatch,
        menuPosition,
        forceMenuIsOpen,
        forceStartFocused,
        getRef,
        getCanChange,
        hideMultivalueChips,
        customOnChange,
        customOnChangeInput,
        menuShouldScrollIntoView,
        isOptionSelected,
        notSelectingDefaultOption,
        selectAllLabel,
        inputProps,
        onChange = () => {},
        value = '',
        isReadOnly = false,
        hideSelectedOptions = true,
        isClearable = true,
        overrides = {},
        hideOptions = false,
        filterByKey = false,
        defaultMenuIsOpen = false,
        size = 'medium',
        onlyText = false,
        isSearchable = true,
        showNumSelected = false,
        numSelectedLiteral = '%@ Selected',
        hideDropdownIndicator = false,
        shouldSetValueOnChange = true,
        cacheOptions = true,
        focusDefaultOption = true,
        withoutFilter = false,
        useMenuPortal = true,
        showMediaInSelectedValues = false,
        keepInputValueOnBlurInMulti = false,
        componentOverride = {},
        alwaysLoadOnFocus = false,
        ...props
    }) => {
        const selectRef = useRef();
        const [focused, setFocused] = useState(forceStartFocused || false);
        const [newValue, setNewValue] = useState(defaultValue || value || null);
        const [newInputValue, setNewInputValue] = useState(inputValue || '');
        const [innerOptions, setInnerOptions] = useState(options || []);
        const [lazyOptions, setLazyOptions] = useState({
            areLoaded: false,
            options: null,
            isLoading: false,
        });
        const [isSelectAllFocused, setIsSelectAllFocused] = useState(false);
        const shouldRenderSelectAll = selectAllLabel && isMulti && !isFuzzy;
        const [isSelectAllWithGroups, setIsSelectAllWithGroups] = useState(
            shouldRenderSelectAll && innerOptions?.[0]?.options,
        );
        const debounce = useRef(null);
        const menuPlacementRef = useRef('bottom');
        const classes = useClasses(useStyles, classesProp);
        const override = getOverrides(overridesProp, Select.overrides);
        const defaultTheme = useTheme();
        const newStyles = styles(defaultTheme);

        const getIsSelectAllWithGroups = useCallback(
            (options) => {
                if (!shouldRenderSelectAll) return;
                setIsSelectAllWithGroups(!!options?.[0]?.options);
            },
            [shouldRenderSelectAll],
        );

        const rootClassName = classnames(
            classes.root,
            {
                [classes.isFullWidth]: isFullWidth,
                [classes.focused]: focused,
                [classes.async]: loadOptions && isFuzzy,
                [classes[size]]: size,
                [classes.onlyText]: onlyText,
            },
            classNameProp,
        );

        const selectClassName = classnames(classes.select, {
            [classes.isMulti]: isMulti,
        });

        useEffect(() => {
            setNewInputValue(inputValue);
        }, [inputValue]);

        useEffect(() => {
            setNewValue(value);
        }, [value]);

        useEffect(() => {
            const optionsAreGrouped = options?.length ? options[0].options : false;

            if (
                !isFuzzy &&
                ((optionsAreGrouped && !groupsAreEqual(options, innerOptions)) ||
                    (!optionsAreGrouped && !isEqual(options, innerOptions)))
            )
                setInnerOptions(options);
        }, [options, innerOptions, isFuzzy]);

        useEffect(() => {
            if (!focusDefaultOption) {
                let select = selectRef.current?.select?.select;
                select ??= selectRef.current?.select; // <-- for multi input
                if (select) select.getNextFocusedOption = () => null;
            }
        });

        const loadOptionsCb = useCallback(
            (text, cb) => {
                if (debounce.current) clearTimeout(debounce.current);
                if (!loadOptions) return cb();
                debounce.current = setTimeout(() => {
                    const loader = loadOptions(text, cb);
                    if (loader && typeof loader.then === 'function') {
                        loader.then(
                            (results) => {
                                setInnerOptions(results);
                                cb(results);
                            },
                            () => cb(),
                        );
                    }
                }, 500);
            },
            [loadOptions],
        );

        const handleOnChange = useCallback(
            (data, action) => {
                if (customOnChange) {
                    customOnChange({
                        value: data,
                        action,
                        setNewValue,
                        setNewInputValue,
                    });
                    return;
                }

                if (getCanChange && !getCanChange(data, action)) return;
                if (shouldSetValueOnChange || shouldRenderSelectAll) setNewValue(data);
                if (!isMulti) setFocused(false);

                onChange && onChange(data, action);

                if (
                    isMulti ||
                    (data && data.value) ||
                    (action?.action && action.action === 'clear' && newInputValue)
                ) {
                    setNewInputValue('');
                }
            },
            [
                isMulti,
                onChange,
                newInputValue,
                shouldSetValueOnChange,
                getCanChange,
                customOnChange,
                shouldRenderSelectAll,
            ],
        );

        const setMenuPlacement = useCallback(
            (e) => {
                const { y } = e.currentTarget.getBoundingClientRect();
                const bodyHeight = document.body.clientHeight;
                let overrideHeight;
                if (
                    override.menuList?.style?.maxHeight &&
                    !isNaN(override.menuList?.style?.maxHeight)
                ) {
                    overrideHeight = override.menuList?.style?.maxHeight;
                }

                const overrideMenu = override?.menu?.style || null;
                const overrideMenuPaddingTop =
                    (!isNaN(parseInt(overrideMenu?.paddingTop, 10)) &&
                        parseInt(overrideMenu?.paddingTop, 10)) ||
                    null;
                const overrideMenuPaddingBottom =
                    (!isNaN(parseInt(overrideMenu?.paddingBottom, 10)) &&
                        parseInt(overrideMenu?.paddingBottom, 10)) ||
                    null;
                const overrideMenuMarginTop =
                    (!isNaN(parseInt(overrideMenu?.marginTop, 10)) &&
                        parseInt(overrideMenu?.marginTop, 10)) ||
                    null;
                const overrideMenuMarginBottom =
                    (!isNaN(parseInt(overrideMenu?.marginBottom, 10)) &&
                        parseInt(overrideMenu?.marginBottom, 10)) ||
                    null;

                const margins =
                    (newStyles.menu.paddingTop || overrideMenuPaddingTop || 4) +
                    (newStyles.menu.paddingBottom || overrideMenuPaddingBottom || 4) +
                    (newStyles.menu.marginTop || overrideMenuMarginTop || 8) +
                    (newStyles.menu.marginBottom || overrideMenuMarginBottom || 8);
                const baseMenuHeight =
                    (overrideHeight || newStyles.menuList.maxHeight || 300) + margins;
                if (bodyHeight - y > baseMenuHeight) menuPlacementRef.current = 'bottom';
                else menuPlacementRef.current = 'top';
            },
            [override, newStyles],
        );

        const handleOnFocus = useCallback(
            (e) => {
                setMenuPlacement(e);
                setFocused(true);
                const searchText = defaultSearch || newInputValue || '';
                if (
                    (loadOptions && !isFuzzy && !lazyOptions.areLoaded) ||
                    (loadOptions && !cacheOptions)
                ) {
                    setLazyOptions((currentOptions) => ({
                        ...currentOptions,
                        isLoading: true,
                    }));
                    loadOptions().then((options) => {
                        getIsSelectAllWithGroups(options);
                        setLazyOptions({
                            areLoaded: true,
                            isLoading: false,
                            options,
                        });
                    });
                } else if (
                    (searchText || newValue?.value || alwaysLoadOnFocus) &&
                    loadOptions &&
                    isFuzzy
                ) {
                    setLazyOptions((currentOptions) => ({
                        ...currentOptions,
                        isLoading: true,
                    }));

                    loadOptions(searchText).then((options) => {
                        setInnerOptions(options);
                        setLazyOptions({
                            areLoaded: true,
                            isLoading: false,
                            options,
                        });
                    });
                }
            },
            [
                setMenuPlacement,
                defaultSearch,
                newInputValue,
                loadOptions,
                isFuzzy,
                lazyOptions.areLoaded,
                cacheOptions,
                newValue?.value,
                alwaysLoadOnFocus,
                getIsSelectAllWithGroups,
            ],
        );

        const handleOnBlur = useCallback(
            (e) => {
                setFocused(false);
                if (
                    (!keepInputValueOnBlur && !keepInputValueOnBlurInMulti) ||
                    (isMulti && !keepInputValueOnBlurInMulti)
                ) {
                    setNewInputValue('');
                }
                if (loadOptions && !cacheOptions) {
                    setInnerOptions([]);
                    setLazyOptions({
                        areLoaded: false,
                        isLoading: false,
                        options: null,
                    });
                }
                onBlur && onBlur(e, value);
            },
            [
                keepInputValueOnBlur,
                isMulti,
                keepInputValueOnBlurInMulti,
                onBlur,
                value,
                loadOptions,
                cacheOptions,
            ],
        );

        const controlStyles = useCallback(
            ({ isFocused }) => {
                let styles = {
                    ...newStyles.control,
                    ...(override.control?.style || {}),
                };

                if (isFocused || (keepInputFocused && newInputValue)) {
                    styles = {
                        ...styles,
                        ...newStyles.controlFocused,
                        ...(override.controlFocused?.style || {}),
                    };
                }
                return styles;
            },
            [newStyles, override, keepInputFocused, newInputValue],
        );

        const optionStyles = useCallback(
            ({ data, isDisabled, isSelected, isFocused }) => {
                let styles = {
                    ...newStyles.option,
                    ...(override.option?.style || {}),
                    ...(override.option?.getStyles?.({
                        data,
                        isDisabled,
                        isFocused,
                        isSelected,
                    }) || {}),
                };

                if (isFocused) {
                    styles = {
                        ...styles,
                        ...newStyles.optionFocused,
                        ...(override.optionFocused?.style || {}),
                        ...(override.option?.getStyles?.({
                            data,
                            isDisabled,
                            isFocused,
                            isSelected,
                        }) || {}),
                    };
                }

                if (isSelected) {
                    styles = {
                        ...styles,
                        ...newStyles.optionSelected,
                        ...(override.optionSelected?.style || {}),
                        ...(override.option?.getStyles?.({
                            data,
                            isDisabled,
                            isFocused,
                            isSelected,
                        }) || {}),
                    };
                }

                if (isDisabled) {
                    styles = {
                        ...styles,
                        ...newStyles.optionDisabled,
                        ...(override.optionDisabled?.style || {}),
                        ...(override.option?.getStyles?.({
                            data,
                            isDisabled,
                            isFocused,
                            isSelected,
                        }) || {}),
                    };
                }

                if (shouldRenderSelectAll) {
                    styles = {
                        ...styles,
                        ...newStyles.optionWithSelectAll,
                        ...(override.optionWithSelectAll?.style || {}),
                        ...(override.option?.getStyles?.({
                            data,
                            isDisabled,
                            isFocused,
                            isSelected,
                        }) || {}),
                    };
                }

                return styles;
            },
            [newStyles, override, shouldRenderSelectAll],
        );

        const valueContainerStyles = useCallback(
            ({ isDisabled }) => {
                let styles = {
                    ...newStyles.valueContainer,
                    ...(override.valueContainer?.style || {}),
                };

                if (isDisabled) {
                    styles = {
                        ...styles,
                        ...newStyles.valueContainerDisabled,
                        ...(override.valueContainerDisabled?.style || {}),
                    };
                }
                return styles;
            },
            [newStyles, override],
        );

        const placeholderStyles = useCallback(
            ({ isDisabled }) => {
                let styles = {
                    ...newStyles.placeholder,
                    ...(override.placeholder?.style || {}),
                };

                if (isDisabled) {
                    styles = {
                        ...newStyles.placeholderDisabled,
                        ...(override.placeholderDisabled?.style || {}),
                    };
                }
                return styles;
            },
            [newStyles, override],
        );

        const multiValueLabelStyles = useCallback(
            ({ data, isDisabled, isFocused, isSelected }) => {
                let styles = {
                    ...newStyles.multiValueLabel,
                    ...(override.multiValueLabel?.style || {}),
                    ...(override.multiValueLabel?.getStyles?.({
                        data,
                        isDisabled,
                        isFocused,
                        isSelected,
                    }) || {}),
                };
                if (isDisabled) {
                    styles = {
                        ...styles,
                        ...newStyles.multiValueLabelDisabled,
                        ...(override.multiValueLabelDisabled?.style || {}),
                        ...(override.multiValueLabelDisabled?.getStyles?.({
                            data,
                            isDisabled,
                            isFocused,
                            isSelected,
                        }) || {}),
                    };
                }

                return styles;
            },
            [newStyles, override],
        );

        const multiValueRemoveStyles = useCallback(
            ({ data, isDisabled, isFocused, isSelected }) => {
                let styles = {
                    ...newStyles.multiValueRemove,
                    ...(override.multiValueRemove?.style || {}),
                    ...(override.multiValueRemove?.getStyles?.({
                        data,
                        isDisabled,
                        isFocused,
                        isSelected,
                    }) || {}),
                };
                if (isDisabled) {
                    styles = {
                        ...styles,
                        ...newStyles.multiValueRemoveDisabled,
                        ...(override.multiValueRemoveDisabled?.style || {}),
                        ...(override.multiValueRemoveDisabled?.getStyles?.({
                            data,
                            isDisabled,
                            isFocused,
                            isSelected,
                        }) || {}),
                    };
                }

                return styles;
            },
            [newStyles, override],
        );

        const menuListStyles = useMemo(
            (props) => {
                let styles = {
                    ...newStyles.menuList,
                    ...(override.menuList?.style || {}),
                };

                return styles;
            },
            [newStyles, override],
        );

        const indicatorSeparatorStyles = useMemo(() => {
            if ((isRequired && !isMulti) || (isMulti && hideMultivalueChips)) {
                return newStyles.indicatorSeparatorHidden;
            } else if (
                !isReadOnly &&
                newValue &&
                ((isMulti && newValue.length > 0) || (!isMulti && newValue))
            ) {
                return newStyles.indicatorSeparator;
            } else return newStyles.indicatorSeparatorHidden;
        }, [isRequired, isMulti, hideMultivalueChips, isReadOnly, newValue, newStyles]);

        const getMatchingCharacters = useCallback(
            (optionLabel) => {
                if (!optionLabel || !newInputValue) return '';
                if (optionLabel.includes(newInputValue)) return newInputValue;
                const optionLowerCase = optionLabel.toLowerCase();
                const searchLowerCase = newInputValue.toLowerCase();
                if (optionLowerCase.includes(searchLowerCase)) {
                    const firstIndex = optionLowerCase.indexOf(searchLowerCase);
                    const lastIndex = firstIndex + searchLowerCase.length;
                    const matchingCharacters = optionLabel.slice(firstIndex, lastIndex);
                    return matchingCharacters;
                }
                return '';
            },
            [newInputValue],
        );

        const getHighlighted = useCallback(
            (option) => {
                if (!highlightMatch) return null;
                const matchingCharacters = getMatchingCharacters(option.label);
                if (!matchingCharacters) return null;
                const replaceable = `<br/>${matchingCharacters}<br/>`;
                const newLabel = option.label;
                const labelReplaced = newLabel.replace(matchingCharacters, replaceable);
                const arr = labelReplaced.split('<br/>').filter((current) => current !== '');

                return (
                    <div
                        className={classes.highlightedContainer}
                        {...override.highlightedContainer}
                    >
                        {arr.map((current) => {
                            if (current === matchingCharacters)
                                return (
                                    <span className={classes.highlighted} {...override.highlighted}>
                                        {matchingCharacters}
                                    </span>
                                );
                            else return current;
                        })}
                    </div>
                );
            },
            [getMatchingCharacters, classes, highlightMatch, override],
        );

        const formatOptionLabel = useCallback(
            (option) => {
                if (customOption) {
                    return customOption(option, getMatchingCharacters);
                } else if (isMulti)
                    return MenuMulti({
                        option,
                        value: newValue,
                        classes,
                        override,
                        getHighlighted,
                    });
                else
                    return MenuSingle({
                        option,
                        classes,
                        override,
                        getHighlighted,
                    });
            },
            [
                isMulti,
                classes,
                override,
                newValue,
                customOption,
                getHighlighted,
                getMatchingCharacters,
            ],
        );

        const formatGroupLabel = useCallback(
            (data) => (
                <div key={data.value} className={classes.groupLabel} {...override.groupLabel}>
                    {data.label}
                </div>
            ),
            [classes, override],
        );

        const onMouseDown = useCallback(
            (e) => {
                if (!focused) {
                    e.preventDefault();
                    e.stopPropagation();
                    selectRef.current.focus();
                    setFocused(true);
                    return false;
                }
            },
            [focused],
        );

        const newIsClearable = useMemo(() => {
            if (isMulti && !hideMultivalueChips) return true;
            if (isRequired || hideMultivalueChips) return false;
            else return isClearable;
        }, [isMulti, hideMultivalueChips, isRequired, isClearable]);

        const handleOnKeyDown = useCallback(
            (e) => {
                if (e.key === 'Enter') {
                    if (notSelectingDefaultOption) e.preventDefault();
                    if (forceBlurOnEnter) {
                        selectRef.current.blur();
                        setFocused(false);
                    }
                    if (keepInputValueOnBlur && (!isMulti || keepInputValueOnBlurInMulti)) {
                        setNewValue(null);
                    }
                    onEnter && onEnter(e);
                } else {
                    setFocused(true);
                }
                onKeyDown && onKeyDown(e);
            },
            [
                onKeyDown,
                notSelectingDefaultOption,
                forceBlurOnEnter,
                keepInputValueOnBlur,
                keepInputValueOnBlurInMulti,
                isMulti,
                onEnter,
            ],
        );

        const handleOnInputChange = useCallback(
            (inputValue, action) => {
                if (customOnChangeInput) {
                    customOnChangeInput({
                        value: newValue,
                        inputValue,
                        action,
                        setNewValue,
                        setNewInputValue,
                    });
                    return;
                }

                if (action.action === 'input-change') {
                    setNewInputValue(inputValue);
                    if (
                        !keepValueOnInputChange &&
                        keepInputValueOnBlur &&
                        (!isMulti || keepInputValueOnBlurInMulti) &&
                        newValue?.value
                    ) {
                        setNewValue(null);
                    }
                } else {
                    //This is exectued everytime blur is executed, including onKeyDown e.key === 'Enter'
                    onBlurSearch && onBlurSearch(newInputValue, action);
                }
            },
            [
                keepValueOnInputChange,
                keepInputValueOnBlur,
                keepInputValueOnBlurInMulti,
                isMulti,
                newValue,
                onBlurSearch,
                newInputValue,
                customOnChangeInput,
            ],
        );

        const onMenuOpen = useCallback(() => {
            setTimeout(() => {
                const selectedEl = document.getElementsByClassName(
                    'hoi-poi-select__option--is-selected',
                )?.[0];
                if (selectedEl) {
                    selectedEl.scrollIntoView({
                        block: 'nearest',
                        inline: 'start',
                    });
                }
            });
        }, []);

        const selectProps = useMemo(() => {
            let menuIsOpen =
                (focused && (!(loadOptions && isFuzzy) || !!innerOptions?.length)) || false;
            if (useAsSimpleSearch) menuIsOpen = false;
            if (forceMenuIsOpen) menuIsOpen = true;
            let Indicator = DropdownIndicator;
            let additionalComponents = {};
            if ((loadOptions && isFuzzy) || useAsSimpleSearch || hideDropdownIndicator)
                Indicator = null;
            if (newInputValue && !newValue && (keepInputValueOnBlur || keepInputValueOnBlurInMulti))
                Indicator = ClearIndicator;
            if (isReadOnly) Indicator = LockIndicator;
            if (dropDownIcon) Indicator = CustomIndicator;
            if (showNumSelected) additionalComponents = { ...additionalComponents, ValueContainer };
            let filterOption = filterByKey ? filterKeyValue : createFilter;
            if (withoutFilter) filterOption = undefined;
            if (customFilter) filterOption = customFilter;

            // We exclude getStyles here because we don't want them to be overriding the getStyles passed via styles.
            const { getStyles, ...overrideOptionNoGetStyle } = override.option;

            return {
                ref: (ref) => {
                    getRef && getRef(ref);
                    selectRef.current = ref;
                },
                className: selectClassName,
                classNamePrefix: 'hoi-poi-select',
                placeholder: isReadOnly ? placeholderReadOnly || null : placeholder,
                options: lazyOptions.options || innerOptions,
                defaultOptions: innerOptions,
                cacheOptions,
                noOptionsMessage,
                loadingMessage,
                defaultValue: newValue,
                value: newValue,
                inputValue: newInputValue,
                defaultMenuIsOpen,
                actions,
                isMulti,
                isDisabled: isReadOnly,
                isClearable: showNumSelected ? false : newIsClearable,
                isSearchable: showNumSelected ? false : isSearchable,
                isLoading: lazyOptions.isLoading,
                autoFocus: focused,
                blurInputOnSelect: !isMulti,
                hideSelectedOptions: isMulti ? false : hideSelectedOptions,
                closeMenuOnSelect: isMulti ? false : true,
                menuPlacement: menuPlacementRef.current,
                menuPosition: menuPosition || 'fixed',
                menuPortalTarget: useMenuPortal ? document.body : undefined,
                loadOptions,
                openMenuOnClick: !(loadOptions && isFuzzy),
                openMenuOnFocus: !(loadOptions && isFuzzy),
                menuIsOpen,
                menuShouldScrollIntoView,
                onChange: handleOnChange,
                onInputChange: handleOnInputChange,
                onFocus: handleOnFocus,
                onBlur: handleOnBlur,
                onKeyDown: handleOnKeyDown,
                filterOption,
                formatOptionLabel,
                formatGroupLabel,
                dropDownIcon,
                clearIcon,
                lockIcon,
                isFuzzy,
                beforeControl,
                afterControl,
                onMouseDown,
                numSelectedLiteral,
                onMenuOpen,
                isOptionSelected,
                inputProps,
                menuProps: {
                    dropdownWidth,
                    className: classes.menu,
                    actionContainerClassName: classes.actionContainer,
                    actionClassName: classes.action,
                    actionIconClassName: classes.actionIcon,
                    actionTextClassName: classes.actionText,
                    actionTextWithIconClassName: classes.actionTextWithIcon,
                    singleValueIconClassName: classes.singleValueIcon,
                    singleValueAvatarClassName: classes.singleValueAvatar,
                    actions,
                    onClickAction,
                    selectRef: selectRef.current,
                    value: newValue,
                    options: lazyOptions.options || innerOptions || [],
                    override: {
                        menu: override.menu,
                        actionContainer: override.actionContainer,
                        action: override.action,
                        actionIcon: override.actionIcon,
                        actionText: override.actionText,
                        actionTextWithIcon: override.actionTextWithIcon,
                    },
                },
                menuListProps: {
                    className: classes.menuList,
                    selectAllClassName: classes.selectAll,
                    selectAllSelectedClassName: classes.selectAllSelected,
                    selectAllCheckboxClassName: classes.selectAllCheckbox,
                    selectAllTextClassName: classes.selectAllText,
                    selectAllLabel:
                        shouldRenderSelectAll && !isSelectAllWithGroups && selectAllLabel,
                    setIsSelectAllFocused,
                    value: newValue,
                    options: lazyOptions.options || innerOptions || [],
                    selectRef: selectRef.current,
                    override: {
                        menuList: override.menuList,
                    },
                },
                groupHeadingProps: {
                    className: classes.groupHeading,
                    classNameWithSelectAll: classes.groupHeadingWithSelectAll,
                    selectAllClassName: classes.selectAll,
                    selectAllSelectedClassName: classes.selectAllSelected,
                    selectAllCheckboxClassName: classes.selectAllCheckbox,
                    selectAllTextClassName: classes.selectAllText,
                    setIsSelectAllFocused,
                    selectAllLabel:
                        shouldRenderSelectAll && isSelectAllWithGroups && selectAllLabel,
                    selectRef: selectRef.current,
                    override: {
                        groupHeading: override.groupHeading,
                        groupLabel: override.groupLabel,
                    },
                },
                optionProps: {
                    optionFocusDisabledClassName: classes.optionFocusDisabled,
                    className: classes.option,
                    isSelectAllFocused,
                    override: {
                        option: overrideOptionNoGetStyle,
                    },
                },
                components: {
                    DropdownIndicator: Indicator,
                    Control,
                    ClearIndicator,
                    SingleValue,
                    MultiValueLabel,
                    MultiValueRemove,
                    LoadingIndicator,
                    Menu,
                    MenuList,
                    GroupHeading,
                    Group: Group({
                        className: classes.group,
                        override: {
                            group: override.group,
                        },
                    }),
                    Option,
                    Input,
                    ...additionalComponents,
                    ...componentOverride,
                },
                styles: {
                    menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                    control: (styles, { data, isDisabled, isFocused, isSelected }) => ({
                        ...styles,
                        ...controlStyles({ data, isDisabled, isFocused, isSelected }),
                    }),
                    placeholder: (styles, { data, isDisabled, isFocused, isSelected }) => ({
                        ...styles,
                        ...placeholderStyles({ data, isDisabled, isFocused, isSelected }),
                    }),
                    valueContainer: (styles, { data, isDisabled, isFocused, isSelected }) => ({
                        ...styles,
                        ...valueContainerStyles({ data, isDisabled, isFocused, isSelected }),
                    }),
                    input: (styles, { data }) => ({
                        ...styles,
                        ...newStyles.input,
                        ...(override.input?.style || {}),
                    }),
                    group: (styles) => ({
                        ...styles,
                        ...newStyles.group,
                        ...(override.group?.style || {}),
                    }),
                    groupHeading: (styles) => ({
                        ...styles,
                        ...newStyles.groupHeading,
                        ...(override.groupHeading?.style || {}),
                    }),
                    option: (styles, { data, isDisabled, isFocused, isSelected }) => ({
                        ...styles,
                        ...optionStyles({ data, isDisabled, isFocused, isSelected }),
                    }),
                    indicatorsContainer: (styles) => ({
                        ...styles,
                        ...newStyles.indicatorsContainer,
                        ...(override.indicatorsContainer?.style || {}),
                    }),
                    clearIndicator: (styles) => ({
                        ...styles,
                        ...newStyles.clearIndicator,
                        ...(override.clearIndicator?.style || {}),
                        ...(override.clearIndicator?.getStyles?.() || {}),
                    }),
                    indicatorSeparator: (styles) => ({
                        ...styles,
                        ...indicatorSeparatorStyles,
                        ...(override.indicatorSeparator?.style || {}),
                        ...(override.indicatorSeparator?.getStyles?.() || {}),
                    }),
                    dropdownIndicator: (styles) => ({
                        ...styles,
                        ...newStyles.dropdownIndicator,
                        ...(override.dropdownIndicator?.style || {}),
                    }),
                    menuList: (styles) => ({
                        ...styles,
                        ...menuListStyles,
                    }),
                    multiValue: (styles, { data, isDisabled, isFocused, isSelected }) => {
                        const hideMultivalueChipsStyles = hideMultivalueChips
                            ? newStyles.hideMultivalueChips
                            : {};

                        return {
                            ...styles,
                            ...newStyles.multiValue,
                            ...hideMultivalueChipsStyles,
                            ...(override.multiValue?.style || {}),
                            ...(override.multiValue?.getStyles?.({
                                data,
                                isDisabled,
                                isFocused,
                                isSelected,
                            }) || {}),
                        };
                    },
                    multiValueLabel: (styles, { data, isDisabled, isFocused, isSelected }) => ({
                        ...styles,
                        ...multiValueLabelStyles({ data, isDisabled, isFocused, isSelected }),
                    }),
                    multiValueRemove: (styles, { data, isDisabled, isFocused, isSelected }) => ({
                        ...styles,
                        ...multiValueRemoveStyles({ data, isDisabled, isFocused, isSelected }),
                    }),
                    noOptionsMessage: (styles) => ({
                        ...styles,
                        ...newStyles.noOptionsMessage,
                        ...(override.noOptionsMessage?.style || {}),
                    }),
                    loadingMessage: (styles) => ({
                        ...styles,
                        ...newStyles.loadingMessage,
                        ...(override.loadingMessage?.style || {}),
                    }),
                    ...override.styles,
                },
                showMediaInSelectedValues,
                ...override['react-select'],
            };
        }, [
            focused,
            loadOptions,
            isFuzzy,
            innerOptions,
            useAsSimpleSearch,
            forceMenuIsOpen,
            hideDropdownIndicator,
            newInputValue,
            newValue,
            keepInputValueOnBlur,
            keepInputValueOnBlurInMulti,
            isReadOnly,
            dropDownIcon,
            showNumSelected,
            filterByKey,
            withoutFilter,
            customFilter,
            override,
            selectClassName,
            placeholderReadOnly,
            placeholder,
            lazyOptions.options,
            lazyOptions.isLoading,
            cacheOptions,
            noOptionsMessage,
            loadingMessage,
            defaultMenuIsOpen,
            actions,
            isMulti,
            newIsClearable,
            isSearchable,
            hideSelectedOptions,
            menuPosition,
            useMenuPortal,
            menuShouldScrollIntoView,
            handleOnChange,
            handleOnInputChange,
            handleOnFocus,
            handleOnBlur,
            handleOnKeyDown,
            formatOptionLabel,
            formatGroupLabel,
            clearIcon,
            lockIcon,
            beforeControl,
            afterControl,
            onMouseDown,
            numSelectedLiteral,
            onMenuOpen,
            isOptionSelected,
            inputProps,
            dropdownWidth,
            classes,
            onClickAction,
            shouldRenderSelectAll,
            isSelectAllWithGroups,
            selectAllLabel,
            isSelectAllFocused,
            componentOverride,
            showMediaInSelectedValues,
            getRef,
            controlStyles,
            placeholderStyles,
            valueContainerStyles,
            newStyles,
            optionStyles,
            indicatorSeparatorStyles,
            menuListStyles,
            hideMultivalueChips,
            multiValueLabelStyles,
            multiValueRemoveStyles,
        ]);

        let SelectComponent = RSelect;
        if (loadOptions && isFuzzy) {
            SelectComponent = AsyncSelect;
            selectProps.loadOptions = loadOptionsCb;
        }

        return (
            <InputWrapper
                {...props}
                error={error}
                className={rootClassName}
                overrides={overridesProp}
                isFullWidth={isFullWidth}
                isRequired={isRequired}
            >
                <div className={classes.inputComponents} {...override.inputComponents}>
                    <SelectComponent {...selectProps} />
                </div>
            </InputWrapper>
        );
    },
);

Select.overrides = [
    'root',
    'react-select',
    'inputComponents',
    'control',
    'controlFocused',
    'option',
    'optionFocused',
    'optionSelected',
    'optionDisabled',
    'optionWithSelectAll',
    'valueContainer',
    'valueContainerDisabled',
    'input',
    'group',
    'groupHeading',
    'indicatorsContainer',
    'indicatorSeparator',
    'clearIndicator',
    'dropdownIndicator',
    'placeholder',
    'placeholderDisabled',
    'multiValue',
    'multiValueLabel',
    'multiValueLabelDisabled',
    'multiValueRemove',
    'multiValueRemoveDisabled',
    'optionLabel',
    'optionLabelIcon',
    'optionLabelCustomIcon',
    'optionLabelAvatar',
    'disabledAvatar',
    'disabledText',
    'disabledIcon',
    'label',
    'optionLabelBlock',
    'optionLabelText',
    'optionLabelSubLabel',
    'menu',
    'menuList',
    'actionContainer',
    'action',
    'actionIcon',
    'actionText',
    'actionTextWithIcon',
    'styles',
];

Select.propTypes = {
    /** Custom className for styling purposes */
    className: PropTypes.string,
    /** Object with custom style overrides */
    overrides: PropTypes.object,
    /** Async mode function to load options */
    loadOptions: PropTypes.func,
    /** When true, enables search/filtering functionality */
    isFuzzy: PropTypes.bool,
    /** Function called when select value changes with the new value as parameter */
    onChange: PropTypes.func,
    /** Function called on key down event */
    onKeyDown: PropTypes.func,
    /** Function called when the component loses focus */
    onBlur: PropTypes.func,
    /** HTML id attribute assigned to the input element */
    id: PropTypes.string,
    /** Additional props to pass to the input element */
    inputProps: PropTypes.object,
    /** List of options to display in the dropdown */
    options: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string,
            value: PropTypes.any,
            isDisabled: PropTypes.bool,
            src: PropTypes.string,
            icon: PropTypes.element,
            iconType: PropTypes.string,
            subLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
        }),
    ),
    /** Default search text when component mounts */
    defaultSearch: PropTypes.string,
    /** Default value when component mounts */
    defaultValue: PropTypes.any,
    /** Current value of the select */
    value: PropTypes.any,
    /** Text to be displayed as the select's label */
    label: PropTypes.string,
    /** Determines how the label is positioned relative to the input */
    labelMode: PropTypes.oneOf(['horizontal', 'vertical']),
    /** Text displayed when the select has no selected value */
    placeholder: PropTypes.string,
    /** Placeholder text to show when in read-only mode */
    placeholderReadOnly: PropTypes.string,
    /** Custom message when no options are available */
    noOptionsMessage: PropTypes.func,
    /** Custom message during loading state */
    loadingMessage: PropTypes.func,
    /** When true, select will take up 100% of the available width */
    isFullWidth: PropTypes.bool,
    /** Current value of the input field */
    inputValue: PropTypes.string,
    /** When true, blurs input on Enter key press */
    forceBlurOnEnter: PropTypes.bool,
    /** When true, keeps input value when input loses focus */
    keepInputValueOnBlur: PropTypes.bool,
    /** When true, keeps input value when input loses focus in multi-select mode */
    keepInputValueOnBlurInMulti: PropTypes.bool,
    /** When true, preserves value when input changes */
    keepValueOnInputChange: PropTypes.bool,
    /** When true, allows using the Select as a simple input for search purposes */
    useAsSimpleSearch: PropTypes.bool,
    /** Function called when search input loses focus */
    onBlurSearch: PropTypes.func,
    /** Function called when Enter key is pressed while select is focused */
    onEnter: PropTypes.func,
    /** Tooltip text displayed in an info icon next to the label */
    hint: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    /** Error message displayed below the select, also triggers error styling when present */
    error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    /** Informational message displayed below the select */
    info: PropTypes.string,
    /** When true, displays an asterisk next to the label indicating the field is required */
    isRequired: PropTypes.bool,
    /** When true, prevents user from interacting with the select */
    isReadOnly: PropTypes.bool,
    /** When true, allows searching within dropdown options */
    isSearchable: PropTypes.bool,
    /** When true, hides options after they are selected */
    hideSelectedOptions: PropTypes.bool,
    /** When true, shows a button to remove the current selection */
    isClearable: PropTypes.bool,
    /** When true, allows multiple options to be selected */
    isMulti: PropTypes.bool,
    /** When true, indicates a loading state and shows spinner */
    isLoading: PropTypes.bool,
    /** Action buttons to display in the dropdown menu */
    actions: PropTypes.arrayOf(
        PropTypes.shape({
            /** Label for the action button */
            label: PropTypes.string,
            /** Function called when the action button is clicked */
            onClick: PropTypes.func,
        }),
    ),
    /** Function called when an action is clicked */
    onClickAction: PropTypes.func,
    /** When true, allows filtering by option keys as well as labels */
    filterByKey: PropTypes.bool,
    /** When true, the dropdown menu is initially open */
    defaultMenuIsOpen: PropTypes.bool,
    /** Custom dropdown indicator icon */
    dropDownIcon: PropTypes.element,
    /** Custom clear icon */
    clearIcon: PropTypes.element,
    /** Custom lock icon for read-only state */
    lockIcon: PropTypes.element,
    /** When true, hides the dropdown indicator */
    hideDropdownIndicator: PropTypes.bool,
    /** Size variant of the select component */
    size: PropTypes.oneOf(['small', 'medium']),
    /** When true, displays only text without input styling */
    onlyText: PropTypes.bool,
    /** Custom width for the dropdown menu */
    dropdownWidth: PropTypes.string,
    /** Component to render before the select control */
    beforeControl: PropTypes.node,
    /** Component to render after the select control */
    afterControl: PropTypes.node,
    /** When true, shows the count of selected items for multi select */
    showNumSelected: PropTypes.bool,
    /** Text to display when showing count of selected items */
    numSelectedLiteral: PropTypes.string,
    /** Function to customize the option row rendering */
    customOption: PropTypes.func,
    /** When false, the selected value won't be set as selected in the input */
    shouldSetValueOnChange: PropTypes.bool,
    /** When true, caches options to improve performance */
    cacheOptions: PropTypes.bool,
    /** When true, focuses the first option in the dropdown */
    focusDefaultOption: PropTypes.bool,
    /** When true, highlights matched characters in search results */
    highlightMatch: PropTypes.bool,
    /** Positioning strategy for the dropdown menu */
    menuPosition: PropTypes.oneOf(['absolute', 'fixed']),
    /** When true, renders the menu in a React Portal for better stacking */
    useMenuPortal: PropTypes.bool,
    /** When true, forces the menu to remain open */
    forceMenuIsOpen: PropTypes.bool,
    /** When true, forces the input to be focused initially */
    forceStartFocused: PropTypes.bool,
    /** Function to get a reference to the select component */
    getRef: PropTypes.func,
    /** Function to determine if a value can be changed */
    getCanChange: PropTypes.func,
    /** When true, hides the chips in multi-select mode */
    hideMultivalueChips: PropTypes.bool,
    /** When true, hides all options in the dropdown */
    hideOptions: PropTypes.bool,
    /** Function to control change events from outside the component */
    customOnChange: PropTypes.func,
    /** Function to control input change events from outside the component */
    customOnChangeInput: PropTypes.func,
    /** When true, scrolls menu into view when opened */
    menuShouldScrollIntoView: PropTypes.bool,
    /** Function to determine if an option should be marked as selected */
    isOptionSelected: PropTypes.func,
    /** When true, prevents auto-selection of the first option with Enter key */
    notSelectingDefaultOption: PropTypes.bool,
    /** When true, keeps input focused when there is a value */
    keepInputFocused: PropTypes.bool,
    /** Text for "Select All" option in multi-select (if present, enables select all) */
    selectAllLabel: PropTypes.string,
    /** When true, shows media (icons, avatars) in selected value chips */
    showMediaInSelectedValues: PropTypes.bool,
    /** Custom filter function for searching/filtering options */
    customFilter: PropTypes.func,
    /** When true, disables the default filtering mechanism */
    withoutFilter: PropTypes.bool,
    /** Full override of the underlying react-select component */
    componentOverride: PropTypes.object,
    /** When true, loads results when the select is focused in fuzzy mode */
    alwaysLoadOnFocus: PropTypes.bool,
    /** Classes object provided by the styling system */
    classes: PropTypes.object,
};

export default Select;
