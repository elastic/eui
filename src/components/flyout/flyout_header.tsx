/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent, HTMLAttributes } from 'react';
import classNames from 'classnames';
import { CommonProps } from '../common';
import { useEuiTheme } from '../../services';
import { euiFlyoutHeaderStyles } from './flyout_header.styles';

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
  const classes = classNames('euiFlyoutHeader', className);

  const euiTheme = useEuiTheme();
  const styles = euiFlyoutHeaderStyles(euiTheme);

  const cssStyles = [styles.euiFlyoutHeader, hasBorder && styles.hasBorder];

  return (
    <div className={classes} css={cssStyles} {...rest}>
      {children}
    </div>
  );
};
