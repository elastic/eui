import React from 'react';

// @ts-ignore Importing from Sass file
import { RenderPaletteColor } from './render_palette';
// @ts-ignore Importing from Sass file
import { allowedColors } from '../colors/_utilities';

import { EuiSpacer, EuiTitle } from '../../../../../src';

const euiColors = [...allowedColors, 'euiColorGhost', 'euiColorInk'];

export const Core = () => {
  return (
    <>
      <EuiTitle size="s">
        <h3>Color</h3>
      </EuiTitle>

      <EuiSpacer />

      {euiColors.map((color) => (
        <RenderPaletteColor key={color} color={color} />
      ))}
    </>
  );
};
