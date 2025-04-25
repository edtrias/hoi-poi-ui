import React, { Fragment, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { createUseStyles, useTheme } from '../../../utils/styles';
import Popover from '../../utils/Popover';
import { getOverrides, useClasses } from '../../../utils/overrides';
import Checkbox from '../../general/Checkbox';
import Icon from '../../general/Icon';
import Text from '../../typography/Text';

import styles from './styles';
const useStyles = createUseStyles(styles, 'CheckboxControl');

function CheckboxControl({
    classes: classesProp,
    overrides: overridesProp,
    onChange = () => {},
    value = false,
    option = {},
    isReadOnly = false,
    color,
    error,
}) {
    const classes = useClasses(useStyles, classesProp);
    const theme = useTheme();
    // Overrides
    const override = getOverrides(overridesProp, CheckboxControl.overrides);

    const onChangeCheckbox = useCallback(
        (e) => {
            e.stopPropagation && e.stopPropagation();
            onChange && onChange(option.value, e);
        },
        [onChange, option],
    );

    const infoDetails = useMemo(() => {
        if (!option.hint || (!option.hint.title && !option.hint.body)) return;
        return (
            <Fragment>
                <Text type="button" className={classes.popoverTitle}>
                    {option.hint.title}
                </Text>
                <Text>{option.hint.body}</Text>
            </Fragment>
        );
    }, [classes.popoverTitle, option.hint]);

    return (
        <Fragment>
            <div className={classes.checkboxWrapper} key={option.value}>
                <div
                    className={classes.checkboxControl}
                    onClick={isReadOnly ? undefined : () => onChangeCheckbox(option.value)}
                    {...override.checkboxControl}
                >
                    <Checkbox checked={value} isDisabled={isReadOnly} color={color} />
                    <span className={classes.checkboxLabel} {...override.checkboxLabel}>
                        {option.label}
                    </span>
                </div>
                {option.hint && (
                    <div className={classes.iconContainer}>
                        <Popover
                            className={classes.Popover}
                            placement="left"
                            content={infoDetails}
                            {...override.Popover}
                        >
                            <Icon
                                className={classes.info}
                                color={theme.colors.grey[500]}
                                name="info"
                                size="small"
                            />
                        </Popover>
                    </div>
                )}
            </div>
            {error && (
                <div className={classes.errorPerCheck} {...override.errorPerCheck}>
                    {error}
                </div>
            )}
        </Fragment>
    );
}

CheckboxControl.overrides = ['checkboxLabel', 'checkboxControl'];

CheckboxControl.propTypes = {
    /** Custom className for styling purposes */
    className: PropTypes.string,
    /** Object with custom style overrides for inner elements */
    overrides: PropTypes.object,
    /** Function called when the checkbox is toggled with the option value as parameter */
    onChange: PropTypes.func,
    /** Data object containing information about this checkbox */
    option: PropTypes.shape({
        /** Text to display next to the checkbox */
        label: PropTypes.string,
        /** Unique identifier for the option, used as key in the value object */
        value: PropTypes.string,
        /** Tooltip information to display next to the checkbox */
        hint: PropTypes.shape({
            /** Title of the tooltip */
            title: PropTypes.string,
            /** Main content of the tooltip */
            body: PropTypes.string,
        }),
    }),
    /** Current checked state of the checkbox */
    value: PropTypes.bool,
    /** When true, prevents user from changing the checkbox state */
    isReadOnly: PropTypes.bool,
    /** Error message displayed below this specific checkbox */
    error: PropTypes.string,
    /** Theme color to use for the checkbox */
    color: PropTypes.string,
};

export default React.memo(CheckboxControl);
