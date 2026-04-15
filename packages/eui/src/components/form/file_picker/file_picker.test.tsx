/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { fireEvent } from '@testing-library/react';
import { requiredProps } from '../../../test';
import { render, screen } from '../../../test/rtl';
import { shouldRenderCustomStyles } from '../../../test/internal';

import { EuiForm } from '../form';
import { EuiFilePicker } from './file_picker';

const createMockFiles = (fileNames: string[]): File[] => {
  return fileNames.map(
    (name) => new File(['content'], name, { type: 'text/plain' })
  );
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
    it('displays single file name when files prop contains one file', () => {
      const files = createMockFiles(['test-file.txt']);
      render(<EuiFilePicker files={files} />);

      expect(screen.getByText('test-file.txt')).toBeInTheDocument();
    });

    it('displays file count when files prop contains multiple files', () => {
      const files = createMockFiles(['file1.txt', 'file2.txt', 'file3.txt']);
      render(<EuiFilePicker files={files} />);

      expect(screen.getByText('3 files selected')).toBeInTheDocument();
    });

    it('displays initial prompt when files prop is null', () => {
      render(<EuiFilePicker files={null} initialPromptText="Select a file" />);

      expect(screen.getByText('Select a file')).toBeInTheDocument();
    });

    it('displays initial prompt when files prop is an empty array', () => {
      const files = createMockFiles([]);
      render(<EuiFilePicker files={files} initialPromptText="Select a file" />);

      expect(screen.getByText('Select a file')).toBeInTheDocument();
    });

    it('updates displayed state when files prop changes', () => {
      const initialFiles = createMockFiles(['initial-file.txt']);
      const { rerender } = render(<EuiFilePicker files={initialFiles} />);

      expect(screen.getByText('initial-file.txt')).toBeInTheDocument();

      const updatedFiles = createMockFiles(['updated-file.txt']);
      rerender(<EuiFilePicker files={updatedFiles} />);

      expect(screen.getByText('updated-file.txt')).toBeInTheDocument();
    });

    it('shows clear button when files prop is set', () => {
      const files = createMockFiles(['test-file.txt']);
      const { container } = render(<EuiFilePicker files={files} />);

      expect(
        container.querySelector('.euiFilePicker__clearButton')
      ).toBeInTheDocument();
    });

    it('clears file name when clear button is clicked', () => {
      const files = createMockFiles(['test-file.txt']);
      const { container } = render(
        <EuiFilePicker files={files} initialPromptText="Select a file" />
      );

      expect(screen.getByText('test-file.txt')).toBeInTheDocument();

      fireEvent.click(container.querySelector('.euiFilePicker__clearButton')!);

      expect(screen.queryByText('test-file.txt')).not.toBeInTheDocument();
      expect(screen.getByText('Select a file')).toBeInTheDocument();
    });

    it('clicking clear button triggers onChange with null', () => {
      const files = createMockFiles(['test-file.txt']);
      const handleChange = jest.fn();
      const { container } = render(
        <EuiFilePicker files={files} onChange={handleChange} />
      );

      fireEvent.click(container.querySelector('.euiFilePicker__clearButton')!);

      expect(handleChange).toHaveBeenCalledWith(null);
    });

    it('clear button is removed after clearing', () => {
      const files = createMockFiles(['test-file.txt']);
      const { container } = render(<EuiFilePicker files={files} />);

      expect(
        container.querySelector('.euiFilePicker__clearButton')
      ).toBeInTheDocument();

      fireEvent.click(container.querySelector('.euiFilePicker__clearButton')!);

      expect(
        container.querySelector('.euiFilePicker__clearButton')
      ).not.toBeInTheDocument();
    });
  });
});
