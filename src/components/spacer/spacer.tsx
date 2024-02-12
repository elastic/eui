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

import { euiSpacerStyles } from './spacer.styles';

export const SIZES = ['xs', 's', 'm', 'l', 'xl', 'xxl'] as const;
export type SpacerSize = (typeof SIZES)[number];

export type EuiSpacerProps = HTMLAttributes<HTMLDivElement> &
  CommonProps & {
    size?: SpacerSize;
  };

export const EuiSpacer: FunctionComponent<EuiSpacerProps> = ({
  className,
  size = 'l',
  ...rest
}) => {
  const euiTheme = useEuiTheme();
  const styles = euiSpacerStyles(euiTheme);
  const classes = classNames(
    'euiSpacer',
    { [`euiSpacer--${size}`]: size },
    className
  );

  const cssStyles = [styles.euiSpacer, styles[size]];

  return <div className={classes} css={cssStyles} {...rest} />;
};
