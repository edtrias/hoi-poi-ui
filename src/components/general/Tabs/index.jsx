import React, { memo, useCallback, useEffect, useMemo, useState, Fragment, useRef } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import RCTabs, { TabPane } from 'rc-tabs';
import TabContent from 'rc-tabs/lib/TabContent';
import ScrollableInkTabBar from 'rc-tabs/lib/ScrollableInkTabBar';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import Icon from '../Icon';
import { getOverrides, useClasses } from '../../../utils/overrides';
import { createUseStyles } from '../../../utils/styles';

import DragWrapperContainer from './DragWrapperContainer';
import DragWrapperTab from './DragWrapperTab';
import styles from './styles';

const useStyles = createUseStyles(styles, 'Tabs');

function Tabs({
    children,
    classes: classesProp,
    overrides: overridesProp,
    className: classNameProp,
    onChange,
    onClose,
    activeKey,
    postComponent,
    vertical,
    containerElement,
    popoverOffsetCorrection = 0,
    popoverAlignLeft,
    position = 'top',
    tabs = [],
    editable = false,
    alwaysShowCloseTab = false,
    draggable,
    onSorting,
    ...props
}) {
    const [state, setState] = useState({
        tabs: [],
        activeKey: null,
    });
    const [popoverComponent, setPopoverComponent] = useState(null);
    const [popoverStyles, setPopoverStyles] = useState({});
    const tabRef = useRef(null);
    const classes = useClasses(useStyles, classesProp);
    // Overrides
    const override = getOverrides(overridesProp, Tabs.overrides);

    useEffect(() => {
        setState({ activeKey, tabs });
    }, [activeKey, tabs]);

    // Classes
    const rootClassName = classnames(
        classes.root,
        {
            [classes.withPostComponent]: postComponent,
            [classes.vertical]: vertical,
        },
        classNameProp,
    );

    const handleChange = useCallback(
        (key) => {
            setState((state) => ({ ...state, activeKey: key }));
            onChange && onChange(key);
        },
        [onChange],
    );

    const onMouseOut = useCallback((e) => {
        e?.stopPropagation();
        setPopoverComponent(null);
        setPopoverStyles({ display: 'none' });
    }, []);

    const onClickForPopover = useCallback((e) => {
        setPopoverComponent(null);
        setPopoverStyles({ display: 'none' });
    }, []);

    const handleClose = useCallback(
        (event, key) => {
            event.stopPropagation();

            let { activeKey, tabs } = state;
            let foundIndex = 0;

            const finalTabs = tabs.filter((tab, index) => {
                if (tab.key !== key) return true;
                foundIndex = index;
                return false;
            });

            if (activeKey === key) {
                if (!!foundIndex) foundIndex--;
                activeKey = finalTabs[foundIndex]?.key;
            }

            setState((state) => ({ ...state, activeKey, tabs: finalTabs }));
            onClose && onClose({ key, activeKey, tabs: finalTabs });
            onMouseOut();
        },
        [onClose, onMouseOut, state],
    );

    const findTab = useCallback(
        (key) => {
            const tab = state.tabs.filter((c) => `${c.key}` === key)[0];
            return {
                tab,
                index: state.tabs.indexOf(tab),
            };
        },
        [state.tabs],
    );
    const moveTab = useCallback(
        (key, atIndex) => {
            const { tab, index } = findTab(key);
            const newTabs = [...state.tabs];
            newTabs.splice(index, 1);
            newTabs.splice(atIndex, 0, tab);
            findTab({ activeKey, tabs: newTabs });
            setState((current) => ({ ...current, tabs: newTabs }));
            onSorting?.(newTabs);
        },
        [findTab, state.tabs, activeKey, onSorting],
    );

    const tabsProps = useMemo(
        () => ({
            ...props,
            activeKey: state.activeKey,
            onChange: handleChange,
            renderTabBar: () =>
                draggable ? (
                    <ScrollableInkTabBar>
                        {(node) => (
                            <DragWrapperTab id={node.key} moveTab={moveTab} findTab={findTab}>
                                {node}
                            </DragWrapperTab>
                        )}
                    </ScrollableInkTabBar>
                ) : (
                    <ScrollableInkTabBar />
                ),
            renderTabContent: () => <TabContent />,
            tabBarPosition: position,
            prefixCls: 'hoi-poi-ui__tabs',
            ...override['rc-tabs'],
        }),
        [draggable, findTab, handleChange, moveTab, override, position, props, state.activeKey],
    );

    const getParentNode = useCallback((target) => {
        let parentNode = null;
        if (target.classList.contains('[class*="HoiPoi__Tabs__tabWithPopover"]')) {
            parentNode = target?.parentNode || null;
        } else if (target.closest('[class*="HoiPoi__Tabs__tabWithPopover"]')) {
            parentNode = target?.closest('[class*="HoiPoi__Tabs__tabWithPopover"]') || null;
            parentNode = parentNode?.parentNode || null;
        }
        return parentNode;
    }, []);

    const getAbsolutePosition = useCallback((element) => {
        const rect = element.getBoundingClientRect();

        return {
            top: rect.top,
            bottom: rect.bottom,
            left: rect.left,
            right: rect.right,
        };
    }, []);

    const onMouseOver = useCallback(
        (e, popoverContent, popoverWidth = 100) => {
            e.stopPropagation();
            const element = tabRef.current || null;
            if (!element) return;

            let parentNode = null;

            parentNode = getParentNode(e.target);
            if (!parentNode) return;

            const { left, right } = getAbsolutePosition(parentNode);

            let tabWidth = right - left;
            let offsetToTabCenter = tabWidth / 2;

            let positionToTabCenter = left + offsetToTabCenter;
            const pixelsToPopoverCenter = popoverWidth / 2;

            let popoverStyles = {
                display: 'block',
                top: element.offsetTop + element.offsetHeight,
            };

            if (containerElement) {
                const containerElementPosition = getAbsolutePosition(containerElement);
                const canFit = tabWidth > popoverWidth;
                const differenceTabAndPopover = popoverWidth - tabWidth;
                const shadowOffset = 6;

                if (
                    !canFit &&
                    left - containerElementPosition.left + popoverOffsetCorrection <
                        differenceTabAndPopover
                ) {
                    popoverStyles.left = shadowOffset;
                } else if (
                    !canFit &&
                    containerElementPosition.right + popoverOffsetCorrection - right <
                        differenceTabAndPopover
                ) {
                    popoverStyles.right = shadowOffset;
                } else {
                    positionToTabCenter =
                        positionToTabCenter -
                        containerElementPosition.left -
                        popoverOffsetCorrection;
                    popoverStyles.left = positionToTabCenter - pixelsToPopoverCenter;
                }
            } else {
                popoverStyles.left = positionToTabCenter - pixelsToPopoverCenter;
            }

            if (popoverAlignLeft) popoverStyles.left = left;

            setPopoverComponent(popoverContent);
            setPopoverStyles(popoverStyles);
        },
        [
            getParentNode,
            getAbsolutePosition,
            popoverAlignLeft,
            containerElement,
            popoverOffsetCorrection,
        ],
    );

    const TabsEl = useMemo(() => {
        return (
            <RCTabs {...tabsProps}>
                {state.tabs.map(({ key, title, content, fixed, popoverContent, popoverWidth }) => {
                    let finalTitle = null;
                    if (popoverContent && state.activeKey !== key) {
                        finalTitle = (
                            <div
                                className={classes.tabWithPopover}
                                onMouseOver={(e) => onMouseOver(e, popoverContent, popoverWidth)}
                                onMouseOut={(e) => onMouseOut(e)}
                                onClick={onClickForPopover}
                            >
                                {title}
                                {!fixed && (
                                    <Icon
                                        name="close"
                                        size="small"
                                        onClick={(e) => handleClose(e, key)}
                                        {...override.close}
                                    />
                                )}
                            </div>
                        );
                    } else if (editable && (state.tabs.length > 1 || alwaysShowCloseTab)) {
                        finalTitle = (
                            <Fragment>
                                {title}
                                {!fixed && (
                                    <Icon
                                        name="close"
                                        size="small"
                                        onClick={(e) => handleClose(e, key)}
                                        {...override.close}
                                    />
                                )}
                            </Fragment>
                        );
                    } else finalTitle = title;

                    return (
                        <TabPane key={key} tab={finalTitle}>
                            {content}
                        </TabPane>
                    );
                })}
            </RCTabs>
        );
    }, [
        alwaysShowCloseTab,
        classes.tabWithPopover,
        editable,
        handleClose,
        onClickForPopover,
        onMouseOut,
        onMouseOver,
        override.close,
        state.activeKey,
        state.tabs,
        tabsProps,
    ]);

    const WrappedTabsEl = useMemo(() => {
        if (draggable) {
            return (
                <DndProvider backend={HTML5Backend}>
                    <DragWrapperContainer>{TabsEl}</DragWrapperContainer>
                </DndProvider>
            );
        } else {
            return TabsEl;
        }
    }, [TabsEl, draggable]);

    return (
        <div className={rootClassName} {...override.root} ref={tabRef}>
            {WrappedTabsEl}
            {postComponent && <div className={classes.postComponent}>{postComponent}</div>}
            {popoverComponent && (
                <div className={classes.popover} style={popoverStyles}>
                    {popoverComponent}
                </div>
            )}
        </div>
    );
}

Tabs.overrides = ['root', 'rc-tabs', 'close'];

Tabs.propTypes = {
    /** Custom CSS class for styling the root container */
    className: PropTypes.string,
    /** Object with custom style overrides */
    overrides: PropTypes.object,
    /** Array of tab objects that define the tabs to be displayed */
    tabs: PropTypes.arrayOf(
        PropTypes.shape({
            /** Unique identifier for the tab */
            key: PropTypes.string.isRequired,
            /** Text or component to display in the tab header */
            title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
            /** Content to display when the tab is active */
            content: PropTypes.node,
            /** Content to show in a popover when hovering over the tab */
            popoverContent: PropTypes.node,
            /** Width of the popover in pixels */
            popoverWidth: PropTypes.number,
            /** When true, the tab cannot be closed (used with editable=true) */
            fixed: PropTypes.bool,
        }),
    ),
    /** Key of the currently active tab */
    activeKey: PropTypes.string,
    /** Callback triggered when a tab is clicked. Receives the tab key as parameter */
    onChange: PropTypes.func,
    /** Callback triggered when a tab is closed. Receives an object with key, activeKey and tabs */
    onClose: PropTypes.func,
    /** Position of the tabs relative to content ('left', 'right', 'top', 'bottom') */
    position: PropTypes.oneOf(['left', 'right', 'top', 'bottom']),
    /** Component to display after the tabs */
    postComponent: PropTypes.node,
    /** When true, the tabs layout is vertical */
    vertical: PropTypes.bool,
    /** When true, tabs can be closed with an X icon */
    editable: PropTypes.bool,
    /** When true, tabs always show close button even if there's only one tab */
    alwaysShowCloseTab: PropTypes.bool,
    /** Reference to the container element for positioning popovers within a specific container */
    containerElement: PropTypes.any,
    /** Pixel offset correction for popover positioning */
    popoverOffsetCorrection: PropTypes.number,
    /** When true, aligns popover to the left edge of the tab instead of centering it */
    popoverAlignLeft: PropTypes.bool,
    /** When true, enables drag and drop reordering of tabs */
    draggable: PropTypes.bool,
    /** Callback triggered when tabs are reordered. Receives the new tabs array */
    onSorting: PropTypes.func,
};

export default memo(Tabs);
