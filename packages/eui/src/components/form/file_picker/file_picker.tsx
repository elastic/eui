/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { Component, InputHTMLAttributes, ReactNode } from 'react';
import classNames from 'classnames';

import {
  withEuiStylesMemoizer,
  WithEuiStylesMemoizerProps,
  htmlIdGenerator,
} from '../../../services';
import { CommonProps } from '../../common';

import { EuiButtonEmpty } from '../../button';
import { EuiProgress } from '../../progress';
import { EuiIcon } from '../../icon';
import { EuiI18n } from '../../i18n';
import { EuiLoadingSpinner } from '../../loading';

import { FormContext, FormContextValue } from '../eui_form_context';
import { EuiValidatableControl } from '../validatable_control';
import { EuiFormControlLayoutClearButton } from '../form_control_layout/form_control_layout_clear_button';

import { euiFilePickerStyles } from './file_picker.styles';

export interface EuiFilePickerProps
  extends CommonProps,
    Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  id?: string;
  name?: string;
  className?: string;
  /**
   * The content that appears in the dropzone if no file is attached
   * @default 'Select or drag and drop a file'
   */
  initialPromptText?: ReactNode;
  /**
   * Use as a callback to access the HTML FileList API
   */
  onChange?: (files: FileList | null) => void;
  /**
   * Reduces the size to a typical (compressed) input
   * @default false
   */
  compressed?: boolean;
  /**
   * Size or type of display;
   * `default` for normal height, similar to other controls;
   * `large` for taller size
   * @default large
   */
  display?: 'default' | 'large';
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

export class EuiFilePickerClass extends Component<
  EuiFilePickerProps & WithEuiStylesMemoizerProps
> {
  static contextType = FormContext;

  static defaultProps: Partial<EuiFilePickerProps> = {
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
        token="euiFilePicker.removeSelectedAriaLabel"
        default="Remove selected files"
      >
        {(removeSelectedAriaLabel: string) => {
          const {
            stylesMemoizer,
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
            {
              'euiFilePicker-isDroppingFile': this.state.isHoveringDrop,
              'euiFilePicker-isInvalid': isInvalid,
              'euiFilePicker-isLoading': isLoading,
              'euiFilePicker-hasFiles': isOverridingInitialPrompt,
            },
            className
          );

          const styles = stylesMemoizer(euiFilePickerStyles);
          const cssStyles = [
            styles.euiFilePicker,
            fullWidth ? styles.fullWidth : styles.formWidth,
            this.state.isHoveringDrop && styles.isDroppingFile,
            isInvalid && !disabled && styles.invalid,
            isOverridingInitialPrompt && !disabled && styles.hasFiles,
            isLoading && styles.loading,
          ];

          const inputStyles = [
            styles.input.euiFilePicker__input,
            !normalFormControl && !disabled && styles.input.largeInteractive,
          ];

          const promptStyles = [
            styles.euiFilePicker__prompt,
            disabled && styles.disabled,
            ...(normalFormControl
              ? [compressed ? styles.compressed : styles.uncompressed]
              : [
                  styles.large.large,
                  compressed
                    ? styles.large.compressed
                    : styles.large.uncompressed,
                ]),
          ];

          const iconStyles = [
            styles.icon.euiFilePicker__icon,
            ...(normalFormControl
              ? [
                  styles.icon.normal,
                  compressed
                    ? styles.icon.compresssed
                    : styles.icon.uncompressed,
                ]
              : [styles.icon.large]),
          ];

          const rightIconStyles = normalFormControl
            ? [
                styles.rightIcon.euiFilePicker__rightIcon,
                compressed
                  ? styles.rightIcon.compressed
                  : styles.rightIcon.uncompressed,
              ]
            : undefined;

          let clearButton;
          if (isLoading && normalFormControl) {
            // Override clear button with loading spinner if it is in loading state
            clearButton = (
              <EuiLoadingSpinner
                css={rightIconStyles}
                className="euiFilePicker__loadingSpinner"
                size={compressed ? 's' : 'm'}
              />
            );
          } else if (isOverridingInitialPrompt && !disabled) {
            if (normalFormControl) {
              clearButton = (
                <EuiFormControlLayoutClearButton
                  aria-label={removeSelectedAriaLabel}
                  css={[styles.euiFilePicker__clearButton, rightIconStyles]}
                  className="euiFilePicker__clearButton"
                  onClick={this.removeFiles}
                  size={compressed ? 's' : 'm'}
                />
              );
            } else {
              clearButton = (
                <EuiButtonEmpty
                  aria-label={removeSelectedAriaLabel}
                  css={styles.euiFilePicker__clearButton}
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

          const iconColor = isInvalid
            ? 'danger'
            : disabled
            ? 'disabled'
            : 'text';

          return (
            <div css={cssStyles} className={classes}>
              <EuiValidatableControl isInvalid={isInvalid}>
                <input
                  type="file"
                  id={id}
                  name={name}
                  css={inputStyles}
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
              <div
                css={promptStyles}
                className="euiFilePicker__prompt"
                id={promptId}
              >
                <EuiIcon
                  css={iconStyles}
                  className="euiFilePicker__icon"
                  color={iconColor}
                  type={
                    isInvalid
                      ? 'alert'
                      : disabled
                      ? 'minusInCircle'
                      : 'importAction'
                  }
                  size={normalFormControl ? 'm' : 'l'}
                  aria-hidden="true"
                />
                <span className="euiFilePicker__promptText">
                  {this.state.promptText || initialPromptText}
                </span>
                {clearButton}
                {loader}
              </div>
            </div>
          );
        }}
      </EuiI18n>
    );
  }
}

export const EuiFilePicker =
  withEuiStylesMemoizer<EuiFilePickerProps>(EuiFilePickerClass);
