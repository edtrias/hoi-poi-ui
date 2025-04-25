import React, { memo, useMemo, forwardRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Icon from '../Icon';
import Text from '../../typography/Text';

import { getOverrides, useClasses } from '../../../utils/overrides';
import { createUseStyles, useTheme } from '../../../utils/styles';
import styles from './styles';

const useStyles = createUseStyles(styles, 'List');

const List = forwardRef(
    (
        {
            bullet,
            classes: classesProp,
            className,
            items,
            overrides: overridesProp,
            type = 'unordered',
            unStyled = false,
        },
        ref,
    ) => {
        const classes = useClasses(useStyles, classesProp);
        const override = getOverrides(overridesProp, List.overrides);
        const theme = useTheme();

        const ListComponent = useMemo(() => (type === 'ordered' ? 'ol' : 'ul'), [type]);

        const rootProps = useMemo(
            () => ({
                className: classNames(className, classes.root, {
                    [classes.unStyled]: unStyled || !!bullet,
                }),
                ref,
                ...override.root,
            }),
            [bullet, className, classes.root, classes.unStyled, override.root, ref, unStyled],
        );

        const listItemProps = useMemo(
            () => ({
                className: classNames(classes.listItem, { [classes.withCustomBullet]: !!bullet }),
                ...override.listItem,
            }),
            [classes.listItem, classes.withCustomBullet, bullet, override.listItem],
        );

        const textProps = useMemo(
            () => ({
                className: classes.text,
                ...override.Text,
            }),
            [classes.text, override.Text],
        );

        const iconProps = useMemo(
            () => ({
                className: classes.bullet,
                name: bullet,
                color: theme.colors.actionMajor[500],
                ...override.Icon,
            }),
            [bullet, classes.bullet, override.Icon, theme.colors.actionMajor[500]],
        );

        const listItems = useMemo(
            () =>
                items.map((item, index) => (
                    <li key={index} {...listItemProps}>
                        {bullet && !unStyled && <Icon {...iconProps} />}
                        <Text {...textProps}>{item}</Text>
                    </li>
                )),
            [bullet, iconProps, items, listItemProps, textProps, unStyled],
        );

        return <ListComponent {...rootProps}>{listItems}</ListComponent>;
    },
);

List.overrides = ['root', 'listItem', 'Text', 'Icon'];

List.propTypes = {
    /** Custom styles that will merge with the default styles */
    classes: PropTypes.object,
    /** Custom CSS class for styling the list container */
    className: PropTypes.string,
    /**
     * Icon name to use as custom bullet points.
     * Any valid icon name available in the hoi-poi library.
     * When specified, the list will use icons instead of default bullets.
     */
    bullet: PropTypes.string,
    /**
     * Array of strings to display as list items.
     * Each string will be rendered as a separate list item.
     */
    items: PropTypes.arrayOf(PropTypes.string).isRequired,
    /**
     * Object with custom style overrides for inner elements.
     * You can override styles for 'root', 'listItem', 'Text', and 'Icon'.
     */
    overrides: PropTypes.object,
    /**
     * Type of list to render:
     * - 'unordered': Bulleted list (default)
     * - 'ordered': Numbered list
     * - 'unstyled': List without bullets or numbers
     */
    type: PropTypes.oneOf(['unordered', 'ordered', 'unstyled']),
    /**
     * When true, removes the default bullets or numbers.
     * Useful when you want to create a list without any markers,
     * or when using custom bullet icons.
     */
    unStyled: PropTypes.bool,
};

export default memo(List);
