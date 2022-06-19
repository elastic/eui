import React, { useContext } from 'react';
import {
  EuiBadge,
  EuiCode,
  shade,
  tint,
  useEuiTheme,
} from '../../../../../src';

import { ThemeContext } from '../../../components/with_theme/theme_context';
import { ThemeExample } from '../_components/_theme_example';

const tintExample = `.tint {
  $backgroundColor: tint($euiColorSuccess, 20%);
  background: $backgroundColor;
  color: chooseLightOrDarkText($backgroundColor);
}`;

const shadeExample = `.shade {
  $backgroundColor: shade($euiColorSuccess, 40%);
  background: $backgroundColor;
  color: chooseLightOrDarkText($backgroundColor);
}`;

const tintOrShadeExample = `.tintOrShade {
  $backgroundColor: tintOrShade($euiColorSuccess, 80%, 80%);
  background: $backgroundColor;
  color: chooseLightOrDarkText($backgroundColor);
}`;

export const TintShadeSections = () => {
  const { euiTheme } = useEuiTheme();
  const themeContext = useContext(ThemeContext);
  const currentLanguage = themeContext.themeLanguage;
  const showSass = currentLanguage.includes('sass');

  const props = showSass
    ? `color: string;
percent: 0%-100%;`
    : `color: string;
ratio: decimal = 0-1;`;

  /** TINT */

  const tintFunction = showSass ? (
    <code>tint(color, percent)</code>
  ) : (
    <code>tint(color, ratio)</code>
  );

  const text = (
    <p>
      Use this function to mix any color with <strong>white</strong>. The higher
      the ratio, the more white will be mixed.
    </p>
  );

  const demo = showSass ? (
    <div className="guideSass__tintExample">
      This is the success color tinted by 20%.
    </div>
  ) : (
    <code>
      tint(
      <EuiBadge color={euiTheme.colors.danger}>
        {euiTheme.colors.danger}
      </EuiBadge>
      , 0.75) ={' '}
      <EuiBadge color={tint(euiTheme.colors.danger, 0.75)}>
        {tint(euiTheme.colors.danger, 0.75)}
      </EuiBadge>
    </code>
  );

  const snippet = showSass ? tintExample : 'tint(euiTheme.colors.danger, 0.75)';

  const tintSection = (
    <ThemeExample
      title={tintFunction}
      description={text}
      type="function"
      props={props}
      example={demo}
      snippetLanguage={showSass ? 'sass' : 'tsx'}
      snippet={snippet}
    />
  );

  /** SHADE */

  const shadeFunction = showSass ? (
    <code>shade(color, percent)</code>
  ) : (
    <code>shade(color, ratio)</code>
  );

  const text_shade = (
    <p>
      Use this function to mix any color with <strong>black</strong>. The higher
      the ratio, the more black will be mixed.
    </p>
  );

  const demo_shade = showSass ? (
    <div className="guideSass__shadeExample">
      This is the success color shaded by 40%.
    </div>
  ) : (
    <code>
      shade(
      <EuiBadge color={euiTheme.colors.danger}>
        {euiTheme.colors.danger}
      </EuiBadge>
      , 0.75) ={' '}
      <EuiBadge color={shade(euiTheme.colors.danger, 0.25)}>
        {shade(euiTheme.colors.danger, 0.25)}
      </EuiBadge>
    </code>
  );

  const snippet_shade = showSass
    ? shadeExample
    : 'shade(euiTheme.colors.danger, 0.25)';

  const shadeSection = (
    <ThemeExample
      title={shadeFunction}
      type="function"
      props={props}
      description={text_shade}
      example={demo_shade}
      snippetLanguage={showSass ? 'sass' : 'tsx'}
      snippet={snippet_shade}
    />
  );

  /** SASS tintORShade */

  let tintShadeSection;

  if (showSass) {
    const text = (
      <p>
        If you are affording for both light and dark themes, you can use this
        single function to shade or tint based on the color mode. Taking the
        color as the first parameter, it will tint the color in the light mode,
        but shade it in the dark mode. This makes the background color more
        subtle in both color modes. The opposite function{' '}
        <EuiCode language="sass">
          shadeOrTint(color, shade_percent, tint_percent)
        </EuiCode>{' '}
        also exists.
      </p>
    );
    const demo = (
      <div className="guideSass__tintShadeExample">
        This success color is tinted in light mode and shaded in dark.
      </div>
    );
    tintShadeSection = (
      <ThemeExample
        title={<code>tintOrShade(color, tint_percent, shade_percent)</code>}
        type="function"
        description={text}
        props={`color: string;
tint_percent: 0%-100%;
shade_percent: 0%-100%;`}
        example={demo}
        snippetLanguage={showSass ? 'sass' : 'emotion'}
        snippet={tintOrShadeExample}
      />
    );
  }

  return (
    <>
      {tintSection}
      {shadeSection}
      {tintShadeSection}
    </>
  );
};
