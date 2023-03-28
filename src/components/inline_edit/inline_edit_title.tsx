/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent, useState } from 'react';
import classNames from 'classnames';
import { EuiTitle, EuiTitleSize } from '../title';
import { EuiInlineEditForm, EuiInlineEditFormProps } from './inline_edit_form';

export const HEADINGS = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] as const;
type Heading = typeof HEADINGS[number];

export type EuiInlineEditTitleProps = EuiInlineEditFormProps & {
  /**
   * Title size level
   */
  size?: EuiTitleSize;
  /**
   * Level of heading to be used for the title
   */
  heading: Heading;
};

export const EuiInlineEditTitle: FunctionComponent<EuiInlineEditTitleProps> = ({
  children,
  className,
  size = 'm',
  heading,
  defaultValue,
  onConfirm,
  inputAriaLabel,
  saveButtonAriaLabel,
  cancelButtonAriaLabel,
  startWithEditOpen = false,
  readModeProps,
  editModeProps,
  ...rest
}) => {
  const classes = classNames('euiInlineEditTitle', className);

  const [titleReadModeValue, setTitleReadModeValue] = useState(defaultValue);

  const H: Heading = heading;

  const props = {
    children,
    className,
    size,
    heading,
    defaultValue,
    onConfirm,
    inputAriaLabel,
    saveButtonAriaLabel,
    cancelButtonAriaLabel,
    startWithEditOpen,
    readModeProps,
    editModeProps,
    ...rest,
  };

  return (
    <div className={classes} {...rest}>
      <EuiInlineEditForm
        props={props}
        updateReadModeValue={setTitleReadModeValue}
      >
        <EuiTitle size={size}>
          <H>{titleReadModeValue}</H>
        </EuiTitle>
      </EuiInlineEditForm>
    </div>
  );
};
