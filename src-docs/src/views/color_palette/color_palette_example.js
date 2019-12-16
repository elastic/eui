import React from 'react';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import { EuiCode } from '../../../../src/components';
import { palettes, colorPalette } from '../../../../src/services';

import ColorPalette from './color_palette';
const colorPaletteSource = require('!!raw-loader!./color_palette');
const colorPaletteHtml = renderToHtml(ColorPalette);

import ColorPaletteQuant from './color_palette_quantitative';
const colorPaletteQuantSource = require('!!raw-loader!./color_palette_quantitative');
const colorPaletteQuantHtml = renderToHtml(ColorPaletteQuant);

import ColorPaletteCustom from './color_palette_custom';
const colorPaletteCustomSource = require('!!raw-loader!./color_palette_custom');
const colorPaletteCustomHtml = renderToHtml(ColorPaletteCustom);

export const ColorPaletteExample = {
  title: 'Color Palettes',
  sections: [
    {
      title: 'Preset qualitative palettes',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: colorPaletteSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: colorPaletteHtml,
        },
      ],
      text: (
        <div>
          <p>
            The <EuiCode>eui_palettes.js</EuiCode> file provides a base set of
            color palettes in an array format. The hexadecimal color codes in
            these sets consist of both color safe and EUI themed colors. Import
            the file, then use JavaScript to read and apply the color array
            values to other EUI components, such as charts.
          </p>
          <p>
            Qualitative palettes are best suited for communicating and comparing
            discrete data series. EUI recommends using the{' '}
            <EuiCode>euiPaletteColorBlind()</EuiCode> for qualitative and
            categorical data.
          </p>
          <p>
            This palette is restricted to only 10 colors. However, you can add
            up to 2 more groups of 10 which are alteranates of the original.
            This is better than allowing the initial set to loop.
          </p>
        </div>
      ),
      demo: <ColorPalette />,
      props: { colorPalette, palettes },
      snippet: [
        'palettes.euiPaletteColorBlind().colors',
        'palettes.euiPaletteColorBlind(rotations = 3, combined = true).colors',
      ],
    },
    {
      title: 'Recommended quantitative palettes',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: colorPaletteQuantSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: colorPaletteQuantHtml,
        },
      ],
      text: (
        <div>
          <p>
            Quantitative palettes are best suited for displaying data on a
            continuum, as in the case of health statuses and large geographic or
            demographic-based data sets.
          </p>
          <p>
            EUI provides the following common palettes for quantitative data.
            Just pass in the number of steps needed and the function will
            interpolate between the colors.
          </p>
        </div>
      ),
      demo: <ColorPaletteQuant />,
    },
    {
      title: 'Custom palettes',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: colorPaletteCustomSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: colorPaletteCustomHtml,
        },
      ],
      text: (
        <div>
          <p>
            Use the <EuiCode>colorPalette</EuiCode> service to generate a
            custom, gradiated palette array of any length from one or more
            hexadecimal color codes. The third parameter{' '}
            <EuiCode>divergent</EuiCode>, will interpolate between the two
            halves of the spectrums separately. If a middle point is not
            provided, it will graduate to light gray.
          </p>
        </div>
      ),
      demo: <ColorPaletteCustom />,
      snippet: [
        "colorPalette(['#fff'. '#000'], 11);",
        "colorPalette(['#fff'. '#000'], 11, divergent = true);",
      ],
    },
  ],
};
