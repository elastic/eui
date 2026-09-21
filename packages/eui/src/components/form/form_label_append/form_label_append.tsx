/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent, HTMLAttributes, ReactNode } from 'react';
import classNames from 'classnames';

import { useEuiMemoizedStyles } from '../../../services';
import { CommonProps } from '../../common';

import { euiFormLabelAppendStyles } from './form_label_append.styles';

export type EuiFormLabelAppendProps = CommonProps &
  HTMLAttributes<HTMLSpanElement> & {
    children?: ReactNode;
  };

export const EuiFormLabelAppend: FunctionComponent<EuiFormLabelAppendProps> = ({
  children,
  className,
  ...rest
}) => {
  const styles = useEuiMemoizedStyles(euiFormLabelAppendStyles);

  if (typeof children !== 'string') {
    return <>{children}</>;
  }

  const classes = classNames('euiFormLabelAppend', className);

  return (
    <span css={styles.euiFormLabelAppend} className={classes} {...rest}>
      {children}
    </span>
  );
};
