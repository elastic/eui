import React, { useContext } from 'react';
import { css } from '@emotion/react';
import { EuiCode, isColorDark, useEuiTheme } from '../../../../../src';
import { ThemeContext } from '../../../components/with_theme';
import { ThemeExample } from '../_components/_theme_example';

const contrastExample = `.lightOrDarkText {
  background-color: $euiColorPrimary;
  color: chooseLightOrDarkText($euiColorPrimary);
}`;

export const TextSections = () => {
  const { euiTheme } = useEuiTheme();
  const themeContext = useContext(ThemeContext);
  const currentLanguage = themeContext.themeLanguage;
  const showSass = currentLanguage.includes('sass');

  const title = showSass ? (
    <code>chooseLightOrDarkText(background, lightText, darkText);</code>
  ) : (
    <code>isColorDark(red, green, blue)</code>
  );

  const props = showSass
    ? `background: string;
lightText? = $euiColorGhost;
darkText? = $euiColorInk;`
    : `red: 0-255;
green: 0-255;
blue: 0-255;`;

  const text = showSass ? (
    <>
      Use this function to determine whether or not to use light (white) or dark
      (black) text against the given background color. The function will return
      either the light or dark text parameters depending on the value of the
      background color given.
    </>
  ) : (
    <>
      <p>
        Use this function to determine whether or not to use light or dark text
        against the given background color. It requires the values to be passed
        in as rgb integers and will return a <EuiCode>boolean</EuiCode> if the
        color is dark based on luminance.
      </p>
      <p>
        If the function returns <EuiCode>true</EuiCode>, use{' '}
        <EuiCode language="js">euiTheme.colors.ghost</EuiCode> otherwise use{' '}
        <EuiCode language="js">euiTheme.colors.ink</EuiCode> as the text color.
      </p>
    </>
  );
  const demo = showSass ? (
    <div className={'guideSass__textExample guideSass__textExample--primary'}>
      Checking against $euiColorPrimary
    </div>
  ) : (
    <div
      css={css`
        padding: ${euiTheme.size.base};
        color: ${isColorDark(0, 179, 164)
          ? euiTheme.colors.ghost
          : euiTheme.colors.ink};
        background: rgb(0, 179, 164);
      `}
    >
      {isColorDark(0, 179, 164) ? 'Dark' : 'Light'}
    </div>
  );

  const snippet = showSass
    ? contrastExample
    : `color: \${isColorDark(color)
    ? euiTheme.colors.ghost
    : euiTheme.colors.ink;}`;

  return (
    <ThemeExample
      title={title}
      type="function"
      description={text}
      props={props}
      example={demo}
      snippetLanguage={showSass ? 'sass' : 'emotion'}
      snippet={snippet}
    />
  );
};
