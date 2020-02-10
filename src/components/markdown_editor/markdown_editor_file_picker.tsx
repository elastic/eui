import React, { Component, HTMLAttributes } from 'react';
import { CommonProps } from '../common';

export type EuiMarkdownEditorFilePickerProps = HTMLAttributes<HTMLDivElement> &
  CommonProps & {
    markdownActions?: any;
    viewMarkdownPreview?: any;
    onTogglePreview?: any;
  };

export class EuiMarkdownEditorFilePicker extends Component<
  EuiMarkdownEditorFilePickerProps
> {
  state = {
    files: {},
    large: true,
  };

  onChange = (files: any) => {
    this.setState({
      files: files,
    });
  };

  render() {
    return (
      <div className="euiMarkdownEditor__filePicker">
        <input type="file" className="euiMarkdownEditor__filePicker__input" />
      </div>
    );
  }
}
