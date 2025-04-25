import React, { memo, useMemo, useCallback, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Popover from '../../utils/Popover';
import { getOverrides, useClasses } from '../../../utils/overrides';
import OptionList from './components/OptionList';

import { createUseStyles } from '../../../utils/styles';
import styles from './styles';

const useStyles = createUseStyles(styles, 'SelectWrapper');

const SelectWrapper = memo(
    ({
        children,
        classes: classesProp,
        overrides: overridesProp,
        className: classNameProp,
        options,
        loadOptions,
        customOptions,
        value,
        getIsOpen,
        onOpen,
        onClose,
        onChange,
        loadingMessage,
        noOptionsPlaceholder,
        overlayStyle,
        overlayInnerStyle,
        getPopoverRef,
        getPopoverContentRef,
        placement = 'bottomLeft',
        trigger = ['click'],
        isMulti = false,
        checkboxColor = 'actionMajor',
        checkBoxIsMonotone = false,
        truncateOptions = true,
        popoverWide = false,
        closeOnChangeSingle = true,
    }) => {
        const override = getOverrides(overridesProp, SelectWrapper.overrides);
        const classes = useClasses(useStyles, classesProp);
        const rootClassName = classnames(classes.root, {}, classNameProp);
        const [innerOptions, setInnerOptions] = useState(options || []);
        const [isLoading, setIsLoading] = useState(false);

        useEffect(() => {
            if (!loadOptions && innerOptions?.length !== options?.length) {
                setInnerOptions(options);
            }
        }, [loadOptions, innerOptions, options]);

        const mappedValue = useMemo(() => {
            if (
                !value ||
                (Array.isArray(value) && value.length === 0) ||
                (typeof value === 'object' && Object.keys(value).length === 0)
            ) {
                return {};
            }

            if (Array.isArray(value)) {
                return value.reduce((obj, current) => {
                    obj[current.value] = current;
                    return obj;
                }, {});
            } else if (typeof value === 'object') {
                return { [value.value]: value };
            } else {
                return {};
            }
        }, [value]);

        const handleOnChange = useCallback(
            (option) => {
                return () => {
                    if (!onChange) return;
                    if (isMulti) {
                        let finalValue = [];
                        if (!value) finalValue = [option];
                        else {
                            if (mappedValue[option.value]) {
                                finalValue = value.filter((current) => {
                                    return current.value !== option.value;
                                });
                            } else {
                                finalValue = [...value, option];
                            }
                        }
                        onChange(finalValue);
                    } else {
                        if (value && option.value === value.value) {
                            onChange(null);
                        } else {
                            onChange(option);
                        }
                        if (closeOnChangeSingle) {
                            document.dispatchEvent(new Event('mousedown'));
                        }
                    }
                };
            },
            [isMulti, onChange, value, mappedValue, closeOnChangeSingle],
        );

        const finalOptions = useMemo(() => {
            if (customOptions) {
                return (
                    <div className={classes.customOptions} {...(override.customOptions || {})}>
                        {customOptions}
                    </div>
                );
            } else {
                return (
                    <OptionList
                        options={innerOptions}
                        isMulti={isMulti}
                        classes={classes}
                        override={override}
                        onChange={handleOnChange}
                        value={value}
                        mappedValue={mappedValue}
                        checkboxColor={checkboxColor}
                        checkBoxIsMonotone={checkBoxIsMonotone}
                        isLoading={isLoading}
                        loadingMessage={loadingMessage}
                        noOptionsPlaceholder={noOptionsPlaceholder}
                        truncateOptions={truncateOptions}
                    />
                );
            }
        }, [
            customOptions,
            innerOptions,
            isMulti,
            classes,
            override,
            handleOnChange,
            value,
            mappedValue,
            checkboxColor,
            checkBoxIsMonotone,
            isLoading,
            loadingMessage,
            noOptionsPlaceholder,
            truncateOptions,
        ]);

        const onChangeOpen = useCallback(
            (isOpen) => {
                getIsOpen && getIsOpen(isOpen);
                if (isOpen) {
                    if (loadOptions && innerOptions.length === 0) {
                        setIsLoading(true);
                        loadOptions()
                            .then((result) => {
                                setInnerOptions(result);
                                setIsLoading(false);
                            })
                            .catch(() => {
                                setIsLoading(false);
                            });
                    }
                    onOpen && onOpen();
                } else {
                    onClose && onClose();
                }
            },
            [getIsOpen, onOpen, onClose, innerOptions, loadOptions],
        );

        const popoverClassName = useMemo(
            () => classnames(classes.Popover, { [classes.PopoverWide]: popoverWide }),
            [classes.Popover, classes.PopoverWide, popoverWide],
        );

        return (
            <div className={rootClassName} {...(override.root || {})}>
                <Popover
                    getRef={getPopoverRef}
                    getContentRef={getPopoverContentRef}
                    content={finalOptions}
                    placement={placement}
                    trigger={trigger}
                    className={popoverClassName}
                    onVisibleChange={onChangeOpen}
                    overlayStyle={overlayStyle}
                    overlayInnerStyle={overlayInnerStyle}
                    overrides={override.Popover || {}}
                >
                    {children && children}
                </Popover>
            </div>
        );
    },
);

SelectWrapper.overrides = [
    'root',
    'Popover',
    'loaderContainer',
    'Loader',
    'optionList',
    'noOptions',
    'optionListGroup',
    'optionListGroupLabel',
    'option',
    'optionSelect',
    'optionDisabled',
    'optionCheckbox',
    'optionTwoLines',
    'optionLabel',
    'optionSubLabel',
    'optionLabelBlock',
    'optionLabelBullet',
    'optionLabelBulletDisabled',
    'optionLabelBulletPrimary',
    'optionLabelBulletDanger',
    'optionLabelBulletSuccess',
    'optionLabelIcon',
    'optionLabelCustomIcon',
    'optionLabelAvatar',
    'optionDisabledAvatar',
];

SelectWrapper.propTypes = {
    /** Content to trigger the select dropdown, typically a Chip, Button, or other interactive element */
    children: PropTypes.any,
    /** Custom className applied to the root element */
    className: PropTypes.string,
    /** Override the styles of any part of the component. See the overrides list in Component Tree section */
    overrides: PropTypes.object,
    /** Array of options to display in the dropdown. Can be flat or grouped with nested options */
    options: PropTypes.arrayOf(
        PropTypes.oneOfType([
            PropTypes.shape({
                label: PropTypes.string.isRequired,
                value: PropTypes.any.isRequired,
                isDisabled: PropTypes.bool,
                className: PropTypes.string,
                subLabel: PropTypes.string,
                sideLabel: PropTypes.string,
                iconType: PropTypes.string,
                iconColor: PropTypes.string,
                icon: PropTypes.node,
                src: PropTypes.string,
                placeholder: PropTypes.string,
                alt: PropTypes.string,
                type: PropTypes.oneOf(['primary', 'danger', 'success']),
            }),
            PropTypes.shape({
                label: PropTypes.string.isRequired,
                options: PropTypes.array.isRequired,
            }),
        ]),
    ),
    /** Function that returns a Promise resolving to an array of options (for async loading) */
    loadOptions: PropTypes.func,
    /** Custom React element to replace the standard options list */
    customOptions: PropTypes.node,
    /** Currently selected option(s). For multi-select, should be an array */
    value: PropTypes.oneOfType([
        PropTypes.shape({
            label: PropTypes.string,
            value: PropTypes.any,
        }),
        PropTypes.arrayOf(
            PropTypes.shape({
                label: PropTypes.string,
                value: PropTypes.any,
            }),
        ),
    ]),
    /** Function that receives the open state of the dropdown */
    getIsOpen: PropTypes.func,
    /** Function called when the dropdown opens */
    onOpen: PropTypes.func,
    /** Function called when the dropdown closes */
    onClose: PropTypes.func,
    /** Function called when selection changes, receives the new value */
    onChange: PropTypes.func,
    /** Custom text to display during async option loading */
    loadingMessage: PropTypes.string,
    /** Custom text to display when no options are available */
    noOptionsPlaceholder: PropTypes.string,
    /** Additional styles for the Popover overlay */
    overlayStyle: PropTypes.object,
    /** Additional styles for the inner content of the Popover */
    overlayInnerStyle: PropTypes.object,
    /** Function to get ref of the Popover component */
    getPopoverRef: PropTypes.func,
    /** Function to get ref of the Popover content */
    getPopoverContentRef: PropTypes.func,
    /** Position of the dropdown relative to the trigger element */
    placement: PropTypes.oneOf(['bottomLeft', 'bottomRight', 'topLeft', 'topRight']),
    /** Events that trigger the dropdown to open */
    trigger: PropTypes.arrayOf(PropTypes.oneOf(['click', 'hover', 'focus'])),
    /** When true, allows selecting multiple options */
    isMulti: PropTypes.bool,
    /** Color theme for checkboxes in multi-select mode */
    checkboxColor: PropTypes.string,
    /** When true, checkboxes will have monotone styling */
    checkBoxIsMonotone: PropTypes.bool,
    /** When true, option labels will be truncated with ellipsis if they overflow */
    truncateOptions: PropTypes.bool,
    /** When true, the popover will use a wider width (344px instead of 240px) */
    popoverWide: PropTypes.bool,
    /** When true, the dropdown will close after selecting an option in single-select mode */
    closeOnChangeSingle: PropTypes.bool,
};

export default SelectWrapper;
