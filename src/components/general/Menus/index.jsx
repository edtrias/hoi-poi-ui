import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { getOverrides, useClasses } from '../../../utils/overrides';

import RCMenu, { SubMenu, MenuItem } from 'rc-menu';

import { createUseStyles } from '../../../utils/styles';
import styles from './styles';
const useStyles = createUseStyles(styles, 'Menus');

const SIZES = {
    small: 140,
    medium: 220,
    large: 300,
};

function Menus({
    title,
    icon,
    items,
    classes: classesProp,
    overrides: overridesProp,
    className: classNameProp,
    classNameMenu,
    triggerAction = 'click',
    size = 'large',
}) {
    const popupSize = SIZES[size];
    const classes = useClasses(useStyles, classesProp, { popupSize });
    // Overrides
    const override = getOverrides(overridesProp, Menus.overrides);

    // Classes
    const rootClassName = classnames(classes.root, classNameProp);
    const menuClassName = classnames(classes.subMenu, classNameMenu);

    const menuProps = {
        mode: 'horizontal',
        className: classes.menu,
        triggerSubMenuAction: triggerAction,
        ...override['rc-menu'],
    };

    const subMenuProps = {
        title: (
            <Fragment>
                {icon && icon}
                {title && title}
            </Fragment>
        ),
        popupClassName: menuClassName,
        ...override['rc-menu-sub-menu'],
    };

    return (
        <div className={rootClassName} {...override.root}>
            <RCMenu {...menuProps}>
                <SubMenu key="rc-menu-sub-menu" {...subMenuProps}>
                    {items &&
                        items.map((item, id) => (
                            <Fragment>
                                {!item.divider && (
                                    <MenuItem
                                        key={id}
                                        itemIcon={item.icon}
                                        onClick={item.onClick}
                                        className={
                                            item.infoItem
                                                ? classnames(classes.menuItem, item.className)
                                                : classnames(
                                                      classes.menuItem,
                                                      item.className,
                                                      classes.clickable,
                                                  )
                                        }
                                    >
                                        <div className={classes.menuItemContent}>
                                            {item.title}
                                            {item.description}
                                        </div>
                                    </MenuItem>
                                )}
                                {item.divider && <div className={classes.divider} />}
                            </Fragment>
                        ))}
                </SubMenu>
            </RCMenu>
        </div>
    );
}

Menus.overrides = ['root', 'rc-menu', 'rc-menu-sub-menu'];

Menus.propTypes = {
    /** Content to display in the menu trigger button/element */
    title: PropTypes.any,
    /** Icon to display in the menu trigger button/element */
    icon: PropTypes.object,
    /** Custom CSS class for styling the main container */
    className: PropTypes.string,
    /** Custom CSS class for styling the dropdown menu container */
    classNameMenu: PropTypes.string,
    /**
     * Object with custom style overrides for inner elements.
     * You can override styles for 'root', 'rc-menu', and 'rc-menu-sub-menu'.
     */
    overrides: PropTypes.object,
    /**
     * Array of items to display in the dropdown menu.
     * Each item can have a title, icon, onClick handler, and infoItem flag.
     * Items with the divider property set to true will render a separator line.
     */
    items: PropTypes.arrayOf(
        PropTypes.shape({
            /** Content to display as the item text */
            title: PropTypes.any,
            /** Additional description text to display under the title */
            description: PropTypes.any,
            /** Icon to display next to the item text */
            icon: PropTypes.object,
            /** When true, indicates this is an informational item that is not clickable */
            infoItem: PropTypes.bool,
            /** Function called when the item is clicked */
            onClick: PropTypes.func,
            /** When true, renders a horizontal divider instead of a menu item */
            divider: PropTypes.bool,
            /** Custom CSS class for styling this specific menu item */
            className: PropTypes.string,
        }),
    ),
    /**
     * Action that triggers the dropdown menu to open.
     * 'click': Opens on click (default)
     * 'hover': Opens on hover
     */
    triggerAction: PropTypes.oneOf(['hover', 'click']),
    /**
     * Size of the dropdown menu width.
     * 'small': 140px
     * 'medium': 220px
     * 'large': 300px (default)
     */
    size: PropTypes.oneOf(['small', 'medium', 'large']),
};

export default React.memo(Menus);
