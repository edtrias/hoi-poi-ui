import React, { useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { getOverrides, useClasses } from '../../../utils/overrides';
import Text from '../../typography/Text';
import Icon from '../Icon';

import { createUseStyles } from '../../../utils/styles';
import styles from './styles';
const useStyles = createUseStyles(styles, 'Breadcrumbs');

function Breadcrumbs({
    classes: classesProp,
    overrides: overridesProp,
    className: classNameProp,
    onClick,
    items,
    ...props
}) {
    const classes = useClasses(useStyles, classesProp);

    // Overrides
    const override = getOverrides(overridesProp, Breadcrumbs.overrides);

    // Classes
    const rootClassName = classnames(
        classes.root,
        {
            [classes.clickables]: !!onClick,
        },
        classNameProp,
    );

    const rootProps = {
        ...props,
        className: rootClassName,
    };

    const onClickItem = useCallback(
        (item) => {
            onClick && onClick(item);
        },
        [onClick],
    );

    const breadcrumbItems = useMemo(() => {
        if (!items) return null;
        return items.reduce((arr, item, idx) => {
            if (item) {
                const isLast = idx === items.length - 1;
                arr.push(
                    <div
                        key={item.id || idx}
                        className={classes.item}
                        onClick={isLast ? undefined : () => onClickItem(item)}
                        {...override.item}
                    >
                        <Text {...override.Text}>{item.text}</Text>
                    </div>,
                );
            }

            if (idx < items.length - 1) {
                arr.push(
                    <div
                        key={`divider-${idx}`}
                        className={classes.divider}
                        {...override.item}
                        {...override.divider}
                    >
                        <Icon name="arrowRightRaw" size="raw" color="currentColor"></Icon>
                    </div>,
                );
            }

            return arr;
        }, []);
    }, [
        classes.divider,
        classes.item,
        items,
        onClickItem,
        override.Text,
        override.divider,
        override.item,
    ]);

    return (
        <div {...rootProps} {...override.root}>
            {breadcrumbItems}
        </div>
    );
}

Breadcrumbs.overrides = ['root', 'item', 'divider'];

Breadcrumbs.propTypes = {
    /** Custom CSS class for styling the breadcrumbs container */
    className: PropTypes.string,
    /** Object with custom style overrides for inner elements */
    overrides: PropTypes.object,
    /** Function called when a breadcrumb item is clicked, receives the item object */
    onClick: PropTypes.func,
    /** Array of items to display in the breadcrumb trail */
    items: PropTypes.arrayOf(
        PropTypes.shape({
            /** Unique identifier for the breadcrumb item */
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
            /** Text displayed for the breadcrumb item */
            text: PropTypes.string.isRequired,
        }),
    ),
};

export default React.memo(Breadcrumbs);
