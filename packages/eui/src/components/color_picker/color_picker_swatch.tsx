/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the "Elastic License
 * 2.0", the "GNU Affero General Public License v3.0 only", and the "Server Side
 * Public License v 1"; you may not use this file except in compliance with, at
 * your election, the "Elastic License 2.0", the "GNU Affero General Public
 * License v3.0 only", or the "Server Side Public License, v 1".
 */

import React, { ButtonHTMLAttributes, forwardRef, useMemo } from 'react';
import classNames from 'classnames';

import { useEuiMemoizedStyles } from '../../services';
import { CommonProps } from '../common';
import { useEuiI18n } from '../i18n';

import { getChromaColor } from './utils';
import { euiColorPickerSwatchStyles } from './color_picker_swatch.styles';

export type EuiColorPickerSwatchProps = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'color'> & {
    color?: string;
  };

export const EuiColorPickerSwatch = forwardRef<
  HTMLButtonElement,
  EuiColorPickerSwatchProps
>(({ className, color, style, ...rest }, ref) => {
  const classes = classNames('euiColorPickerSwatch', className);
  const styles = useEuiMemoizedStyles(euiColorPickerSwatchStyles);

  const chromaColor = useMemo(() => getChromaColor(color, true), [color]);
  const background = useMemo(
    () => (chromaColor ? chromaColor.css() : 'transparent'),
    [chromaColor]
  );

  const ariaLabel = useEuiI18n(
    'euiColorPickerSwatch.ariaLabel',
    'Select {color} as the color',
    { color }
  );

  return (
    <button
      type="button"
      css={styles.euiColorPickerSwatch}
      className={classes}
      aria-label={ariaLabel}
      ref={ref}
      style={{
        background,
        ...style,
      }}
      {...rest}
    />
  );
});

EuiColorPickerSwatch.displayName = 'EuiColorPickerSwatch';
