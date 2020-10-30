import React, { useState, useCallback, useRef, useMemo } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import useOnClickOutside from 'use-onclickoutside';
import useOnPressEsc from '../../../utils/hooks/useOnPressEsc';
import { getOverrides, useClasses } from '../../../utils/overrides';
import { checkPathTarget } from './utils';

import Select from '../Select';
import Button from '../../general/Button';
import { createUseStyles } from '../../../utils/styles';
import styles from './styles';
const useStyles = createUseStyles(styles, 'SelectButton');

function SelectButton({
    children,
    classes: classesProp,
    overrides: overridesProp,
    className: classNameProp,
    onChange,
    id,
    name,
    options,
    value,
    placeholder,
    noOptionsPlaceholder,
    hint,
    isMulti,
    hideSelectedOptions,
    actions,
    type,
    isFullWidth,
}) {
    const classes = useClasses(useStyles, classesProp);
    // State
    const [isOpen, setIsOpen] = useState(false);

    // Hooks

    // Closing select
    const ref = useRef(null);
    useOnClickOutside(ref, (e) => {
        const optionEl = checkPathTarget(e.target, 'hoi-poi-select__option');
        const actionEl = checkPathTarget(e.target, 'hoi-poi-select__action');
        if (!optionEl && !actionEl) setIsOpen(false);
    });
    useOnPressEsc(() => setIsOpen(false));

    const onSelectChange = useCallback(
        (...args) => {
            onChange && onChange(...args);
            if (!isMulti) setIsOpen(false);
        },
        [onChange, isMulti],
    );

    const toggleOpen = useCallback(() => {
        setIsOpen(!isOpen);
    }, [isOpen]);

    // Overrides
    const override = getOverrides(overridesProp, SelectButton.overrides);

    // Classes
    const rootClassName = classnames(classes.root, classNameProp);

    const rootProps = useMemo(
        () => ({
            className: rootClassName,
            ...override.root,
        }),
        [rootClassName, override],
    );

    const selectProps = useMemo(
        () => ({
            id,
            name,
            hint,
            placeholder,
            options,
            value,
            hideSelectedOptions,
            noOptionsPlaceholder,
            onChange: onSelectChange,
            isMulti,
            isClearable: false,
            actions,
            onClickAction: toggleOpen,
            ...override.Select,
        }),
        [
            id,
            name,
            hint,
            placeholder,
            options,
            value,
            hideSelectedOptions,
            noOptionsPlaceholder,
            onSelectChange,
            isMulti,
            actions,
            toggleOpen,
            override,
        ],
    );

    return (
        <div {...rootProps} ref={ref}>
            <Button isFullWidth type={type} icon="plus" {...override.Button} onClick={toggleOpen}>
                {children}
            </Button>
            {isOpen && (
                <Select
                    className={classes.Select}
                    {...selectProps}
                    {...override.Select}
                    overrides={{
                        'react-select': {
                            autoFocus: true,
                            controlShouldRenderValue: false,
                            backspaceRemovesValue: false,
                            tabSelectsValue: false,
                            menuIsOpen: true,
                        },
                    }}
                />
            )}
        </div>
    );
}

SelectButton.overrides = ['root', 'Select', 'Button'];

SelectButton.defaultProps = {
    onChange: () => {},
    value: '',
    isReadOnly: false,
    hideSelectedOptions: false,
    isClearable: true,
    isMulti: false,
    type: 'primary',
};

SelectButton.propTypes = {
    className: PropTypes.string,
    overrides: PropTypes.object,
    onChange: PropTypes.func,
    /** Native input id */
    id: PropTypes.string,
    /** Native input name */
    name: PropTypes.string,
    options: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string,
            value: PropTypes.any,
            isDisabled: PropTypes.bool,
        }),
    ),
    value: PropTypes.any,
    placeholder: PropTypes.string,
    noOptionsPlaceholder: PropTypes.string,
    hideSelectedOptions: PropTypes.bool,
    /** multiple select support */
    isMulti: PropTypes.bool,
    isClearable: PropTypes.bool,
    /** Fixed actions added at the bottom of menu list */
    actions: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string,
            onClick: PropTypes.func,
        }),
    ),
};

export default React.memo(SelectButton);
