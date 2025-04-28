import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import ReactSwitch from 'react-switch';
import { getOverrides, useClasses } from '../../../utils/overrides';
import { createUseStyles, useTheme } from '../../../utils/styles';
import { getVar } from '../../../utils/getVar';

import styles from './styles';

const useStyles = createUseStyles(styles, 'Switch');

const sizes = {
    small: { handle: 12, width: 28, height: 16 },
    medium: { handle: 16, width: 36, height: 20 },
    large: { handle: 20, width: 44, height: 24 },
};

function Switch({
    classes: classesProp,
    className: classNameProp,
    isDisabled,
    overrides: overridesProp,
    checked = false,
    onChange = () => {},
    size = 'medium',
    ...props
}) {
    const classes = useClasses(useStyles, classesProp);
    const theme = useTheme();
    // Overrides
    const override = getOverrides(overridesProp, Switch.overrides);
    const [hovered, setHovered] = useState(false);

    // Classes
    const rootClassName = classnames(
        classes.root,
        {
            [classes.disabledOn]: checked && isDisabled,
            [classes.disabledOff]: !checked && isDisabled,
        },
        classNameProp,
    );

    const rootProps = {
        className: rootClassName,
    };

    const onChangeSwitch = useCallback(
        (...args) => {
            if (isDisabled) return;
            onChange && onChange(...args);
        },
        [isDisabled, onChange],
    );
    const onHover = useCallback((value) => setHovered(value), []);

    return (
        <div
            onMouseOver={() => onHover(true)}
            onMouseLeave={() => onHover(false)}
            {...rootProps}
            {...override.root}
        >
            <ReactSwitch
                className={classes.Switch}
                onChange={onChangeSwitch}
                checked={checked}
                disabled={isDisabled}
                offColor={
                    hovered && !isDisabled
                        ? getVar(theme.colors.actionMinor[600])
                        : getVar(theme.colors.actionMinor[500])
                }
                onColor={
                    hovered && !isDisabled
                        ? getVar(theme.colors.actionMajor[600])
                        : getVar(theme.colors.actionMajor[500])
                }
                offHandleColor={getVar(theme.colors.primary.white)}
                onHandleColor={getVar(theme.colors.primary.white)}
                boxShadow={null}
                activeBoxShadow={null}
                handleDiameter={sizes[size].handle}
                width={sizes[size].width}
                height={sizes[size].height}
                uncheckedIcon={false}
                checkedIcon={false}
                {...override.Switch}
            />
        </div>
    );
}

Switch.overrides = ['root', 'Switch'];

Switch.propTypes = {
    /** Current state of the switch - true for on/checked, false for off/unchecked */
    checked: PropTypes.bool,
    /** Custom className for styling purposes */
    className: PropTypes.string,
    /** When true, the switch cannot be toggled and appears grayed out */
    isDisabled: PropTypes.bool,
    /** Size variant of the switch - affects both width and height */
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    /** Function called when the switch is toggled with the new state (true/false) as parameter */
    onChange: PropTypes.func,
    /** Object with custom style overrides for inner elements */
    overrides: PropTypes.object,
};

export default React.memo(Switch);
