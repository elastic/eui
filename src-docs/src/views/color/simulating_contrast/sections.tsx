import React, { useContext } from 'react';
import { EuiCode, EuiCallOut } from '../../../../../src';
import { GuideSectionTypes } from '../../../components/guide_section/guide_section_types';
import { GuideSection } from '../../../components/guide_section/guide_section';

// @ts-ignore Importing from JS file
import ContrastSimulated from './contrast_simulated';
const ContrastSimulatedSource = require('!!raw-loader!./contrast_simulated');
// @ts-ignore Importing from JS file
import ContrastSimulatedBody from './contrast_simulated_body';
import { ThemeContext } from '../../../components/with_theme';
const ContrastSimulatedBodySource = require('!!raw-loader!./contrast_simulated_body');

export const SimulatingSections = () => {
  const themeContext = useContext(ThemeContext);
  const currentLanguage = themeContext.themeLanguage;
  const showSass = currentLanguage.includes('sass');

  const contrastDemos: GuideSection[] = [
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
  ];

  return showSass ? [undefined] : contrastDemos;
};
