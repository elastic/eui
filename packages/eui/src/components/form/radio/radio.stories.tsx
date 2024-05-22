/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import type { Meta, StoryObj } from '@storybook/react';

import { enableFunctionToggleControls } from '../../../../.storybook/utils';
import { EuiRadio, EuiRadioProps } from './radio';

const meta: Meta<EuiRadioProps> = {
  title: 'Forms/EuiRadio',
  component: EuiRadio,
  argTypes: {
    label: { control: 'text' },
  },
  args: {
    checked: false,
    compressed: false,
    disabled: false,
    // set up for easier testing/QA
    id: '',
    name: '',
  },
};
enableFunctionToggleControls(meta, ['onChange']);

export default meta;
type Story = StoryObj<EuiRadioProps>;

export const Playground: Story = {
  args: {
    id: 'radio',
    label: 'Radio label',
    value: 'radio-1',
  },
};
