/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import type { Meta, StoryObj } from '@storybook/react';

import { hideStorybookControls } from '../../../../.storybook/utils';

import { EuiFormLabel, EuiFormLabelProps } from './form_label';

const meta: Meta<EuiFormLabelProps> = {
  title: 'Forms/EuiForm/EuiFormRow/Subcomponents/EuiFormLabel',
  component: EuiFormLabel,
  args: {
    type: 'label',
    // set up for easier testing/QA
    isFocused: false,
    isInvalid: false,
    isDisabled: false,
  },
};
hideStorybookControls(meta, ['aria-label']);

export default meta;
type Story = StoryObj<EuiFormLabelProps>;

export const Playground: Story = {
  args: {
    children: 'form label',
  },
};
