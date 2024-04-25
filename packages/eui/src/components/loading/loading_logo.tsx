/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { HTMLAttributes, FunctionComponent } from 'react';
import classNames from 'classnames';

import { useEuiMemoizedStyles } from '../../services';
import { CommonProps } from '../common';
import { EuiIcon, IconType } from '../icon';

import { useLoadingAriaLabel } from './_loading_strings';
import { euiLoadingLogoStyles } from './loading_logo.styles';

export const SIZES = ['m', 'l', 'xl'] as const;
export type EuiLoadingLogoSize = (typeof SIZES)[number];

export type EuiLoadingLogoProps = CommonProps &
  HTMLAttributes<HTMLDivElement> & {
    size?: EuiLoadingLogoSize;
    /**
     * While this component should be restricted to using logo icons, it works with any IconType
     */
    logo?: IconType;
  };

export const EuiLoadingLogo: FunctionComponent<EuiLoadingLogoProps> = ({
  size = 'm',
  logo = 'logoKibana',
  'aria-label': ariaLabel,
  className,
  ...rest
}) => {
  const classes = classNames('euiLoadingLogo', className);

  const styles = useEuiMemoizedStyles(euiLoadingLogoStyles);
  const cssStyles = [styles.euiLoadingLogo, styles[size]];

  const defaultLabel = useLoadingAriaLabel();

  return (
    <span
      className={classes}
      css={cssStyles}
      role="progressbar"
      aria-label={ariaLabel || defaultLabel}
      {...rest}
    >
      <span css={styles.euiLoadingLogo__icon}>
        <EuiIcon type={logo} size={size} />
      </span>
    </span>
  );
};
