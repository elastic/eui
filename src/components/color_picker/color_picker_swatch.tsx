/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import React, { ButtonHTMLAttributes, forwardRef, useMemo } from 'react';
import classNames from 'classnames';

import { CommonProps } from '../common';

import { getChromaColor } from './utils';

export type EuiColorPickerSwatchProps = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'color'> & {
    color?: string;
  };

export const EuiColorPickerSwatch = forwardRef<
  HTMLButtonElement,
  EuiColorPickerSwatchProps
>(({ className, color, style, ...rest }, ref) => {
  const classes = classNames('euiColorPickerSwatch', className);
  const chromaColor = useMemo(() => getChromaColor(color, true), [color]);
  const background = useMemo(
    () => (chromaColor ? chromaColor.css() : 'transparent'),
    [chromaColor]
  );

  return (
    <button
      type="button"
      className={classes}
      style={{
        background,
        ...style,
      }}
      ref={ref}
      {...rest}
    />
  );
});

EuiColorPickerSwatch.displayName = 'EuiColorPickerSwatch';
