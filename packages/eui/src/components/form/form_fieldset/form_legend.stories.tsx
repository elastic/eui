/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import type { Meta, StoryObj } from '@storybook/react';

import { EuiFormLegend, EuiFormLegendProps } from './form_legend';

const meta: Meta<EuiFormLegendProps> = {
  title: 'Forms/EuiForm/EuiFormFieldset/Subcomponents/EuiFormLegend',
  component: EuiFormLegend,
  args: {
    display: 'visible',
    // set up for easier testing/QA
    compressed: false,
  },
};

export default meta;
type Story = StoryObj<EuiFormLegendProps>;

export const Playground: Story = {
  args: {
    children: 'form legend',
  },
};
