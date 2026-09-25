/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { hideStorybookControls } from '../../../../.storybook/utils';

import {
  EuiFormLabelAppend,
  EuiFormLabelAppendProps,
} from './form_label_append';

const meta: Meta<EuiFormLabelAppendProps> = {
  title: 'Forms/EuiForm/EuiFormRow/Subcomponents/EuiFormLabelAppend',
  component: EuiFormLabelAppend,
};
hideStorybookControls(meta, ['aria-label']);

export default meta;
type Story = StoryObj<EuiFormLabelAppendProps>;

export const Playground: Story = {
  args: {
    children: 'Optional',
  },
};

export const CustomContent: Story = {
  args: {
    children: <a href="#">Learn more</a>,
  },
};
