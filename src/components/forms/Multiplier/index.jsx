import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Button from '../../general/Button';
import { getOverrides, useClasses } from '../../../utils/overrides';
import MultiplierControl from './MultiplierControl';

import { createUseStyles } from '../../../utils/styles';
import styles from './styles';
const useStyles = createUseStyles(styles, 'Multiplier');

function Multiplier({
    classes: classesProp,
    overrides: overridesProp,
    className: classNameProp,
    schema,
    buttonLabel,
    buttonClassName,
    isReadOnly,
    max,
    onChange,
    onFocus,
    onBlur,
    customFields,
    orientation,
    error = {},
    value = [null],
    separator = false,
    labelMode = 'horizontal',
    isFullWidth = false,
}) {
    const classes = useClasses(useStyles, classesProp);
    // State
    const size = value.length;

    // Overrides
    const override = getOverrides(overridesProp, Multiplier.overrides);

    // Classes
    const rootClassName = classnames(classes.root, classNameProp, {
        [classes.isFullWidth]: isFullWidth,
        [classes.vertical]: labelMode === 'vertical',
    });
    const buttonClassNames = classnames(classes.button, buttonClassName);
    const multiplierItemClassNames = classnames(classes.item, {
        [classes.separator]: separator,
        [classes.singleItem]: !Array.isArray(schema),
        [classes.horizontal]: orientation && orientation === 'horizontal',
    });

    const rootProps = {
        className: rootClassName,
        ...override.root,
    };

    const onClickAdd = useCallback(() => {
        const newValues = [...value];
        newValues.push(null);
        onChange && onChange(newValues, null, null, null, null, 'add');
    }, [onChange, value]);

    const onClickRemove = useCallback(
        (schema, index) => {
            const newValues = [...value.slice(0, index), ...value.slice(index + 1)];
            onChange && onChange(newValues, value[index], index, schema, null, 'remove');
        },
        [onChange, value],
    );

    const onChangeMultiplier = useCallback(
        (newValue, schema, index, field) => {
            const newValues = [...value];
            newValues[index] = newValue;
            onChange && onChange(newValues, newValue, index, schema, field);
        },
        [onChange, value],
    );

    const onBlurMultiplier = useCallback(
        (newValue, schema, index, field) => {
            const newValues = [...value];
            newValues[index] = newValue;
            onBlur && onBlur(newValues, newValue, index, schema, field);
        },
        [onBlur, value],
    );

    const type = Array.isArray(schema) ? 'form' : 'field';
    const items = [];

    const showButton = !(max && size >= max) && isReadOnly !== true;

    for (let index = 0; index < value.length; index++) {
        items.push(
            <MultiplierControl
                key={index}
                index={index}
                type={type}
                schema={schema}
                labelMode={schema.labelMode || labelMode}
                isFullWidth={schema.isFullWidth || isFullWidth}
                isReadOnly={isReadOnly || schema.isReadOnly}
                values={value[index]}
                errors={error[index]}
                onChange={onChangeMultiplier}
                onFocus={onFocus}
                onBlur={onBlurMultiplier}
                onRemove={size > 1 ? onClickRemove : undefined}
                className={multiplierItemClassNames}
                customFields={customFields}
                {...override.multiplierControl}
                overrides={override}
                removeIconClassName={classes.removeIcon}
                orientation={orientation}
            />,
        );
    }

    return (
        <div {...rootProps}>
            <div className={classes.container} {...override.container}>
                {items}
            </div>
            {showButton && (
                <div className={classes.buttonContainer} {...override.buttonContainer}>
                    <Button
                        className={buttonClassNames}
                        onClick={onClickAdd}
                        size="small"
                        type="terciary"
                        {...override.button}
                        overrides={override.button}
                    >
                        {buttonLabel}
                    </Button>
                </div>
            )}
        </div>
    );
}

Multiplier.overrides = ['root', 'multiplierControl', 'button'];

Multiplier.propTypes = {
    /** Field or form schema that defines the structure to be repeated */
    schema: PropTypes.any,
    /** Custom CSS class for the multiplier container */
    className: PropTypes.string,
    /** Unique identifier for the multiplier field */
    name: PropTypes.string,
    /** Defines how labels are positioned relative to fields ('horizontal' or 'vertical') */
    labelMode: PropTypes.string,
    /** Label text for the entire multiplier field */
    label: PropTypes.string,
    /** Callback triggered when any value changes, providing updated values array */
    onChange: PropTypes.func,
    /** Callback triggered when a field receives focus */
    onFocus: PropTypes.func,
    /** Callback triggered when a field loses focus */
    onBlur: PropTypes.func,
    /** Text displayed on the add button */
    buttonLabel: PropTypes.string,
    /** Custom CSS class for the add button */
    buttonClassName: PropTypes.string,
    /** Array of field definitions for each input in the multiplier */
    fields: PropTypes.arrayOf(
        PropTypes.shape({
            /** Label text displayed for the field */
            label: PropTypes.string,
            /** Overrides the default labelMode for this field */
            labelMode: PropTypes.string,
            /** When true, the field takes up 100% of the available width */
            isFullWidth: PropTypes.bool,
            /** Unique field identifier used as the key in values and errors objects */
            name: PropTypes.string,
            /** Field type determines which component to render */
            type: PropTypes.string,
            /** Placeholder text for input fields */
            placeholder: PropTypes.string,
            /** Helper text displayed below the field */
            hint: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
            /** When true, validation will check for a non-empty value */
            isRequired: PropTypes.bool,
            /** When true, this field will be in read-only mode */
            isReadOnly: PropTypes.bool,
            /** Additional props passed directly to the field component */
            attrs: PropTypes.object,
            /** Custom CSS class for the field wrapper */
            className: PropTypes.string,
        }),
    ),
    /** Maximum number of items that can be added */
    max: PropTypes.number,
    /** When true, displays a visual separator between multiplier items */
    separator: PropTypes.bool,
    /** When true, allows removal of items (this is deprecated, removal is allowed when there's more than one item) */
    remove: PropTypes.bool,
    /** Array of values for each multiplier item */
    value: PropTypes.array,
    /** Object or array of validation error messages */
    error: PropTypes.any,
    /** When true, all fields take up 100% of the available width */
    isFullWidth: PropTypes.bool,
    /** When true, all fields will be in read-only mode and the add button will be hidden */
    isReadOnly: PropTypes.bool,
    /** Object mapping custom field types to React components */
    customFields: PropTypes.object,
    /** Defines the layout direction of multiplier items ('horizontal' or 'vertical') */
    orientation: PropTypes.oneOf(['horizontal', 'vertical']),
};

export default React.memo(Multiplier);
