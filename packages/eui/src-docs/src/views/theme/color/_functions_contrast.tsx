import React, { useContext } from 'react';
import { css } from '@emotion/react';
import {
  EuiCode,
  EuiCallOut,
  EuiIcon,
  useEuiTheme,
  makeHighContrastColor,
} from '../../../../../src';
import { GuideSectionProps } from '../../../components/guide_section/guide_section';
import { ThemeContext } from '../../../components/with_theme';

import { ThemeExample } from '../_components/_theme_example';
import chroma from 'chroma-js';

const contrastExample = `.contrastBox {
  $backgroundColor: tintOrShade($euiColorWarning, 90%, 70%);
  background: $backgroundColor;

  // Given two colors, adjust the first until contrast is 4.5
  color: makeHighContrastColor($euiColorWarning, $backgroundColor);

  // Graphics can have a lower minimum contrast level of 3.0
  .square {
    color: makeGraphicContrastColor($euiColorWarning, $backgroundColor);
  }
}`;

export const ContrastSections = () => {
  const { euiTheme } = useEuiTheme();
  const themeContext = useContext(ThemeContext);
  const currentLanguage = themeContext.themeLanguage;
  const showSass = currentLanguage.includes('sass');

  const contrastFunction = showSass ? (
    <code>makeHighContrastColor(foreground, background, ratio)</code>
  ) : (
    <code>makeHighContrastColor(foreground, ratio)(background)</code>
  );

  const text = (
    <>
      <p>
        Use this function to calculate the appropriate foreground color (usually
        text) based on a background color.
      </p>
    </>
  );

  const props = showSass
    ? `foreground: string;
background?: string = $euiPageBackgroundColor;
ratio?: number = 4.5`
    : `foreground: string;
ratio?: number = 4.5;
background?: string = euiTheme.colors.body;`;

  const demo: GuideSectionProps['demo'] = showSass ? (
    <div className="guideSass__contrastExample">
      <EuiIcon type="stopFilled" className="square" />
      This orange text now passes a contrast check!
    </div>
  ) : (
    <div
      css={css`
        padding: ${euiTheme.size.base};
        border-radius: ${euiTheme.border.radius.small};
        background: pink;
        color: ${makeHighContrastColor('white')('pink')};
      `}
    >
      <code>
        {chroma
          .contrast(makeHighContrastColor('white')('pink'), 'pink')
          .toFixed(2)}
        {": makeHighContrastColor('white')('pink')"}
      </code>
    </div>
  );

  const snippet: GuideSectionProps['snippet'] = showSass
    ? contrastExample
    : 'color: ${makeHighContrastColor(foreground)(background)};';

  let contrastBody;
  if (!showSass) {
    contrastBody = (
      <ThemeExample
        description={
          <>
            If you want to use the same background color that the EUI theme uses
            for all of its contrast calculations, you can pass in the{' '}
            <EuiCode>euiTheme</EuiCode> as the background.
          </>
        }
        example={
          <div
            css={css`
              color: ${makeHighContrastColor('#fdc791')(euiTheme)};
            `}
          >
            <code>
              {chroma
                .contrast(
                  makeHighContrastColor('#fdc791')(euiTheme),
                  euiTheme.colors.body
                )
                .toFixed(2)}
              {': makeHighContrastColor(#fdc791, euiTheme)'}
            </code>
          </div>
        }
        snippetLanguage="emotion"
        snippet={'color: ${makeHighContrastColor(foreground)(euiTheme)};'}
      />
    );
  }

  return (
    <>
      <EuiCallOut color="warning">
        <p>
          Note that color contrast cannot be accurately detected when using
          transparency (colors with alpha channels).
        </p>
      </EuiCallOut>
      <ThemeExample
        title={contrastFunction}
        type="function"
        description={text}
        props={props}
        example={demo}
        snippetLanguage={showSass ? 'sass' : 'emotion'}
        snippet={snippet}
      />
      {contrastBody}
    </>
  );
};
