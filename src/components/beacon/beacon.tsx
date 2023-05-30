/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent, HTMLAttributes } from 'react';
import { CommonProps } from '../common';
import classNames from 'classnames';

import { euiBeaconStyles } from './beacon.styles';
import { useEuiTheme } from '../../services';

export const COLORS = [
  'subdued',
  'primary',
  'success',
  'accent',
  'danger',
  'warning',
] as const;

export type EuiBeaconColor = (typeof COLORS)[number];

export type EuiBeaconProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  'children' | 'color'
> &
  CommonProps & {
    /**
     * Height and width of the center circle. Value is passed directly to the `style` attribute
     */
    size?: number | string;
    /**
     * Any of the named color palette options.
     */
    color?: EuiBeaconColor;
  };

export const EuiBeacon: FunctionComponent<EuiBeaconProps> = ({
  className,
  size = 12,
  color = 'success',
  style,
  ...rest
}) => {
  const euiTheme = useEuiTheme();
  const classes = classNames('euiBeacon', className);
  const styles = euiBeaconStyles(euiTheme);
  const cssStyles = [styles.euiBeacon, styles[color]];

  const beaconStyle = {
    ...style,
    height: size,
    width: size,
  };

  return (
    <div className={classes} css={cssStyles} style={beaconStyle} {...rest} />
  );
};
