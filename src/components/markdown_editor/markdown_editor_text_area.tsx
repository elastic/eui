import React, { TextareaHTMLAttributes, Ref, FunctionComponent } from 'react';
import { CommonProps } from '../common';

export type EuiMarkdownEditorTextAreaProps = TextareaHTMLAttributes<
  HTMLTextAreaElement
> &
  CommonProps & {
    isInvalid?: boolean;
    fullWidth?: boolean;
    compressed?: boolean;

    /**
     * Which direction, if at all, should the textarea resize
     */
    resize?: keyof typeof resizeToClassNameMap;

    inputRef?: Ref<HTMLTextAreaElement>;

    height: number;
  };

const resizeToClassNameMap = {
  vertical: 'euiTextArea--resizeVertical',
  horizontal: 'euiTextArea--resizeHorizontal',
  both: 'euiTextArea--resizeBoth',
  none: 'euiTextArea--resizeNone',
};

export const RESIZE = Object.keys(resizeToClassNameMap);

export const EuiMarkdownEditorTextArea: FunctionComponent<
  EuiMarkdownEditorTextAreaProps
> = ({
  children,
  className,
  compressed,
  id,
  inputRef,
  isInvalid,
  name,
  placeholder,
  rows,
  height,
  ...rest
}) => {
  const dropZoneButtonHeight = 32;

  return (
    <textarea
      style={{ height: `calc(${height - dropZoneButtonHeight}px` }}
      className="euiMarkdownEditor__textArea"
      {...rest}
      rows={6}
      name={name}
      id={id}
      ref={inputRef}
      placeholder={placeholder}>
      {children}
    </textarea>
  );
};
