/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { EuiFlyout } from './flyout';
import { EuiFlyoutBody } from './flyout_body';
import {
  EuiFlyoutMenuBar,
  EuiFlyoutMenuBarProps,
  EuiFlyoutMenuBarAction,
} from './flyout_menu_bar';
import { EuiText } from '../text';
import { EuiSpacer } from '../spacer';
import { EuiFlexGroup, EuiFlexItem } from '../flex';
import { EuiIcon } from '../icon';
import { EuiButton } from '../button';
import { LOKI_SELECTORS } from '../../../.storybook/loki';

const meta: Meta<EuiFlyoutMenuBarProps> = {
  title: 'Layout/EuiFlyout/EuiFlyoutMenuBar',
  component: EuiFlyoutMenuBar,
  argTypes: {
    onClose: { action: 'onClose' },
  },
  args: {
    // Component defaults
  },
  parameters: {
    loki: {
      // Flyout content is rendered in a portal
      chromeSelector: LOKI_SELECTORS.portal,
    },
  },
};

export default meta;
type Story = StoryObj<EuiFlyoutMenuBarProps>;

export const Playground: Story = {
  args: {
    title: 'Event details',
  },
  render: function Render({ ...args }) {
    const [isFlyoutOpen, setIsFlyoutOpen] = useState(true);

    const closeFlyout = () => setIsFlyoutOpen(false);
    const openFlyout = () => setIsFlyoutOpen(true);

    return (
      <>
        <EuiButton onClick={openFlyout} disabled={isFlyoutOpen}>
          Open flyout
        </EuiButton>

        {isFlyoutOpen && (
          <EuiFlyout onClose={closeFlyout} hideCloseButton>
            <EuiFlyoutMenuBar {...args} onClose={closeFlyout} />
            <EuiFlyoutBody>
              <EuiText>
                <p>
                  This is a flyout with a menu bar. The menu bar contains a
                  title and a close button.
                </p>
                <EuiSpacer />
                <p>
                  Click the close button in the menu bar to close this flyout.
                </p>
              </EuiText>
            </EuiFlyoutBody>
          </EuiFlyout>
        )}
      </>
    );
  },
};

export const WithTitle: Story = {
  args: {
    title: 'Event details',
  },
  render: function Render({ ...args }) {
    const [isFlyoutOpen, setIsFlyoutOpen] = useState(true);

    const closeFlyout = () => setIsFlyoutOpen(false);
    const openFlyout = () => setIsFlyoutOpen(true);

    return (
      <>
        <EuiButton onClick={openFlyout} disabled={isFlyoutOpen}>
          Open flyout with title
        </EuiButton>

        {isFlyoutOpen && (
          <EuiFlyout onClose={closeFlyout} hideCloseButton>
            <EuiFlyoutMenuBar {...args} onClose={closeFlyout} />
            <EuiFlyoutBody>
              <EuiText>
                <p>
                  This flyout menu bar displays a simple title on the left side
                  and a close button on the right.
                </p>
                <EuiSpacer />
                <p>
                  The title will truncate with ellipsis if it's too long to fit
                  in the available space.
                </p>
              </EuiText>
            </EuiFlyoutBody>
          </EuiFlyout>
        )}
      </>
    );
  },
};

export const WithCustomContent: Story = {
  args: {},
  render: function Render({ ...args }) {
    const [isFlyoutOpen, setIsFlyoutOpen] = useState(true);

    const closeFlyout = () => setIsFlyoutOpen(false);
    const openFlyout = () => setIsFlyoutOpen(true);

    return (
      <>
        <EuiButton onClick={openFlyout} disabled={isFlyoutOpen}>
          Open flyout with custom content
        </EuiButton>

        {isFlyoutOpen && (
          <EuiFlyout onClose={closeFlyout} hideCloseButton>
            <EuiFlyoutMenuBar {...args} onClose={closeFlyout}>
              <EuiFlexGroup
                alignItems="center"
                gutterSize="s"
                responsive={false}
              >
                <EuiFlexItem grow={false}>
                  <EuiIcon type="alert" color="warning" />
                </EuiFlexItem>
                <EuiFlexItem>
                  <EuiText size="s">
                    <strong>Investigation Status</strong>
                  </EuiText>
                </EuiFlexItem>
              </EuiFlexGroup>
            </EuiFlyoutMenuBar>
            <EuiFlyoutBody>
              <EuiText>
                <p>
                  This flyout menu bar displays custom React content instead of
                  a simple title.
                </p>
                <EuiSpacer />
                <p>
                  You can include icons, formatted text, or any other React
                  components in the left content area.
                </p>
              </EuiText>
            </EuiFlyoutBody>
          </EuiFlyout>
        )}
      </>
    );
  },
};

export const LongTitle: Story = {
  args: {
    title:
      'This is a very long title that should demonstrate how the menu bar handles text overflow with ellipsis truncation when the content is too wide',
  },
  render: function Render({ ...args }) {
    const [isFlyoutOpen, setIsFlyoutOpen] = useState(true);

    const closeFlyout = () => setIsFlyoutOpen(false);
    const openFlyout = () => setIsFlyoutOpen(true);

    return (
      <>
        <EuiButton onClick={openFlyout} disabled={isFlyoutOpen}>
          Open flyout with long title
        </EuiButton>

        {isFlyoutOpen && (
          <EuiFlyout onClose={closeFlyout} hideCloseButton>
            <EuiFlyoutMenuBar {...args} onClose={closeFlyout} />
            <EuiFlyoutBody>
              <EuiText>
                <p>
                  This story demonstrates how the menu bar handles long titles
                  by truncating them with ellipsis.
                </p>
              </EuiText>
            </EuiFlyoutBody>
          </EuiFlyout>
        )}
      </>
    );
  },
};

export const EmptyContent: Story = {
  args: {},
  render: function Render({ ...args }) {
    const [isFlyoutOpen, setIsFlyoutOpen] = useState(true);

    const closeFlyout = () => setIsFlyoutOpen(false);
    const openFlyout = () => setIsFlyoutOpen(true);

    return (
      <>
        <EuiButton onClick={openFlyout} disabled={isFlyoutOpen}>
          Open flyout with empty content
        </EuiButton>

        {isFlyoutOpen && (
          <EuiFlyout onClose={closeFlyout} hideCloseButton>
            <EuiFlyoutMenuBar {...args} onClose={closeFlyout} />
            <EuiFlyoutBody>
              <EuiText>
                <p>
                  This flyout menu bar has no title or custom content, showing
                  just the close button.
                </p>
              </EuiText>
            </EuiFlyoutBody>
          </EuiFlyout>
        )}
      </>
    );
  },
};

export const WithActions: Story = {
  args: {
    title: 'Event details',
    actions: [
      {
        key: 'edit',
        iconType: 'pencil',
        'aria-label': 'Edit event',
        onClick: () => console.log('Edit clicked'),
        'data-test-subj': 'editButton',
      },
      {
        key: 'share',
        iconType: 'share',
        'aria-label': 'Share event',
        onClick: () => console.log('Share clicked'),
        'data-test-subj': 'shareButton',
      },
    ] as EuiFlyoutMenuBarAction[],
  },
  render: function Render({ ...args }) {
    const [isFlyoutOpen, setIsFlyoutOpen] = useState(true);

    const closeFlyout = () => setIsFlyoutOpen(false);
    const openFlyout = () => setIsFlyoutOpen(true);

    return (
      <>
        <EuiButton onClick={openFlyout} disabled={isFlyoutOpen}>
          Open flyout with action buttons
        </EuiButton>

        {isFlyoutOpen && (
          <EuiFlyout onClose={closeFlyout} hideCloseButton>
            <EuiFlyoutMenuBar {...args} onClose={closeFlyout} />
            <EuiFlyoutBody>
              <EuiText>
                <p>
                  This flyout menu bar includes custom action buttons (Edit and
                  Share) along with the close button.
                </p>
                <EuiSpacer />
                <p>
                  All action buttons use the "text" color and are positioned to
                  the left of the close button.
                </p>
              </EuiText>
            </EuiFlyoutBody>
          </EuiFlyout>
        )}
      </>
    );
  },
};

export const WithManyActions: Story = {
  args: {
    title: 'Investigation details',
    actions: [
      {
        key: 'edit',
        iconType: 'pencil',
        'aria-label': 'Edit investigation',
        onClick: () => console.log('Edit clicked'),
      },
      {
        key: 'share',
        iconType: 'share',
        'aria-label': 'Share investigation',
        onClick: () => console.log('Share clicked'),
      },
      {
        key: 'copy',
        iconType: 'copy',
        'aria-label': 'Copy investigation',
        onClick: () => console.log('Copy clicked'),
      },
      {
        key: 'download',
        iconType: 'download',
        'aria-label': 'Download investigation',
        onClick: () => console.log('Download clicked'),
      },
      {
        key: 'delete',
        iconType: 'trash',
        'aria-label': 'Delete investigation',
        onClick: () => console.log('Delete clicked'),
      },
    ] as EuiFlyoutMenuBarAction[],
  },
  render: function Render({ ...args }) {
    const [isFlyoutOpen, setIsFlyoutOpen] = useState(true);

    const closeFlyout = () => setIsFlyoutOpen(false);
    const openFlyout = () => setIsFlyoutOpen(true);

    return (
      <>
        <EuiButton onClick={openFlyout} disabled={isFlyoutOpen}>
          Open flyout with overflow menu
        </EuiButton>

        {isFlyoutOpen && (
          <EuiFlyout onClose={closeFlyout} hideCloseButton>
            <EuiFlyoutMenuBar {...args} onClose={closeFlyout} />
            <EuiFlyoutBody>
              <EuiText>
                <p>
                  This flyout menu bar demonstrates the overflow functionality
                  with 5 actions.
                </p>
                <EuiSpacer />
                <p>
                  Only the first 2 actions (Edit and Share) are visible
                  directly. The remaining 3 actions (Copy, Download, Delete) are
                  accessible through the overflow menu (⋮ button).
                </p>
              </EuiText>
            </EuiFlyoutBody>
          </EuiFlyout>
        )}
      </>
    );
  },
};
