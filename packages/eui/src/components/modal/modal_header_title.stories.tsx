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
import { EuiModalHeader } from './modal_header';
import {
  EuiModalHeaderTitle,
  EuiModalHeaderTitleProps,
} from './modal_header_title';
import { LOKI_SELECTORS } from '../../../.storybook/loki';

const meta: Meta<EuiModalHeaderTitleProps> = {
  title: 'Layout/EuiModal/EuiModalHeaderTitle',
  component: EuiModalHeaderTitle,
  argTypes: {
    component: { control: { type: 'text' } },
  },
  // Component defaults
  args: {
    component: 'h1',
  },
  decorators: [
    (Story) => (
      <EuiModal onClose={action('onClose')}>
        <EuiModalHeader>
          <Story />
        </EuiModalHeader>
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
type Story = StoryObj<EuiModalHeaderTitleProps>;

export const Playground: Story = {
  args: {
    children: 'Modal header title',
  },
};
