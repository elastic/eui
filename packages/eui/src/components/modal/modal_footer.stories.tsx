/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { EuiModal } from './modal';
import { EuiModalFooter, EuiModalFooterProps } from './modal_footer';
import { LOKI_SELECTORS } from '../../../.storybook/loki';

const meta: Meta<EuiModalFooterProps> = {
  title: 'Layout/EuiModal/EuiModalFooter',
  component: EuiModalFooter,
  decorators: [
    (Story) => (
      <EuiModal onClose={action('onClose')}>
        <Story />
      </EuiModal>
    ),
  ],
  parameters: {
    loki: {
      // Modal is rendered in a portal
      chromeSelector: LOKI_SELECTORS.portal,
    },
  },
};

export default meta;
type Story = StoryObj<EuiModalFooterProps>;

export const Playground: Story = {
  args: {
    children: 'Modal footer',
  },
};
