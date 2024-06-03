import React from 'react';
import { Link } from 'react-router-dom';

import { GuideSectionTypes } from '../../components';
import { qualitativePropsInfo, palettePropsInfo } from './props_info';

import {
  EuiCode,
  EuiText,
  EuiCallOut,
  EuiFlexGrid,
  EuiFlexItem,
  EuiSpacer,
} from '../../../../src/components';

import ColorPalette from './color_palette';
const colorPaletteSource = require('!!raw-loader!./color_palette');

import ColorPaletteQuant from './color_palette_quantitative';
const colorPaletteQuantSource = require('!!raw-loader!./color_palette_quantitative');

import ColorPaletteCustom from './color_palette_custom';
const colorPaletteCustomSource = require('!!raw-loader!./color_palette_custom');

import { VisPalette } from './vis_palette.js';

export const ColorPaletteExample = {
  title: 'Color palettes',
  intro: (
    <>
      <EuiText>
        <p>
          EUI provides a base set of color palettes that return an array of
          hexadecimal color for use in other EUI components or charts.
        </p>
      </EuiText>
    </>
  ),
  sections: [
    {
      title: 'Preset qualitative palettes',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: colorPaletteSource,
        },
      ],
      text: (
        <>
          <p>
            Qualitative palettes are best suited for communicating and comparing
            discrete data series. EUI recommends using the{' '}
            <EuiCode>euiPaletteColorBlind()</EuiCode> for qualitative and
            categorical data.
          </p>
          <p>
            This palette is restricted to only 10 colors. However, you can add
            more groups of 10 which are alternates of the original. This is
            better than allowing the initial set to loop.
          </p>
          <p>
            These colors are meant to be used as graphics and contrasted against
            the value of <EuiCode>euiColorEmptyShade</EuiCode> for the current
            theme. When placing text on top of these colors, use the{' '}
            <EuiCode>euiPaletteColorBlindBehindText()</EuiCode> variant. It is a
            brightened version of the base palette to create better contrast
            with text.
          </p>
        </>
      ),
      demo: <ColorPalette />,
      snippet: [
        'euiPaletteColorBlind()',
        "euiPaletteColorBlind({rotations: 3, order: 'group', direction: 'both'})",
      ],
      props: qualitativePropsInfo,
    },
    {
      title: 'Recommended quantitative palettes',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: colorPaletteQuantSource,
        },
      ],
      text: (
        <>
          <p>
            Quantitative palettes are best suited for displaying data on a
            continuum, as in the case of health statuses and large geographic or
            demographic-based data sets.
          </p>
          <p>
            EUI provides the following common palettes for quantitative data and{' '}
            <Link to="/elastic-charts/creating-charts">charts</Link>. Just pass
            in the number of steps needed and the function will interpolate
            between the colors.
          </p>
          <EuiCallOut
            color="warning"
            iconType="accessibility"
            title="The palette for status is the only palette that has proper contrast ratios. When using the other palettes, consider adding another form of the data for screen readers."
          />
        </>
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
      ],
      text: (
        <>
          <p>
            Use the <EuiCode>colorPalette</EuiCode> service to generate a
            custom, gradiated palette array of any length from one or more
            hexadecimal color codes. The third parameter{' '}
            <EuiCode>divergent</EuiCode>, will interpolate between the two
            halves of the spectrums separately. If a middle point is not
            provided, it will graduate to light gray.
          </p>
        </>
      ),
      demo: <ColorPaletteCustom />,
      snippet: [
        "colorPalette(['#fff'. '#000'], 11);",
        "colorPalette(['#fff'. '#000'], 11, divergent = true);",
      ],
      props: palettePropsInfo,
    },
    {
      title: 'Sass variables',
      wrapText: false,
      text: (
        <>
          <EuiText>
            <p>
              The following colors are color-blind safe and should be used in
              categorically seried visualizations and graphics. They are meant
              to be contrasted against the value of{' '}
              <EuiCode language="scss">$euiColorEmptyShade</EuiCode> for the
              current theme.
            </p>
            <p>
              When using the palette as a background for text (i.e. badges), use
              the <EuiCode>_behindText</EuiCode> variant. It is a brightened
              version of the base palette to create better contrast with text.
            </p>
          </EuiText>

          <EuiSpacer size="xxl" />
          <EuiFlexGrid columns={2}>
            <EuiFlexItem>
              <VisPalette variant="graphic" />
            </EuiFlexItem>
            <EuiFlexItem>
              <VisPalette variant="behindText" />
            </EuiFlexItem>
          </EuiFlexGrid>
        </>
      ),
      demoPanelProps: {
        hasBorder: false,
        color: 'transparent',
      },
    },
  ],
};
