/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { HTMLAttributes, FunctionComponent, ReactNode } from 'react';
import classNames from 'classnames';
import { CommonProps } from '../common';
import { useEuiMarkStyles } from './mark_styles';
export type EuiMarkProps = HTMLAttributes<HTMLElement> &
  CommonProps & {
    /**
     * ReactNode to render as this component's content
     */
    children: ReactNode;
  };

export const EuiMark: FunctionComponent<EuiMarkProps> = ({
  children,
  className,
  ...rest
}) => {
  const euiMarkStyles = useEuiMarkStyles();
  const classes = classNames('euiMark', className);

  return (
    <mark css={euiMarkStyles} className={classes} {...rest}>
      {children}
    </mark>
  );
};
