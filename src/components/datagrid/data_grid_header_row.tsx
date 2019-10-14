import React, {
  HTMLAttributes,
  forwardRef,
  FunctionComponent,
  useRef,
  useEffect,
} from 'react';
import classnames from 'classnames';
import {
  EuiDataGridColumnWidths,
  EuiDataGridColumn,
  EuiDataGridSorting,
} from './data_grid_types';
import { CommonProps, Omit } from '../common';
import { EuiDataGridColumnResizer } from './data_grid_column_resizer';
import { htmlIdGenerator } from '../../services/accessibility';
import { EuiScreenReaderOnly } from '../accessibility';
import { EuiDataGridSchema } from './data_grid_schema';
import { EuiDataGridDataRowProps } from './data_grid_data_row';

interface EuiDataGridHeaderRowPropsSpecificProps {
  columns: EuiDataGridColumn[];
  columnWidths: EuiDataGridColumnWidths;
  schema: EuiDataGridSchema;
  defaultColumnWidth?: number | null;
  setColumnWidth: (columnId: string, width: number) => void;
  sorting?: EuiDataGridSorting;
  focusedCell: EuiDataGridDataRowProps['focusedCell'];
  setFocusedCell: EuiDataGridDataRowProps['onCellFocus'];
  headerIsInteractive: boolean;
}

type EuiDataGridHeaderRowProps = CommonProps &
  HTMLAttributes<HTMLDivElement> &
  EuiDataGridHeaderRowPropsSpecificProps;

interface EuiDataGridHeaderCellProps
  extends Omit<EuiDataGridHeaderRowPropsSpecificProps, 'columns'> {
  column: EuiDataGridColumn;
  index: number;
}
const EuiDataGridHeaderCell: FunctionComponent<
  EuiDataGridHeaderCellProps
> = props => {
  const {
    column,
    index,
    columnWidths,
    schema,
    defaultColumnWidth,
    setColumnWidth,
    sorting,
    focusedCell,
    setFocusedCell,
    headerIsInteractive,
  } = props;
  const { id, display } = column;

  const width = columnWidths[id] || defaultColumnWidth;

  const ariaProps: {
    'aria-sort'?: HTMLAttributes<HTMLDivElement>['aria-sort'];
    'aria-describedby'?: HTMLAttributes<HTMLDivElement>['aria-describedby'];
  } = {};

  let screenReaderId;
  let sortString;

  if (sorting) {
    const sortedColumnIds = new Set(sorting.columns.map(({ id }) => id));

    if (sorting.columns.length === 1 && sortedColumnIds.has(id)) {
      const sortDirection = sorting.columns[0].direction;

      let sortValue: HTMLAttributes<HTMLDivElement>['aria-sort'] = 'other';
      if (sortDirection === 'asc') {
        sortValue = 'ascending';
      } else if (sortDirection === 'desc') {
        sortValue = 'descending';
      }

      ariaProps['aria-sort'] = sortValue;
    } else if (sorting.columns.length >= 2 && sortedColumnIds.has(id)) {
      sortString = sorting.columns
        .map(col => `Sorted by ${col.id} ${col.direction}`)
        .join(' then ');
      screenReaderId = htmlIdGenerator()();
      ariaProps['aria-describedby'] = screenReaderId;
    }
  }

  const columnType = schema[id] ? schema[id].columnType : null;

  const classes = classnames('euiDataGridHeaderCell', {
    [`euiDataGridHeaderCell--${columnType}`]: columnType,
  });

  const isFocused = focusedCell[0] === index && focusedCell[1] === -1;
  const headerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (headerRef.current) {
      if (isFocused) {
        headerRef.current.focus();
      }

      function onFocus(e: FocusEvent) {
        if (headerIsInteractive === false) {
          // header is not interactive, avoid focusing
          requestAnimationFrame(() => headerRef.current!.blur());
          e.preventDefault();
          return false;
        } else {
          // take the focus
          setFocusedCell([index, -1]);
        }
      }

      headerRef.current.addEventListener('focus', onFocus);
      return () => {
        headerRef.current!.removeEventListener('focus', onFocus);
      };
    }
  }, [headerIsInteractive, isFocused, headerRef.current]);

  return (
    <div
      role="columnheader"
      {...ariaProps}
      key={id}
      ref={headerRef}
      tabIndex={isFocused ? 0 : -1}
      className={classes}
      data-test-subj={`dataGridHeaderCell-${id}`}
      style={width != null ? { width: `${width}px` } : {}}>
      {width ? (
        <EuiDataGridColumnResizer
          columnId={id}
          columnWidth={width}
          setColumnWidth={setColumnWidth}
        />
      ) : null}

      <div className="euiDataGridHeaderCell__content">{display || id}</div>
      {sorting && sorting.columns.length >= 2 && (
        <EuiScreenReaderOnly>
          <div id={screenReaderId}>{sortString}</div>
        </EuiScreenReaderOnly>
      )}
    </div>
  );
};

const EuiDataGridHeaderRow = forwardRef<
  HTMLDivElement,
  EuiDataGridHeaderRowProps
>((props, ref) => {
  const {
    columns,
    schema,
    columnWidths,
    defaultColumnWidth,
    className,
    setColumnWidth,
    sorting,
    focusedCell,
    setFocusedCell,
    headerIsInteractive,
    'data-test-subj': _dataTestSubj,
    ...rest
  } = props;

  const classes = classnames('euiDataGridHeader', className);
  const dataTestSubj = classnames('dataGridHeader', _dataTestSubj);

  return (
    <div
      role="row"
      ref={ref}
      className={classes}
      data-test-subj={dataTestSubj}
      {...rest}>
      {columns.map((column, index) => (
        <EuiDataGridHeaderCell
          key={column.id}
          column={column}
          index={index}
          columnWidths={columnWidths}
          focusedCell={focusedCell}
          setFocusedCell={setFocusedCell}
          schema={schema}
          setColumnWidth={setColumnWidth}
          defaultColumnWidth={defaultColumnWidth}
          sorting={sorting}
          headerIsInteractive={headerIsInteractive}
        />
      ))}
    </div>
  );
});

export { EuiDataGridHeaderRow };
