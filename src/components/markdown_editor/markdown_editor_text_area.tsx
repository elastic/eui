/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { TextareaHTMLAttributes, forwardRef, useContext } from 'react';
import classNames from 'classnames';
import { CommonProps } from '../common';
import { EuiMarkdownContext } from './markdown_context';

export type EuiMarkdownEditorTextAreaProps = TextareaHTMLAttributes<
  HTMLTextAreaElement
> &
  CommonProps & {
    isInvalid?: boolean;
    fullWidth?: boolean;
    compressed?: boolean;
    height: string;
    maxHeight: string;
    readOnly?: boolean;
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
    const { readOnly } = useContext(EuiMarkdownContext);
    const classes = classNames('euiMarkdownEditorTextArea', {
      'euiMarkdownEditorTextArea-isReadOnly': readOnly,
    });

    return (
      <textarea
        ref={ref}
        style={{ height, maxHeight }}
        className={classes}
        {...rest}
        rows={6}
        name={name}
        id={id}
        placeholder={placeholder}
        readOnly={readOnly}
      >
        {children}
      </textarea>
    );
  }
);

EuiMarkdownEditorTextArea.displayName = 'EuiMarkdownEditorTextArea';
