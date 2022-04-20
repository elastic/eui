/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { HTMLAttributes, FunctionComponent } from 'react';
import classNames from 'classnames';
import { CommonProps, keysOf } from '../common';
import { EuiIcon, IconType } from '../icon';
import { useEuiTheme } from '../../services';
import {
  euiLoadingLogoStyles,
  euiLoadingLogoIconStyles,
} from './loading_logo.styles';

// TODO
const sizeToClassNameMap = {
  m: 'euiLoadingLogo--medium',
  l: 'euiLoadingLogo--large',
  xl: 'euiLoadingLogo--xLarge',
};

export const SIZES = keysOf(sizeToClassNameMap);

export type EuiLoadingLogoProps = CommonProps &
  HTMLAttributes<HTMLDivElement> & {
    size?: keyof typeof sizeToClassNameMap;
    /**
     * While this component should be restricted to using logo icons, it works with any IconType
     */
    logo?: IconType;
  };

export const EuiLoadingLogo: FunctionComponent<EuiLoadingLogoProps> = ({
  size = 'm',
  logo = 'logoKibana',
  className,
  ...rest
}) => {
  const euiTheme = useEuiTheme();

  const styles = euiLoadingLogoStyles(euiTheme);
  const cssStyles = [styles.euiLoadingLogo, styles[size]];

  const iconStyles = euiLoadingLogoIconStyles(euiTheme);
  const iconCssStyles = [iconStyles.euiLoadingLogo__icon, iconStyles[size]];

  const classes = classNames(
    'euiLoadingLogo',
    sizeToClassNameMap[size],
    className
  );

  return (
    <span className={classes} css={cssStyles} {...rest}>
      <EuiIcon css={iconCssStyles} type={logo} size={size} />
    </span>
  );
};
