/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import type { Meta, StoryObj } from '@storybook/react';

import {
  EuiModalHeaderTitle,
  EuiModalHeaderTitleProps,
} from './modal_header_title';

const meta: Meta<EuiModalHeaderTitleProps> = {
  title: 'Layout/EuiModal/EuiModalHeaderTitle',
  component: EuiModalHeaderTitle,
  argTypes: {
    component: { control: { type: 'text' } },
  },
  // Component defaults
  args: {
    component: 'h1',
  },
};

export default meta;
type Story = StoryObj<EuiModalHeaderTitleProps>;

export const Playground: Story = {
  args: {
    children: 'Modal header title',
  },
};
