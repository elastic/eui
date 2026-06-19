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
import { EuiModalBody, EuiModalBodyProps } from './modal_body';
import { VRT_SELECTORS } from '../../../.storybook/vrt';

const meta: Meta<EuiModalBodyProps> = {
  title: 'Layout/EuiModal/EuiModalBody',
  component: EuiModalBody,
  decorators: [
    (Story, { args }) => (
      <EuiModal onClose={action('onClose')}>
        <Story {...args} />
      </EuiModal>
    ),
  ],
  parameters: {
    vrt: {
      // Modal is rendered in a portal
      selector: VRT_SELECTORS.portal,
    },
  },
};

export default meta;
type Story = StoryObj<EuiModalBodyProps>;

export const Playground: Story = {
  args: {
    children: 'Modal body',
  },
};
