/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import type { Meta, StoryObj } from '@storybook/react';

import { EuiLoadingSpinner, EuiLoadingSpinnerProps } from './loading_spinner';

const meta: Meta<EuiLoadingSpinnerProps> = {
  title: 'Display/EuiLoadingSpinner',
  component: EuiLoadingSpinner,
  args: {
    size: 'm',
  },
};

export default meta;
type Story = StoryObj<EuiLoadingSpinnerProps>;

export const Playground: Story = {};
