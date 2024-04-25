/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { EuiTitle } from '../title';
import { EuiFlyout } from './flyout';
import { EuiFlyoutHeader, EuiFlyoutHeaderProps } from './flyout_header';
import { LOKI_SELECTORS } from '../../../.storybook/loki';

const meta: Meta<EuiFlyoutHeaderProps> = {
  title: 'Layout/EuiFlyout/EuiFlyoutHeader',
  component: EuiFlyoutHeader,
  argTypes: {
    // TODO: editable children JSX
  },
  args: {
    // Component defaults
    hasBorder: false,
  },
  parameters: {
    loki: {
      // Flyout content is rendered in a portal
      chromeSelector: LOKI_SELECTORS.portal,
    },
  },
};

export default meta;
type Story = StoryObj<EuiFlyoutHeaderProps>;

export const Playground: Story = {
  args: {
    children: (
      <EuiTitle>
        <h2>Flyout header</h2>
      </EuiTitle>
    ),
  },
  render: ({ ...args }) => (
    <EuiFlyout onClose={() => {}}>
      <EuiFlyoutHeader {...args} />
    </EuiFlyout>
  ),
};
