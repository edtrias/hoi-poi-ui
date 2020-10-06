import React, { memo, useMemo, useCallback } from 'react';
import Input from '../Input';
import Icon from '../../general/Icon';

const Select = memo(({ ...props }) => {
    const onClickDropDown = useCallback(() => {
        console.log('clicked');
    }, []);

    const postComponent = useMemo(() => {
        return <Icon name="arrowDropDown" size="medium" onClick={onClickDropDown} />;
    }, [onClickDropDown]);

    return <Input type="select" postComponent={postComponent} {...props}></Input>;
});

export default Select;
