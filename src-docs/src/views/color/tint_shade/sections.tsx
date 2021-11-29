import React, { useContext } from 'react';
import { EuiCode } from '../../../../../src';
import { GuideSectionTypes } from '../../../components/guide_section/guide_section_types';

// @ts-ignore Importing from JS file
import Tint from './tint';
const TintSource = require('!!raw-loader!./tint');
// @ts-ignore Importing from JS file
import Shade from './shade';
const ShadeSource = require('!!raw-loader!./shade');

import { GuideSection } from '../../../components/guide_section/guide_section';
import { ThemeContext } from '../../../components/with_theme/theme_context';

const tintExample = `.tint {
  $backgroundColor: tint($euiColorSuccess, 20%);
  background: $backgroundColor;
  color: chooseLightOrDarkText($backgroundColor);
  padding: $euiSize;
}`;

const shadeExample = `.shade {
  $backgroundColor: shade($euiColorSuccess, 20%);
  background: $backgroundColor;
  color: chooseLightOrDarkText($backgroundColor);
  padding: $euiSize;
}`;

const tintOrShadeExample = `.tintOrShade {
  $backgroundColor: tintOrShade($euiColorSuccess, 80%, 80%);
  background: $backgroundColor;
  color: chooseLightOrDarkText($backgroundColor);
  padding: $euiSize;
}`;

export const TintShadeSections = () => {
  const themeContext = useContext(ThemeContext);
  const currentLanguage = themeContext.themeLanguage;
  const showSass = currentLanguage.includes('sass');

  const tintFunction = showSass ? (
    <EuiCode language="scss">tint($color, $percent)</EuiCode>
  ) : (
    <EuiCode language="js">tint(color, ratio: 0-1)</EuiCode>
  );

  const shadeFunction = showSass ? (
    <EuiCode language="scss">shade($color, $percent)</EuiCode>
  ) : (
    <EuiCode language="js">shade(color, ratio: 0-1)</EuiCode>
  );

  const source = [
    showSass
      ? {
          type: GuideSectionTypes.SASS,
          code: tintExample,
        }
      : {
          type: GuideSectionTypes.JS,
          code: TintSource,
        },
  ];
  const text = (
    <p>
      Use {tintFunction} to mix any color with <strong>white</strong>. The
      higher the ratio, the more white will be mixed.
    </p>
  );
  const demo = showSass ? (
    <div className="guideSass__tintExample">
      This is the success color tinted by 20%.
    </div>
  ) : (
    <Tint />
  );
  const snippet = showSass ? undefined : 'const tinted = tint(color, 0.75);';

  const tintSection = (
    <GuideSection text={text} demo={demo} snippet={snippet} source={source} />
  );

  const source_shade = [
    showSass
      ? {
          type: GuideSectionTypes.SASS,
          code: shadeExample,
        }
      : {
          type: GuideSectionTypes.JS,
          code: ShadeSource,
        },
  ];
  const text_shade = (
    <p>
      Use {shadeFunction} to mix any color with <strong>black</strong>. The
      higher the ratio, the more black will be mixed.
    </p>
  );
  const demo_shade = showSass ? (
    <div className="guideSass__shadeExample">
      This is the success color shaded by 20%.
    </div>
  ) : (
    <Shade />
  );
  const snippet_shade = showSass
    ? undefined
    : 'const shaded = shade(color, 0.5);';

  const shadeSection = (
    <GuideSection
      text={text_shade}
      demo={demo_shade}
      snippet={snippet_shade}
      source={source_shade}
    />
  );

  let tintShadeSection;

  if (showSass) {
    const source = [
      {
        type: GuideSectionTypes.SASS,
        code: tintOrShadeExample,
      },
    ];
    const text = (
      <p>
        If you are affording for both light and dark themes, you can use a
        single function{' '}
        <EuiCode language="scss">
          tintOrShade($color, $tint_percent, $shade_percent)
        </EuiCode>{' '}
        to shade or tint based on the color mode. Taking the success color above
        we can tint the color in the light mode, but shade it in the dark mode.
        This makes the background color more subtle in both color modes. The
        opposite function{' '}
        <EuiCode language="scss">
          shadeOrTint($color, $shade_percent, $tint_percent)
        </EuiCode>{' '}
        also exists.
      </p>
    );
    const demo = (
      <div className="guideSass__tintShadeExample">
        This success color is tinted in light mode and shaded in dark.
      </div>
    );
    tintShadeSection = <GuideSection text={text} demo={demo} source={source} />;
  }

  return (
    <>
      {shadeSection}
      {tintSection}
      {tintShadeSection}
    </>
  );
};
