import React, { memo } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { getOverrides, useClasses } from '../../../utils/overrides';
import Radio from '../../forms/Radio';
import Icon from '../../general/Icon';
import Text from '../../typography/Text';

import { createUseStyles, useTheme } from '../../../utils/styles';
import styles from './styles';
const useStyles = createUseStyles(styles, 'RadioBox');

const RadioBox = ({
    icon,
    title,
    text,
    isReadOnly,
    className: classNameProp,
    classes: classesProp,
    overrides: overridesProp,
    children,
    checked = false,
    onChange = () => {},
    ...props
}) => {
    const theme = useTheme();
    const classes = useClasses(useStyles, classesProp);
    // Overrides
    const override = getOverrides(overridesProp, Radio.overrides);

    // Classes
    const rootClassNames = classnames(
        classes.root,
        {
            [classes.disabled]: isReadOnly,
            [classes.checked]: checked,
        },
        classNameProp,
    );

    return (
        <div className={rootClassNames} {...props} {...override.root}>
            <Icon
                className={classes.icon}
                name={icon}
                color={theme.colors.grey[500]}
                {...override.icon}
            />
            <div className={classes.content} {...override.content}>
                <Text type="h6" bold className={classes.title} {...override.title}>
                    {title}
                </Text>
                <Text className={classes.text} {...override.text}>
                    {text}
                </Text>
                {checked && children && <div className={classes.children}>{children}</div>}
            </div>
            <Radio
                className={classes.radio}
                checked={checked}
                onChange={onChange}
                isDisabled={isReadOnly}
                {...override.radio}
            />
        </div>
    );
};

RadioBox.overrides = ['root', 'icon', 'content', 'title', 'text', 'radio'];

RadioBox.propTypes = {
    /** Icon name to be displayed in the component */
    icon: PropTypes.string,
    /** Main heading text for the RadioBox */
    title: PropTypes.string,
    /** Descriptive text providing additional information */
    text: PropTypes.string,
    /** Determines if the radio is selected */
    checked: PropTypes.bool,
    /** Custom CSS class for styling */
    className: PropTypes.string,
    /** When true, the component is in read-only state and cannot be interacted with */
    isReadOnly: PropTypes.bool,
    /** Callback function triggered when the radio selection changes */
    onChange: PropTypes.func,
    /** Object with custom style overrides */
    overrides: PropTypes.object,
};

export default memo(RadioBox);
