/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import type { Meta, StoryObj } from '@storybook/react';

import { EuiMark, EuiMarkProps } from './mark';

const meta: Meta<EuiMarkProps> = {
  title: 'Utilities/EuiMark',
  component: EuiMark,
  // Component defaults
  args: {
    hasScreenReaderHelpText: true,
  },
};

export default meta;
type Story = StoryObj<EuiMarkProps>;

export const Playground: Story = {
  args: {
    children: 'Marked text',
  },
};

export const HighContrast: Story = {
  ...Playground,
  tags: ['vrt-only'],
  globals: { highContrastMode: true },
};
