/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import classnames from 'classnames';
import React, {
  AriaAttributes,
  FunctionComponent,
  HTMLAttributes,
  useContext,
  useState,
} from 'react';
import { useGeneratedHtmlId } from '../../../../services/accessibility';
import { EuiScreenReaderOnly } from '../../../accessibility';
import { useEuiI18n } from '../../../i18n';
import { EuiIcon } from '../../../icon';
import { EuiListGroup } from '../../../list_group';
import { EuiPopover } from '../../../popover';
import { DataGridSortingContext } from '../../data_grid_context';
import { EuiDataGridHeaderCellProps } from '../../data_grid_types';

import { getColumnActions } from './column_actions';
import { EuiDataGridColumnResizer } from './data_grid_column_resizer';
import { EuiDataGridHeaderCellWrapper } from './data_grid_header_cell_wrapper';

export const EuiDataGridHeaderCell: FunctionComponent<EuiDataGridHeaderCellProps> = ({
  column,
  index,
  columns,
  columnWidths,
  schema,
  schemaDetectors,
  defaultColumnWidth,
  setColumnWidth,
  setVisibleColumns,
  switchColumnPos,
  headerIsInteractive,
}) => {
  const { id, display, displayAsText } = column;
  const width = columnWidths[id] || defaultColumnWidth;

  const columnType = schema[id] ? schema[id].columnType : null;
  const classes = classnames({
    [`euiDataGridHeaderCell--${columnType}`]: columnType,
  });

  const actionButtonAriaLabel = useEuiI18n(
    'euiDataGridHeaderCell.headerActions',
    'Header actions'
  );
  const ariaProps: {
    'aria-sort'?: AriaAttributes['aria-sort'];
    'aria-describedby'?: AriaAttributes['aria-describedby'];
  } = {};
  const screenReaderId = useGeneratedHtmlId();

  const sorting = useContext(DataGridSortingContext);
  let sortString;
  if (sorting) {
    const sortedColumnIds = new Set(sorting.columns.map(({ id }) => id));
    if (sortedColumnIds.has(id)) {
      if (sorting.columns.length === 1) {
        const sortDirection = sorting.columns[0].direction;

        let sortValue: HTMLAttributes<HTMLDivElement>['aria-sort'] = 'other';
        if (sortDirection === 'asc') {
          sortValue = 'ascending';
        }
        if (sortDirection === 'desc') {
          sortValue = 'descending';
        }

        ariaProps['aria-sort'] = sortValue;
      } else {
        sortString = sorting.columns
          .map((col) => `Sorted by ${col.id} ${col.direction}`)
          .join(' then ');
        ariaProps['aria-describedby'] = screenReaderId;
      }
    }
  }

  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const columnActions = getColumnActions({
    column,
    columns,
    schema,
    schemaDetectors,
    setVisibleColumns,
    setIsPopoverOpen,
    sorting,
    switchColumnPos,
  });

  const showColumnActions = columnActions && columnActions.length > 0;
  const sortedColumn = sorting?.columns.find((col) => col.id === id);
  const sortingArrow = sortedColumn ? (
    <EuiIcon
      type={sortedColumn.direction === 'asc' ? 'sortUp' : 'sortDown'}
      color="text"
      className="euiDataGridHeaderCell__sortingArrow"
      data-test-subj={`dataGridHeaderCellSortingIcon-${id}`}
    />
  ) : null;

  return (
    <EuiDataGridHeaderCellWrapper
      id={id}
      index={index}
      width={width}
      headerIsInteractive={headerIsInteractive}
      className={classes}
      {...ariaProps}
    >
      {column.isResizable !== false && width != null ? (
        <EuiDataGridColumnResizer
          columnId={id}
          columnWidth={width}
          setColumnWidth={setColumnWidth}
        />
      ) : null}

      {sortString && (
        <EuiScreenReaderOnly>
          <div id={screenReaderId}>{sortString}</div>
        </EuiScreenReaderOnly>
      )}
      {!showColumnActions ? (
        <>
          {sortingArrow}
          <div className="euiDataGridHeaderCell__content">
            {display || displayAsText || id}
          </div>
        </>
      ) : (
        <EuiPopover
          anchorClassName="euiDataGridHeaderCell__anchor"
          panelPaddingSize="none"
          offset={7}
          button={
            <button
              className="euiDataGridHeaderCell__button"
              onClick={() =>
                setIsPopoverOpen((isPopoverOpen) => !isPopoverOpen)
              }
            >
              {sortingArrow}
              <div className="euiDataGridHeaderCell__content">
                {display || displayAsText || id}
              </div>
              <EuiIcon
                className="euiDataGridHeaderCell__icon"
                type="arrowDown"
                size="s"
                color="text"
                aria-label={actionButtonAriaLabel}
                data-test-subj={`dataGridHeaderCellActionButton-${id}`}
              />
            </button>
          }
          isOpen={isPopoverOpen}
          closePopover={() => setIsPopoverOpen(false)}
        >
          <div>
            <EuiListGroup
              listItems={columnActions}
              gutterSize="none"
              data-test-subj={`dataGridHeaderCellActionGroup-${id}`}
            />
          </div>
        </EuiPopover>
      )}
    </EuiDataGridHeaderCellWrapper>
  );
};
