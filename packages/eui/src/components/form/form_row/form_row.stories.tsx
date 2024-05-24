/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { EuiFieldText } from '../field_text';
import { EuiForm } from '../form';

import { EuiFormRow, EuiFormRowProps } from './form_row';

const meta: Meta<EuiFormRowProps> = {
  title: 'Forms/EuiForm/Subcomponents/EuiFormRow',
  component: EuiFormRow,
  decorators: [
    (Story, { args }) => (
      <EuiForm>
        <Story {...args} />
      </EuiForm>
    ),
  ],
  argTypes: {
    children: {
      type: {
        // @ts-ignore - name is required; overwrite type to match props type
        name: 'ReactElement',
        required: true,
      },
    },
    label: { control: 'text' },
    labelAppend: { control: 'text' },
  },
  args: {
    display: 'row',
    hasEmptyLabelSpace: false,
    describedByIds: [],
    labelType: 'label',
    hasChildLabel: true,
    // set up for easier testing/QA
    fullWidth: false,
    isDisabled: false,
    isInvalid: false,
    helpText: '',
    error: '',
    id: '',
    label: '',
    labelAppend: '',
  },
};

export default meta;
type Story = StoryObj<EuiFormRowProps>;

export const Playground: Story = {
  args: {
    children: <EuiFieldText fullWidth />,
    label: 'Text field label',
    helpText: 'I am some friendly help text.',
  },
};
