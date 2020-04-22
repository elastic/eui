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

import React, { Component, FocusEvent, ReactNode, ReactElement } from 'react';
import { isString } from '../../services/predicate';
import { EuiContextMenuItem, EuiContextMenuPanel } from '../context_menu';
import { EuiPopover } from '../popover';
import { EuiButtonIcon } from '../button';
import { EuiToolTip } from '../tool_tip';
import { EuiI18n } from '../i18n';
import { Action, CustomItemAction } from './action_types';
import { ItemIdResolved } from './table_types';

export interface CollapsedItemActionsProps<T> {
  actions: Array<Action<T>>;
  item: T;
  itemId: ItemIdResolved;
  actionEnabled: (action: Action<T>) => boolean;
  className?: string;
  onFocus?: (event: FocusEvent) => void;
  onBlur?: () => void;
}

interface CollapsedItemActionsState {
  popoverOpen: boolean;
}

function actionIsCustomItemAction<T extends {}>(
  action: Action<T>
): action is CustomItemAction<T> {
  return action.hasOwnProperty('render');
}

export class CollapsedItemActions<T> extends Component<
  CollapsedItemActionsProps<T>,
  CollapsedItemActionsState
> {
  private popoverDiv: HTMLDivElement | null = null;

  state = { popoverOpen: false };

  togglePopover = () => {
    this.setState(prevState => ({ popoverOpen: !prevState.popoverOpen }));
  };

  closePopover = () => {
    this.setState({ popoverOpen: false });
  };

  onPopoverBlur = () => {
    // you must be asking... WTF? I know... but this timeout is
    // required to make sure we process the onBlur events after the initial
    // event cycle. Reference:
    // https://medium.com/@jessebeach/dealing-with-focus-and-blur-in-a-composite-widget-in-react-90d3c3b49a9b
    window.requestAnimationFrame(() => {
      if (
        !this.popoverDiv!.contains(document.activeElement) &&
        this.props.onBlur
      ) {
        this.props.onBlur();
      }
    });
  };

  registerPopoverDiv = (popoverDiv: HTMLDivElement) => {
    if (!this.popoverDiv) {
      this.popoverDiv = popoverDiv;
      this.popoverDiv.addEventListener('focusout', this.onPopoverBlur);
    }
  };

  componentWillUnmount() {
    if (this.popoverDiv) {
      this.popoverDiv.removeEventListener('focusout', this.onPopoverBlur);
    }
  }

  onClickItem = (onClickAction: (() => void) | undefined) => {
    this.closePopover();
    if (onClickAction) {
      onClickAction();
    }
  };

  render() {
    const {
      actions,
      itemId,
      item,
      actionEnabled,
      onFocus,
      className,
    } = this.props;

    const isOpen = this.state.popoverOpen;

    let allDisabled = true;
    const controls = actions.reduce<ReactElement[]>(
      (controls, action, index) => {
        const key = `action_${itemId}_${index}`;
        const available = action.available ? action.available(item) : true;
        if (!available) {
          return controls;
        }
        const enabled = actionEnabled(action);
        allDisabled = allDisabled && !enabled;
        if (actionIsCustomItemAction(action)) {
          const customAction = action as CustomItemAction<T>;
          const actionControl = customAction.render(item, enabled);
          const actionControlOnClick =
            actionControl && actionControl.props && actionControl.props.onClick;
          controls.push(
            <EuiContextMenuItem
              key={key}
              onClick={
                actionControlOnClick
                  ? actionControlOnClick.bind(null, item)
                  : () => {}
              }>
              {actionControl}
            </EuiContextMenuItem>
          );
        } else {
          const {
            onClick,
            name,
            href,
            target,
            'data-test-subj': dataTestSubj,
          } = action;

          const buttonIcon = action.icon;
          let icon;
          if (buttonIcon) {
            icon = isString(buttonIcon) ? buttonIcon : buttonIcon(item);
          }

          controls.push(
            <EuiContextMenuItem
              key={key}
              disabled={!enabled}
              href={href}
              target={target}
              icon={icon}
              data-test-subj={dataTestSubj}
              onClick={this.onClickItem.bind(
                null,
                onClick ? onClick.bind(null, item) : undefined
              )}>
              {name}
            </EuiContextMenuItem>
          );
        }
        return controls;
      },
      []
    );

    const popoverButton = (
      <EuiI18n token="euiCollapsedItemActions.allActions" default="All actions">
        {(allActions: string) => (
          <EuiButtonIcon
            className={className}
            aria-label={allActions}
            iconType="boxesHorizontal"
            color="text"
            isDisabled={allDisabled}
            onClick={this.togglePopover.bind(this)}
            onFocus={onFocus}
            data-test-subj="euiCollapsedItemActionsButton"
          />
        )}
      </EuiI18n>
    );

    const withTooltip = !allDisabled && (
      <EuiI18n token="euiCollapsedItemActions.allActions" default="All actions">
        {(allActions: ReactNode) => (
          <EuiToolTip content={allActions} delay="long">
            {popoverButton}
          </EuiToolTip>
        )}
      </EuiI18n>
    );

    return (
      <EuiPopover
        className={className}
        popoverRef={this.registerPopoverDiv}
        id={`${itemId}-actions`}
        isOpen={isOpen}
        button={withTooltip || popoverButton}
        closePopover={this.closePopover}
        panelPaddingSize="none"
        anchorPosition="leftCenter">
        <EuiContextMenuPanel items={controls} />
      </EuiPopover>
    );
  }
}
