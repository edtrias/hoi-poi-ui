import React from 'react';
import PropTypes from 'prop-types';

import classnames from 'classnames';
import { getOverrides, useClasses } from '../../../utils/overrides';
import Popover from '../../utils/Popover';
import Icon from '../../general/Icon';
import Text from '../../typography/Text';

import { createUseStyles } from '../../../utils/styles';
import styles from './styles';
const useStyles = createUseStyles(styles, 'Label');

function Label({
    children,
    classes: classesProp,
    overrides: overridesProp,
    className: classNameProp,
    isRequired,
    hint,
    ...props
}) {
    const classes = useClasses(useStyles, classesProp);
    // Overrides
    const override = getOverrides(overridesProp, Text.overrides);

    // Classes
    const rootClassName = classnames(classes.root, classNameProp);

    const rootProps = {
        className: rootClassName,
    };

    return (
        <span {...rootProps} {...override.root}>
            <Text className={classes.Text} {...override.Text}>
                {children}
                {isRequired && '*'}
            </Text>
            {hint && (
                <Popover
                    className={classes.Popover}
                    placement="top"
                    trigger={['hover']}
                    content={hint}
                    {...override.Popover}
                >
                    <span className={classes.info}>
                        <Icon className={classes.icon} name="info" />
                    </span>
                </Popover>
            )}
        </span>
    );
}

Text.overrides = ['root', 'Popover', 'Text'];

Text.defaultProps = {
    overrides: {},
};

Text.propTypes = {
    className: PropTypes.string,
    overrides: PropTypes.object,
    isRequired: PropTypes.bool,
    hint: PropTypes.string,
};

export default React.memo(Label);
