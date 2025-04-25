import React, { memo, useState } from 'react';
import Icon from '../../general/Icon';
import Input from '../Input';
import { createUseStyles } from '../../../utils/styles';
import { useClasses } from '../../../utils/overrides';
import styles from './styles';
const useStyles = createUseStyles(styles, 'Password');

const Password = ({ classes: classesProp, ...props }) => {
    const classes = useClasses(useStyles, classesProp);
    const [type, setType] = useState('password');
    const icon = (
        <Icon
            onClick={() => setType(type === 'password' ? 'text' : 'password')}
            className={classes.visibility}
            name={type === 'password' ? 'visibilityOn' : 'visibilityOff'}
        />
    );
    return <Input {...props} classes={classesProp} type={type} postComponent={icon}></Input>;
};

Password.propTypes = {
    /**
     * The Password component inherits all properties from the Input component.
     * Additional features include:
     * - A visibility toggle icon that shows/hides password text
     * - Automatic handling of password/text input type switching
     *
     * See Input component documentation for all available props.
     */
    ...Input.propTypes,
};

export default memo(Password);
