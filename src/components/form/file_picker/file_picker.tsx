/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { Component, InputHTMLAttributes, ReactNode } from 'react';
import classNames from 'classnames';

import { CommonProps, keysOf } from '../../common';

import { EuiValidatableControl } from '../validatable_control';
import { EuiButtonEmpty } from '../../button';
import { EuiProgress } from '../../progress';
import { EuiIcon } from '../../icon';
import { EuiI18n } from '../../i18n';
import { EuiLoadingSpinner } from '../../loading';
import { htmlIdGenerator } from '../../../services/accessibility';
import { FormContext, FormContextValue } from '../eui_form_context';

const displayToClassNameMap = {
  default: null,
  large: 'euiFilePicker--large',
};

export const DISPLAYS = keysOf(displayToClassNameMap);

export type EuiFilePickerDisplay = keyof typeof displayToClassNameMap;

export interface EuiFilePickerProps
  extends CommonProps,
    Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  id?: string;
  name?: string;
  className?: string;
  /**
   * The content that appears in the dropzone if no file is attached
   */
  initialPromptText?: ReactNode;
  /**
   * Use as a callback to access the HTML FileList API
   */
  onChange?: (files: FileList | null) => void;
  /**
   * Reduces the size to a typical (compressed) input
   */
  compressed?: boolean;
  /**
   * Size or type of display;
   * `default` for normal height, similar to other controls;
   * `large` for taller size
   */
  display?: EuiFilePickerDisplay;
  /**
   * Expand to fill 100% of the parent.
   * Defaults to `fullWidth` prop of `<EuiForm>`.
   * @default false
   */
  fullWidth?: boolean;
  isInvalid?: boolean;
  isLoading?: boolean;
  disabled?: boolean;
}

export class EuiFilePicker extends Component<EuiFilePickerProps> {
  static contextType = FormContext;

  static defaultProps = {
    initialPromptText: (
      <EuiI18n
        token="euiFilePicker.promptText"
        default="Select or drag and drop a file"
      />
    ),
    compressed: false,
    display: 'large',
  };

  state = {
    promptText: null,
    isHoveringDrop: false,
  };

  fileInput: HTMLInputElement | null = null;

  generatedId: string = htmlIdGenerator()();

  handleChange = () => {
    if (!this.fileInput) return;

    if (this.fileInput.files && this.fileInput.files.length > 1) {
      this.setState({
        promptText: (
          <EuiI18n
            token="euiFilePicker.filesSelected"
            default="{fileCount} files selected"
            values={{ fileCount: this.fileInput.files.length }}
          />
        ),
      });
    } else if (this.fileInput.files && this.fileInput.files.length === 0) {
      this.setState({ promptText: null });
    } else {
      this.setState({ promptText: this.fileInput.value.split('\\').pop() });
    }

    const { onChange } = this.props;

    if (onChange) {
      onChange(this.fileInput.files);
    }
  };

  removeFiles = (e?: React.MouseEvent<HTMLButtonElement>) => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }

    if (!this.fileInput) return;

    this.fileInput.value = '';
    this.handleChange();
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
    const { defaultFullWidth } = this.context as FormContextValue;

    return (
      <EuiI18n
        token="euiFilePicker.clearSelectedFiles"
        default="Clear selected files"
      >
        {(clearSelectedFiles: string) => {
          const {
            id,
            name,
            initialPromptText,
            className,
            disabled,
            compressed,
            onChange,
            isInvalid,
            fullWidth = defaultFullWidth,
            isLoading,
            display,
            ...rest
          } = this.props;

          const promptId = `${id || this.generatedId}-filePicker__prompt`;

          const isOverridingInitialPrompt = this.state.promptText != null;

          const normalFormControl = display === 'default';

          const classes = classNames(
            'euiFilePicker',
            displayToClassNameMap[display!],
            {
              euiFilePicker__showDrop: this.state.isHoveringDrop,
              'euiFilePicker--compressed': compressed,
              'euiFilePicker--fullWidth': fullWidth,
              'euiFilePicker-isInvalid': isInvalid,
              'euiFilePicker-isLoading': isLoading,
              'euiFilePicker-hasFiles': isOverridingInitialPrompt,
            },
            className
          );

          let clearButton;
          if (isLoading && normalFormControl) {
            // Override clear button with loading spinner if it is in loading state
            clearButton = (
              <EuiLoadingSpinner className="euiFilePicker__loadingSpinner" />
            );
          } else if (isOverridingInitialPrompt && !disabled) {
            if (normalFormControl) {
              clearButton = (
                <button
                  type="button"
                  aria-label={clearSelectedFiles}
                  className="euiFilePicker__clearButton"
                  onClick={this.removeFiles}
                >
                  <EuiIcon className="euiFilePicker__clearIcon" type="cross" />
                </button>
              );
            } else {
              clearButton = (
                <EuiButtonEmpty
                  aria-label={clearSelectedFiles}
                  className="euiFilePicker__clearButton"
                  size="xs"
                  onClick={this.removeFiles}
                >
                  <EuiI18n
                    token="euiFilePicker.removeSelected"
                    default="Remove"
                  />
                </EuiButtonEmpty>
              );
            }
          } else {
            clearButton = null;
          }

          const loader = !normalFormControl && isLoading && (
            <EuiProgress size="xs" color="accent" position="absolute" />
          );

          return (
            <div className={classes}>
              <div className="euiFilePicker__wrap">
                <EuiValidatableControl isInvalid={isInvalid}>
                  <input
                    type="file"
                    id={id}
                    name={name}
                    className="euiFilePicker__input"
                    onChange={this.handleChange}
                    ref={(input) => {
                      this.fileInput = input;
                    }}
                    onDragOver={this.showDrop}
                    onDragLeave={this.hideDrop}
                    onDrop={this.hideDrop}
                    disabled={disabled}
                    aria-describedby={promptId}
                    {...rest}
                  />
                </EuiValidatableControl>
                <div className="euiFilePicker__prompt" id={promptId}>
                  <EuiIcon
                    className="euiFilePicker__icon"
                    color={
                      isInvalid ? 'danger' : disabled ? 'subdued' : 'primary'
                    }
                    type={isInvalid ? 'alert' : 'importAction'}
                    size={normalFormControl ? 'm' : 'l'}
                    aria-hidden="true"
                  />
                  <div className="euiFilePicker__promptText">
                    {this.state.promptText || initialPromptText}
                  </div>
                  {clearButton}
                  {loader}
                </div>
              </div>
            </div>
          );
        }}
      </EuiI18n>
    );
  }
}
