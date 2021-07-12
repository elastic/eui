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
  const classes = classNames('euiLoadingContent', className);
  const lineElements = [];

  for (let i = 0; i < lines; i++) {
    lineElements.push(
      <span key={i} className="euiLoadingContent__singleLine">
        <span className="euiLoadingContent__singleLineBackground" />
      </span>
    );
  }

  return (
    <span className={classes} {...rest}>
      {lineElements}
    </span>
  );
};
