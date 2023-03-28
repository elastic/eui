/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent, useState } from 'react';
import classNames from 'classnames';
import { EuiText, EuiTextProps } from '../text';
import { EuiInlineEditForm, EuiInlineEditFormProps } from './inline_edit_form';

export type EuiInlineEditTextSizes = Exclude<EuiTextProps['size'], 'relative'>;

export type EuiInlineEditTextProps = EuiInlineEditFormProps & {
  /**
   * Text size level
   */
  size?: EuiInlineEditTextSizes;
};

export const EuiInlineEditText: FunctionComponent<EuiInlineEditTextProps> = ({
  children,
  className,
  size = 'm',
  defaultValue,
  onConfirm,
  inputAriaLabel,
  saveButtonAriaLabel,
  cancelButtonAriaLabel,
  startWithEditOpen,
  readModeProps,
  editModeProps,
  ...rest
}) => {
  const classes = classNames('euiInlineEditText', className);

  const [textReadModeValue, setTextReadModeValue] = useState(defaultValue);

  const formProps = {
    size,
    defaultValue,
    onConfirm,
    inputAriaLabel,
    saveButtonAriaLabel,
    cancelButtonAriaLabel,
    startWithEditOpen,
    readModeProps,
    editModeProps,
  };

  return (
    <div className={classes} {...rest}>
      <EuiInlineEditForm
        {...formProps}
        updateReadModeValue={setTextReadModeValue}
      >
        <EuiText size={size}>{textReadModeValue}</EuiText>
      </EuiInlineEditForm>
    </div>
  );
};
