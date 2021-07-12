/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent, HTMLAttributes } from 'react';
import classNames from 'classnames';
import { CommonProps } from '../../common';

export interface EuiPageContentHeaderProps
  extends CommonProps,
    HTMLAttributes<HTMLDivElement> {
  /**
   * Set to false if you don't want the children to stack
   * at small screen sizes.
   */
  responsive?: boolean;
}

export const EuiPageContentHeader: FunctionComponent<EuiPageContentHeaderProps> = ({
  children,
  className,
  responsive = true,
  ...rest
}) => {
  const classes = classNames(
    'euiPageContentHeader',
    {
      'euiPageContentHeader--responsive': responsive,
    },
    className
  );

  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  );
};
