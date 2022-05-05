import React from 'react';

import { EuiText } from '../../../../src/components';

import TextAlignUtilities from './align';
import TextWrappingUtilities from './wrapping';
import TextNumberUtilities from './numbers';
import TextColorUtilities from './color';

export const TextUtilitiesExample = {
  title: 'Text',
  showThemeLanguageToggle: true,
  intro: (
    <EuiText>
      <p>
        These text utilities are available primarily as CSS classes to aid in
        quickly styling your text. Some utilities are additionally available as
        either CSS-in-JS or Sass mixins to optionally compose within your own
        custom styles.
      </p>
    </EuiText>
  ),
  sections: [
    {
      title: 'Alignment',
      wrapText: false,
      text: <TextAlignUtilities />,
    },
    {
      title: 'Wrapping',
      wrapText: false,
      text: <TextWrappingUtilities />,
    },
    {
      title: 'Numbers',
      wrapText: false,
      text: <TextNumberUtilities />,
    },
    {
      title: 'Color',
      wrapText: false,
      text: <TextColorUtilities />,
    },
  ],
};
