/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import type { Meta, StoryObj } from '@storybook/react';

import { hideStorybookControls } from '../../../.storybook/utils';
import { EuiHealth, EuiHealthProps } from './health';

const meta: Meta<EuiHealthProps> = {
  title: 'EuiHealth',
  component: EuiHealth,
  argTypes: {
    color: { control: 'text' },
  },
  // Component defaults
  args: {
    textSize: 's',
  },
};

export default meta;
type Story = StoryObj<EuiHealthProps>;

export const Playground: Story = {
  argTypes: hideStorybookControls(['aria-label']),
  args: {
    children: 'Status',
    color: 'success',
  },
};
