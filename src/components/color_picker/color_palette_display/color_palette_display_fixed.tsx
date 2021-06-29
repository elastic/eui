/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import React, { FunctionComponent, HTMLAttributes } from 'react';
import { CommonProps } from '../../common';
import { getFixedLinearGradient } from '../utils';
import { EuiColorPaletteDisplayShared } from './color_palette_display';

export interface EuiColorPaletteDisplayFixedProps
  extends HTMLAttributes<HTMLSpanElement>,
    CommonProps,
    EuiColorPaletteDisplayShared {}

interface paletteItem {
  color: string;
  width: string;
}

export const EuiColorPaletteDisplayFixed: FunctionComponent<EuiColorPaletteDisplayFixedProps> = ({
  palette,
  ...rest
}) => {
  const fixedGradient = getFixedLinearGradient(palette);

  const paletteStops = fixedGradient.map((item: paletteItem, index: number) => (
    <span
      style={{ backgroundColor: item.color, width: item.width }}
      key={`${item.color}-${index}`}
    />
  ));

  return (
    <span {...rest}>
      <span className="euiColorPaletteDisplayFixed__bleedArea">
        {paletteStops}
      </span>
    </span>
  );
};
