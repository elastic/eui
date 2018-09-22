import React from 'react';

import { renderToHtml } from '../../services';

import {
  GuideSectionTypes,
} from '../../components';

import {
  EuiCode,
} from '../../../../src/components';

import ColorPalette from './color_palette';
const colorPaletteSource = require('!!raw-loader!./color_palette');
const colorPaletteHtml = renderToHtml(ColorPalette);

import ColorPaletteCustom from './color_palette_custom';
const colorPaletteCustomSource = require('!!raw-loader!./color_palette_custom');
const colorPaletteCustomHtml = renderToHtml(ColorPaletteCustom);

import ColorPaletteHistogram from './color_palette_histogram';
const colorPaletteHistogramSource = require('!!raw-loader!./color_palette_histogram');
const colorPaletteHistogramHtml = renderToHtml(ColorPaletteHistogram);

export const ColorPaletteExample = {
  title: 'Color Palettes',
  sections: [{
    title: 'Preset color palettes',
    source: [{
      type: GuideSectionTypes.JS,
      code: colorPaletteSource,
    }, {
      type: GuideSectionTypes.HTML,
      code: colorPaletteHtml,
    }],
    text: (
      <p>
        Use the <EuiCode>colorPalette</EuiCode> service to obtain an array of
        hexidecimal color codes for a given palette such as
        <EuiCode>colorPalette&#40;&#39;color_blind&#39;&#41;</EuiCode>, then apply them to UI
        elements such as charts.
      </p>
    ),
    demo: <ColorPalette />,
  }, {
    title: 'Custom color palettes',
    source: [{
      type: GuideSectionTypes.JS,
      code: colorPaletteCustomSource,
    }, {
      type: GuideSectionTypes.HTML,
      code: colorPaletteCustomHtml,
    }],
    text: (
      <p>
        Generate a custom palette of any length from two hexidecimal color
        codes such as
        <EuiCode>colorPalette&#40;&#39;custom&#39;, &#39;#FF0000&#39;, &#39;#00FFFF&#39;, 25&#41;</EuiCode>.
      </p>
    ),
    demo: <ColorPaletteCustom />,
  }, {
    title: 'Chart example',
    source: [{
      type: GuideSectionTypes.JS,
      code: colorPaletteHistogramSource,
    }, {
      type: GuideSectionTypes.HTML,
      code: colorPaletteHistogramHtml,
    }],
    text: (
      <p>
        Apply the results of <EuiCode>colorPalette</EuiCode> to the
        <EuiCode>color</EuiCode> prop of EUI chart components.
      </p>
    ),
    demo: <ColorPaletteHistogram />,
  }],
};
