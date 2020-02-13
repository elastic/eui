import React, { Component, InputHTMLAttributes } from 'react';
import classNames from 'classnames';
import { CommonProps } from '../common';
import { EuiIcon } from '../icon';

export interface EuiMarkdownEditorFilePickerProps
  extends CommonProps,
    Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  /**
   * Use as a callback to access the HTML FileList API
   */
  onChange?: (files: FileList | null) => void;
}

export class EuiMarkdownEditorFilePicker extends Component<
  EuiMarkdownEditorFilePickerProps
> {
  state = {
    files: {},
    large: true,
    isHoveringDrop: false,
  };

  fileInput: HTMLInputElement | null = null;

  handleChange = (attachedFile?: string | null) => {
    if (!this.fileInput) return;

    console.log(attachedFile);

    console.log(this.fileInput.files);

    const { onChange } = this.props;

    if (onChange) {
      onChange(this.fileInput.files);
    }
  };

  showDrop = () => {
    if (!this.props.disabled) {
      this.setState({ isHoveringDrop: true });
    }
  };

  hideDrop = () => {
    this.setState({ isHoveringDrop: false });
  };

  render() {
    const {
      id,
      name,
      className,
      disabled,
      onChange,
      children,
      ...rest
    } = this.props;

    const classes = classNames(
      'euiMarkdownEditor__filePicker',
      {
        euiMarkdownEditor__filePicker__showDrop: this.state.isHoveringDrop,
      },
      className
    );

    return (
      <div
        draggable
        onDragOver={this.showDrop}
        onDragLeave={this.hideDrop}
        onDrop={this.hideDrop}>
        {children}
        <div className={classes}>
          <input
            type="file"
            className="euiMarkdownEditor__filePicker__input"
            multiple
            onChange={() => this.handleChange()}
            ref={input => {
              this.fileInput = input;
            }}
            disabled={disabled}
            {...rest}
          />
          <div className="euiMarkdownEditor__filePicker__placeholder">
            <EuiIcon
              className="euiMarkdownEditor__filePicker__icon"
              type="importAction"
              size="s"
              aria-hidden="true"
            />
            <div className="euiMarkdownEditor__filePicker__text">
              Attach files by dragging & dropping or by clicking this area
            </div>
          </div>
        </div>
      </div>
    );
  }
}
