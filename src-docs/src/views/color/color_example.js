import React from 'react';
import { Link } from 'react-router-dom';

import { GuideSectionTypes } from '../../components';

import {
  EuiCode,
  EuiText,
  EuiLink,
  EuiCallOut,
} from '../../../../src/components';

import IsColorDark from './is_color_dark';
const isColorDarkSource = require('!!raw-loader!./is_color_dark');

import Contrast from './contrast';
const ContrastSource = require('!!raw-loader!./contrast');
import ContrastBody from './contrast_body';
const ContrastBodySource = require('!!raw-loader!./contrast_body');

import Transparency from './transparency';
const TransparencySource = require('!!raw-loader!./transparency');

import Tint from './tint';
const TintSource = require('!!raw-loader!./tint');
import Shade from './shade';
const ShadeSource = require('!!raw-loader!./shade');

import Saturate from './saturate';
const SaturateSource = require('!!raw-loader!./saturate');
import Desaturate from './desaturate';
const DesaturateSource = require('!!raw-loader!./desaturate');

import ContrastSimulated from './contrast_simulated';
const ContrastSimulatedSource = require('!!raw-loader!./contrast_simulated');
import ContrastSimulatedBody from './contrast_simulated_body';
const ContrastSimulatedBodySource = require('!!raw-loader!./contrast_simulated_body');

export const ColorExample = {
  title: 'Color',
  intro: (
    <EuiText>
      <p>
        EUI&apos;s color functions use the lightweight color library{' '}
        <EuiLink to="https://gka.github.io/chroma.js">chroma.js</EuiLink> for
        calculations. This means that most functions accept most Chroma{' '}
        <EuiLink to="https://gka.github.io/chroma.js/#chroma">Color</EuiLink>{' '}
        types.
      </p>
    </EuiText>
  ),
  sections: [
    {
      title: 'Contrast',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: ContrastSource,
        },
      ],
      text: (
        <>
          <p>
            Use{' '}
            <EuiCode language="js">
              makeHighContrastColor(foreground, ratio = 4.5)(background)
            </EuiCode>{' '}
            to calculate the appropriate foreground color (usually text) based
            on a background color.
          </p>
          <EuiCallOut color="warning">
            <p>
              Note that color contrast cannot be accurately detected when using
              transparency (colors with alpha channels). See the{' '}
              <Link to="/utilities/color#simulating-contrast-with-transparency">
                &quot;Simulating contrast with transparency&quot;
              </Link>{' '}
              example for details on how handle this internally.
            </p>
          </EuiCallOut>
        </>
      ),
      demo: <Contrast />,
      snippet:
        'const textColor = makeHighContrastColor(foreground)(background);',
    },
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: ContrastBodySource,
        },
      ],
      text: (
        <p>
          If you want to use the same background color that the EUI theme uses
          for all of its contrast calculations, you can pass in the{' '}
          <EuiCode>euiTheme</EuiCode> as the background.
        </p>
      ),
      demo: <ContrastBody />,
      snippet: `const { euiTheme } = useEuiTheme();
const textColor = makeHighContrastColor(foreground)(euiTheme);`,
    },
    {
      title: 'Transparency',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: TransparencySource,
        },
      ],
      text: (
        <p>
          Use <EuiCode language="js">transparentize(color, alpha: 0-1)</EuiCode>{' '}
          to convert any color to <EuiCode>rgba()</EuiCode> with the provided
          alpha value.
        </p>
      ),
      demo: <Transparency />,
      snippet: 'const rgba = transparentize(color, 0.75);',
    },
    {
      title: 'Tint and shade',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: TintSource,
        },
      ],
      text: (
        <p>
          Use <EuiCode language="js">tint(color, ratio: 0-1)</EuiCode> to mix
          any color with <strong>white</strong>. The higher the ratio, the more
          white will be mixed.
        </p>
      ),
      demo: <Tint />,
      snippet: 'const tinted = tint(color, 0.75);',
    },
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: ShadeSource,
        },
      ],
      text: (
        <p>
          Use <EuiCode language="js">shade(color, ratio: 0-1)</EuiCode> to mix
          any color with <strong>black</strong>. The higher the ratio, the more
          black will be mixed.
        </p>
      ),
      demo: <Shade />,
      snippet: 'const shaded = shade(color, 0.5);',
    },
    {
      title: 'Saturation',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: SaturateSource,
        },
      ],
      text: (
        <p>
          Use <EuiCode language="js">saturate(color, ratio: 0-1)</EuiCode> to
          increase the saturation of a color by manipulating the hsl variant.
        </p>
      ),
      demo: <Saturate />,
      snippet: 'const saturated = saturate(color, 0.75);',
    },
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: DesaturateSource,
        },
      ],
      text: (
        <p>
          Use <EuiCode language="js">desaturate(color, ratio: 0-1)</EuiCode> to
          decrease the saturation of a color by manipulating the hsl variant.
        </p>
      ),
      demo: <Desaturate />,
      snippet: 'const desaturated = desaturate(color, 0.75);',
    },
    {
      title: 'Is color dark',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: isColorDarkSource,
        },
      ],
      text: (
        <>
          <p>
            Use <EuiCode language="js">isColorDark(red, green, blue)</EuiCode>{' '}
            to determine whether or not to use light or dark text against a
            background of a given color. It requires the values to be passed in
            as rgb integers and will return a <EuiCode>boolean</EuiCode> if the
            color is dark based on luminance.
          </p>
          <p>
            If the function returns <EuiCode>true</EuiCode>, use{' '}
            <EuiCode language="js">euiTheme.colors.ghost</EuiCode> otherwise use{' '}
            <EuiCode language="js">euiTheme.colors.ink</EuiCode> as the text
            color.
          </p>
        </>
      ),
      demo: <IsColorDark />,
      snippet: `const { euiTheme } = useEuiTheme();
const textColor = isColorDark(color) ? euiTheme.colors.ghost : euiTheme.colors.ink;`,
    },
    {
      title: 'Simulating contrast with transparency',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: ContrastSimulatedSource,
        },
      ],
      text: (
        <>
          <p>
            The <EuiCode>makeHighContrastColor</EuiCode> function does not take
            alpha channel into account and can therefore lead to incorrect
            contrast calculations.
          </p>
          <p>
            You can, instead, <strong>simulate</strong> transparency by first
            tinting or shading (depending on the color mode) the background
            color with the same transparency ratio. Then use the simulated color
            to calculate the contrast with the foreground.
          </p>
          <EuiCallOut color="warning" title="Use with caution!">
            <p>
              This method is not 100% accurate and has some inconstencies in the
              way mixing colors are calculated versus transparency. However, it
              is <strong>more likely</strong> to create the right contrast ratio
              than using transparency alone.
            </p>
          </EuiCallOut>
        </>
      ),
      demo: <ContrastSimulated />,
      snippet: `const { colorMode } = useEuiTheme();
const transparency = 0.4;
const simulated = colorMode === 'DARK'
  ? shade(background, 1 - transparency)
  : tint(background, 1 - transparency);
const backgroundColor = transparentize(background, transparency);
const color = makeHighContrastColor(foreground)(simulated);`,
    },
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: ContrastSimulatedBodySource,
        },
      ],
      text: (
        <>
          <p>
            When EUI simulates or calculates contrast, we typically mix the
            background color with <EuiCode>euiTheme.colors.body</EuiCode> which
            is the darkest version of backgrounds we allow.
          </p>
          <p>
            This effectively increases the contrast ratio when used on the empty
            shade, but ensures proper contrast when the element sits directly on
            the body color.
          </p>
        </>
      ),
      demo: <ContrastSimulatedBody />,
    },
  ],
};
