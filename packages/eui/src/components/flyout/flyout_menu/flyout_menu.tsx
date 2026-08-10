/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import classNames from 'classnames';
import React, { FunctionComponent, useContext } from 'react';

import { useEuiMemoizedStyles } from '../../../services';
import { EuiFlexGroup, EuiFlexItem } from '../../flex';
import { useEuiI18n } from '../../i18n';
import { EuiTitle } from '../../title';
import { EuiToolTip } from '../../tool_tip';
import { EuiFlyoutCloseButton } from '../_flyout_close_button';
import { MIN_HISTORY_ITEMS } from '../const';
import { EuiFlyoutMenuContext } from '../flyout_menu_context';
import type { EuiFlyoutCloseEvent } from '../types';
import { euiFlyoutMenuStyles } from './flyout_menu.styles';
import { BackButton } from './back_button';
import { CloseButtonSpacer } from './close_spacer';
import { HistoryPopover } from './history_popover';
import { MenuActionButton } from './action_button';
import { MenuDivider } from './divider';
import { PaginationControls } from './pagination';
import type { EuiFlyoutMenuProps } from './types';

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
  const showPaginationControls = pagination != null && pagination.total >= 1;
  const hasBackButton = !showPaginationControls && !!showBackButton;
  const hasHistory =
    !showPaginationControls && historyItems.length >= MIN_HISTORY_ITEMS;

  // `trailingActions` takes precedence over the deprecated `customActions` alias
  const effectiveTrailingActions =
    trailingActions !== undefined ? trailingActions : customActions ?? [];

  const hasBuiltInLeadingContent =
    showPaginationControls || hasBackButton || hasHistory;
  const showBackHistoryDivider = hasBackButton && hasHistory;
  const showLeadingBoundaryDivider =
    hasBuiltInLeadingContent && leadingActions.length > 0;
  const showTrailingCloseDivider =
    effectiveTrailingActions.length > 0 && !hideCloseButton;

  // Sub-components are presentational, so all `euiFlyoutMenu.*` tokens are
  // resolved here, in the file that owns the namespace
  const backButtonLabel = useEuiI18n('euiFlyoutMenu.back', 'Back');
  const previousPageTitle = historyItems[historyItems.length - 1]?.title ?? '';
  const backTooltipLabel = useEuiI18n(
    'euiFlyoutMenu.back.tooltip',
    'Back to {previousPage}',
    { previousPage: previousPageTitle }
  );
  const historyLabel = useEuiI18n('euiFlyoutMenu.history', 'History');
  const recentlyVisitedLabel = useEuiI18n(
    'euiFlyoutMenu.history.tooltip',
    'Recently visited'
  );
  const paginationLabels = {
    first: useEuiI18n('euiFlyoutMenu.pagination.first', 'First'),
    previous: useEuiI18n('euiFlyoutMenu.pagination.previous', 'Previous'),
    next: useEuiI18n('euiFlyoutMenu.pagination.next', 'Next'),
    last: useEuiI18n('euiFlyoutMenu.pagination.last', 'Last'),
    counter: useEuiI18n(
      'euiFlyoutMenu.pagination.counter',
      '{position} of {total}',
      {
        position: (pagination?.currentIndex ?? 0) + 1,
        total: pagination?.total ?? 0,
      }
    ),
  };

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
        css={styles.euiFlyoutMenu__controls}
      >
        {showPaginationControls ? (
          <PaginationControls
            pagination={pagination}
            labels={paginationLabels}
          />
        ) : (
          <>
            {hasBackButton && (
              <EuiFlexItem grow={false}>
                {previousPageTitle ? (
                  <EuiToolTip content={backTooltipLabel}>
                    <BackButton label={backButtonLabel} {...backButtonProps} />
                  </EuiToolTip>
                ) : (
                  <BackButton label={backButtonLabel} {...backButtonProps} />
                )}
              </EuiFlexItem>
            )}
            {showBackHistoryDivider && <MenuDivider />}
            {hasHistory && (
              <EuiFlexItem grow={false}>
                <HistoryPopover
                  items={historyItems}
                  historyLabel={historyLabel}
                  recentlyVisitedLabel={recentlyVisitedLabel}
                />
              </EuiFlexItem>
            )}
          </>
        )}

        {showLeadingBoundaryDivider && <MenuDivider />}

        {leadingActions.length > 0 && (
          <EuiFlexItem grow={false} css={styles.euiFlyoutMenu__actions}>
            <EuiFlexGroup gutterSize="s" alignItems="center" responsive={false}>
              {leadingActions.map((action, actionIndex) => (
                <EuiFlexItem key={`leading-action-${actionIndex}`} grow={false}>
                  <MenuActionButton action={action} />
                </EuiFlexItem>
              ))}
            </EuiFlexGroup>
          </EuiFlexItem>
        )}

        {titleNode && <EuiFlexItem grow={false}>{titleNode}</EuiFlexItem>}

        <EuiFlexItem grow={true}></EuiFlexItem>

        {effectiveTrailingActions.length > 0 && (
          <EuiFlexItem grow={false} css={styles.euiFlyoutMenu__actions}>
            <EuiFlexGroup gutterSize="s" alignItems="center" responsive={false}>
              {effectiveTrailingActions.map((action, actionIndex) => (
                <EuiFlexItem
                  key={`trailing-action-${actionIndex}`}
                  grow={false}
                >
                  <MenuActionButton action={action} />
                </EuiFlexItem>
              ))}
            </EuiFlexGroup>
          </EuiFlexItem>
        )}

        {!hideCloseButton && (
          <CloseButtonSpacer showDivider={showTrailingCloseDivider} />
        )}
      </EuiFlexGroup>

      {!hideCloseButton && (
        <EuiFlyoutCloseButton
          onClose={handleClose}
          side="right"
          closeButtonPosition="inside"
        />
      )}
    </div>
  );
};
