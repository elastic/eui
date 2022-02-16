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
import { useEuiTheme } from '../../services';
import { euiMarkStyles } from './mark.styles';
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
  const useTheme = useEuiTheme();
  const styles = euiMarkStyles(useTheme);
  const classes = classNames('euiMark', className);

  return (
    <mark css={styles} className={classes} {...rest}>
      {children}
    </mark>
  );
};
