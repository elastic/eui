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
    title: 'Preset qualitative palettes',
    source: [{
      type: GuideSectionTypes.JS,
      code: colorPaletteSource,
    }, {
      type: GuideSectionTypes.HTML,
      code: colorPaletteHtml,
    }],
    text: (
      <div>
        <p>
          The <EuiCode>eui_palettes.js</EuiCode> file provides a base set of color palettes in
          an array format. The hexidecimal color codes in these sets consist of both color safe
          and EUI themed colors. Import the file, then use javascript to read and apply the color
          array values to other EUI components, such as charts.
        </p>
        <p>
          Quantitative palettes are best suited for communicating and comparing discrete
          data series.
        </p>
      </div>
    ),
    demo: <ColorPalette />,
  }, {
    title: 'Recommended quantitative palettes',
    source: [{
      type: GuideSectionTypes.JS,
      code: colorPaletteCustomSource,
    }, {
      type: GuideSectionTypes.HTML,
      code: colorPaletteCustomHtml,
    }],
    text: (
      <div>
        <p>
          Use the <EuiCode>colorPalette</EuiCode> service to generate a custom, gradiated palette
          array of any length from two hexidecimal color codes. For example, obtain an array of
          yellow-to-green health status colors using
          <EuiCode>colorPalette&#40;&#39;#FFFF6D&#39;, &#39;#1EA593&#39;, 20&#41;</EuiCode>.
        </p>
        <p>
          Custom palettes are best suited for displaying data on a continuum, as in the case of
          health statuses and large geographic or demographic-based data sets.
        </p>
      </div>
    ),
    demo: <ColorPaletteCustom />,
  }, {
    title: 'Usage examples',
    source: [{
      type: GuideSectionTypes.JS,
      code: colorPaletteHistogramSource,
    }, {
      type: GuideSectionTypes.HTML,
      code: colorPaletteHistogramHtml,
    }],
    text: (
      <p>
        Apply the colors from <EuiCode>eui_palettes.js</EuiCode> or the <EuiCode>colorPalette</EuiCode>
        service to the <EuiCode>color</EuiCode> prop of EUI chart components.
      </p>
    ),
    demo: <ColorPaletteHistogram />,
  }],
};
