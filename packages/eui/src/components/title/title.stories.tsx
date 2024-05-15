/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { hideStorybookControls } from '../../../.storybook/utils';
import { EuiTitle, EuiTitleProps, TEXT_TRANSFORM, TITLE_SIZES } from './title';

const meta: Meta<EuiTitleProps> = {
  title: 'Display/EuiTitle',
  component: EuiTitle,
  argTypes: {
    size: {
      control: 'select',
      options: TITLE_SIZES, // re-adding manually to ensure proper sorting
    },
    textTransform: {
      control: 'radio',
      options: [undefined, ...TEXT_TRANSFORM],
    },
  },
  args: {
    size: 'm',
  },
};
hideStorybookControls(meta, ['aria-label']);

export default meta;
type Story = StoryObj<EuiTitleProps>;

export const Playground: Story = {
  args: {
    children: <h2>Lorem ipsum dolor sit</h2>,
  },
};
