/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { EuiFieldText } from './field_text';
import { EuiFormRow } from './form_row';
import { EuiForm, EuiFormProps } from './form';

const meta: Meta<EuiFormProps> = {
  title: 'Forms/EuiForm',
  component: EuiForm,
  args: {
    component: 'div',
    invalidCallout: 'above',
    // set up for easier testing/QA
    fullWidth: false,
    isInvalid: false,
    error: '',
  },
};

export default meta;
type Story = StoryObj<EuiFormProps>;

export const Playground: Story = {
  args: {
    children: (
      <>
        <EuiFormRow>
          <EuiFieldText aria-label="EuiForm demo" />
        </EuiFormRow>
      </>
    ),
  },
};

export const Error: Story = {
  parameters: {
    controls: {
      include: ['error', 'isInvalid', 'invalidCallout'],
    },
  },
  args: {
    children: (
      <>
        <EuiFormRow label="Text field">
          <EuiFieldText name="first_text" />
        </EuiFormRow>
      </>
    ),
    isInvalid: true,
    error: [
      "Here's an example of an error",
      'You might have more than one error, so pass an array.',
    ],
  },
};
