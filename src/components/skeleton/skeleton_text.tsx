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
import { TextSize } from '../text/text';

import { useLoadingAriaAttributes } from './utils';
import { euiSkeletonTextStyles } from './skeleton_text.styles';

export const LINES = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as const;
export type LineRange = typeof LINES[number];

export type EuiSkeletonTextProps = CommonProps &
  HTMLAttributes<HTMLDivElement> & {
    lines?: LineRange;
    size?: TextSize;
  };

export const EuiSkeletonText: FunctionComponent<EuiSkeletonTextProps> = ({
  lines = 3,
  size = 'm',
  className,
  ...rest
}) => {
  const euiTheme = useEuiTheme();
  const styles = euiSkeletonTextStyles(euiTheme);
  const lineCssStyles = [styles.euiSkeletonText, styles[size]];

  const lineElements = [];
  for (let i = 0; i < lines; i++) {
    lineElements.push(<span key={i} css={lineCssStyles} />);
  }

  return (
    <span
      className={classNames('euiSkeletonText', className)}
      {...useLoadingAriaAttributes()}
      {...rest}
    >
      {lineElements}
    </span>
  );
};
