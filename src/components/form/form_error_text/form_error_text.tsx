/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import React, { FunctionComponent, HTMLAttributes } from 'react';

import classNames from 'classnames';
import { CommonProps } from '../../common';

export type EuiFormErrorTextProps = CommonProps &
  HTMLAttributes<HTMLDivElement>;

export const EuiFormErrorText: FunctionComponent<EuiFormErrorTextProps> = ({
  children,
  className,
  ...rest
}) => {
  const classes = classNames('euiFormErrorText', className);

  return (
    <div className={classes} aria-live="polite" {...rest}>
      {children}
    </div>
  );
};
