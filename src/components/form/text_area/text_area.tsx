/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { TextareaHTMLAttributes, Ref, FunctionComponent } from 'react';
import { CommonProps } from '../../common';
import classNames from 'classnames';
import { EuiValidatableControl } from '../validatable_control';
import { useFormContext } from '../eui_form_context';
import { useEuiTheme } from '../../../services';
import { euiTextAreaStyles } from './text_area.styles';

export const RESIZE = ['vertical', 'horizontal', 'both', 'none'] as const;
export type EuiTextAreaResize = typeof RESIZE[number];

export type EuiTextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement> &
  CommonProps & {
    isInvalid?: boolean;
    /**
     * Expand to fill 100% of the parent.
     * Defaults to `fullWidth` prop of `<EuiForm>`.
     * @default false
     */
    fullWidth?: boolean;
    compressed?: boolean;

    /**
     * Which direction, if at all, should the textarea resize
     */
    resize?: EuiTextAreaResize;

    inputRef?: Ref<HTMLTextAreaElement>;
  };

export const EuiTextArea: FunctionComponent<EuiTextAreaProps> = (props) => {
  const { defaultFullWidth } = useFormContext();
  const {
    children,
    className,
    compressed,
    fullWidth = defaultFullWidth,
    id,
    inputRef,
    isInvalid,
    name,
    placeholder,
    resize = 'vertical',
    rows,
    ...rest
  } = props;

  type Options = {
    fullWidth?: boolean;
    compressed?: boolean;
  };

  const options: Options = {
    fullWidth,
    compressed,
  };

  const euiTheme = useEuiTheme();
  const styles = euiTextAreaStyles(euiTheme, options);
  const cssStyles = [
    styles.euiTextArea,
    styles[resize],
    fullWidth && styles.fullWidth,
    compressed && styles.compressed,
  ];

  const classes = classNames(
    'euiTextArea',
    {
      // required for testing
      'euiTextArea--fullWidth': fullWidth,
    },
    className
  );

  let definedRows: number;

  if (rows) {
    definedRows = rows;
  } else if (compressed) {
    definedRows = 3;
  } else {
    definedRows = 6;
  }

  return (
    <EuiValidatableControl isInvalid={isInvalid}>
      <textarea
        css={cssStyles}
        className={classes}
        {...rest}
        rows={definedRows}
        name={name}
        id={id}
        ref={inputRef}
        placeholder={placeholder}
      >
        {children}
      </textarea>
    </EuiValidatableControl>
  );
};
