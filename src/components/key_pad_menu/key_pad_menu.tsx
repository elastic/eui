/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import React, { FunctionComponent, HTMLAttributes } from 'react';
import classNames from 'classnames';

import { CommonProps } from '../common';

export type EuiKeyPadMenuProps = CommonProps & HTMLAttributes<HTMLUListElement>;

export const EuiKeyPadMenu: FunctionComponent<EuiKeyPadMenuProps> = ({
  children,
  className,
  ...rest
}) => {
  const classes = classNames('euiKeyPadMenu', className);

  return (
    <ul className={classes} {...rest}>
      {React.Children.map(children, (child) => (
        <li>{child}</li>
      ))}
    </ul>
  );
};
