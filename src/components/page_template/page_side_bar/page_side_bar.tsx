/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent, HTMLAttributes } from 'react';
import classNames from 'classnames';
import { CommonProps, keysOf } from '../../common';

const paddingSizeToClassNameMap = {
  none: null,
  s: 'euiPageSideBar--paddingSmall',
  m: 'euiPageSideBar--paddingMedium',
  l: 'euiPageSideBar--paddingLarge',
};

export const PADDING_SIZES = keysOf(paddingSizeToClassNameMap);

export interface EuiPageSideBarProps
  extends CommonProps,
    HTMLAttributes<HTMLDivElement> {
  /**
   * Adds `position: sticky` and affords for any fixed position headers
   */
  sticky?: boolean;
  /**
   * Adds padding around the children
   */
  paddingSize?: typeof PADDING_SIZES[number];
}

export const EuiPageSideBar: FunctionComponent<EuiPageSideBarProps> = ({
  children,
  className,
  sticky,
  paddingSize = 'none',
  ...rest
}) => {
  const classes = classNames(
    'euiPageSideBar',
    paddingSizeToClassNameMap[paddingSize],
    {
      'euiPageSideBar--sticky': sticky,
    },
    className
  );

  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  );
};
