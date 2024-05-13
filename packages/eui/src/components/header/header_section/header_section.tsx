/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent, HTMLAttributes } from 'react';
import classNames from 'classnames';

import { CommonProps } from '../../common';

import { euiHeaderSectionStyles } from './header_section.styles';

export type EuiHeaderSectionProps = CommonProps &
  HTMLAttributes<HTMLDivElement> & {
    side?: 'left' | 'right';
    grow?: boolean;
  };

export const EuiHeaderSection: FunctionComponent<EuiHeaderSectionProps> = ({
  side,
  children,
  className,
  grow = false,
  ...rest
}) => {
  const styles = euiHeaderSectionStyles();
  const cssStyles = [
    styles.euiHeaderSection,
    grow && styles.grow,
    side && styles[side],
  ];

  const classes = classNames('euiHeaderSection', className);

  return (
    <div className={classes} css={cssStyles} {...rest}>
      {children}
    </div>
  );
};
