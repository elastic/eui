/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent } from 'react';
import classNames from 'classnames';
import { EuiTitle, EuiTitleSize } from '../title';
import {
  EuiInlineEditCommonProps,
  EuiInlineEditForm,
  SMALL_SIZE_FORM,
  MEDIUM_SIZE_FORM,
} from './inline_edit_form';

export const HEADINGS = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] as const;
type Heading = typeof HEADINGS[number];

export type EuiInlineEditTitleProps = EuiInlineEditCommonProps & {
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

  const H: Heading = heading;

  const isSmallSize = ['xxxs', 'xxs', 'xs', 's'].includes(size);
  const sizes = isSmallSize ? SMALL_SIZE_FORM : MEDIUM_SIZE_FORM;

  const formProps = {
    sizes,
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
    <EuiInlineEditForm className={classes} {...rest} {...formProps}>
      {(titleReadModeValue) => (
        <EuiTitle size={size}>
          <H>{titleReadModeValue}</H>
        </EuiTitle>
      )}
    </EuiInlineEditForm>
  );
};
