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
import { EuiModalHeader, EuiModalHeaderProps } from './modal_header';

const meta: Meta<EuiModalHeaderProps> = {
  title: 'Layout/EuiModal/EuiModalHeader',
  component: EuiModalHeader,
  decorators: [
    (Story) => (
      <EuiModal onClose={action('onClose')}>
        <Story />
      </EuiModal>
    ),
  ],
};

export default meta;
type Story = StoryObj<EuiModalHeaderProps>;

export const Playground: Story = {
  args: {
    children: 'Modal header',
  },
};
