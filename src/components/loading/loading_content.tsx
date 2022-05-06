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
import { withEuiSystem, WithEuiSystemProps } from '../provider/system';
import { useLoadingAriaLabel } from './_loading_strings';
import { euiLoadingContentStyles } from './loading_content.styles';

export type LineRange = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export type EuiLoadingContentProps = CommonProps &
  HTMLAttributes<HTMLDivElement> & {
    lines?: LineRange;
  };

export const _EuiLoadingContent: FunctionComponent<
  EuiLoadingContentProps & WithEuiSystemProps
> = ({ lines = 3, className, 'aria-label': ariaLabel, euiTheme, ...rest }) => {
  const styles = euiLoadingContentStyles(euiTheme);
  const lineCssStyles = [styles.euiLoadingContent__singleLine];
  const defaultLabel = useLoadingAriaLabel();

  const classes = classNames('euiLoadingContent', className);
  const lineElements = [];

  for (let i = 0; i < lines; i++) {
    lineElements.push(<span key={i} css={lineCssStyles} />);
  }

  return (
    <span
      className={classes}
      role="progressbar"
      aria-label={ariaLabel || defaultLabel}
      {...rest}
    >
      {lineElements}
    </span>
  );
};

export const EuiLoadingContent = withEuiSystem(_EuiLoadingContent);
