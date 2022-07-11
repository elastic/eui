/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent, HTMLAttributes, useContext } from 'react';
import classNames from 'classnames';
import { CommonProps } from '../common';

import { useEuiTheme } from '../../services';
import { euiFlyoutHeaderStyles } from './flyout.styles';

import { EuiFlyoutContext } from './flyout_context';

export type EuiFlyoutHeaderProps = FunctionComponent<
  HTMLAttributes<HTMLDivElement> &
    CommonProps & {
      hasBorder?: boolean;
    }
>;

export const EuiFlyoutHeader: EuiFlyoutHeaderProps = ({
  children,
  className,
  hasBorder = false,
  ...rest
}) => {
  const { paddingSize } = useContext(EuiFlyoutContext);

  const euiTheme = useEuiTheme();
  const styles = euiFlyoutHeaderStyles(
    paddingSize ? paddingSize : 'l',
    euiTheme
  );

  const cssStyles = [
    styles.euiFlyoutHeader,
    hasBorder && styles.border,
    //paddingSize && styles[paddingSize],
  ];

  const classes = classNames(
    'euiFlyoutHeader',
    {
      'euiFlyoutHeader--hasBorder': hasBorder,
    },
    className
  );

  return (
    <div className={classes} {...rest} css={cssStyles}>
      {children}
    </div>
  );
};
