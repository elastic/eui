import React, {
  Fragment,
  FunctionComponent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
// @ts-ignore-next-line
import { EuiCodeBlock } from '../code';
import {
  EuiDataGridColumn,
  EuiDataGridColumnWidths,
  EuiDataGridExpansionFormatters,
  EuiDataGridInMemory,
  EuiDataGridInMemoryValues,
  EuiDataGridPaginationProps,
  EuiDataGridSorting,
} from './data_grid_types';
import { EuiDataGridCellProps } from './data_grid_cell';
import {
  EuiDataGridDataRow,
  EuiDataGridDataRowProps,
} from './data_grid_data_row';
import { EuiDataGridSchema, SchemaDetector } from './data_grid_schema';
import { useInnerText } from '../inner_text';

interface EuiDataGridBodyProps {
  columnWidths: EuiDataGridColumnWidths;
  defaultColumnWidth?: number | null;
  columns: EuiDataGridColumn[];
  schema: EuiDataGridSchema;
  schemaDetectors: SchemaDetector[];
  expansionFormatters?: EuiDataGridExpansionFormatters;
  focusedCell: EuiDataGridDataRowProps['focusedCell'];
  onCellFocus: EuiDataGridDataRowProps['onCellFocus'];
  rowCount: number;
  renderCellValue: EuiDataGridCellProps['renderCellValue'];
  inMemory?: EuiDataGridInMemory;
  inMemoryValues: EuiDataGridInMemoryValues;
  interactiveCellId: EuiDataGridCellProps['interactiveCellId'];
  pagination?: EuiDataGridPaginationProps;
  sorting?: EuiDataGridSorting;
}

const defaultComparator: NonNullable<SchemaDetector['comparator']> = (
  a,
  b,
  direction
) => {
  if (a < b) return direction === 'asc' ? -1 : 1;
  if (a > b) return direction === 'asc' ? 1 : -1;
  return 0;
};

const providedExpansionFormatters: EuiDataGridExpansionFormatters = {
  json: ({ children }) => {
    const invisibleRef = useRef<HTMLDivElement>(null);
    const [ref, text] = useInnerText();
    const [isVisible, setIsVisible] = useState(false);
    const formattedText = useMemo(() => {
      if (text) {
        try {
          return JSON.stringify(JSON.parse(text), null, 2);
        } catch (e) {
          return text;
        }
      } else {
        return '';
      }
    }, [text]);

    useEffect(() => {
      // because this content renders into a popover
      // it is hidden until the popover positions into place
      // but InnerText cannot inspect hidden elements, so wait
      function checkVisibility() {
        const style = window.getComputedStyle(invisibleRef.current!);
        if (style.getPropertyValue('visibility') !== 'hidden') {
          setIsVisible(true);
        } else {
          requestAnimationFrame(checkVisibility);
        }
      }
      requestAnimationFrame(checkVisibility);
    }, []);

    return (
      <Fragment>
        {!formattedText && (
          <div ref={isVisible ? ref : invisibleRef}>{children}</div>
        )}
        {formattedText && (
          <EuiCodeBlock
            isCopyable
            transparentBackground
            paddingSize="none"
            language="json">
            {formattedText}
          </EuiCodeBlock>
        )}
      </Fragment>
    );
  },
};

export const EuiDataGridBody: FunctionComponent<
  EuiDataGridBodyProps
> = props => {
  const {
    columnWidths,
    defaultColumnWidth,
    columns,
    schema,
    schemaDetectors,
    expansionFormatters,
    focusedCell,
    onCellFocus,
    rowCount,
    renderCellValue,
    inMemory,
    inMemoryValues,
    interactiveCellId,
    pagination,
    sorting,
  } = props;

  const startRow = pagination ? pagination.pageIndex * pagination.pageSize : 0;
  let endRow = pagination
    ? (pagination.pageIndex + 1) * pagination.pageSize
    : rowCount;
  endRow = Math.min(endRow, rowCount);

  const visibleRowIndices = useMemo(() => {
    const visibleRowIndices = [];
    for (let i = startRow; i < endRow; i++) {
      visibleRowIndices.push(i);
    }
    return visibleRowIndices;
  }, [startRow, endRow]);

  const rowMap = useMemo(() => {
    const rowMap: { [key: number]: number } = {};

    if (
      inMemory &&
      inMemory.level === 'sorting' &&
      sorting != null &&
      sorting.columns.length > 0
    ) {
      const inMemoryRowIndices = Object.keys(inMemoryValues);
      const wrappedValues: Array<{
        index: number;
        values: EuiDataGridInMemoryValues[number];
      }> = [];
      for (let i = 0; i < inMemoryRowIndices.length; i++) {
        const inMemoryRow = inMemoryValues[inMemoryRowIndices[i]];
        wrappedValues.push({ index: i, values: inMemoryRow });
      }

      wrappedValues.sort((a, b) => {
        for (let i = 0; i < sorting.columns.length; i++) {
          const column = sorting.columns[i];
          const aValue = a.values[column.id];
          const bValue = b.values[column.id];

          // get the comparator, based on schema
          let comparator = defaultComparator;
          if (schema.hasOwnProperty(column.id)) {
            const columnType = schema[column.id].columnType;
            for (let i = 0; i < schemaDetectors.length; i++) {
              const detector = schemaDetectors[i];
              if (
                detector.type === columnType &&
                detector.hasOwnProperty('comparator')
              ) {
                comparator = detector.comparator!;
              }
            }
          }

          const result = comparator(aValue, bValue, column.direction);
          // only return if the columns are inequal, otherwise allow the next sort-by column to run
          if (result !== 0) return result;
        }

        return 0;
      });

      for (let i = 0; i < wrappedValues.length; i++) {
        rowMap[i] = wrappedValues[i].index;
      }
    }

    return rowMap;
  }, [sorting, inMemory, inMemoryValues, schema, schemaDetectors]);

  const setCellFocus = useCallback(
    ([colIndex, rowIndex]) => {
      // If the rows in the grid have been mapped in some way (e.g. sorting)
      // then this callback must unmap the reported rowIndex
      const mappedRowIndicies = Object.keys(rowMap);
      let reverseMappedIndex = rowIndex;
      for (let i = 0; i < mappedRowIndicies.length; i++) {
        const mappedRowIndex = mappedRowIndicies[i];
        const rowMappedToIndex = rowMap[(mappedRowIndex as any) as number];
        if (`${rowMappedToIndex}` === `${rowIndex}`) {
          reverseMappedIndex = parseInt(mappedRowIndex);
          break;
        }
      }

      // map the row into the visible rows
      if (pagination) {
        reverseMappedIndex -= pagination.pageIndex * pagination.pageSize;
      }
      onCellFocus([colIndex, reverseMappedIndex]);
    },
    [onCellFocus, rowMap, pagination]
  );

  const rows = useMemo(() => {
    const rows = [];
    for (let i = 0; i < visibleRowIndices.length; i++) {
      let rowIndex = visibleRowIndices[i];
      if (rowMap.hasOwnProperty(rowIndex)) {
        rowIndex = rowMap[rowIndex];
      }

      const mergedExpansionFormatters = {
        ...providedExpansionFormatters,
        ...expansionFormatters,
      };

      rows.push(
        <EuiDataGridDataRow
          key={rowIndex}
          columns={columns}
          schema={schema}
          expansionFormatters={mergedExpansionFormatters}
          columnWidths={columnWidths}
          defaultColumnWidth={defaultColumnWidth}
          focusedCell={focusedCell}
          onCellFocus={setCellFocus}
          renderCellValue={renderCellValue}
          rowIndex={rowIndex}
          visibleRowIndex={i}
          interactiveCellId={interactiveCellId}
        />
      );
    }

    return rows;
  }, [
    columns,
    columnWidths,
    defaultColumnWidth,
    focusedCell,
    onCellFocus,
    renderCellValue,
    rowMap,
    schema,
    expansionFormatters,
    visibleRowIndices,
    startRow,
    interactiveCellId,
  ]);

  return <Fragment>{rows}</Fragment>;
};
