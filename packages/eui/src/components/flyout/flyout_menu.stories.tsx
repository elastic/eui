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

interface Args extends EuiFlyoutMenuProps {
  showCustomActions: boolean;
  showHistoryItems: boolean;
}

const meta: Meta<Args> = {
  title: 'Layout/EuiFlyout/EuiFlyoutMenu',
  component: EuiFlyoutMenu,
  argTypes: {
    hideTitle: { control: 'boolean' },
    showBackButton: { control: 'boolean' },
    showCustomActions: { control: 'boolean' },
    'aria-label': { table: { disable: true } },
    backButtonProps: { table: { disable: true } },
    customActions: { table: { disable: true } },
    historyItems: { table: { disable: true } },
  },
  args: {
    hideCloseButton: false,
    showBackButton: true,
    showCustomActions: true,
    showHistoryItems: true,
    hideTitle: true,
  },
};

export default meta;

const MenuBarFlyout = (args: Args) => {
  const {
    hideTitle,
    hideCloseButton,
    showBackButton,
    showCustomActions,
    showHistoryItems,
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

  const historyItems = showHistoryItems
    ? ['First item', 'Second item', 'Third item'].map((title) => ({
        title,
        onClick: () => {
          action('history item')(`${title} clicked`);
        },
      }))
    : undefined;

  const customActions = ['gear', 'broom'].map((iconType) => ({
    iconType,
    onClick: () => {
      action('custom action')(`${iconType} action clicked`);
    },
    'aria-label': `${iconType} action`,
  }));

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
            customActions: showCustomActions ? customActions : undefined,
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

export const MenuBarExample: StoryObj<Args> = {
  name: 'Playground',
  parameters: {
    vrt: {
      selector: VRT_SELECTORS.portal,
    },
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

const PaginationFlyout = () => {
  const [isFlyoutOpen, setIsFlyoutOpen] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const total = PAGINATION_ITEMS.length;
  const item = PAGINATION_ITEMS[currentIndex];

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
              currentIndex,
              total,
              onPrevious: () => setCurrentIndex((i) => Math.max(0, i - 1)),
              onNext: () => setCurrentIndex((i) => Math.min(total - 1, i + 1)),
            },
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

export const PaginationExample: StoryObj = {
  name: 'Pagination (prop-based)',
  parameters: {
    vrt: { selector: VRT_SELECTORS.portal },
  },
  render: () => <PaginationFlyout />,
};
