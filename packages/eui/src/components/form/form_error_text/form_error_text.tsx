/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent, HTMLAttributes } from 'react';
import classNames from 'classnames';

import { useEuiMemoizedStyles } from '../../../services';
import { CommonProps } from '../../common';

import { euiFormErrorTextStyles } from './form_error_text.styles';

export type EuiFormErrorTextProps = CommonProps &
  HTMLAttributes<HTMLDivElement>;

export const EuiFormErrorText: FunctionComponent<EuiFormErrorTextProps> = ({
  children,
  className,
  ...rest
}) => {
  const classes = classNames('euiFormErrorText', className);
  const styles = useEuiMemoizedStyles(euiFormErrorTextStyles);

  return (
    <div
      css={styles.euiFormErrorText}
      className={classes}
      aria-live="polite"
      {...rest}
    >
      {children}
    </div>
  );
};
