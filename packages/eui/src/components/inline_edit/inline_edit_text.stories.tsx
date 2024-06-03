/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import type { Meta, StoryObj } from '@storybook/react';

import { EuiInlineEditText, EuiInlineEditTextProps } from './inline_edit_text';

const meta: Meta<EuiInlineEditTextProps> = {
  title: 'Forms/EuiInlineEditText',
  component: EuiInlineEditText,
  // Component defaults
  args: {
    size: 'm',
  },
};

export default meta;
type Story = StoryObj<EuiInlineEditTextProps>;

export const Playground: Story = {
  args: {
    defaultValue: 'Hello World!',
    inputAriaLabel: 'Edit text inline',
  },
};

export const EditMode: Story = {
  args: {
    defaultValue: 'Hello World!',
    inputAriaLabel: 'Edit text inline',
    startWithEditOpen: true,
  },
};
