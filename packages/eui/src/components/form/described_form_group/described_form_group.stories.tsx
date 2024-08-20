/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { EuiForm } from '../form';
import { EuiFormRow } from '../form_row';
import { EuiFieldText } from '../field_text';

import {
  EuiDescribedFormGroup,
  EuiDescribedFormGroupProps,
} from './described_form_group';

const meta: Meta<EuiDescribedFormGroupProps> = {
  title: 'Forms/EuiForm/EuiDescribedFormGroup',
  component: EuiDescribedFormGroup,
  decorators: [
    (Story, { args }) => (
      <EuiForm component="form">
        <Story {...args} />
      </EuiForm>
    ),
  ],
  argTypes: {
    description: { control: 'text' },
  },
  args: {
    gutterSize: 'l',
    fullWidth: false,
    ratio: 'half',
    titleSize: 'xs',
    // set up for easier testing/QA
    description: '',
    descriptionFlexItemProps: {},
    fieldFlexItemProps: {},
  },
};

export default meta;
type Story = StoryObj<EuiDescribedFormGroupProps>;

export const Playground: Story = {
  args: {
    title: <h2>Form group title</h2>,
    description: 'Descriptions are wrapped in a small, subdued EuiTextBlock.',
    children: (
      <EuiFormRow label="Text field">
        <EuiFieldText name="first" />
      </EuiFormRow>
    ),
  },
};

export const ImplicitTitles: Story = {
  args: {
    title: <h2 id="titleId">Implicit titles</h2>,
    description: 'Use this pattern if the title and label are the same.',
    children: (
      <EuiFormRow helpText="Make sure to use aria-labelledby pointed at the title element">
        <EuiFieldText aria-labelledby="titleId" />
      </EuiFormRow>
    ),
  },
};
