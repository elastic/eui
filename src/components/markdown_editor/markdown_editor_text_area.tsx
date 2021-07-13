/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { TextareaHTMLAttributes, forwardRef } from 'react';

import { CommonProps } from '../common';

export type EuiMarkdownEditorTextAreaProps = TextareaHTMLAttributes<
  HTMLTextAreaElement
> &
  CommonProps & {
    isInvalid?: boolean;
    fullWidth?: boolean;
    compressed?: boolean;
    height: string;
    maxHeight: string;
  };

export const EuiMarkdownEditorTextArea = forwardRef<
  HTMLTextAreaElement,
  EuiMarkdownEditorTextAreaProps
>(
  (
    {
      children,
      compressed,
      id,
      isInvalid,
      name,
      placeholder,
      rows,
      height,
      maxHeight,
      ...rest
    },
    ref
  ) => {
    return (
      <textarea
        ref={ref}
        style={{ height, maxHeight }}
        className="euiMarkdownEditorTextArea"
        {...rest}
        rows={6}
        name={name}
        id={id}
        placeholder={placeholder}>
        {children}
      </textarea>
    );
  }
);

EuiMarkdownEditorTextArea.displayName = 'EuiMarkdownEditorTextArea';
