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
import { euiLoadingContentStyles } from './loading_content.styles';

export type LineRange = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export type EuiLoadingContentProps = CommonProps &
  HTMLAttributes<HTMLDivElement> & {
    lines?: LineRange;
  };

export const EuiLoadingContent: FunctionComponent<EuiLoadingContentProps> = ({
  lines = 3,
  className,
  ...rest
}) => {
  const euiTheme = useEuiTheme();
  const styles = euiLoadingContentStyles(euiTheme);
  const cssStyles = [styles.euiLoadingContent];
  const lineCssStyles = [styles.euiLoadingContent__singleLine];

  const classes = classNames('euiLoadingContent', className);
  const lineElements = [];

  for (let i = 0; i < lines; i++) {
    lineElements.push(<span key={i} css={lineCssStyles} />);
  }

  return (
    <span className={classes} css={cssStyles} {...rest}>
      {lineElements}
    </span>
  );
};
