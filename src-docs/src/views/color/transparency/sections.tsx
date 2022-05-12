import React, { useContext } from 'react';
import { EuiCode } from '../../../../../src';
import { GuideSectionTypes } from '../../../components/guide_section/guide_section_types';
import { ThemeContext } from '../../../components/with_theme';

import { GuideSection } from '../../../components/guide_section/guide_section';

// @ts-ignore Importing from JS file
import Transparency from './transparency';
const TransparencySource = require('!!raw-loader!./transparency');

const sassExample = `.transparency {
  background: transparentize($euiColorPrimary, .2);
  padding: $euiSize;
}`;

export const TransparencySections = () => {
  const themeContext = useContext(ThemeContext);
  const currentLanguage = themeContext.themeLanguage;
  const showSass = currentLanguage.includes('sass');

  const transparencyFunction = showSass ? (
    <EuiCode language="scss">transparentize($color, alpha: 0-1)</EuiCode>
  ) : (
    <EuiCode language="js">transparentize(color, alpha: 0-1)</EuiCode>
  );

  const source = [
    showSass
      ? {
          type: GuideSectionTypes.SASS,
          code: sassExample,
        }
      : {
          type: GuideSectionTypes.JS,
          code: TransparencySource,
        },
  ];
  const text = (
    <p>
      Use {transparencyFunction} to convert any color to{' '}
      <EuiCode>rgba()</EuiCode> with the provided alpha value.
    </p>
  );
  const demo = showSass ? (
    <div className="guideSass__transparencyExample">
      The background is a transparent version of the primary color
    </div>
  ) : (
    <Transparency />
  );
  const snippet = showSass
    ? undefined
    : 'const rgba = transparentize(color, 0.75);';

  return (
    <GuideSection text={text} demo={demo} snippet={snippet} source={source} />
  );
};
