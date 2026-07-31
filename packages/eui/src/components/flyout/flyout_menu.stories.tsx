/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { useState } from 'react';

import { action } from '@storybook/addon-actions';
import { Meta, StoryObj } from '@storybook/react';
import { VRT_SELECTORS } from '../../../.storybook/vrt';
import { EuiButton } from '../button';
import { EuiSpacer } from '../spacer';
import { EuiText } from '../text';
import { EuiFlyout } from './flyout';
import { EuiFlyoutBody } from './flyout_body';
import { EuiFlyoutMenu, EuiFlyoutMenuProps } from './flyout_menu';
import { EuiFlyoutHeader } from './flyout_header';

type PaginationVariant = 'default' | 'horizontal' | 'jump';

interface Args extends EuiFlyoutMenuProps {
  leadingActionCount: number;
  trailingActionCount: number;
  historyItemCount: number;
  paginationTotal: number;
  paginationVariant: PaginationVariant;
}

const COUNT_CONTROL = {
  control: { type: 'range' as const, min: 0, max: 4, step: 1 },
};

const PAGINATION_TOTAL_CONTROL = {
  control: { type: 'range' as const, min: 1, max: 42, step: 1 },
};

const meta: Meta<Args> = {
  title: 'Layout/EuiFlyout/EuiFlyoutMenu',
  component: EuiFlyoutMenu,
  argTypes: {
    hideTitle: { control: 'boolean' },
    leadingActionCount: {
      ...COUNT_CONTROL,
      description:
        'Story-only control for the number of `leadingActions` to render.',
    },
    trailingActionCount: {
      ...COUNT_CONTROL,
      description:
        'Story-only control for the number of `trailingActions` to render.',
    },
    historyItemCount: {
      ...COUNT_CONTROL,
      description:
        'Story-only control for the number of `historyItems` to pass. Mirroring managed session flyouts, `showBackButton` is derived from this: the back button appears from one item, while the history popover only appears from two, since a single item would duplicate the back button.',
    },
    paginationTotal: {
      ...PAGINATION_TOTAL_CONTROL,
      description:
        'Story-only control for the number of pages passed to `pagination.total`. Only used by the "Pagination (prop-based)" story.',
    },
    paginationVariant: {
      control: { type: 'radio' as const },
      options: ['default', 'horizontal', 'jump'] as PaginationVariant[],
      description:
        'Story-only control for the shape of the pagination controls. "horizontal" sets `pagination.previousIconType`/`nextIconType` to left/right chevrons, mimicking apps like Discover that page through horizontally-oriented content. "jump" adds `pagination.onFirst`/`onLast` for jumping to the beginning and end of the list, which switches the Prev/Next chevrons to left/right on its own.',
    },
    'aria-label': { table: { disable: true } },
    showBackButton: { table: { disable: true } },
    backButtonProps: { table: { disable: true } },
    trailingActions: { table: { disable: true } },
    customActions: { table: { disable: true } },
    leadingActions: { table: { disable: true } },
    historyItems: { table: { disable: true } },
    pagination: { table: { disable: true } },
  },
  args: {
    hideCloseButton: false,
    leadingActionCount: 1,
    trailingActionCount: 2,
    historyItemCount: 3,
    hideTitle: true,
  },
};

export default meta;

const LEADING_ACTION_POOL = [
  { iconType: 'documents', label: 'View surrounding documents' },
  { iconType: 'pin', label: 'Pin' },
  { iconType: 'tag', label: 'Tag' },
  { iconType: 'download', label: 'Download' },
];

const TRAILING_ACTION_POOL = [
  { iconType: 'minimize', label: 'Minimize' },
  { iconType: 'gear', label: 'Settings' },
  { iconType: 'broom', label: 'Clear' },
  { iconType: 'share', label: 'Share' },
];

const HISTORY_ITEM_POOL = [
  'First item',
  'Second item',
  'Third item',
  'Fourth item',
];

const buildHistoryItems = (count: number) =>
  HISTORY_ITEM_POOL.slice(0, count).map((title) => ({
    title,
    onClick: () => {
      action('history item')(`${title} clicked`);
    },
  }));

const buildActions = (
  pool: typeof LEADING_ACTION_POOL,
  count: number,
  actionName: string
) =>
  pool.slice(0, count).map(({ iconType, label }) => ({
    iconType,
    onClick: () => {
      action(actionName)(`${label} clicked`);
    },
    'aria-label': label,
    toolTipContent: label,
  }));

const MenuBarFlyout = (args: Args) => {
  const {
    hideTitle,
    hideCloseButton,
    leadingActionCount,
    trailingActionCount,
    historyItemCount,
  } = args;

  const [isFlyoutOpen, setIsFlyoutOpen] = useState(true);
  const openFlyout = () => setIsFlyoutOpen(true);
  const closeFlyout = () => {
    setIsFlyoutOpen(false);
  };

  const backButtonProps = {
    onClick: () => {
      action('back button')('click');
    },
  };

  const historyItems = buildHistoryItems(historyItemCount);

  // Managed session flyouts derive this from history depth rather than
  // accepting it from the consumer; mirror that here.
  const showBackButton = historyItems.length > 0;

  const leadingActions = buildActions(
    LEADING_ACTION_POOL,
    leadingActionCount,
    'leading action'
  );
  const trailingActions = buildActions(
    TRAILING_ACTION_POOL,
    trailingActionCount,
    'trailing action'
  );

  const titleId = 'menu-bar-example-main-title';

  return (
    <>
      <EuiButton onClick={openFlyout} disabled={isFlyoutOpen}>
        Open flyout
      </EuiButton>

      {isFlyoutOpen && (
        <EuiFlyout
          onClose={closeFlyout}
          size="l"
          id="menu-bar-example-main"
          type="overlay"
          outsideClickCloses={false}
          ownFocus
          aria-labelledby={titleId}
          flyoutMenuProps={{
            title: 'Flyout title',
            titleId,
            hideTitle,
            hideCloseButton,
            showBackButton,
            backButtonProps,
            historyItems,
            leadingActions,
            trailingActions,
          }}
        >
          {hideTitle && (
            <EuiFlyoutHeader hasBorder>
              <EuiText>
                <h2 id={titleId}>Simple flyout header</h2>
              </EuiText>
            </EuiFlyoutHeader>
          )}
          <EuiFlyoutBody>
            <EuiText>
              <p>Simple flyout content.</p>
              <EuiSpacer size="m" />
            </EuiText>
          </EuiFlyoutBody>
        </EuiFlyout>
      )}
    </>
  );
};

export const Playground: StoryObj<Args> = {
  parameters: {
    vrt: {
      selector: VRT_SELECTORS.portal,
    },
  },
  argTypes: {
    // Not applicable outside the "Pagination (prop-based)" story
    paginationTotal: { table: { disable: true } },
    paginationVariant: { table: { disable: true } },
  },
  render: (args) => <MenuBarFlyout {...args} />,
};

const PAGINATION_ITEMS = [
  {
    title: 'CPU usage spike',
    body: 'CPU usage exceeded 95% for 5 minutes on host prod-web-01.',
  },
  {
    title: 'Disk space low',
    body: 'Available disk space on /var/log dropped below 10% on host prod-db-02.',
  },
  {
    title: 'Memory pressure',
    body: 'JVM heap usage is at 92% on Elasticsearch node es-data-03.',
  },
  {
    title: 'Network latency',
    body: 'P99 latency exceeded 2s on the payments API for the last 10 minutes.',
  },
  {
    title: 'Cluster yellow',
    body: 'Elasticsearch cluster health is yellow — 3 unassigned replica shards.',
  },
];

// Beyond the pool, cycle through it again but keep each page's title unique
// so it's obvious the control is actually changing pages.
const getPaginationItem = (index: number) => {
  const item = PAGINATION_ITEMS[index % PAGINATION_ITEMS.length];
  return index < PAGINATION_ITEMS.length
    ? item
    : { ...item, title: `${item.title} #${index + 1}` };
};

const PaginationFlyout = ({
  leadingActionCount,
  trailingActionCount,
  paginationTotal,
  paginationVariant,
}: Pick<
  Args,
  | 'leadingActionCount'
  | 'trailingActionCount'
  | 'paginationTotal'
  | 'paginationVariant'
>) => {
  const [isFlyoutOpen, setIsFlyoutOpen] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const total = paginationTotal;
  // Clamp in case the total shrinks below the page the user was viewing.
  const safeIndex = Math.min(currentIndex, total - 1);
  const item = getPaginationItem(safeIndex);

  const leadingActions = buildActions(
    LEADING_ACTION_POOL,
    leadingActionCount,
    'leading action'
  );
  const trailingActions = buildActions(
    TRAILING_ACTION_POOL,
    trailingActionCount,
    'trailing action'
  );

  return (
    <>
      <EuiButton onClick={() => setIsFlyoutOpen(true)} disabled={isFlyoutOpen}>
        Open flyout
      </EuiButton>

      {isFlyoutOpen && (
        <EuiFlyout
          onClose={() => setIsFlyoutOpen(false)}
          size="m"
          type="overlay"
          aria-label="Item details"
          flyoutMenuProps={{
            pagination: {
              currentIndex: safeIndex,
              total,
              onPrevious: () => setCurrentIndex(Math.max(0, safeIndex - 1)),
              onNext: () => setCurrentIndex(Math.min(total - 1, safeIndex + 1)),
              ...(paginationVariant === 'horizontal' && {
                previousIconType: 'chevronSingleLeft',
                nextIconType: 'chevronSingleRight',
              }),
              ...(paginationVariant === 'jump' && {
                onFirst: () => setCurrentIndex(0),
                onLast: () => setCurrentIndex(total - 1),
              }),
            },
            leadingActions,
            trailingActions,
          }}
        >
          <EuiFlyoutHeader hasBorder>
            <EuiText>
              <h2>{item.title}</h2>
            </EuiText>
          </EuiFlyoutHeader>
          <EuiFlyoutBody>
            <EuiText>
              <p>{item.body}</p>
            </EuiText>
          </EuiFlyoutBody>
        </EuiFlyout>
      )}
    </>
  );
};

export const PaginationExample: StoryObj<Args> = {
  name: 'Pagination (prop-based)',
  parameters: {
    vrt: { selector: VRT_SELECTORS.portal },
  },
  argTypes: {
    // Not applicable outside the "Playground" story
    historyItemCount: { table: { disable: true } },
  },
  args: {
    leadingActionCount: 1,
    trailingActionCount: 0,
    paginationTotal: 5,
    paginationVariant: 'jump',
  },
  render: ({
    leadingActionCount,
    trailingActionCount,
    paginationTotal,
    paginationVariant,
  }) => (
    <PaginationFlyout
      leadingActionCount={leadingActionCount}
      trailingActionCount={trailingActionCount}
      paginationTotal={paginationTotal}
      paginationVariant={paginationVariant}
    />
  ),
};
