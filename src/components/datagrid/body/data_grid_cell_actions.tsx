/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { JSXElementConstructor, useMemo } from 'react';
import {
  EuiDataGridColumn,
  EuiDataGridColumnCellAction,
  EuiDataGridColumnCellActionProps,
} from '../data_grid_types';

import { EuiI18n } from '../../i18n';
import { EuiButtonIcon, EuiButtonIconProps } from '../../button/button_icon';
import { EuiButtonEmpty, EuiButtonEmptyProps } from '../../button/button_empty';
import { EuiFlexGroup, EuiFlexItem } from '../../flex';
import { EuiPopoverFooter } from '../../popover';

export const EuiDataGridCellActions = ({
  closePopover,
  onExpandClick,
  column,
  rowIndex,
  colIndex,
}: {
  closePopover: () => void;
  onExpandClick: () => void;
  column?: EuiDataGridColumn;
  rowIndex: number;
  colIndex: number;
}) => {
  const expandButton = (
    <EuiI18n
      key={'expand'}
      token="euiDataGridCellActions.expandButtonTitle"
      default="Click or hit enter to interact with cell content"
    >
      {(expandButtonTitle: string) => (
        <EuiButtonIcon
          display="fill"
          className="euiDataGridRowCell__actionButtonIcon"
          color="primary"
          iconSize="s"
          iconType="expandMini"
          aria-hidden
          onClick={onExpandClick}
          title={expandButtonTitle}
        />
      )}
    </EuiI18n>
  );
  const additionalButtons = useMemo(() => {
    const ButtonComponent = (props: EuiButtonIconProps) => (
      <EuiButtonIcon
        {...props}
        aria-hidden
        className="euiDataGridRowCell__actionButtonIcon"
        iconSize="s"
      />
    );
    return column && Array.isArray(column.cellActions)
      ? column.cellActions.map(
          (Action: EuiDataGridColumnCellAction, idx: number) => {
            // React is more permissible than the TS types indicate
            const ActionButtonElement = Action as JSXElementConstructor<
              EuiDataGridColumnCellActionProps
            >;
            return (
              <ActionButtonElement
                key={idx}
                rowIndex={rowIndex}
                colIndex={colIndex}
                columnId={column.id}
                Component={ButtonComponent}
                isExpanded={false}
                closePopover={closePopover}
              />
            );
          }
        )
      : [];
  }, [column, colIndex, rowIndex, closePopover]);

  return (
    <div className="euiDataGridRowCell__expandActions">
      {[...additionalButtons, expandButton]}
    </div>
  );
};

export const EuiDataGridCellPopoverActions = ({
  rowIndex,
  colIndex,
  column,
}: {
  column?: EuiDataGridColumn;
  colIndex: number;
  rowIndex: number;
}) => {
  if (!column?.cellActions?.length) return null;

  return (
    <EuiPopoverFooter>
      <EuiFlexGroup gutterSize="s">
        {column.cellActions.map(
          (Action: EuiDataGridColumnCellAction, idx: number) => {
            const ActionButtonElement = Action as JSXElementConstructor<
              EuiDataGridColumnCellActionProps
            >;
            return (
              <EuiFlexItem key={idx}>
                <ActionButtonElement
                  rowIndex={rowIndex}
                  colIndex={colIndex}
                  columnId={column.id}
                  Component={(props: EuiButtonEmptyProps) => (
                    <EuiButtonEmpty {...props} size="s" />
                  )}
                  isExpanded={true}
                />
              </EuiFlexItem>
            );
          }
        )}
      </EuiFlexGroup>
    </EuiPopoverFooter>
  );
};
