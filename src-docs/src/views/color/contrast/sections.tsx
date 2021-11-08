import React, { useContext } from 'react';
import { EuiCode, EuiCallOut } from '../../../../../src';
import { GuideSectionTypes } from '../../../components/guide_section/guide_section_types';
import { GuideSection } from '../../../components/guide_section/guide_section';
import { ThemeContext } from '../../../components/with_theme';

import Contrast from './contrast';
const ContrastSource = require('!!raw-loader!./contrast');
import ContrastBody from './contrast_body';
const ContrastBodySource = require('!!raw-loader!./contrast_body');

const contrastExample = `// Make sure text passes a contrast check
.contrastBox {
  $backgroundColor: tintOrShade($euiColorWarning, 90%, 70%);
  background: $backgroundColor;

  // Given two colors, adjust the first until contrast is 4.5
  color: makeHighContrastColor($euiColorWarning, $backgroundColor);
  padding: $euiSize;
  border-left: $euiBorderThick;
  border-color: $euiColorWarning;

  // Graphics can have a lower minimum contrast level of 3.0
  .square {
    fill: makeGraphicContrastColor($euiColorWarning, $backgroundColor);
  }
}`;

export const ContrastSections = () => {
  const themeContext = useContext(ThemeContext);
  const currentLanguage = themeContext.themeLanguage;
  const showSass = currentLanguage.includes('sass');

  const contrastFunction = showSass ? (
    <EuiCode language="scss">
      makeHighContrastColor($foreground, $background: $euiPageBackgroundColor,
      $ratio: 4.5)
    </EuiCode>
  ) : (
    <EuiCode language="js">
      makeHighContrastColor(foreground, ratio = 4.5)(background)
    </EuiCode>
  );

  const source: GuideSection['source'] = [
    showSass
      ? {
          type: GuideSectionTypes.SASS,
          code: contrastExample,
        }
      : {
          type: GuideSectionTypes.JS,
          code: ContrastSource,
        },
  ];

  const demo: GuideSection['demo'] = showSass ? (
    <div className="guideSass__contrastExample">
      <svg
        className="square"
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 16 16"
      >
        <rect width="12" height="12" x="2" y="2" rx="2" fillRule="evenodd" />
      </svg>{' '}
      This orange text now passes a contrast check!
    </div>
  ) : (
    <Contrast />
  );

  const snippet: GuideSection['snippet'] = showSass
    ? undefined
    : 'const textColor = makeHighContrastColor(foreground)(background);';

  const text = (
    <>
      <p>
        Use {contrastFunction} to calculate the appropriate foreground color
        (usually text) based on a background color.
      </p>
      <EuiCallOut color="warning">
        <p>
          Note that color contrast cannot be accurately detected when using
          transparency (colors with alpha channels).
        </p>
      </EuiCallOut>
    </>
  );

  let contrastBody;
  if (!showSass) {
    contrastBody = (
      <GuideSection
        text={
          <p>
            If you want to use the same background color that the EUI theme uses
            for all of its contrast calculations, you can pass in the{' '}
            <EuiCode>euiTheme</EuiCode> as the background.
          </p>
        }
        demo={<ContrastBody />}
        snippet={`const { euiTheme } = useEuiTheme();
      const textColor = makeHighContrastColor(foreground)(euiTheme);`}
        source={[
          {
            type: GuideSectionTypes.JS,
            code: ContrastBodySource,
          },
        ]}
      />
    );
  }

  return (
    <>
      <GuideSection text={text} demo={demo} snippet={snippet} source={source} />
      {contrastBody}
    </>
  );
};
