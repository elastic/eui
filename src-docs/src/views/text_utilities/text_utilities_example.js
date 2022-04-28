import React from 'react';

import { EuiText } from '../../../../src/components';

export const TextUtilitiesExample = {
  title: 'Text',
  showThemeLanguageToggle: true,
  intro: (
    <EuiText>
      <p>
        These text utilities are available primarily as CSS classes to aid in
        quickly tweaking your text. Some utilities are additionally available as
        either CSS-in-JS or Sass mixins to optionally compose within your own
        custom styles.
      </p>
    </EuiText>
  ),
};
