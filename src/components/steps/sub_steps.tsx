/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import React, { HTMLAttributes, FunctionComponent } from 'react';
import classNames from 'classnames';
import { CommonProps } from '../common';

export type EuiSubStepsProps = FunctionComponent<
  HTMLAttributes<HTMLDivElement> & CommonProps
>;

export const EuiSubSteps: EuiSubStepsProps = ({
  children,
  className,
  ...rest
}) => {
  const classes = classNames('euiSubSteps', className);

  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  );
};
