/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import React, { HTMLAttributes, FunctionComponent } from 'react';
import classNames from 'classnames';
import { CommonProps } from '../common';

export const EuiDescriptionListTitle: FunctionComponent<
  CommonProps & HTMLAttributes<HTMLElement>
> = ({ children, className, ...rest }) => {
  const classes = classNames('euiDescriptionList__title', className);

  return (
    <dt className={classes} {...rest}>
      {children}
    </dt>
  );
};
