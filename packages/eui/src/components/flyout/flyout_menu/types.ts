/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { HTMLAttributes } from 'react';

import { EuiButtonProps } from '../../button';
import { CommonProps, PropsForAnchor } from '../../common';
import { EuiToolTipProps } from '../../tool_tip';
import type { IconType } from '../../icon';

export type EuiFlyoutMenuBackButtonProps = Pick<
  PropsForAnchor<EuiButtonProps>,
  'aria-label' | 'data-test-subj' | 'onClick'
>;

/**
 * History item for the flyout menu history popover
 */
export interface EuiFlyoutHistoryItem {
  /**
   * Title for the history item
   */
  title: string;
  /**
   * An optional icon to display next to the session title in the history menu
   */
  iconType?: IconType;
  /**
   * onClick handler for the history item
   */
  onClick: () => void;
}

/**
 * Pagination configuration for the flyout menu
 */
export interface EuiFlyoutMenuPagination {
  /**
   * Zero-based index of the currently displayed item
   */
  currentIndex: number;
  /**
   * Total number of items
   */
  total: number;
  /**
   * Called when the user clicks the Previous button
   */
  onPrevious: () => void;
  /**
   * Called when the user clicks the Next button
   */
  onNext: () => void;
  /**
   * Called when the user clicks the First button, to jump to the beginning.
   */
  onFirst?: () => void;
  /**
   * Called when the user clicks the Last button, which jumps to the end.
   */
  onLast?: () => void;
}

/**
 * Custom action item for the flyout menu component
 * @deprecated Use `EuiFlyoutMenuAction` with the `trailingActions` prop instead.
 */
export interface EuiFlyoutMenuCustomAction {
  iconType: string;
  onClick: () => void;
  'aria-label': string;
}

/**
 * An action item for the `leadingActions` or `trailingActions` slots of the flyout menu.
 */
export interface EuiFlyoutMenuAction {
  /**
   * Icon type for the action button
   */
  iconType: IconType;
  /**
   * onClick handler for the action button
   */
  onClick: () => void;
  /**
   * Aria label for the action button
   */
  'aria-label': string;
  /**
   * Optional tooltip content shown on hover/focus of the action button
   */
  toolTipContent?: EuiToolTipProps['content'];
  /**
   * Optional props to pass to the underlying {@link EuiToolTip}.
   * Only used when `toolTipContent` is also provided.
   */
  toolTipProps?: Partial<Omit<EuiToolTipProps, 'content' | 'children'>>;
}

/**
 * Props for EuiFlyoutMenu
 */
export type EuiFlyoutMenuProps = CommonProps &
  HTMLAttributes<HTMLDivElement> & {
    /**
     * An id to use for the title element. Useful for setting aria-labelledby on the flyout.
     * Example:
     * ```jsx
     * <EuiFlyout
     *   aria-labelledby="myMenuTitleId"
     *   flyoutMenuProps={{ title: 'Menu title', titleId: 'myMenuTitleId' }
     * >
     *  ...
     * </EuiFlyout>
     * ```
     */
    titleId?: string;
    /**
     * Title for the menu component. In a managed flyout context, the title is used to indicate the flyout session for history navigation.
     */
    title?: React.ReactNode;
    /**
     * An optional icon to display next to the session title in the history menu
     */
    iconType?: IconType;
    /**
     * Hides the title in the `EuiFlyoutMenu`.
     * @default true
     * @deprecated Use `EuiFlyoutHeader` for visible titles instead.
     * `hideTitle` is still honored but may be removed in a future major version.
     */
    hideTitle?: boolean;
    /**
     * Hides the close button in the menu component
     * @default false
     */
    hideCloseButton?: boolean;
    /**
     * Shows a back button in the menu component
     * @default false
     */
    showBackButton?: boolean;
    /**
     * Props to pass to the back button, such as `onClick` handler
     */
    backButtonProps?: EuiFlyoutMenuBackButtonProps;
    /**
     * List of history items for the history popover, ordered most-recent-first.
     * Index 0 is the page the back button navigates to. Not shown if there is
     * just a single item.
     */
    historyItems?: EuiFlyoutHistoryItem[];
    /**
     * List of action items rendered at the start (inline-start) of the menu bar.
     */
    leadingActions?: EuiFlyoutMenuAction[];
    /**
     * List of action items rendered at the end (inline-end) of the menu bar.
     */
    trailingActions?: EuiFlyoutMenuAction[];
    /**
     * List of custom action items for the menu component
     * @deprecated Use `trailingActions` instead. If both are supplied, `trailingActions` takes precedence.
     */
    customActions?: EuiFlyoutMenuCustomAction[];
    /**
     * Enables Prev/Next navigation controls and a position counter in the menu bar.
     * Pagination replaces back/history navigation in the left menu slot.
     */
    pagination?: EuiFlyoutMenuPagination;
  };
