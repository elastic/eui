/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, {
  forwardRef,
  InputHTMLAttributes,
  MouseEvent,
  ReactNode,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import classNames from 'classnames';

import { useEuiMemoizedStyles, useGeneratedHtmlId } from '../../../services';
import { CommonProps } from '../../common';

import { EuiButtonEmpty } from '../../button';
import { EuiProgress } from '../../progress';
import { EuiIcon } from '../../icon';
import { EuiI18n, useEuiI18n } from '../../i18n';
import { EuiLoadingSpinner } from '../../loading';

import { useFormContext } from '../eui_form_context';
import { EuiValidatableControl } from '../validatable_control';
import { EuiFormControlLayoutClearButton } from '../form_control_layout/form_control_layout_clear_button';

import { euiFilePickerStyles } from './file_picker.styles';

export interface EuiFilePickerRef {
  removeFiles: () => void;
  input: HTMLInputElement | null;
}

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
   * Optionally pass a `File[]` array to maintain the file picker's displayed
   * state between re-renders. Useful for multi-step forms where the component
   * may unmount and remount while the file data is still stored in context.
   *
   * Note: Due to browser security restrictions, the actual file input
   * cannot be programmatically set with files. This prop only controls
   * the displayed state (file names in the prompt). The actual file data
   * should be stored and managed separately in your application state.
   */
  files?: File[] | null;
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

const getPromptTextFromFileList = (files: File[] | null): ReactNode | null => {
  if (!files || files.length === 0) {
    return null;
  }
  if (files.length > 1) {
    return (
      <EuiI18n
        token="euiFilePicker.filesSelected"
        default="{fileCount} files selected"
        values={{ fileCount: files.length }}
      />
    );
  }
  return files[0].name;
};

/**
 * @see {@link https://eui.elastic.co/docs/components/forms/other/file-picker/|EuiFilePicker documentation}
 */
export const EuiFilePicker = forwardRef<EuiFilePickerRef, EuiFilePickerProps>(
  (props, ref) => {
    const { defaultFullWidth } = useFormContext();
    const {
      id,
      name,
      initialPromptText = (
        <EuiI18n
          token="euiFilePicker.promptText"
          default="Select or drag and drop a file"
        />
      ),
      className,
      disabled,
      compressed = false,
      onChange,
      isInvalid,
      fullWidth = defaultFullWidth,
      isLoading,
      display = 'large',
      files, // Extracted to prevent passing to input element
      ...rest
    } = props;

    const removeSelectedAriaLabel = useEuiI18n(
      'euiFilePicker.removeSelectedAriaLabel',
      'Remove selected files'
    );

    const fileInput = useRef<HTMLInputElement | null>(null);

    const [promptText, setPromptText] = useState<ReactNode | null>(() =>
      files ? getPromptTextFromFileList(files) : null
    );
    const [isHoveringDrop, setIsHoveringDrop] = useState(false);

    // Update prompt text when the `files` prop changes. The ref guard keeps this
    // from re-running on mount, where the initial state is already derived above.
    const prevFiles = useRef(files);
    useEffect(() => {
      if (prevFiles.current !== files) {
        prevFiles.current = files;
        setPromptText(getPromptTextFromFileList(files ?? null));
      }
    }, [files]);

    const handleChange = useCallback(() => {
      if (!fileInput.current) return;

      if (fileInput.current.files && fileInput.current.files.length === 1) {
        setPromptText(fileInput.current.value.split('\\').pop());
      } else {
        setPromptText(
          getPromptTextFromFileList(
            fileInput.current.files ? Array.from(fileInput.current.files) : null
          )
        );
      }

      if (onChange) {
        onChange(
          fileInput.current.files && fileInput.current.files.length > 0
            ? fileInput.current.files
            : null
        );
      }
    }, [onChange]);

    const removeFiles = useCallback(
      (e?: MouseEvent<HTMLButtonElement>) => {
        if (e) {
          e.stopPropagation();
          e.preventDefault();
        }

        if (!fileInput.current) return;

        fileInput.current.value = '';
        handleChange();
      },
      [handleChange]
    );

    useImperativeHandle(
      ref,
      () => ({ removeFiles, input: fileInput.current }),
      [removeFiles]
    );

    const showDrop = () => !disabled && setIsHoveringDrop(true);

    const hideDrop = () => setIsHoveringDrop(false);

    const generatedId = useGeneratedHtmlId();
    const promptId = `${id || generatedId}-filePicker__prompt`;

    const isOverridingInitialPrompt = promptText != null;

    const normalFormControl = display === 'default';

    const classes = classNames(
      'euiFilePicker',
      {
        'euiFilePicker-isDroppingFile': isHoveringDrop,
        'euiFilePicker-isInvalid': isInvalid,
        'euiFilePicker-isLoading': isLoading,
        'euiFilePicker-hasFiles': isOverridingInitialPrompt,
      },
      className
    );

    const styles = useEuiMemoizedStyles(euiFilePickerStyles);
    const cssStyles = [
      styles.euiFilePicker,
      fullWidth ? styles.fullWidth : styles.formWidth,
      isHoveringDrop && styles.isDroppingFile,
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
            compressed ? styles.large.compressed : styles.large.uncompressed,
          ]),
    ];

    const iconStyles = [
      styles.icon.euiFilePicker__icon,
      ...(normalFormControl
        ? [
            styles.icon.normal,
            compressed ? styles.icon.compressed : styles.icon.uncompressed,
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
            onClick={removeFiles}
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
            onClick={removeFiles}
          >
            <EuiI18n token="euiFilePicker.removeSelected" default="Remove" />
          </EuiButtonEmpty>
        );
      }
    } else {
      clearButton = null;
    }

    const loader = !normalFormControl && isLoading && (
      <EuiProgress size="xs" color="accent" position="absolute" />
    );

    const iconColor = isInvalid ? 'danger' : disabled ? 'disabled' : 'text';

    return (
      <div css={cssStyles} className={classes}>
        <EuiValidatableControl isInvalid={isInvalid}>
          <input
            type="file"
            id={id}
            name={name}
            css={inputStyles}
            className="euiFilePicker__input"
            onChange={handleChange}
            ref={fileInput}
            onDragOver={showDrop}
            onDragLeave={hideDrop}
            onDrop={hideDrop}
            disabled={disabled}
            aria-describedby={promptId}
            {...rest}
          />
        </EuiValidatableControl>
        <div css={promptStyles} className="euiFilePicker__prompt" id={promptId}>
          <EuiIcon
            css={iconStyles}
            className="euiFilePicker__icon"
            color={iconColor}
            type={isInvalid ? 'warning' : disabled ? 'minusCircle' : 'upload'}
            size={normalFormControl ? 'm' : 'l'}
            aria-hidden="true"
          />
          <span className="euiFilePicker__promptText">
            {promptText || initialPromptText}
          </span>
          {clearButton}
          {loader}
        </div>
      </div>
    );
  }
);

EuiFilePicker.displayName = 'EuiFilePicker';
