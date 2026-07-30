/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import classNames from 'classnames';
import React, {
  FunctionComponent,
  HTMLAttributes,
  useContext,
  useState,
} from 'react';

import { useEuiMemoizedStyles } from '../../services';
import { EuiButtonEmpty, EuiButtonIcon, EuiButtonProps } from '../button';
import { CommonProps, PropsForAnchor } from '../common';
import { EuiFlexGroup, EuiFlexItem } from '../flex';
import { EuiListGroup, EuiListGroupItem } from '../list_group';
import { EuiPopover } from '../popover';
import { EuiScreenReaderLive } from '../accessibility';
import { EuiText } from '../text';
import { EuiTitle } from '../title';
import { EuiToolTip, EuiToolTipProps } from '../tool_tip';
import { EuiFlyoutCloseButton } from './_flyout_close_button';
import { euiFlyoutMenuStyles } from './flyout_menu.styles';
import { EuiFlyoutMenuContext } from './flyout_menu_context';
import type { EuiFlyoutCloseEvent } from './types';
import { EuiI18n, useEuiI18n } from '../i18n';
import type { IconType } from '../icon';

type EuiFlyoutMenuBackButtonProps = Pick<
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
}

/**
 * Custom action item for the flyout menu component
 * @deprecated Use `EuiFlyoutMenuAction` with the `trailingActions` prop instead.
 */
export interface EuiFlyoutMenuCustomAction {
  /**
   * Icon type for the action button
   */
  iconType: string;
  /**
   * onClick handler for the action button
   */
  onClick: () => void;
  /**
   * Aria label for the action button
   */
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
   * Optional props to pass to the underlying **[EuiToolTip](/#/display/tooltip)**.
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
     * List of history items for the history popover
     */
    historyItems?: EuiFlyoutHistoryItem[];
    /**
     * List of action items rendered at the start (inline-start) of the menu bar,
     * after any built-in leading controls (pagination, or back/history).
     */
    leadingActions?: EuiFlyoutMenuAction[];
    /**
     * List of action items rendered at the end (inline-end) of the menu bar,
     * before the close button.
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

const BackButton: React.FC<EuiFlyoutMenuBackButtonProps> = (props) => {
  return (
    <EuiButtonEmpty
      size="xs"
      color="text"
      iconType="undo"
      data-test-subj="euiFlyoutMenuBackButton"
      {...props}
    >
      <EuiI18n token="euiFlyoutMenu.back" default="Back" />
    </EuiButtonEmpty>
  );
};

const HistoryPopover: React.FC<{
  items: EuiFlyoutHistoryItem[];
}> = ({ items }) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const handlePopoverButtonClick = () => {
    setIsPopoverOpen(!isPopoverOpen);
  };

  const historyLabel = useEuiI18n('euiFlyoutMenu.history', 'History');
  const recentlyVisitedLabel = useEuiI18n(
    'euiFlyoutMenu.history.tooltip',
    'Recently visited'
  );

  return (
    <EuiPopover
      button={
        <EuiToolTip content={recentlyVisitedLabel} disableScreenReaderOutput>
          <EuiButtonIcon
            iconType="clockCounter"
            color="text"
            aria-label={historyLabel}
            data-test-subj="euiFlyoutMenuHistoryButton"
          />
        </EuiToolTip>
      }
      isOpen={isPopoverOpen}
      onClick={handlePopoverButtonClick}
      closePopover={() => setIsPopoverOpen(false)}
      panelPaddingSize="xs"
      anchorPosition="downLeft"
    >
      <EuiListGroup>
        {items.map((item, index) => (
          <EuiListGroupItem
            key={`history-item-${index}`}
            label={item.title}
            iconType={item.iconType}
            onClick={() => {
              item.onClick();
              setIsPopoverOpen(false);
            }}
            data-test-subj={`euiFlyoutMenuHistoryItem-${index}`}
          >
            {item.title}
          </EuiListGroupItem>
        ))}
      </EuiListGroup>
    </EuiPopover>
  );
};

const PaginationControls: React.FC<{
  pagination: EuiFlyoutMenuPagination;
}> = ({ pagination }) => {
  const styles = useEuiMemoizedStyles(euiFlyoutMenuStyles);
  const { currentIndex, total, onPrevious, onNext } = pagination;
  const prevLabel = useEuiI18n('euiFlyoutMenu.pagination.previous', 'Previous');
  const nextLabel = useEuiI18n('euiFlyoutMenu.pagination.next', 'Next');
  const counterLabel = useEuiI18n(
    'euiFlyoutMenu.pagination.counter',
    '{position} of {total}',
    { position: currentIndex + 1, total }
  );

  const isPrevDisabled = currentIndex === 0;
  const isNextDisabled = currentIndex === total - 1;

  const prevButton = (
    <EuiButtonIcon
      iconType="chevronSingleUp"
      color="text"
      size="xs"
      aria-label={prevLabel}
      onClick={onPrevious}
      isDisabled={isPrevDisabled}
      data-test-subj="euiFlyoutMenuPaginationPrev"
    />
  );

  const nextButton = (
    <EuiButtonIcon
      iconType="chevronSingleDown"
      color="text"
      size="xs"
      aria-label={nextLabel}
      onClick={onNext}
      isDisabled={isNextDisabled}
      data-test-subj="euiFlyoutMenuPaginationNext"
    />
  );

  return (
    <EuiFlexItem grow={false}>
      <EuiFlexGroup gutterSize="xs" alignItems="center" responsive={false}>
        <EuiFlexItem grow={false}>
          {isPrevDisabled ? (
            prevButton
          ) : (
            <EuiToolTip content={prevLabel} disableScreenReaderOutput>
              {prevButton}
            </EuiToolTip>
          )}
        </EuiFlexItem>
        <EuiFlexItem grow={false}>
          <EuiText
            size="s"
            css={styles.euiFlyoutMenu__paginationCounter}
            aria-hidden="true"
          >
            {counterLabel}
          </EuiText>
          <EuiScreenReaderLive>{counterLabel}</EuiScreenReaderLive>
        </EuiFlexItem>
        <EuiFlexItem grow={false}>
          {isNextDisabled ? (
            nextButton
          ) : (
            <EuiToolTip content={nextLabel} disableScreenReaderOutput>
              {nextButton}
            </EuiToolTip>
          )}
        </EuiFlexItem>
      </EuiFlexGroup>
    </EuiFlexItem>
  );
};

const MenuDivider: React.FC = () => {
  const styles = useEuiMemoizedStyles(euiFlyoutMenuStyles);

  return (
    <EuiFlexItem
      grow={false}
      css={styles.euiFlyoutMenu__divider}
      aria-hidden="true"
      className="euiFlyoutMenu__divider"
    />
  );
};

const MenuActionButton: React.FC<{
  action: EuiFlyoutMenuAction;
}> = ({ action }) => {
  const styles = useEuiMemoizedStyles(euiFlyoutMenuStyles);
  const {
    iconType,
    onClick,
    'aria-label': ariaLabel,
    toolTipContent,
    toolTipProps,
  } = action;

  const button = (
    <EuiButtonIcon
      aria-label={ariaLabel}
      iconType={iconType}
      onClick={onClick}
      color="text"
      size="s"
    />
  );

  return (
    <EuiFlexItem grow={false} css={styles.euiFlyoutMenu__actions}>
      {toolTipContent ? (
        <EuiToolTip
          content={toolTipContent}
          disableScreenReaderOutput
          {...toolTipProps}
        >
          {button}
        </EuiToolTip>
      ) : (
        button
      )}
    </EuiFlexItem>
  );
};

/**
 * The component for the top menu bar inside a flyout. Since this is a private
 * component, rendering is controlled using the `flyoutMenuProps` prop on
 * `EuiFlyout`. In managed session flyouts, the Flyout Manager controls a back
 * button and history popover for navigating to different flyout sessions
 * within the managed context.
 *
 * @private
 */
export const EuiFlyoutMenu: FunctionComponent<EuiFlyoutMenuProps> = ({
  className,
  title,
  titleId,
  hideTitle = true,
  hideCloseButton,
  historyItems = [],
  showBackButton,
  backButtonProps,
  leadingActions = [],
  trailingActions,
  customActions,
  iconType: _iconType,
  pagination,
  ...rest
}) => {
  const { onClose } = useContext(EuiFlyoutMenuContext);

  const styles = useEuiMemoizedStyles(euiFlyoutMenuStyles);
  const classes = classNames('euiFlyoutMenu', className);
  const showPaginationControls = pagination != null && pagination.total > 1;
  const hasBackButton = !showPaginationControls && !!showBackButton;
  const hasHistory = !showPaginationControls && historyItems.length > 0;

  // `trailingActions` takes precedence over the deprecated `customActions` alias
  const effectiveTrailingActions = trailingActions?.length
    ? trailingActions
    : customActions ?? [];

  const hasBuiltInLeadingContent =
    showPaginationControls || hasBackButton || hasHistory;
  const showBackHistoryDivider = hasBackButton && hasHistory;
  const showLeadingBoundaryDivider =
    hasBuiltInLeadingContent && leadingActions.length > 0;
  const showTrailingCloseDivider =
    effectiveTrailingActions.length > 0 && !hideCloseButton;

  let titleNode;
  if (title) {
    titleNode = (
      <EuiTitle size="xxs" id={titleId}>
        <h3 css={hideTitle && styles.euiFlyoutMenu__hiddenTitle}>{title}</h3>
      </EuiTitle>
    );
  }

  const handleClose = (event: EuiFlyoutCloseEvent) => {
    onClose?.(event, { reason: 'close-button' });
  };

  const closeButton = (
    <EuiFlyoutCloseButton
      onClose={handleClose}
      side="right"
      closeButtonPosition="inside"
    />
  );

  return (
    <div
      className={classes}
      css={styles.euiFlyoutMenu__container}
      data-test-subj="euiFlyoutMenu"
      {...rest}
    >
      <EuiFlexGroup
        alignItems="center"
        justifyContent="spaceBetween"
        gutterSize="none"
        responsive={false}
      >
        {showPaginationControls ? (
          <PaginationControls pagination={pagination} />
        ) : (
          <>
            {hasBackButton && (
              <EuiFlexItem grow={false}>
                <BackButton {...backButtonProps} />
              </EuiFlexItem>
            )}
            {showBackHistoryDivider && <MenuDivider />}
            {hasHistory && (
              <EuiFlexItem grow={false}>
                <HistoryPopover items={historyItems} />
              </EuiFlexItem>
            )}
          </>
        )}

        {showLeadingBoundaryDivider && <MenuDivider />}

        {leadingActions.map((action, actionIndex) => (
          <MenuActionButton
            key={`leading-action-${actionIndex}`}
            action={action}
          />
        ))}

        {titleNode && <EuiFlexItem grow={false}>{titleNode}</EuiFlexItem>}

        <EuiFlexItem grow={true}></EuiFlexItem>

        {effectiveTrailingActions.map((action, actionIndex) => (
          <MenuActionButton
            key={`trailing-action-${actionIndex}`}
            action={action}
          />
        ))}

        {/* spacer to give trailing actions room around the close button */}
        {!hideCloseButton && (
          <EuiFlexItem
            grow={false}
            css={[
              styles.euiFlyoutMenu__spacer,
              showTrailingCloseDivider && styles.euiFlyoutMenu__divider,
            ]}
            className={
              showTrailingCloseDivider ? 'euiFlyoutMenu__divider' : undefined
            }
            aria-hidden={showTrailingCloseDivider ? 'true' : undefined}
          />
        )}
      </EuiFlexGroup>
      {!hideCloseButton && closeButton}
    </div>
  );
};
