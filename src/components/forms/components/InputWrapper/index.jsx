import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { getOverrides, useClasses } from '../../../../utils/overrides';

import Label from '../../Label';
import FieldBottom from '../FieldBottom';

import { createUseStyles } from '../../../../utils/styles';
import styles from './styles';
const useStyles = createUseStyles(styles, 'InputWrapper');

const InputWrapper = forwardRef(
    (
        {
            children,
            classes: classesProp,
            overrides: overridesProp,
            className: classNameProp,
            label,
            isFullWidth,
            hint,
            error,
            info,
            isRequired,
            labelMode = 'vertical',
        },
        ref,
    ) => {
        const classes = useClasses(useStyles, classesProp);
        const override = getOverrides(overridesProp, InputWrapper.overrides);

        const rootClassName = classnames(
            classes.root,
            {
                [classes[labelMode]]: labelMode,
                [classes.isFullWidth]: isFullWidth,
                [classes.error]: error,
            },
            classNameProp,
        );

        const fieldBottomClass = classnames({
            [classes.fieldBottom]: label && labelMode === 'horizontal',
        });

        return (
            <div className={rootClassName} {...override.root}>
                <div className={classes.inputWrapper}>
                    {label && (
                        <Label
                            className={classes.Label}
                            isRequired={isRequired}
                            hint={hint}
                            {...override.Label}
                        >
                            {label}
                        </Label>
                    )}
                    <div className={classes.formControl} {...override.formControl} ref={ref}>
                        {children}
                    </div>
                </div>
                <FieldBottom
                    className={fieldBottomClass}
                    info={info}
                    error={error}
                    overrides={overridesProp}
                    isFullWidth={isFullWidth}
                />
            </div>
        );
    },
);

InputWrapper.overrides = ['root', 'error', 'info', 'formControl', 'Label', 'inputWrapper'];

InputWrapper.propTypes = {
    /** Custom className for styling purposes */
    className: PropTypes.string,
    /** Object with custom style overrides for inner elements */
    overrides: PropTypes.object,
    /** Text to be displayed as the field's label */
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
    /** The input component to be wrapped */
    children: PropTypes.node,
};

export default InputWrapper;
