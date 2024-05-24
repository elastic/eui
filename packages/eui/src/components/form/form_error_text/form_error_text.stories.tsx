/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import type { Meta, StoryObj } from '@storybook/react';

import { hideStorybookControls } from '../../../../.storybook/utils';

import { EuiFormErrorText, EuiFormErrorTextProps } from './form_error_text';

const meta: Meta<EuiFormErrorTextProps> = {
  title: 'Forms/EuiForm/EuiFormErrorText',
  component: EuiFormErrorText,
};
hideStorybookControls(meta, ['aria-label']);

export default meta;
type Story = StoryObj<EuiFormErrorTextProps>;

export const Playground: Story = {
  args: {
    children: 'Form error text',
  },
};
