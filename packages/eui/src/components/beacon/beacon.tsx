/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent, HTMLAttributes, useMemo } from 'react';
import { CommonProps } from '../common';
import classNames from 'classnames';

import { logicalStyles } from '../../global_styling';
import { useEuiMemoizedStyles } from '../../services';

import { euiBeaconStyles } from './beacon.styles';

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
  const styles = useEuiMemoizedStyles(euiBeaconStyles);
  const classes = classNames('euiBeacon', className);
  const cssStyles = [styles.euiBeacon, styles[color]];

  const beaconStyle = useMemo(
    () =>
      logicalStyles({
        ...style,
        height: size,
        width: size,
      }),
    [style, size]
  );

  return (
    <div className={classes} css={cssStyles} style={beaconStyle} {...rest}>
      {/* Windows high contrast themes ignore background-color, so we use an SVG
          instead of plain CSS to ensure it renders with the correct colors */}
      <svg viewBox="0 0 16 16" role="img" aria-hidden="true">
        <circle cx="8" cy="8" r="8" />
      </svg>
    </div>
  );
};
