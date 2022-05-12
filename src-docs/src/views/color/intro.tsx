import React, { useContext } from 'react';

import { EuiText, EuiLink } from '../../../../src/components';
import { ThemeContext } from '../../components/with_theme';

export default () => {
  const themeContext = useContext(ThemeContext);
  const currentLanguage = themeContext.themeLanguage;
  const showSass = currentLanguage.includes('sass');

  return (
    <EuiText>
      {showSass ? (
        <p>
          EUI provides some Sass color functions that we use throughout
          EUI&apos;s styling layer for color-specific calculations. When you
          need to go beyond the provided color set, always use these functions
          to modify.
        </p>
      ) : (
        <p>
          EUI&apos;s color functions use the lightweight color library{' '}
          <EuiLink href="https://gka.github.io/chroma.js">chroma.js</EuiLink>{' '}
          for calculations. This means that most functions accept most Chroma{' '}
          <EuiLink href="https://gka.github.io/chroma.js/#chroma">
            Color
          </EuiLink>{' '}
          types.
        </p>
      )}
    </EuiText>
  );
};
