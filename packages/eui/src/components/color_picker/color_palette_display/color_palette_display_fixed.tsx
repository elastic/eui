/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent, HTMLAttributes, useMemo } from 'react';
import { CommonProps } from '../../common';
import { getFixedLinearGradient } from '../utils';
import { EuiScreenReaderOnly } from '../../accessibility';
import { EuiColorPaletteDisplayShared } from './color_palette_display';
import { euiColorPaletteDisplayFixed__bleedArea } from './color_palette_display_fixed.styles';

export interface EuiColorPaletteDisplayFixedProps
  extends HTMLAttributes<HTMLSpanElement>,
    CommonProps,
    EuiColorPaletteDisplayShared {}

interface paletteItem {
  color: string;
  width: string;
}

export const EuiColorPaletteDisplayFixed: FunctionComponent<
  EuiColorPaletteDisplayFixedProps
> = ({ palette, title, ...rest }) => {
  const paletteStops = useMemo(() => {
    const fixedGradient = getFixedLinearGradient(palette);
    return fixedGradient.map((item: paletteItem, index: number) => (
      <span
        style={{ backgroundColor: item.color, width: item.width }}
        key={`${item.color}-${index}`}
      />
    ));
  }, [palette]);

  return (
    <span {...rest}>
      {title && (
        <EuiScreenReaderOnly>
          <span>{title}</span>
        </EuiScreenReaderOnly>
      )}
      <span
        // aria-hidden="true" is to ensure color blocks are ignored by screen readers,
        // and the only accessible text for options is the EuiScreenReaderOnly {title}
        aria-hidden="true"
        css={euiColorPaletteDisplayFixed__bleedArea}
        className="euiColorPaletteDisplayFixed__bleedArea"
      >
        {paletteStops}
      </span>
    </span>
  );
};
