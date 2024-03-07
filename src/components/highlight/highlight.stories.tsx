/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import type { Meta, StoryObj } from '@storybook/react';

import { EuiHighlight, EuiHighlightProps } from './highlight';

const meta: Meta<EuiHighlightProps> = {
  title: 'EuiHighlight',
  component: EuiHighlight,
  argTypes: {},
  // Component defaults
  args: {
    strict: false,
    highlightAll: false,
    hasScreenReaderHelpText: true,
  },
};

export default meta;
type Story = StoryObj<EuiHighlightProps>;

export const Playground: Story = {
  args: {
    children: 'The quick brown fox jumped over the lazy dog.',
    search: 'Quick',
  },
};

export const MultipleSearchStrings: Story = {
  args: {
    children: 'The quick brown fox jumped over the lazy dog.',
    search: ['Fox', 'Dog'],
    highlightAll: true,
  },
};
