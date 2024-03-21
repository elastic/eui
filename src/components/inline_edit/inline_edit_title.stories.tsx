/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import type { Meta, StoryObj } from '@storybook/react';

import {
  EuiInlineEditTitle,
  EuiInlineEditTitleProps,
} from './inline_edit_title';

const meta: Meta<EuiInlineEditTitleProps> = {
  title: 'Forms/EuiInlineEditTitle',
  component: EuiInlineEditTitle,
  // Component defaults
  args: {
    size: 'm',
  },
};

export default meta;
type Story = StoryObj<EuiInlineEditTitleProps>;

export const Playground: Story = {
  args: {
    heading: 'h1',
    defaultValue: 'Hello World!',
    inputAriaLabel: 'Edit title inline',
  },
};

export const EditMode: Story = {
  args: {
    heading: 'h1',
    defaultValue: 'Hello World!',
    inputAriaLabel: 'Edit title inline',
    startWithEditOpen: true,
  },
};
