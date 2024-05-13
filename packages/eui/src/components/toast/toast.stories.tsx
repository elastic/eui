/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import type { Meta, StoryObj } from '@storybook/react';

import {
  enableFunctionToggleControls,
  hideStorybookControls,
} from '../../../.storybook/utils';
import { EuiToast, EuiToastProps, COLORS } from './toast';

const meta: Meta<EuiToastProps> = {
  title: 'Display/EuiToast',
  component: EuiToast,
  argTypes: {
    children: {
      control: 'text',
      // @ts-ignore - overwritten to output proper type as inferred type is not correct
      type: 'ReactNode',
    },
    color: { control: 'select', options: [undefined, ...COLORS] },
    title: { control: 'text' },
    iconType: { control: 'text' },
  },
  args: {
    // set up for easier testing/QA
    title: '',
    iconType: '',
  },
};
enableFunctionToggleControls(meta, ['onClose']);
hideStorybookControls(meta, ['aria-label']);

export default meta;
type Story = StoryObj<EuiToastProps>;

export const Playground: Story = {
  args: {
    title: "It's a Toast!",
    children: 'Toast content',
    // @ts-ignore - using story specific types
    onClose: false, // overwriting to false to mimick the default state without close button
  },
};
