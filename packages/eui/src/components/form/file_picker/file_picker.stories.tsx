/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import type { Meta, StoryObj } from '@storybook/react';

import { enableFunctionToggleControls } from '../../../../.storybook/utils';

import { EuiFilePicker, EuiFilePickerProps } from './file_picker';

const meta: Meta<EuiFilePickerProps> = {
  title: 'Forms/EuiFilePicker',
  component: EuiFilePicker,
  args: {
    initialPromptText: 'Select or drag and drop a file',
    compressed: false,
    display: 'large',
    // set up for easier testing/QA
    disabled: false,
    fullWidth: false,
    isInvalid: false,
    isLoading: false,
    id: '',
    name: '',
  },
};
enableFunctionToggleControls(meta, ['onChange']);

export default meta;
type Story = StoryObj<EuiFilePickerProps>;

export const Playground: Story = {};
