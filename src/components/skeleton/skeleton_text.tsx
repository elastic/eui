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
import { useLoadingAriaLabel } from './_loading_strings';
import { euiSkeletonCommonStyles } from './skeleton_text.styles';

export type LineRange = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export type EuiSkeletonTextProps = CommonProps &
  HTMLAttributes<HTMLDivElement> & {
    lines?: LineRange;
  };

export const EuiSkeletonText: FunctionComponent<EuiSkeletonTextProps> = ({
  lines = 3,
  className,
  'aria-label': ariaLabel,
  ...rest
}) => {
  const euiTheme = useEuiTheme();
  const styles = euiSkeletonCommonStyles(euiTheme);
  const lineCssStyles = [styles.euiLoadingContent__singleLine];
  const defaultLabel = useLoadingAriaLabel();

  const classes = classNames('euiSkeletonText', className);
  const lineElements = [];

  for (let i = 0; i < lines; i++) {
    lineElements.push(<span key={i} css={lineCssStyles} />);
  }

  return (
    <span
      className={classes}
      role="progressbar"
      aria-label={ariaLabel || defaultLabel}
      aria-busy={true}
      {...rest}
    >
      {lineElements}
    </span>
  );
};
