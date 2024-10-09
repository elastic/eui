import React, {
  useEffect,
  useCallback,
  useRef,
  useMemo,
  memo,
  forwardRef,
  PropsWithChildren,
  CSSProperties,
} from 'react';
import { VariableSizeList } from 'react-window';
import { css } from '@emotion/react';

import {
  EuiDataGridCustomBodyProps,
  EuiAutoSizer,
  useEuiTheme,
  logicalCSS,
} from '../../../../../../src';

import { raw_data } from './data_columns_cells';
import CustomEuiDataGrid from './data_grid';

type CustomTimelineDataGridSingleRowProps = {
  rowIndex: number;
  setRowHeight: (index: number, height: number) => void;
  maxWidth: number | undefined;
} & Pick<EuiDataGridCustomBodyProps, 'visibleColumns' | 'Cell'>;

const Row = memo(
  ({
    rowIndex,
    visibleColumns,
    setRowHeight,
    Cell,
  }: CustomTimelineDataGridSingleRowProps) => {
    const { euiTheme } = useEuiTheme();
    const styles = {
      row: css`
        ${logicalCSS('width', 'fit-content')};
        ${logicalCSS('border-bottom', euiTheme.border.thin)};
        background-color: ${euiTheme.colors.emptyShade};
      `,
      rowCellsWrapper: css`
        display: flex;
      `,
      rowDetailsWrapper: css`
        /* Extra specificity needed to override EuiDataGrid's default styles */
        && .euiDataGridRowCell__content {
          display: block;
          padding: 0;
        }
      `,
    };
    const rowRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (rowRef.current) {
        setRowHeight(rowIndex, rowRef.current.offsetHeight);
      }
    }, [Cell, rowIndex, setRowHeight]);

    return (
      <div ref={rowRef} role="row" css={styles.row} key={rowIndex}>
        <div css={styles.rowCellsWrapper}>
          {visibleColumns.map((column, colIndex) => {
            // Skip the row details cell - we'll render it manually outside of the flex wrapper
            if (column.id !== 'row-details') {
              return (
                <Cell
                  colIndex={colIndex}
                  visibleRowIndex={rowIndex}
                  key={`${rowIndex},${colIndex}`}
                />
              );
            }
          })}
        </div>
        <div css={styles.rowDetailsWrapper}>
          <Cell
            rowHeightsOptions={{
              defaultHeight: 'auto',
            }}
            /* @ts-expect-error because currently CellProps do not allow string width but it is important to be passed for height calculations   */
            width={'100%'}
            colIndex={visibleColumns.length - 1} // If the row is being shown, it should always be the last index
            visibleRowIndex={rowIndex}
          />
        </div>
      </div>
    );
  }
);
Row.displayName = 'Row';

export const CustomVirtualizedGridBody = memo(
  ({
    Cell,
    visibleColumns,
    visibleRowData,
    setCustomGridBodyProps,
    headerRow,
    footerRow,
  }: EuiDataGridCustomBodyProps) => {
    // Ensure we're displaying correctly-paginated rows
    const visibleRows = raw_data.slice(
      visibleRowData.startRow,
      visibleRowData.endRow
    );

    // Set custom props onto the grid body wrapper
    const bodyRef = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
      setCustomGridBodyProps({
        ref: bodyRef,
        onScroll: () => console.debug('scrollTop:', bodyRef.current?.scrollTop),
      });
    }, [setCustomGridBodyProps]);

    const listRef = useRef<VariableSizeList<unknown>>(null);
    const rowHeights = useRef<number[]>([]);

    const setRowHeight = useCallback((index: number, height: number) => {
      if (rowHeights.current[index] === height) return;
      listRef.current?.resetAfterIndex(index);

      rowHeights.current[index] = height;
    }, []);

    const getRowHeight = useCallback((index: number) => {
      return rowHeights.current[index] ?? 100;
    }, []);

    const outer = useMemo(
      () =>
        forwardRef<HTMLDivElement, PropsWithChildren<{}>>(
          ({ children, ...rest }, ref) => {
            return (
              <div ref={ref} {...rest}>
                {headerRow}
                {children}
                {footerRow}
              </div>
            );
          }
        ),
      [headerRow, footerRow]
    );

    const inner = useMemo(
      () =>
        forwardRef<HTMLDivElement, PropsWithChildren<{ style: CSSProperties }>>(
          ({ children, style, ...rest }, ref) => {
            return (
              <div
                className="row-container"
                ref={ref}
                style={{ ...style, position: 'relative' }}
                {...rest}
              >
                {children}
              </div>
            );
          }
        ),
      []
    );

    return (
      <EuiAutoSizer disableWidth>
        {({ height }: { height: number }) => {
          return (
            <VariableSizeList
              ref={listRef}
              height={height}
              width="100%"
              itemCount={visibleRows.length}
              itemSize={getRowHeight}
              itemKey={(index) => `${height}-${visibleRows.length}-${index}`}
              outerElementType={outer}
              innerElementType={inner}
              overscanCount={0}
              layout="vertical"
            >
              {({ index: rowIndex, style }) => {
                return (
                  <div
                    className={`row-${rowIndex}`}
                    style={{ ...style }}
                    key={`${height}-${rowIndex}`}
                  >
                    <Row
                      rowIndex={rowIndex}
                      setRowHeight={setRowHeight}
                      visibleColumns={visibleColumns}
                      Cell={Cell}
                      maxWidth={100}
                    />
                  </div>
                );
              }}
            </VariableSizeList>
          );
        }}
      </EuiAutoSizer>
    );
  }
);
CustomVirtualizedGridBody.displayName = 'CustomVirtualizedGridBody';

export default () => (
  <CustomEuiDataGrid
    renderCustomGridBody={CustomVirtualizedGridBody}
    height={500}
  />
);
