/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import React, { FunctionComponent, HTMLAttributes } from 'react';
import classnames from 'classnames';
import { CommonProps } from '../common';

export type EuiModalHeaderProps = FunctionComponent<
  HTMLAttributes<HTMLDivElement> & CommonProps
>;

export const EuiModalHeader: EuiModalHeaderProps = ({
  className,
  children,
  ...rest
}) => {
  const classes = classnames('euiModalHeader', className);
  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  );
};
