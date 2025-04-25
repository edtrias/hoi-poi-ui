import React, { useState, useCallback, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Treebeard } from 'react-treebeard';

import { getOverrides, useClasses } from '../../../utils/overrides';
import Icon from '../Icon';

import { createUseStyles, useTheme } from '../../../utils/styles';
import styles from './styles';
const useStyles = createUseStyles(styles, 'Tree');

const Tree = ({
    overrides: overridesProp,
    id,
    classes: classesProp,
    onToggle,
    onSelect,
    canSelectParents,
    nodes = {},
    customs = {},
}) => {
    const classes = useClasses(useStyles, classesProp);
    const [data, setData] = useState(nodes);
    const [cursor, setCursor] = useState(false);
    const theme = useTheme();

    useEffect(() => {
        setData(nodes);
    }, [nodes]);

    const override = getOverrides(overridesProp, Tree.overrides);

    const onToggleNode = useCallback(
        (node, toggled) => {
            if (node.children) node.toggled = toggled;
            setData({ ...data });
            onToggle && onToggle(node);
        },
        [data, onToggle],
    );

    const onSelectNode = useCallback(
        (node) => {
            if (cursor) cursor.active = false;
            if (canSelectParents || !node.children || !node.children.length) node.active = true;
            else node.active = false;
            if (cursor && node && data.id !== node.id) data.active = false;
            setData({ ...data });
            setCursor(node);
            onSelect && onSelect(node);
        },
        [canSelectParents, cursor, data, onSelect],
    );

    const treeStyle = useMemo(
        () => ({
            tree: {
                base: {
                    listStyle: 'none',
                    background: theme.colors.transparent,
                    margin: 0,
                    padding: 0,
                },
                node: {
                    base: {
                        position: 'relative',
                    },
                    subtree: {
                        listStyle: 'none',
                        paddingLeft: '19px',
                    },
                },
            },
        }),
        [],
    );

    const decorators = useMemo(
        () => ({
            Container: (props) => {
                if (customs.Container) return <customs.Container {...props} />;

                const isSelectable =
                    (canSelectParents || !props.node.children || !props.node.children.length) &&
                    !props.node.isDisabled;

                const nodeClasses = classnames(classes.node, {
                    [`HoiPoi__Tree__${id}__node-id-${props.node.id}`]: id && props.node.id,
                    [classes.toggled]: props.node.toggled,
                    [classes.active]: props.node.active,
                    [classes.empty]: !props.node.children || !props.node.children.length,
                    [classes.isDisabled]: props.node.isDisabled,
                    [classes.isSelectable]: isSelectable,
                });

                const NodeIcon = (
                    <div
                        className={classes.nodeIcon}
                        onClick={!props.node.isDisabled ? props.onClick : undefined}
                        {...override.nodeIcon}
                    >
                        {customs.NodeIcon ? (
                            <customs.NodeIcon {...props} />
                        ) : (
                            <Icon name="chevron" size="small" />
                        )}
                    </div>
                );

                const NodeItem = (
                    <div
                        className={classes.nodeItem}
                        onClick={
                            !props.node.isDisabled ? () => onSelectNode(props.node) : undefined
                        }
                        {...override.nodeItem}
                    >
                        {customs.NodeItem ? <customs.NodeItem {...props} /> : props.node.name}
                    </div>
                );

                const Node = customs.Node ? (
                    <customs.Node {...props} NodeIcon={NodeIcon} NodeItem={NodeItem} />
                ) : (
                    <div className={nodeClasses} {...override.node}>
                        {NodeIcon}
                        {NodeItem}
                    </div>
                );

                return Node;
            },
        }),
        [
            customs.Container,
            customs.NodeIcon,
            customs.NodeItem,
            customs.Node,
            canSelectParents,
            classes.node,
            classes.toggled,
            classes.active,
            classes.empty,
            classes.isDisabled,
            classes.isSelectable,
            classes.nodeIcon,
            classes.nodeItem,
            id,
            override.nodeIcon,
            override.nodeItem,
            override.node,
            onSelectNode,
        ],
    );

    return (
        <Treebeard
            data={data}
            onToggle={onToggleNode}
            decorators={decorators}
            style={treeStyle}
            {...override.root}
        />
    );
};

Tree.overrides = ['root', 'node', 'nodeItem', 'nodeIcon'];

Tree.propTypes = {
    /** Unique identifier for the tree, useful for custom styling and targeting specific tree instances */
    id: PropTypes.any,
    /** Function called when a node is toggled (expanded/collapsed). Receives the node object as parameter */
    onToggle: PropTypes.func,
    /** Function called when a node is selected. Receives the selected node object as parameter */
    onSelect: PropTypes.func,
    /** Tree data structure defining the nodes hierarchy. Should be a nested object with specific properties */
    nodes: PropTypes.shape({
        /** Unique identifier for the node, used for selection and state tracking */
        id: PropTypes.any,
        /** Text label displayed for the node */
        name: PropTypes.string,
        /** Array of child nodes with the same structure */
        children: PropTypes.array,
        /** Determines if the node is expanded (true) or collapsed (false) */
        toggled: PropTypes.bool,
        /** Determines if the node is currently selected */
        active: PropTypes.bool,
        /** When true, the node cannot be selected or toggled */
        isDisabled: PropTypes.bool,
        /** Determines if the node can be selected (this is automatically determined based on node type and canSelectParents) */
        isSelectable: PropTypes.bool,
    }),
    /** When true, allows parent nodes with children to be selectable. When false, only leaf nodes can be selected */
    canSelectParents: PropTypes.bool,
    /** Custom components to override default tree rendering for advanced customization */
    customs: PropTypes.shape({
        /** Custom container component that wraps the entire node structure */
        Container: PropTypes.func,
        /** Custom node component that renders the entire node (including icon and content) */
        Node: PropTypes.func,
        /** Custom icon component for node expansion/collapse indicators */
        NodeIcon: PropTypes.func,
        /** Custom component for rendering the content/label of each node */
        NodeItem: PropTypes.func,
    }),
    /** Custom classes applied to the component's root element and inner elements */
    classes: PropTypes.object,
    /** Override the styles of any part of the component. Accepts overrides for 'root', 'node', 'nodeItem', and 'nodeIcon' */
    overrides: PropTypes.object,
};

export default React.memo(Tree);
