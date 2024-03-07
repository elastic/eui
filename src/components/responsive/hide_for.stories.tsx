/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import type { Meta, StoryObj } from '@storybook/react';

import { EuiHideFor, EuiHideForProps } from './hide_for';

const meta: Meta<EuiHideForProps> = {
  title: 'EuiHideFor',
  component: EuiHideFor,
};

export default meta;
type Story = StoryObj<EuiHideForProps>;

export const Playground: Story = {
  args: {
    sizes: ['xs'],
    children:
      'Try changing the Storybook viewport, or adding the `l` size, to see how it affects the visibility of this text.',
  },
};
