import React, { useMemo, memo, useCallback } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { getOverrides, useClasses } from '../../../utils/overrides';
import { createUseStyles } from '../../../utils/styles';
import Text from '../../typography/Text';

import styles from './styles';

const useStyles = createUseStyles(styles, 'Table');

function Table({
    classes: classesProp,
    overrides: overridesProp,
    containerClass,
    rowsClass,
    rowClass,
    headerClass,
    cellClass,
    loadingComp,
    isHeaderFixed,
    getRowStyle,
    getColumnStyle,
    isEvenBackground,
    isOddBackground,
    isHeaderHighlighted,
    rows = [],
    columns = [],
    withHeaders = false,
    emptyTable = 'NO ROWS',
}) {
    const classes = useClasses(useStyles, classesProp);
    const override = getOverrides(overridesProp, Table.overrides);

    const rootClassName = classnames(classes.root, containerClass, {
        [classes.scrollAll]: !isHeaderFixed,
    });
    const rowsClassName = classnames(classes.rows, rowsClass, {
        [classes.scrollRows]: isHeaderFixed,
        [classes.rowsWithHeader]: withHeaders,
        [classes.evenBackground]: isEvenBackground,
        [classes.oddBackground]: isOddBackground,
    });
    const rowClassName = classnames(classes.row, rowClass);
    const headerClassName = classnames(classes.row, classes.header, headerClass, {
        [classes.headerHighlighted]: isHeaderHighlighted,
    });
    const cellClassName = classnames(classes.cell, cellClass);
    const emptyTableClasses = classnames(classes.row, classes.emptyTable);

    const getInnerColumnStyle = useCallback(
        ({ column, isHeader, index }) => {
            let style = {};
            if (!column.style && !column.width && !getColumnStyle) return {};
            if (column.style) return column.style;
            if (column.width) style = { ...style, width: column.width, flex: 'none' };
            if (getColumnStyle)
                style = { ...style, ...(getColumnStyle({ column, index, isHeader }) || {}) };

            return style;
        },
        [getColumnStyle],
    );

    const showHeaders = useMemo(
        () => (
            <div className={headerClassName} {...override.headerRow}>
                {columns.map((column, key) => {
                    const innerHeaderClassName = classnames(classes.cell, {
                        [classes.alignLeft]: column?.headerAlign === 'left',
                        [classes.alignCenter]: column?.headerAlign === 'center',
                        [classes.alignRight]: column?.headerAlign === 'right',
                    });

                    return (
                        <div
                            key={key}
                            className={innerHeaderClassName}
                            {...override.headerCell}
                            style={getInnerColumnStyle({ column, index: key, isHeader: true })}
                        >
                            <Text bold isTruncated {...override.headerText}>
                                {column.label}
                            </Text>
                        </div>
                    );
                })}
            </div>
        ),
        [
            classes.cell,
            classes.alignLeft,
            classes.alignCenter,
            classes.alignRight,
            headerClassName,
            columns,
            override.headerCell,
            override.headerRow,
            override.headerText,
            getInnerColumnStyle,
        ],
    );

    const showRows = useMemo(() => {
        return rows.map((row, index) => {
            const rowStyle = getRowStyle?.({ row, index }) || {};

            return (
                <div
                    key={index}
                    className={rowClassName}
                    {...row.props}
                    {...override.row}
                    style={rowStyle}
                >
                    {columns.map((column, key) => {
                        const innerCellClassName = classnames(cellClassName, {
                            [classes.alignLeft]: column?.align === 'left',
                            [classes.alignCenter]: column?.align === 'center',
                            [classes.alignRight]: column?.align === 'right',
                        });
                        if (typeof row[column.id] === 'function') {
                            return (
                                <div
                                    key={key}
                                    className={innerCellClassName}
                                    style={getInnerColumnStyle({
                                        column,
                                        index: key,
                                        isHeader: true,
                                    })}
                                    {...override.cell}
                                >
                                    {row[column.id]}
                                </div>
                            );
                        } else {
                            return (
                                <div
                                    key={key}
                                    className={innerCellClassName}
                                    style={getInnerColumnStyle({
                                        column,
                                        index: key,
                                        isHeader: true,
                                    })}
                                    {...override.cell}
                                >
                                    <Text isTruncated {...override.cellText}>
                                        {row[column.id]}
                                    </Text>
                                </div>
                            );
                        }
                    })}
                </div>
            );
        });
    }, [
        classes.alignLeft,
        classes.alignCenter,
        classes.alignRight,
        rows,
        rowClassName,
        override.row,
        override.cell,
        override.cellText,
        columns,
        cellClassName,
        getRowStyle,
        getInnerColumnStyle,
    ]);

    return (
        <div className={rootClassName} {...override.root}>
            {withHeaders && showHeaders}
            {!rows.length && loadingComp && loadingComp}
            {!rows.length && !loadingComp && emptyTable && (
                <div className={emptyTableClasses} {...override.emptyTable}>
                    {emptyTable}
                </div>
            )}
            {!!rows.length && (
                <div className={rowsClassName} {...override.rows}>
                    {showRows}
                </div>
            )}
        </div>
    );
}

Table.overrides = [
    'root',
    'headerRow',
    'headerCell',
    'headerText',
    'row',
    'cell',
    'cellText',
    'emptyTable',
];

Table.propTypes = {
    /** Array of data objects to be displayed as table rows */
    rows: PropTypes.array,
    /** Array of column configuration objects with 'label' and 'id' properties */
    columns: PropTypes.array,
    /** Classes object provided by the styling system */
    classes: PropTypes.object,
    /** Object with custom style overrides for inner elements */
    overrides: PropTypes.object,
    /** Custom className for the table container */
    containerClass: PropTypes.string,
    /** Custom className for table rows */
    rowClass: PropTypes.string,
    /** Custom className for the header row */
    headerClass: PropTypes.string,
    /** Custom className for table cells */
    cellClass: PropTypes.string,
    /** When true, displays column headers at the top of the table */
    withHeaders: PropTypes.bool,
    /** Component to display during loading state */
    loadingComp: PropTypes.any,
    /** Content to display when there are no rows */
    emptyTable: PropTypes.any,
    /** When true, keeps the header visible when scrolling */
    isHeaderFixed: PropTypes.bool,
    /** Function that receives a row and returns custom styles for that row */
    getRowStyle: PropTypes.func,
    /** Function that receives a column and returns custom styles for that column */
    getColumnStyle: PropTypes.func,
    /** When true, applies background color to even rows */
    isEvenBackground: PropTypes.bool,
    /** When true, applies background color to odd rows */
    isOddBackground: PropTypes.bool,
    /** When true, applies highlight styling to the header row */
    isHeaderHighlighted: PropTypes.bool,
};

export default memo(Table);
