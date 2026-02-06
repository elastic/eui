/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { requiredProps } from '../../../test';
import { render, screen } from '../../../test/rtl';
import { shouldRenderCustomStyles } from '../../../test/internal';

import { EuiForm } from '../form';
import { EuiFilePicker } from './file_picker';

const createMockFileList = (fileNames: string[]): FileList => {
  const files = fileNames.map(
    (name) => new File(['content'], name, { type: 'text/plain' })
  );

  // Create a FileList-like object since DataTransfer may not be available in jsdom
  const fileList = {
    length: files.length,
    item: (index: number) => files[index] || null,
    [Symbol.iterator]: function* () {
      for (const file of files) {
        yield file;
      }
    },
  } as FileList;

  // Add indexed access
  files.forEach((file, index) => {
    Object.defineProperty(fileList, index, {
      value: file,
      enumerable: true,
    });
  });

  return fileList;
};

describe('EuiFilePicker', () => {
  shouldRenderCustomStyles(<EuiFilePicker />, { skip: { style: true } });

  shouldRenderCustomStyles(<EuiFilePicker />, {
    // inline styles are applied to input instead of wrapper
    skip: { className: true, css: true },
    targetSelector: 'input',
  });

  test('is rendered', () => {
    const { container } = render(<EuiFilePicker {...requiredProps} />);

    expect(container.firstChild).toMatchSnapshot();
  });

  describe('inherits', () => {
    test('fullWidth from <EuiForm />', () => {
      const { container } = render(
        <EuiForm fullWidth>
          <EuiFilePicker />
        </EuiForm>
      );

      const filePicker = container.querySelector('.euiFilePicker');
      expect(filePicker!.className).toContain('fullWidth');
    });
  });

  describe('files prop', () => {
    test('displays single file name when files prop contains one file', () => {
      const files = createMockFileList(['test-file.txt']);
      render(<EuiFilePicker files={files} />);

      expect(screen.getByText('test-file.txt')).toBeInTheDocument();
    });

    test('displays file count when files prop contains multiple files', () => {
      const files = createMockFileList(['file1.txt', 'file2.txt', 'file3.txt']);
      render(<EuiFilePicker files={files} />);

      expect(screen.getByText('3 files selected')).toBeInTheDocument();
    });

    test('displays initial prompt when files prop is null', () => {
      render(<EuiFilePicker files={null} initialPromptText="Select a file" />);

      expect(screen.getByText('Select a file')).toBeInTheDocument();
    });

    test('displays initial prompt when files prop is an empty FileList', () => {
      const files = createMockFileList([]);
      render(<EuiFilePicker files={files} initialPromptText="Select a file" />);

      expect(screen.getByText('Select a file')).toBeInTheDocument();
    });

    test('updates displayed state when files prop changes', () => {
      const initialFiles = createMockFileList(['initial-file.txt']);
      const { rerender } = render(<EuiFilePicker files={initialFiles} />);

      expect(screen.getByText('initial-file.txt')).toBeInTheDocument();

      const updatedFiles = createMockFileList(['updated-file.txt']);
      rerender(<EuiFilePicker files={updatedFiles} />);

      expect(screen.getByText('updated-file.txt')).toBeInTheDocument();
    });

    test('shows clear button when files prop is set', () => {
      const files = createMockFileList(['test-file.txt']);
      const { container } = render(<EuiFilePicker files={files} />);

      expect(
        container.querySelector('.euiFilePicker__clearButton')
      ).toBeInTheDocument();
    });
  });
});
