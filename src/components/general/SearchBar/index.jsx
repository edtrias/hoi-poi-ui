import React, { useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { getOverrides, useClasses } from '../../../utils/overrides';
import { createUseStyles } from '../../../utils/styles';

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
    keepInputValueOnBlur,
    forceBlurOnEnter,
    allowMultipleTypes,
    selectedTypesLiteral,
    onEnter,
    onBlur,
    useAsSimpleSearch,
    isMulti,
    customOption,
    ...props
}) {
    const classes = useClasses(useStyles, classesProp);

    // Overrides
    const override = getOverrides(overridesProp, SearchBar.overrides);

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
                    showNumSelected={allowMultipleTypes}
                    numSelectedLiteral={selectedTypesLiteral}
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
        override.typeDivider,
        override.TypeSelector,
        typeOptions,
        props.size,
        allowMultipleTypes,
        selectedTypesLiteral,
    ]);

    const handleOnBlur = useCallback(
        (e) => {
            onEnter && onEnter(e);
        },
        [onEnter],
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
                onEnter={onEnter}
                onBlur={onBlur ? onBlur : handleOnBlur}
                isMulti={isMulti}
                customOption={customOption}
                inputValue={inputValue}
                {...props}
            />
        </div>
    );
}

SearchBar.overrides = ['root', 'typeDivider', 'TypeSelector'];

SearchBar.defaultProps = {
    className: '',
    overrides: {},
    keepInputValueOnBlur: true,
    forceBlurOnEnter: true,
    allowMultipleTypes: false,
    selectedTypesLiteral: '%@ Selected',
};

SearchBar.propTypes = {
    className: PropTypes.string,
    overrides: PropTypes.object,
    onChangeType: PropTypes.func,
    /** Allow multiple types selection */
    allowMultipleTypes: PropTypes.bool,
    selectedTypesLiteral: PropTypes.string,
    typeOptions: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string,
            value: PropTypes.any,
            isDisabled: PropTypes.bool,
            src: PropTypes.string,
            icon: PropTypes.element,
            iconType: PropTypes.string,
            subLabel: PropTypes.string,
        }),
    ),
    type: PropTypes.any,
    inputValue: PropTypes.string,
    keepInputValueOnBlur: PropTypes.bool,
    forceBlurOnEnter: PropTypes.bool,
    onEnter: PropTypes.func,
    useAsSimpleSearch: PropTypes.bool,
    isMulti: PropTypes.bool,
    customOption: PropTypes.func,
};

export default React.memo(SearchBar);
