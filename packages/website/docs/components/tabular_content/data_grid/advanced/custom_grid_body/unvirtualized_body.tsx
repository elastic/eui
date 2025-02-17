import React, { useEffect, useRef, memo } from 'react';
import { css } from '@emotion/react';
import {
  EuiDataGridCustomBodyProps,
  useEuiTheme,
  logicalCSS,
} from '@elastic/eui';

import { raw_data } from './data_columns_cells';
import CustomEuiDataGrid from './data_grid';

export const CustomUnvirtualizedGridBody = memo(
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

    // Add styling needed for custom grid body rows
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

    // Set custom props onto the grid body wrapper
    const bodyRef = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
      setCustomGridBodyProps({
        ref: bodyRef,
        onScroll: () => console.debug('scrollTop:', bodyRef.current?.scrollTop),
      });
    }, [setCustomGridBodyProps]);

    return (
      <>
        {headerRow}
        {visibleRows.map((row, rowIndex) => (
          <div role="row" css={styles.row} key={rowIndex}>
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
                colIndex={visibleColumns.length - 1} // If the row is being shown, it should always be the last index
                visibleRowIndex={rowIndex}
              />
            </div>
          </div>
        ))}
        {footerRow}
      </>
    );
  }
);
CustomUnvirtualizedGridBody.displayName = 'CustomUnvirtualizedGridBody';

export default ({ autoHeight }: { autoHeight: boolean }) => (
  <CustomEuiDataGrid
    renderCustomGridBody={CustomUnvirtualizedGridBody}
    height={autoHeight ? undefined : 500}
  />
);
