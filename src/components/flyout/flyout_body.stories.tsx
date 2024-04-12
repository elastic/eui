/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { EuiCallOut } from '../call_out';
import { EuiFlyout } from './flyout';
import { EuiFlyoutBody, EuiFlyoutBodyProps } from './flyout_body';
import { LOKI_SELECTORS } from '../../../.storybook/loki';

const meta: Meta<EuiFlyoutBodyProps> = {
  title: 'Layout/EuiFlyout/EuiFlyoutBody',
  component: EuiFlyoutBody,
  argTypes: {
    // TODO: editable banner JSX
  },
  args: {
    // Component defaults
    scrollableTabIndex: 0,
  },
  parameters: {
    loki: {
      // Flyout content is rendered in a portal
      chromeSelector: LOKI_SELECTORS.portal,
    },
  },
};

export default meta;
type Story = StoryObj<EuiFlyoutBodyProps>;

export const Playground: Story = {
  args: {
    children: 'Flyout body content',
    banner: <EuiCallOut title="Banner" size="s" />,
  },
  render: ({ ...args }) => (
    <EuiFlyout onClose={() => {}}>
      <EuiFlyoutBody {...args} />
    </EuiFlyout>
  ),
};
