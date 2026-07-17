/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { EuiButton } from '../button';
import { EuiFlyout } from './flyout';
import { EuiFlyoutBody } from './flyout_body';
import { EuiFlyoutFooter, EuiFlyoutFooterProps } from './flyout_footer';
import { VRT_SELECTORS } from '../../../.storybook/vrt';

const meta: Meta<EuiFlyoutFooterProps> = {
  title: 'Layout/EuiFlyout/EuiFlyoutFooter',
  component: EuiFlyoutFooter,
  argTypes: {
    // TODO: editable children
  },
  parameters: {
    vrt: {
      // Flyout content is rendered in a portal
      selector: VRT_SELECTORS.portal,
    },
  },
};

export default meta;
type Story = StoryObj<EuiFlyoutFooterProps>;

export const Playground: Story = {
  args: {
    children: <EuiButton>Flyout footer actions</EuiButton>,
  },
  render: ({ ...args }) => (
    <EuiFlyout onClose={() => {}}>
      <EuiFlyoutBody />
      <EuiFlyoutFooter {...args} />
    </EuiFlyout>
  ),
};
