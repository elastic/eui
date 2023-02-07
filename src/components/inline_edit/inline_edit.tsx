/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { HTMLAttributes, FunctionComponent } from 'react';
import { CommonProps } from '../common';
import classNames from 'classnames';
import { useEuiTheme } from '../../services';
import { euiInlineEditStyles } from './inline_edit.styles';

export type EuiInlineEditProps = HTMLAttributes<HTMLDivElement> &
  CommonProps & {};

export const EuiInlineEdit: FunctionComponent<EuiInlineEditProps> = ({
  children,
  className,
  ...rest
}) => {
  const classes = classNames('euiInlineEdit', className);
  const theme = useEuiTheme();
  const styles = euiInlineEditStyles(theme);
  const cssStyles = [styles.euiInlineEdit];

  return (
    <div className={classes} css={cssStyles} {...rest}>
      {children}
    </div>
  );
};
