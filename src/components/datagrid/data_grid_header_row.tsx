import React, {
  HTMLAttributes,
  forwardRef,
  FunctionComponent,
  useRef,
  useEffect,
  useState,
} from 'react';
import classnames from 'classnames';
import tabbable from 'tabbable';
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
import { keyCodes } from '../../services';

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

  const headerRef = useRef<HTMLDivElement>(null);
  const isFocused = focusedCell[0] === index && focusedCell[1] === -1;
  const [isCellEntered, setIsCellEntered] = useState(false);

  useEffect(() => {
    if (headerRef.current) {
      function enableInteractives() {
        const interactiveElements = headerRef.current!.querySelectorAll(
          '[data-euigrid-tab-managed]'
        );
        for (let i = 0; i < interactiveElements.length; i++) {
          interactiveElements[i].setAttribute('tabIndex', '0');
        }
      }

      function disableInteractives() {
        const tababbles = tabbable(headerRef.current!);
        if (tababbles.length > 1) {
          console.warn(
            `EuiDataGridHeaderCell expects at most 1 tabbable element, ${
              tababbles.length
            } found instead`
          );
        }
        for (let i = 0; i < tababbles.length; i++) {
          const element = tababbles[i];
          element.setAttribute('data-euigrid-tab-managed', 'true');
          element.setAttribute('tabIndex', '-1');
        }
      }

      if (isCellEntered) {
        enableInteractives();
        const tabbables = tabbable(headerRef.current!);
        if (tabbables.length > 0) {
          tabbables[0].focus();
        }
      } else {
        disableInteractives();
      }
    }
  }, [isCellEntered]);

  useEffect(() => {
    if (headerRef.current) {
      if (isFocused) {
        const interactives = headerRef.current.querySelectorAll(
          '[data-euigrid-tab-managed]'
        );
        if (interactives.length === 1) {
          setIsCellEntered(true);
        } else {
          headerRef.current.focus();
        }
      } else {
        setIsCellEntered(false);
      }

      // focusin bubbles while focus does not, and this needs to react to children gaining focus
      function onFocusIn(e: FocusEvent) {
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

      // focusout bubbles while blur does not, and this needs to react to the children losing focus
      function onFocusOut() {
        // wait for the next element to receive focus, then update interactives' state
        requestAnimationFrame(() => {
          if (headerRef.current) {
            if (headerRef.current.contains(document.activeElement) === false) {
              setIsCellEntered(false);
            }
          }
        });
      }

      function onKeyUp(e: KeyboardEvent) {
        switch (e.keyCode) {
          case keyCodes.ENTER: {
            e.preventDefault();
            setIsCellEntered(true);
            break;
          }
          case keyCodes.ESCAPE: {
            e.preventDefault();
            // move focus to cell
            setIsCellEntered(false);
            headerRef.current!.focus();
            break;
          }
          case keyCodes.F2: {
            e.preventDefault();
            if (document.activeElement === headerRef.current) {
              // move focus into cell's interactives
              setIsCellEntered(true);
            } else {
              // move focus to cell
              setIsCellEntered(false);
              headerRef.current!.focus();
            }
            break;
          }
        }
      }

      // @ts-ignore-next line TS doesn't have focusin
      headerRef.current.addEventListener('focusin', onFocusIn);
      headerRef.current.addEventListener('focusout', onFocusOut);
      headerRef.current.addEventListener('keyup', onKeyUp);
      return () => {
        // @ts-ignore-next line TS doesn't have focusin
        headerRef.current!.removeEventListener('focusin', onFocusIn);
        headerRef.current!.removeEventListener('focusout', onFocusOut);
        headerRef.current!.removeEventListener('keyup', onKeyUp);
      };
    }
  }, [
    headerIsInteractive,
    isFocused,
    headerRef.current,
    setIsCellEntered,
    setFocusedCell,
  ]);

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
