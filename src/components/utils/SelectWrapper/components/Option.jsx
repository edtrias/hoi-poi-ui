import React, { memo } from 'react';
import Checkbox from '../../../general/Checkbox';
import Text from '../../../typography/Text';
import Icon from '../../../general/Icon';
import Avatar from '../../../general/Avatar';

const Option = memo(
    ({
        option,
        isMulti,
        classes,
        override,
        isSelected,
        onChange,
        checkboxColor,
        checkBoxIsMonotone,
    }) => {
        let rootClasses = [classes.option];
        if (option.isDisabled) rootClasses.push(classes.optionDisabled);
        if (option.subLabel) rootClasses.push(classes.optionTwoLines);
        if (isSelected) rootClasses.push(classes.optionSelected);
        let bulletClasses = [classes.optionLabelBullet];
        let iconClasses = [classes.optionLabelIcon];
        let customIconClasses = [classes.optionLabelCustomIcon];

        if (option.isDisabled) {
            bulletClasses.push(classes.optionLabelBulletDisabled);
            iconClasses.push(classes.optionDisabledIcon);
            customIconClasses.push(classes.optionDisabledIcon);
        } else if (option.type) {
            if (option.type === 'primary') bulletClasses.push(classes.optionLabelBulletPrimary);
            if (option.type === 'danger') bulletClasses.push(classes.optionLabelBulletDanger);
            if (option.type === 'success') bulletClasses.push(classes.optionLabelBulletSuccess);
        }

        return (
            <div
                className={rootClasses.join(' ')}
                {...(override.option || {})}
                onClick={!option.isDisabled ? onChange(option) : undefined}
            >
                {isMulti && (
                    <Checkbox
                        className={classes.optionCheckbox}
                        override={override.optionCheckbox || {}}
                        color={checkboxColor}
                        isMonotone={checkBoxIsMonotone}
                        isDisabled={option.isDisabled}
                        checked={isSelected}
                    />
                )}
                {option.type && (
                    <div
                        className={bulletClasses.join(' ')}
                        {...(override.optionLabelBullet || {})}
                    />
                )}
                {!isMulti && option.iconType && (
                    <Icon
                        className={iconClasses.join(' ')}
                        name={option.iconType}
                        color={option.iconColor || null}
                        size="medium"
                        {...override.optionLabelIcon}
                    />
                )}
                {!isMulti && option.icon && (
                    <div
                        className={customIconClasses.join(' ')}
                        {...override.optionLabelCustomIcon}
                    >
                        {option.icon}
                    </div>
                )}
                {!isMulti && option.src && (
                    <div className={classes.optionLabelAvatar} {...override.optionLabelAvatar}>
                        {option.isDisabled && (
                            <div
                                className={classes.optionDisabledAvatar}
                                {...override.optionDisabledAvatar}
                            />
                        )}
                        <Avatar
                            size="small"
                            src={option.src}
                            placeholder={option.placeholder || ''}
                            alt={option.alt}
                        />
                    </div>
                )}
                {!option.subLabel && (
                    <div className={classes.optionLabel} {...(override.optionLabel || {})}>
                        <Text type="body" isTruncated>
                            {option.label}
                        </Text>
                    </div>
                )}
                {!isMulti && option.subLabel && (
                    <div
                        className={classes.optionLabelBlock}
                        {...(override.optionLabelBlock || {})}
                    >
                        <div className={classes.optionLabel} {...(override.optionLabel || {})}>
                            <Text type="body" isTruncated>
                                {option.label}
                            </Text>
                        </div>
                        <div
                            className={classes.optionSubLabel}
                            {...(override.optionSubLabel || {})}
                        >
                            <Text type="caption" isTruncated color="neutral700">
                                {option.subLabel}
                            </Text>
                        </div>
                    </div>
                )}
            </div>
        );
    },
);

export default Option;
