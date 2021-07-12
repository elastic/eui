/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent, HTMLAttributes } from 'react';
import classNames from 'classnames';
import { CommonProps, keysOf } from '../common';

export const alignmentToClassNameMap = {
  left: 'euiTextAlign--left',
  right: 'euiTextAlign--right',
  center: 'euiTextAlign--center',
};

export type TextAlignment = keyof typeof alignmentToClassNameMap;

export const ALIGNMENTS = keysOf(alignmentToClassNameMap);

export type EuiTextAlignProps = CommonProps &
  HTMLAttributes<HTMLDivElement> & {
    textAlign?: TextAlignment;
  };

export const EuiTextAlign: FunctionComponent<EuiTextAlignProps> = ({
  children,
  className,
  textAlign = 'left',
  ...rest
}) => {
  const classes = classNames(
    'euiTextAlign',
    alignmentToClassNameMap[textAlign],
    className
  );

  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  );
};
