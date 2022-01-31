import React, { useContext } from 'react';
import { EuiCode } from '../../../../../src';
import { GuideSectionTypes } from '../../../components/guide_section/guide_section_types';
import { GuideSection } from '../../../components/guide_section/guide_section';
import { ThemeContext } from '../../../components/with_theme';

// @ts-ignore Importing from JS file
import IsColorDark from './is_color_dark';
const isColorDarkSource = require('!!raw-loader!./is_color_dark');

const contrastExample = `.lightOrDarkText {
  padding: $euiSize;
  display: inline-block;
  margin-right: $euiSize;

  &--primary {
    background-color: $euiColorPrimary;
    color: chooseLightOrDarkText($euiColorPrimary);
  }

  &--success {
    background-color: $euiColorSuccess;
    color: chooseLightOrDarkText($euiColorSuccess);
  }

  &--warning {
    background-color: $euiColorWarning;
    color: chooseLightOrDarkText($euiColorWarning);
  }

  &--danger {
    background-color: $euiColorDanger;
    color: chooseLightOrDarkText($euiColorDanger);
  }
}`;

export const TextSections = () => {
  const themeContext = useContext(ThemeContext);
  const currentLanguage = themeContext.themeLanguage;
  const showSass = currentLanguage.includes('sass');

  const source = [
    showSass
      ? {
          type: GuideSectionTypes.SASS,
          code: contrastExample,
        }
      : {
          type: GuideSectionTypes.TSX,
          code: isColorDarkSource,
        },
  ];
  const text = showSass ? (
    <>
      Use{' '}
      <EuiCode language="scss">
        chooseLightOrDarkText($background, $lightText: $euiColorGhost,
        $darkText: $euiColorInk);
      </EuiCode>{' '}
      to determine whether or not to use light (white) or dark (black) text
      against the given background color. The function will return either the
      light or dark text parameters depending on the value of the background
      color given.
    </>
  ) : (
    <>
      <p>
        Use <EuiCode language="js">isColorDark(red, green, blue)</EuiCode> to
        determine whether or not to use light or dark text against the given
        background color. It requires the values to be passed in as rgb integers
        and will return a <EuiCode>boolean</EuiCode> if the color is dark based
        on luminance.
      </p>
      <p>
        If the function returns <EuiCode>true</EuiCode>, use{' '}
        <EuiCode language="js">euiTheme.colors.ghost</EuiCode> otherwise use{' '}
        <EuiCode language="js">euiTheme.colors.ink</EuiCode> as the text color.
      </p>
    </>
  );
  const demo = showSass ? (
    ['primary', 'success', 'warning', 'danger'].map((color) => (
      <div
        className={`guideSass__textExample guideSass__textExample--${color}`}
      >
        Checking {color}
      </div>
    ))
  ) : (
    <IsColorDark />
  );
  const snippet = showSass
    ? undefined
    : `const { euiTheme } = useEuiTheme();
const textColor = isColorDark(color) ? euiTheme.colors.ghost : euiTheme.colors.ink;`;

  return (
    <GuideSection text={text} demo={demo} snippet={snippet} source={source} />
  );
};
