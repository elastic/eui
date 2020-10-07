/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
import React, { JSXElementConstructor, ReactNode, RefCallback } from 'react';
import {
  EuiDataGridColumn,
  EuiDataGridPopoverContent,
} from './data_grid_types';
import { EuiPopover, EuiPopoverFooter } from '../popover';
import { keys } from '../../services';
import { EuiFlexGroup, EuiFlexItem } from '../flex';
import { EuiButtonEmpty } from '../button/button_empty';
import { EuiDataGridCellValueElementProps } from './data_grid_cell';

interface EuiDataGridCellPopoverProps {
  anchorContent: NonNullable<ReactNode>;
  cellContentProps: EuiDataGridCellValueElementProps;
  cellContentsRef: HTMLDivElement | null;
  closePopover: () => void;
  column?: EuiDataGridColumn;
  panelRefFn: RefCallback<HTMLElement | null>;
  popoverIsOpen: boolean;
  popoverContent: EuiDataGridPopoverContent;
  renderCellValue:
    | JSXElementConstructor<EuiDataGridCellValueElementProps>
    | ((props: EuiDataGridCellValueElementProps) => ReactNode);
  rowIndex: number;
  updateFocus: () => void;
}

export function EuiDataGridCellPopover({
  anchorContent,
  cellContentProps,
  cellContentsRef,
  closePopover,
  column,
  panelRefFn,
  popoverContent: PopoverContent,
  popoverIsOpen,
  renderCellValue,
  rowIndex,
  updateFocus,
}: EuiDataGridCellPopoverProps) {
  const CellElement = renderCellValue as JSXElementConstructor<
    EuiDataGridCellValueElementProps
  >;
  return (
    <EuiPopover
      hasArrow={false}
      anchorClassName="euiDataGridRowCell__expand"
      button={anchorContent}
      isOpen={popoverIsOpen}
      panelRef={panelRefFn}
      ownFocus
      panelClassName="euiDataGridRowCell__popover"
      panelPaddingSize="s"
      zIndex={8001}
      display="block"
      closePopover={closePopover}
      onKeyDown={event => {
        if (event.key === keys.F2 || event.key === keys.ESCAPE) {
          event.preventDefault();
          event.stopPropagation();
          closePopover();
        }
      }}
      onTrapDeactivation={updateFocus}>
      {popoverIsOpen ? (
        <>
          <PopoverContent cellContentsElement={cellContentsRef!}>
            <CellElement {...cellContentProps} isDetails={true} />
          </PopoverContent>
          {column && column.cellActions && column.cellActions.length ? (
            <EuiPopoverFooter>
              <EuiFlexGroup gutterSize="s">
                {column.cellActions.map((action, idx) => (
                  <EuiFlexItem key={idx}>
                    {typeof action.inPopoverButton === 'function' ? (
                      React.createElement(action.inPopoverButton, {
                        rowIndex,
                        columnId: column.id,
                      })
                    ) : (
                      <EuiButtonEmpty
                        data-test-subj={
                          action['data-test-subj']
                            ? `${action['data-test-subj']}Popover`
                            : undefined
                        }
                        aria-label={action['aria-label'] || action.label}
                        size="s"
                        iconType={action.iconType}
                        onClick={() => action.callback(rowIndex, column.id)}>
                        {action.label}
                      </EuiButtonEmpty>
                    )}
                  </EuiFlexItem>
                ))}
              </EuiFlexGroup>
            </EuiPopoverFooter>
          ) : null}
        </>
      ) : null}
    </EuiPopover>
  );
}
