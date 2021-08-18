import React from 'react';

import { GuideSectionTypes } from '../../components';

import { EuiCode, EuiText, EuiLink } from '../../../../src/components';

import IsColorDark from './is_color_dark';
const isColorDarkSource = require('!!raw-loader!./is_color_dark');

import Contrast from './contrast';
const ContrastSource = require('!!raw-loader!./contrast');
import ContrastBody from './contrast_body';
const ContrastBodySource = require('!!raw-loader!./contrast_body');

export const ColorExample = {
  title: 'Color',
  intro: (
    <EuiText>
      <p>
        EUI&apos;s color functions use{' '}
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
        <p>
          Use{' '}
          <EuiCode language="js">
            makeHighContrastColor(foreground, ratio = 4.5)(background)
          </EuiCode>{' '}
          to calcuate the appropriate foreground color (usually text) based on a
          background color.
        </p>
      ),
      demo: <Contrast />,
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
          for all of its contrast calculations, you can pass in{' '}
          <EuiCode>euiTheme.colors.body</EuiCode> as the background.
        </p>
      ),
      demo: <ContrastBody />,
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
        <p>
          Use <EuiCode>isColorDark</EuiCode> to determine whether or not to use
          light or dark text against a background of a given color.
        </p>
      ),
      demo: <IsColorDark />,
    },
  ],
};
