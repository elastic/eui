/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent } from 'react';
import classnames from 'classnames';

import { useEuiMemoizedStyles } from '../../../services';
import { ExclusiveUnion } from '../../common';

import type { PaletteColorStop } from '../color_palette_picker';
import {
  EuiColorPaletteDisplayFixed,
  EuiColorPaletteDisplayFixedProps,
} from './color_palette_display_fixed';
import {
  EuiColorPaletteDisplayGradient,
  EuiColorPaletteDisplayGradientProps,
} from './color_palette_display_gradient';
import { euiColorPaletteDisplayStyles } from './color_palette_display.styles';

export const SIZES = ['xs', 's', 'm'] as const;

export type EuiColorPaletteDisplaySize = (typeof SIZES)[number];

export interface EuiColorPaletteDisplayShared {
  /**
   * Array of color `strings` or an array of {@link PaletteColorStop}. The stops must be numbers in an ordered range.
   */
  palette: string[] | PaletteColorStop[];
}

interface DisplayGradient extends EuiColorPaletteDisplayGradientProps {
  /**
   *   Specify the type of palette.
   *  `gradient`: each color fades into the next.
   */
  type: 'gradient';
}

interface DisplayFixed extends EuiColorPaletteDisplayFixedProps {
  /**
   *  `fixed`: individual color blocks.
   */
  type?: 'fixed';
}

export type EuiColorPaletteDisplayProps = {
  /**
   * Height of the palette display
   */
  size?: EuiColorPaletteDisplaySize;
} & ExclusiveUnion<DisplayFixed, DisplayGradient>;

export const EuiColorPaletteDisplay: FunctionComponent<
  EuiColorPaletteDisplayProps
> = ({ type = 'fixed', palette, className, size = 's', ...rest }) => {
  const classes = classnames('euiColorPaletteDisplay', className);

  const styles = useEuiMemoizedStyles(euiColorPaletteDisplayStyles);
  const cssStyles = [styles.euiColorPaletteDisplay, styles[size]];

  return (
    <>
      {type === 'fixed' ? (
        <EuiColorPaletteDisplayFixed
          css={cssStyles}
          className={classes}
          palette={palette}
          {...rest}
        />
      ) : (
        <EuiColorPaletteDisplayGradient
          css={cssStyles}
          className={classes}
          palette={palette}
          {...rest}
        />
      )}
    </>
  );
};
