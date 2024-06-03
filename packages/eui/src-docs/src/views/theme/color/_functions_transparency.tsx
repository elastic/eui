import React, { useContext } from 'react';
import {
  EuiBadge,
  EuiCode,
  transparentize,
  useEuiTheme,
} from '../../../../../src';
import { ThemeContext } from '../../../components/with_theme';

import { ThemeExample } from '../_components/_theme_example';

const sassExample = `.transparency {
  background: transparentize($euiColorPrimary, .8);
}`;

export const TransparencySections = () => {
  const { euiTheme, colorMode } = useEuiTheme();
  const themeContext = useContext(ThemeContext);
  const currentLanguage = themeContext.themeLanguage;
  const showSass = currentLanguage.includes('sass');

  const props = `color: string;
alpha: decimal = 0-1;`;

  const text = (
    <p>
      Use this function to convert any color to <EuiCode>rgba()</EuiCode> with
      the provided alpha value.
    </p>
  );
  const demo = showSass ? (
    <div className="guideSass__transparencyExample">
      The background is a transparent version of the primary color
    </div>
  ) : (
    <code>
      transparentize(
      <EuiBadge color={'#006837'}>#006837</EuiBadge>, 0.75) ={' '}
      <EuiBadge
        color={transparentize('#006837', 0.25)}
        style={{
          color:
            colorMode === 'DARK' ? euiTheme.colors.ghost : euiTheme.colors.ink,
        }}
      >
        {transparentize('#006837', 0.25)}
      </EuiBadge>
    </code>
  );
  const snippet = showSass ? sassExample : 'transparentize(color, 0.75)';

  return (
    <ThemeExample
      title={<code>transparentize(color, alpha)</code>}
      type={'function'}
      description={text}
      props={props}
      example={demo}
      snippetLanguage={showSass ? 'sass' : 'tsx'}
      snippet={snippet}
    />
  );
};
