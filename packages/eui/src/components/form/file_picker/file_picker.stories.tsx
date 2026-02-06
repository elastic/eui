/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { useState, useCallback } from 'react';
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

export const NonLargeDisplay: Story = {
  args: { display: 'default' },
};

/**
 * Demonstrates using the `files` prop to maintain file picker state.
 * This is useful for multi-step forms where the component may unmount
 * and remount while the file data is stored in context/state.
 */
export const ControlledWithFilesProp: Story = {
  render: function Render() {
    const [storedFiles, setStoredFiles] = useState<FileList | null>(null);
    const [showPicker, setShowPicker] = useState(true);

    const handleChange = useCallback((files: FileList | null) => {
      setStoredFiles(files);
    }, []);

    return (
      <div>
        <p style={{ marginBottom: 16 }}>
          Click &quot;Toggle Picker&quot; to simulate unmount/remount. The file
          picker state will be preserved.
        </p>
        <button
          onClick={() => setShowPicker(!showPicker)}
          style={{ marginBottom: 16 }}
        >
          Toggle Picker (Currently: {showPicker ? 'Visible' : 'Hidden'})
        </button>
        {showPicker && (
          <EuiFilePicker
            files={storedFiles}
            onChange={handleChange}
            initialPromptText="Select a file"
          />
        )}
        {storedFiles && storedFiles.length > 0 && (
          <p style={{ marginTop: 16 }}>
            Stored files:{' '}
            {Array.from(storedFiles)
              .map((f) => f.name)
              .join(', ')}
          </p>
        )}
      </div>
    );
  },
};
