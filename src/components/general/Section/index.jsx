import React, { memo, useState, useCallback, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import AnimateHeight from 'react-animate-height';

import Icon from '../../general/Icon';
import BadgeNotification from '../../general/BadgeNotification';
import Text from '../../typography/Text';
import { getOverrides, useClasses } from '../../../utils/overrides';

import { createUseStyles } from '../../../utils/styles';
import styles from './styles';
const useStyles = createUseStyles(styles, 'Section');

const Section = memo(
    ({
        isOpen: isOpenProp,
        children,
        classes: classesProp,
        overrides: overridesProp,
        className: classNameProp,
        title,
        isExpandable,
        defaultOpen,
        onChange,
        onRemove,
        activeFields,
        orientation,
        headerPreComponent,
        headerPostComponent,
    }) => {
        const classes = useClasses(useStyles, classesProp);
        const [isOpen, setIsOpen] = useState(onChange ? isOpenProp : defaultOpen);

        useEffect(() => {
            if (onChange) setIsOpen(isOpenProp);
        }, [isOpenProp, onChange]);

        const override = getOverrides(overridesProp, Section.overrides);

        const rootClassName = classnames(
            classes.root,
            {
                [classes.horizontal]: orientation === 'horizontal',
            },
            classNameProp,
        );

        const headerClassName = classnames(classes.header, {
            [classes.isExpandable]: isExpandable,
            [classes.open]: isOpen,
            [classes.headerActiveFields]: !!activeFields,
            [classes.withRemove]: !!onRemove,
        });

        const onToggle = useCallback(() => {
            onChange && onChange(!isOpen);
            !onChange && setIsOpen(!isOpen);
        }, [isOpen, onChange]);

        const onInnerRemove = useCallback(
            (e) => {
                e.preventDefault();
                e.stopPropagation();
                onRemove && onRemove();
            },
            [onRemove],
        );

        const renderTitle = useMemo(() => {
            if (typeof title === 'string') {
                return (
                    <div className={classes.textContainer} {...override.textContainer}>
                        <Text medium type="subtitle" className={classes.Text} {...override.Text}>
                            {title}
                        </Text>
                    </div>
                );
            }
            return title;
        }, [classes.Text, classes.textContainer, override.Text, override.textContainer, title]);

        const newActiveFields = useMemo(() => {
            if (!activeFields || isOpen) return null;
            return (
                <BadgeNotification
                    size="small"
                    className={classes.BadgeNotification}
                    {...override.BadgeNotification}
                >
                    {activeFields}
                </BadgeNotification>
            );
        }, [classes, override, activeFields, isOpen]);

        if (title && isExpandable) {
            return (
                <div className={rootClassName} {...override.root}>
                    <div className={headerClassName} onClick={onToggle} {...override.header}>
                        <div className={classes.headerContent} {...override.headerContent}>
                            {headerPreComponent}
                            <div className={classes.titleContainer} {...override.titleContainer}>
                                <div className={classes.icon} {...override.icon}>
                                    <Icon name="arrowDropDown" />
                                </div>
                                {renderTitle}
                            </div>
                            {newActiveFields}
                            {headerPostComponent}
                            {onRemove && (
                                <Icon
                                    onClick={onInnerRemove}
                                    className={classes.trashIcon}
                                    name="delete"
                                />
                            )}
                        </div>
                    </div>
                    <AnimateHeight
                        height={isOpen ? 'auto' : 0}
                        {...override['react-animate-height']}
                    >
                        {children}
                    </AnimateHeight>
                </div>
            );
        } else if (title && !isExpandable) {
            return (
                <div className={rootClassName} {...override.root}>
                    <div className={headerClassName} {...override.header}>
                        <div className={classes.headerContent} {...override.headerContent}>
                            <div className={classes.titleContainer} {...override.titleContainer}>
                                {renderTitle}
                            </div>
                            {newActiveFields}
                        </div>
                    </div>
                    {children}
                </div>
            );
        }
        return (
            <div className={rootClassName} {...override.root}>
                {children}
            </div>
        );
    },
);

Section.overrides = ['root', 'header', 'Text', 'BadgeNotification', 'icon', 'react-animate-height'];

Section.defaultProps = {
    isExpandable: true,
    defaultOpen: true,
    overrides: {},
};
Section.propTypes = {
    /** Custom CSS class for styling the root element */
    className: PropTypes.string,
    /** Title displayed in the section header. Can be a string or custom component */
    title: PropTypes.any,
    /** Component to render before the title in the header */
    headerPreComponent: PropTypes.any,
    /** Component to render after the title in the header */
    headerPostComponent: PropTypes.any,
    /** Determines if the section is initially open when in uncontrolled mode */
    defaultOpen: PropTypes.bool,
    /** When true, allows the section to be expanded and collapsed */
    isExpandable: PropTypes.bool,
    /** Number of active fields to display in a badge when the section is collapsed */
    activeFields: PropTypes.number,
    /** Callback triggered when the section is expanded or collapsed. Makes the component controlled */
    onChange: PropTypes.func,
    /** Callback triggered when the remove icon is clicked */
    onRemove: PropTypes.func,
    /** Controls the open/closed state when in controlled mode */
    isOpen: PropTypes.bool,
    /** Object with custom style overrides */
    overrides: PropTypes.shape({
        /** Styles applied to the root element */
        root: PropTypes.object,
        /** Styles applied to the header element */
        header: PropTypes.object,
        /** Styles applied to the title text component */
        Text: PropTypes.object,
        /** Styles applied to the dropdown icon */
        icon: PropTypes.object,
        /** Styles applied to the badge notification component */
        BadgeNotification: PropTypes.object,
        /** Styles applied to the animation container */
        'react-animate-height': PropTypes.object,
        /** Styles applied to the text container */
        textContainer: PropTypes.object,
        /** Styles applied to the title container */
        titleContainer: PropTypes.object,
        /** Styles applied to the header content container */
        headerContent: PropTypes.object,
    }),
    /** Orientation of the section content ('horizontal' or 'vertical') */
    orientation: PropTypes.oneOf(['horizontal', 'vertical']),
};

export default Section;
