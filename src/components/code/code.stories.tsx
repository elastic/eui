/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import type { Meta, StoryObj } from '@storybook/react';

import { EuiCode, EuiCodeProps } from './code';

const meta: Meta<EuiCodeProps> = {
  title: 'EuiCode',
  component: EuiCode,
  args: {
    // Component defaults
    transparentBackground: false,
  },
};

export default meta;
type Story = StoryObj<EuiCodeProps>;

export const Playground: Story = {
  args: {
    children: '<!-- Hello world -->',
  },
};
