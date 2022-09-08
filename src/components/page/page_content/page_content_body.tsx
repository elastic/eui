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
import {
  _EuiPageRestrictWidth,
  setPropsForRestrictedPageWidth,
} from '../_restrict_width';

const paddingSizeToClassNameMap = {
  none: null,
  s: 'euiPageContentBody--paddingSmall',
  m: 'euiPageContentBody--paddingMedium',
  l: 'euiPageContentBody--paddingLarge',
};

export const PADDING_SIZES = keysOf(paddingSizeToClassNameMap);

export interface EuiPageContentBodyProps
  extends CommonProps,
    HTMLAttributes<HTMLDivElement>,
    _EuiPageRestrictWidth {
  /**
   * Adjust the padding.
   * When using this setting it's best to be consistent throughout all similar usages
   */
  paddingSize?: typeof PADDING_SIZES[number];
}

/**
 * @deprecated Use EuiPageSection instead
 */
export const EuiPageContentBody_Deprecated: FunctionComponent<EuiPageContentBodyProps> = ({
  children,
  restrictWidth = false,
  paddingSize = 'none',
  style,
  className,
  ...rest
}) => {
  const { widthClassName, newStyle } = setPropsForRestrictedPageWidth(
    restrictWidth,
    style
  );

  const classes = classNames(
    'euiPageContentBody',
    paddingSizeToClassNameMap[paddingSize],
    {
      [`euiPageContentBody--${widthClassName}`]: widthClassName,
    },
    className
  );

  return (
    <div className={classes} style={newStyle || style} {...rest}>
      {children}
    </div>
  );
};
