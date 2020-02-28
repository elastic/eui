import React, { useState } from 'react';
import { Link } from 'react-router';

import { GuidePage } from '../../components';

import {
  EuiText,
  EuiSpacer,
  EuiFlexGrid,
  EuiFlexItem,
  EuiLink,
  EuiCode,
  EuiSwitch,
  EuiCallOut,
} from '../../../../src/components';
import { ratingAA } from './colors/_utilities';
import { CorePalette } from './colors/core_palette';
import { VisPalette } from './colors/vis_palette';
import { ColorSection } from './colors/color_section';
import { ContrastSlider } from './colors/contrast_slider';

const allowedColors = [
  'euiColorPrimary',
  'euiColorSecondary',
  'euiColorAccent',
  'euiColorWarning',
  'euiColorDanger',
  'euiColorEmptyShade',
  'euiColorLightestShade',
  'euiColorLightShade',
  'euiColorMediumShade',
  'euiColorDarkShade',
  'euiColorDarkestShade',
  'euiColorFullShade',
];

const textVariants = [
  'euiColorPrimaryText',
  'euiColorSecondaryText',
  'euiColorWarningText',
  'euiColorDangerText',
  'euiColorAccentText',
  'euiColorEmptyShade',
  'euiColorLightestShade',
  'euiColorLightShade',
  'euiColorMediumShade',
  'euiColorDarkShade',
  'euiColorDarkestShade',
  'euiColorFullShade',
];

export default ({ selectedTheme }) => {
  const [showTextVariants, setShowTextVariants] = useState(true);
  const [contrastValue, setContrastValue] = useState(3);
  const colorsForContrast = showTextVariants ? textVariants : allowedColors;
  const selectedThemeIsDark = selectedTheme.includes('dark');

  return (
    <GuidePage title="Color guidelines">
      <EuiText grow={false} className="guideSection__text">
        <h2>Elastic UI builds with a very limited palette.</h2>
        <p>
          We use a core set of three colors, combined with a green / orange /
          red qualitative set of three, and finally combine those against a
          six-color grayscale. Variation beyond these colors is minimal and
          always done with math manipulation against the original set.
        </p>
      </EuiText>

      <EuiSpacer />

      <CorePalette colors={allowedColors} theme={selectedTheme} />

      <EuiSpacer size="xxl" />

      <EuiText grow={false} className="guideSection__text">
        <h2>Accessible text contrast</h2>
        <p>
          <EuiLink href="https://www.w3.org/TR/UNDERSTANDING-WCAG20/visual-audio-contrast-contrast.html">
            WCAG specifications
          </EuiLink>{' '}
          defines specific contrast ratios between foreground text and a
          background color. The grids below display which color combinations
          pass that rating. In general you should try to use a color combination
          that is {ratingAA} or above with the exception of using large text.
        </p>
      </EuiText>

      <EuiSpacer size="m" />

      <EuiCallOut
        color="warning"
        iconType="accessibility"
        title="Amsterdam changes in contrast levels">
        <p>
          The Amsterdam theme introduces a more vibrant core color palette. In
          order to maintain a WCAG contrast of at least 4.5 you should use the
          text variants of the core color variables such as&nbsp;
          <EuiCode>$euiColorSecondaryText</EuiCode>. These new variables have
          also been added to the default EUI theme and can be used in components
          that render text.
        </p>
        <EuiSwitch
          label="Show text variant"
          checked={showTextVariants}
          onChange={e => setShowTextVariants(e.target.checked)}
        />
      </EuiCallOut>

      <EuiSpacer size="xxl" />

      <ContrastSlider
        contrastValue={contrastValue}
        onChange={value => setContrastValue(value)}
      />

      <EuiSpacer size="xxl" />
      <EuiSpacer size="xxl" />

      <ColorSection
        theme={selectedTheme}
        color={'euiColorPrimary'}
        colorsForContrast={colorsForContrast}
        minimumContrast={contrastValue}
        showTextVariants={showTextVariants}>
        <p>
          Main brand color and used for most call to actions like buttons and
          links. Reserve usages to elements with interactions like clickable
          items not for plain text.
        </p>
      </ColorSection>

      <EuiSpacer size="xxl" />
      <EuiSpacer size="xxl" />

      <ColorSection
        theme={selectedTheme}
        color={'euiColorSecondary'}
        colorsForContrast={colorsForContrast}
        minimumContrast={contrastValue}
        showTextVariants={showTextVariants}>
        <p>
          Also known as <EuiCode>euiColorSuccess</EuiCode>. Use this for success
          graphics and <strong>additive</strong> actions.
        </p>
      </ColorSection>

      <EuiSpacer size="xxl" />
      <EuiSpacer size="xxl" />

      <ColorSection
        theme={selectedTheme}
        color={'euiColorAccent'}
        colorsForContrast={colorsForContrast}
        minimumContrast={contrastValue}
        showTextVariants={showTextVariants}>
        <p>
          Pulls attention to key indicators like notifications or number of
          selections. Don&apos;t use on elements with interactions.
        </p>
      </ColorSection>

      <EuiSpacer size="xxl" />
      <EuiSpacer size="xxl" />

      <ColorSection
        theme={selectedTheme}
        color={'euiColorDanger'}
        colorsForContrast={colorsForContrast}
        minimumContrast={contrastValue}
        showTextVariants={showTextVariants}>
        <p>
          Use this for negative graphics like errors and{' '}
          <strong>destructive</strong> actions.
        </p>
      </ColorSection>

      <EuiSpacer size="xxl" />
      <EuiSpacer size="xxl" />

      <ColorSection
        theme={selectedTheme}
        color={'euiColorWarning'}
        colorsForContrast={colorsForContrast}
        minimumContrast={contrastValue}
        showTextVariants={showTextVariants}>
        <p>
          Use this for warnings and actions that have a{' '}
          <strong>potential</strong> to be destructive.
        </p>
      </ColorSection>

      <EuiSpacer size="xxl" />
      <EuiSpacer size="xxl" />

      <ColorSection
        theme={selectedTheme}
        color={'euiColorEmptyShade'}
        colorsForContrast={colorsForContrast}
        minimumContrast={contrastValue}
        showTextVariants={showTextVariants}>
        <p>
          Used as the background color of primary page content and panels
          including modals and flyouts. Place your main content on top of this
          color, or a panel-style component, to{' '}
          <strong>ensure proper contrast</strong>.
        </p>
        {selectedThemeIsDark ? (
          <p>
            If you need a color that is full black in both light and dark modes,
            use <EuiCode>euiColorInk</EuiCode>.
          </p>
        ) : (
          <p>
            If you need a color that is full white in both light and dark modes,
            use <EuiCode>euiColorGhost</EuiCode>.
          </p>
        )}
      </ColorSection>

      <EuiSpacer size="xxl" />
      <EuiSpacer size="xxl" />

      <ColorSection
        theme={selectedTheme}
        color={'euiColorLightestShade'}
        colorsForContrast={colorsForContrast}
        minimumContrast={contrastValue}
        showTextVariants={showTextVariants}>
        <p>
          Used to lightly shade areas that contain secondary content or containt
          panel-like components. Proper contrast of text on this color cannot be
          guaranteed.
        </p>
      </ColorSection>

      <EuiSpacer size="xxl" />
      <EuiSpacer size="xxl" />

      <ColorSection
        theme={selectedTheme}
        color={'euiPageBackgroundColor'}
        colorsForContrast={colorsForContrast}
        minimumContrast={contrastValue}
        showTextVariants={showTextVariants}>
        <p>
          The background color for the whole window (body) is a slightly altered
          version of <EuiCode>euiColorLightestShade</EuiCode> that{' '}
          <strong>does</strong> provide proper contrast for the text variant
          colors.
        </p>
      </ColorSection>

      <EuiSpacer size="xxl" />
      <EuiSpacer size="xxl" />

      <EuiText grow={false} className="guideSection__text">
        <h2>Categorical visualization palette</h2>
        <p>
          The following colors are color-blind safe and should be used in
          categorically seried visualizations and graphics. They are meant to be
          contrasted against the value of <EuiCode>euiColorEmptyShade</EuiCode>{' '}
          for the current theme.
        </p>
        <p>
          For more visualization palettes and rendering services, go to the{' '}
          <Link to="/utilities/color-palettes">Color Palettes</Link> utility
          page.
        </p>
        <p>
          When using the palette as a background for text (i.e. badges), use the{' '}
          <EuiCode>_behindText</EuiCode> variant. It is a brightened version of
          the base palette to create better contrast with text.
        </p>
      </EuiText>

      <EuiSpacer />

      <EuiSpacer />

      <EuiFlexGrid columns={2}>
        <EuiFlexItem>
          <VisPalette variant="graphic" />
        </EuiFlexItem>
        <EuiFlexItem>
          <VisPalette variant="behindText" />
        </EuiFlexItem>
      </EuiFlexGrid>
    </GuidePage>
  );
};
