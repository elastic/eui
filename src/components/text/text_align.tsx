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

import { euiTextAlignStyles } from './text_align.styles';

export const ALIGNMENTS = ['left', 'right', 'center'] as const;
export type TextAlignment = typeof ALIGNMENTS[number];

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
  const styles = euiTextAlignStyles();
  const cssStyles = [styles.euiTextAlign, styles[textAlign]];

  const classes = classNames('euiTextAlign', className);

  return (
    <div css={cssStyles} className={classes} {...rest}>
      {children}
    </div>
  );
};
