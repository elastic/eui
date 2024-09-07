/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { useState, useCallback, useMemo, ReactElement } from 'react';

import { EuiContextMenuItem, EuiContextMenuPanel } from '../context_menu';
import { EuiPopover } from '../popover';
import { EuiButtonIcon } from '../button';
import { EuiToolTip } from '../tool_tip';
import { useEuiI18n } from '../i18n';

import {
  Action,
  CustomItemAction,
  isCustomItemAction,
  callWithItemIfFunction,
} from './action_types';
import { ItemIdResolved } from './table_types';

export interface CollapsedItemActionsProps<T extends object> {
  actions: Array<Action<T>>;
  item: T;
  itemId: ItemIdResolved;
  actionsDisabled: boolean;
  displayedRowIndex: number;
  className?: string;
}

export const CollapsedItemActions = <T extends {}>({
  actions,
  itemId,
  item,
  actionsDisabled,
  displayedRowIndex,
  className,
}: CollapsedItemActionsProps<T>) => {
  const [popoverOpen, setPopoverOpen] = useState(false);
  const closePopover = useCallback(() => setPopoverOpen(false), []);

  const allActionsTooltip = useEuiI18n(
    'euiCollapsedItemActions.allActionsTooltip',
    'All actions'
  );

  const allActionsButtonAriaLabel = useEuiI18n(
    'euiCollapsedItemActions.allActions',
    'All actions, row {index}',
    {
      index: displayedRowIndex + 1,
    }
  );

  const allActionsButtonDisabledAriaLabel = useEuiI18n(
    'euiCollapsedItemActions.allActionsDisabled',
    'Individual item actions are disabled when rows are being selected.'
  );

  const controls = useMemo(() => {
    return actions.reduce<ReactElement[]>((controls, action, index) => {
      const available = action.available?.(item) ?? true;
      if (!available) return controls;

      const enabled = action.enabled == null || action.enabled(item);

      if (isCustomItemAction<T>(action)) {
        const customAction = action as CustomItemAction<T>;
        const actionControl = customAction.render(item, enabled);
        controls.push(
          // Do not put the `onClick` on the EuiContextMenuItem itself - otherwise
          // it renders a <button> tag instead of a <div>, and we end up with nested
          // interactive elements
          <EuiContextMenuItem
            key={index}
            className="euiBasicTable__collapsedCustomAction"
          >
            <span onClick={closePopover}>{actionControl}</span>
          </EuiContextMenuItem>
        );
      } else {
        const icon = action.icon
          ? callWithItemIfFunction(item)(action.icon)
          : undefined;
        const buttonContent = callWithItemIfFunction(item)(action.name);
        const toolTipContent = callWithItemIfFunction(item)(action.description);
        const href = callWithItemIfFunction(item)(action.href);
        const dataTestSubj = callWithItemIfFunction(item)(
          action['data-test-subj']
        );

        const { onClick, target } = action;

        controls.push(
          <EuiContextMenuItem
            key={index}
            className="euiBasicTable__collapsedAction"
            disabled={!enabled && !actionsDisabled}
            href={href}
            target={target}
            icon={icon}
            data-test-subj={dataTestSubj}
            onClick={(event) => {
              event.persist();
              onClick?.(item, event);
              // Allow consumer events to prevent the popover from closing if necessary
              if (!event.isPropagationStopped()) closePopover();
            }}
            toolTipContent={toolTipContent}
            toolTipProps={{ delay: 'long' }}
          >
            {buttonContent}
          </EuiContextMenuItem>
        );
      }
      return controls;
    }, []);
  }, [actions, actionsDisabled, item, closePopover]);

  const popoverButton = (
    <EuiButtonIcon
      className={className}
      aria-label={
        actionsDisabled
          ? allActionsButtonDisabledAriaLabel
          : allActionsButtonAriaLabel
      }
      title={actionsDisabled ? allActionsButtonDisabledAriaLabel : undefined}
      iconType="boxesHorizontal"
      color="text"
      isDisabled={actionsDisabled}
      onClick={() => setPopoverOpen((isOpen) => !isOpen)}
      data-test-subj="euiCollapsedItemActionsButton"
    />
  );

  const withTooltip = !actionsDisabled && (
    <EuiToolTip content={allActionsTooltip} delay="long">
      {popoverButton}
    </EuiToolTip>
  );

  return (
    <EuiPopover
      className={className}
      id={`${itemId}-actions`}
      isOpen={popoverOpen}
      button={withTooltip || popoverButton}
      closePopover={closePopover}
      panelPaddingSize="none"
      anchorPosition="leftCenter"
    >
      <EuiContextMenuPanel
        className="euiBasicTable__collapsedActions"
        items={controls}
      />
    </EuiPopover>
  );
};
