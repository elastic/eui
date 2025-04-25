/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { JSXElementConstructor, Ref, useMemo, useCallback } from 'react';

import { useEuiMemoizedStyles } from '../../../../services';
import { EuiI18n } from '../../../i18n';
import { EuiButtonIcon, EuiButtonIconProps } from '../../../button/button_icon';
import {
  EuiButtonEmpty,
  EuiButtonEmptyProps,
} from '../../../button/button_empty';
import { EuiFlexGroup, EuiFlexItem } from '../../../flex';
import { EuiPopoverFooter } from '../../../popover';

import {
  EuiDataGridColumn,
  EuiDataGridColumnCellAction,
  EuiDataGridColumnCellActionProps,
} from '../../data_grid_types';
import { euiDataGridCellActionsStyles } from './data_grid_cell_actions.styles';

export const EuiDataGridCellActions = ({
  onExpandClick,
  popoverAnchorRef,
  column,
  rowIndex,
  colIndex,
}: {
  onExpandClick: () => void;
  popoverAnchorRef: Ref<HTMLDivElement>;
  column?: EuiDataGridColumn;
  rowIndex: number;
  colIndex: number;
}) => {
  const styles = useEuiMemoizedStyles(euiDataGridCellActionsStyles);

  // Note: The cell expand button/expansion popover is *always* rendered if
  // column.cellActions is present (regardless of column.isExpandable).
  // This is because cell actions are not otherwise accessible to keyboard
  // or screen reader users
  const expandButton = useMemo(
    () => (
      <EuiI18n
        key={'expand'}
        token="euiDataGridCellActions.expandButtonTitle"
        default="Click or hit enter to interact with cell content"
      >
        {(expandButtonTitle: string) => (
          <EuiButtonIcon
            css={styles.euiDataGridRowCell__actionButtonIcon}
            className="euiDataGridRowCell__actionButtonIcon euiDataGridRowCell__expandCell"
            data-test-subj="euiDataGridCellExpandButton"
            display="fill"
            color="primary"
            iconSize="s"
            iconType="expand"
            aria-hidden
            onClick={onExpandClick}
            title={expandButtonTitle}
          />
        )}
      </EuiI18n>
    ),
    [onExpandClick, styles]
  );

  const additionalButtons = useMemo(() => {
    if (!column || !Array.isArray(column?.cellActions)) return [];

    const ButtonComponent = (props: EuiButtonIconProps) => (
      <EuiButtonIcon
        {...props}
        aria-hidden
        css={styles.euiDataGridRowCell__actionButtonIcon}
        className="euiDataGridRowCell__actionButtonIcon"
        // Don't allow consumers to override sizes or colors for cell actions on hover/focus
        size="xs"
        iconSize="s"
        display="fill"
        color="primary"
      />
    );

    const [visibleCellActions] = getVisibleCellActions(
      column?.cellActions,
      column?.visibleCellActions
    );
    return visibleCellActions.map(
      (Action: EuiDataGridColumnCellAction, idx: number) => {
        // React is more permissible than the TS types indicate
        const ActionButtonElement =
          Action as JSXElementConstructor<EuiDataGridColumnCellActionProps>;
        return (
          <ActionButtonElement
            key={idx}
            rowIndex={rowIndex}
            colIndex={colIndex}
            columnId={column.id}
            Component={ButtonComponent}
            isExpanded={false}
          />
        );
      }
    );
  }, [column, colIndex, rowIndex, styles]);

  return (
    <div
      css={styles.euiDataGridRowCell__actionsWrapper}
      className="euiDataGridRowCell__actionsWrapper"
    >
      <div
        css={styles.euiDataGridRowCell__actions}
        className="euiDataGridRowCell__actions"
      >
        {[...additionalButtons, expandButton]}
      </div>
      {/* The cell expansion popover needs a separate div/ref - otherwise the
          extra popover wrappers mess up the absolute positioning and cause
          animation stuttering on the cell actions */}
      <div ref={popoverAnchorRef} data-test-subject="cellPopoverAnchor" />
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
  const [primaryActions, secondaryActions] = getVisibleCellActions(
    column?.cellActions,
    column?.visibleCellActions
  );

  const renderActions = useCallback(
    (Action: EuiDataGridColumnCellAction, idx: number) => {
      const ActionButtonElement =
        Action as JSXElementConstructor<EuiDataGridColumnCellActionProps>;
      return (
        <EuiFlexItem key={idx}>
          <div>
            <ActionButtonElement
              rowIndex={rowIndex}
              colIndex={colIndex}
              columnId={column!.id}
              Component={(props: EuiButtonEmptyProps) => (
                <EuiButtonEmpty {...props} size="s" />
              )}
              isExpanded={true}
            />
          </div>
        </EuiFlexItem>
      );
    },
    [column, colIndex, rowIndex]
  );

  return (
    <>
      {primaryActions.length > 0 && (
        <EuiPopoverFooter>
          <EuiFlexGroup gutterSize="s" responsive={false} wrap>
            {primaryActions.map(renderActions)}
          </EuiFlexGroup>
        </EuiPopoverFooter>
      )}
      {secondaryActions.length > 0 && (
        <EuiPopoverFooter>
          <EuiFlexGroup
            gutterSize="s"
            direction="column"
            alignItems="flexStart"
          >
            {secondaryActions.map(renderActions)}
          </EuiFlexGroup>
        </EuiPopoverFooter>
      )}
    </>
  );
};

// Util helper to separate primary actions (columns.visibleCellActions, defaults to 2)
// and secondary actions (all remaning actions)
const getVisibleCellActions = (
  cellActions?: EuiDataGridColumnCellAction[],
  visibleCellActions = 2
): [EuiDataGridColumnCellAction[], EuiDataGridColumnCellAction[]] => {
  if (!cellActions) return [[], []];
  if (cellActions.length <= visibleCellActions) return [cellActions, []];

  const primaryCellActions = cellActions.slice(0, visibleCellActions);
  const remainingCellActions = cellActions.slice(visibleCellActions);

  return [primaryCellActions, remainingCellActions];
};
