/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { HTMLAttributes, FunctionComponent } from 'react';
import classNames from 'classnames';
import { CommonProps } from '../common';
import { EuiIcon } from '../icon';
import { useLoadingAriaLabel } from './_loading_strings';
import { euiLoadingElasticStyles } from './loading_elastic.styles';

export const SIZES = ['m', 'l', 'xl', 'xxl'] as const;
export type EuiLoadingElasticSize = (typeof SIZES)[number];

export interface EuiLoadingElasticProps {
  size?: EuiLoadingElasticSize;
}

export const EuiLoadingElastic: FunctionComponent<
  CommonProps & HTMLAttributes<HTMLDivElement> & EuiLoadingElasticProps
> = ({ size = 'm', className, 'aria-label': ariaLabel, ...rest }) => {
  const styles = euiLoadingElasticStyles();
  const cssStyles = [styles.euiLoadingElastic];
  const defaultLabel = useLoadingAriaLabel();

  const classes = classNames('euiLoadingElastic', className);

  return (
    <span
      className={classes}
      css={cssStyles}
      role="progressbar"
      aria-label={ariaLabel || defaultLabel}
      {...rest}
    >
      <EuiIcon type="logoElastic" size={size} />
    </span>
  );
};
