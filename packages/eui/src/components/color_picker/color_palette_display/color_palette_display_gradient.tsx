/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent, HTMLAttributes } from 'react';
import { CommonProps } from '../../common';
import { getLinearGradient } from '../utils';
import { EuiScreenReaderOnly } from '../../accessibility';
import { EuiColorPaletteDisplayShared } from './color_palette_display';

export interface EuiColorPaletteDisplayGradientProps
  extends HTMLAttributes<HTMLSpanElement>,
    CommonProps,
    EuiColorPaletteDisplayShared {}

export const EuiColorPaletteDisplayGradient: FunctionComponent<
  EuiColorPaletteDisplayGradientProps
> = ({ palette, title, style, ...rest }) => {
  const gradient = getLinearGradient(palette);

  return (
    <>
      {title && (
        <EuiScreenReaderOnly>
          <span>{title}</span>
        </EuiScreenReaderOnly>
      )}
      <span
        // aria-hidden="true" is to ensure color blocks are ignored by screen readers,
        // and the only accessible text for options is the EuiScreenReaderOnly {title}
        aria-hidden="true"
        style={{ ...style, background: gradient }}
        {...rest}
      />
    </>
  );
};
