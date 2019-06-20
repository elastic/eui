import React from 'react';
import lightColors from '!!sass-vars-to-js-loader?preserveKeys=true!../../../../src/global_styling/variables/_colors.scss';
import darkColors from '!!sass-vars-to-js-loader!../../../../src/themes/eui/eui_colors_dark.scss';
import sizes from '!!sass-vars-to-js-loader?preserveKeys=true!../../../../src/global_styling/variables/_size.scss';
import zindexs from '!!sass-vars-to-js-loader?preserveKeys=true!../../../../src/global_styling/variables/_z_index.scss';
import animations from '!!sass-vars-to-js-loader?preserveKeys=true!../../../../src/global_styling/variables/_animations.scss';
import breakpoints from '!!sass-vars-to-js-loader?preserveKeys=true!../../../../src/global_styling/variables/_responsive.scss';
import { rgbToHex } from '../../../../src/services';

import { Link } from 'react-router';

import { GuidePage, GuideRuleTitle } from '../../components';

import {
  EuiText,
  EuiSpacer,
  EuiFlexGroup,
  EuiFlexGrid,
  EuiFlexItem,
  EuiTitle,
  EuiLink,
  EuiCode,
  EuiCodeBlock,
  EuiCallOut,
} from '../../../../src/components';

const euiColors = [
  'euiColorEmptyShade',
  'euiColorLightestShade',
  'euiColorLightShade',
  'euiColorMediumShade',
  'euiColorDarkShade',
  'euiColorDarkestShade',
  'euiColorFullShade',
  'euiColorPrimary',
  'euiColorSecondary',
  'euiColorAccent',
  'euiColorDanger',
  'euiColorWarning',
  'euiColorSuccess',
  'euiColorGhost',
  'euiColorInk',
];

const euiTextColors = ['euiTextColor', 'euiColorDarkShade', 'euiLinkColor'];

const euiSizes = [
  'euiSizeXS',
  'euiSizeS',
  'euiSizeM',
  'euiSize',
  'euiSizeL',
  'euiSizeXL',
  'euiSizeXXL',
];

const euiFontSizes = [
  'euiFontSizeXS',
  'euiFontSizeS',
  'euiFontSizeM',
  'euiFontSize',
  'euiFontSizeL',
  'euiFontSizeXL',
];

const euiShadows = [
  'euiSlightShadow',
  'euiBottomShadowSmall',
  'euiBottomShadowMedium',
  'euiBottomShadowFlat',
  'euiBottomShadow',
  'euiBottomShadowLarge',
];

const euiBorders = ['euiBorderThin', 'euiBorderThick', 'euiBorderEditable'];

const euiLevels = [
  'euiZToastList',
  'euiZComboBox',
  'euiZModal',
  'euiZMask',
  'euiZNavigation',
  'euiZContentMenu',
  'euiZHeader',
  'euiZContent',
];

const euiAnimationSpeeds = [
  'euiAnimSpeedExtraFast',
  'euiAnimSpeedFast',
  'euiAnimSpeedNormal',
  'euiAnimSpeedSlow',
  'euiAnimSpeedExtraSlow',
];

const euiAnimationTimings = ['euiAnimSlightBounce', 'euiAnimSlightResistance'];

const euiBreakPoints = Object.getOwnPropertyNames(breakpoints.euiBreakpoints);

function renderPaletteColor(palette, color) {
  let optionalDefault;
  if (color === 'euiTextColor') {
    optionalDefault = (
      <EuiFlexItem grow={false}>
        <strong>default</strong>
      </EuiFlexItem>
    );
  }

  return (
    <EuiFlexGroup
      responsive={false}
      alignItems="center"
      gutterSize="s"
      className="guideSass__swatchItem"
      key={color}>
      <EuiFlexItem grow={false}>
        <div
          className="guideSass__swatch"
          style={{ background: rgbToHex(palette[color].rgba).toUpperCase() }}
        />
      </EuiFlexItem>
      <EuiFlexItem grow={false}>
        <EuiCode>${color}</EuiCode>
      </EuiFlexItem>
      {optionalDefault}
    </EuiFlexGroup>
  );
}

function renderSize(size) {
  return (
    <EuiFlexGroup
      responsive={false}
      alignItems="center"
      gutterSize="s"
      key={size}
      className="guideSass__sizeRow">
      <EuiFlexItem grow={false} className="guideSass__sizeItem">
        <div
          className="guideSass__size"
          style={{ width: sizes[size], height: sizes[size] }}
        />
      </EuiFlexItem>
      <EuiFlexItem grow={false} style={{ minWidth: 184 }}>
        <div>
          <EuiCode>${size}</EuiCode>
        </div>
      </EuiFlexItem>
      <EuiFlexItem>
        <EuiText size="s">{sizes[size]}px</EuiText>
      </EuiFlexItem>
    </EuiFlexGroup>
  );
}

function renderFontSize(size) {
  return (
    <div key={size} className="guideSass__fontSizeExample">
      <div className={`guideSass__fontSize guideSass__fontSize--${size}`}>
        The quick brown fox
      </div>
      <EuiCode>${size}</EuiCode>
    </div>
  );
}

function renderLevel(level, index) {
  return (
    <EuiFlexGroup
      responsive={false}
      alignItems="center"
      gutterSize="s"
      key={level}
      className="guideSass__levelRow">
      <EuiFlexItem grow={false}>
        <div
          className="guideSass__level"
          style={{ opacity: 1 - index * 0.1 }}
        />
      </EuiFlexItem>
      <EuiFlexItem grow={false} style={{ minWidth: 200, paddingLeft: 16 }}>
        <div>
          <EuiCode>${level}</EuiCode>
        </div>
      </EuiFlexItem>
      <EuiFlexItem>
        <EuiText size="s">{zindexs[level]}</EuiText>
      </EuiFlexItem>
    </EuiFlexGroup>
  );
}

function renderShadow(shadow) {
  return (
    <div
      key={shadow}
      className={`guideSass__shadow guideSass__shadow--${shadow}`}>
      <EuiCodeBlock language="scss" paddingSize="none" transparentBackground>
        @include {shadow};
      </EuiCodeBlock>
    </div>
  );
}

function renderBorder(border) {
  return (
    <EuiFlexItem
      key={border}
      className={`guideSass__border guideSass__border--${border}`}>
      <EuiCodeBlock language="scss" paddingSize="none" transparentBackground>
        border: ${border}
      </EuiCodeBlock>
    </EuiFlexItem>
  );
}

function renderAnimationSpeed(speed) {
  return (
    <div
      key={speed}
      className={`guideSass__animRow guideSass__animRow--${speed}`}>
      <EuiFlexGroup alignItems="center" gutterSize="s">
        <EuiFlexItem grow={false}>
          {animations[speed]}ms
          <EuiSpacer size="s" />
          <EuiCodeBlock
            transparentBackground
            paddingSize="none"
            language="scss">
            animation-duration: ${speed}
          </EuiCodeBlock>
          <EuiSpacer size="s" />
        </EuiFlexItem>
      </EuiFlexGroup>
      <div className={'guideSass__animParent'}>
        <div className="guideSass__animChild" />
      </div>
    </div>
  );
}

function renderAnimationTiming(speed) {
  return (
    <div
      key={speed}
      className={`guideSass__animRow guideSass__animRow--${speed}`}>
      <EuiFlexGroup alignItems="center" gutterSize="s">
        <EuiFlexItem grow={false}>
          {animations[speed]}
          <EuiSpacer size="s" />
          <EuiCodeBlock
            transparentBackground
            paddingSize="none"
            language="scss">
            animation-timing-function: ${speed}
          </EuiCodeBlock>
          <EuiSpacer size="s" />
        </EuiFlexItem>
      </EuiFlexGroup>
      <div className={'guideSass__animParent'}>
        <div className="guideSass__animChild" />
      </div>
    </div>
  );
}

function renderBreakpoint(size) {
  return (
    <EuiFlexGroup
      responsive={false}
      alignItems="center"
      gutterSize="s"
      key={size}>
      <EuiFlexItem grow={false}>
        <EuiText size="s" className="eui-textRight" style={{ minWidth: 50 }}>
          <EuiCode>{size}</EuiCode>
        </EuiText>
      </EuiFlexItem>
      <EuiFlexItem>
        <EuiText size="s">{breakpoints.euiBreakpoints[size]}px</EuiText>
      </EuiFlexItem>
    </EuiFlexGroup>
  );
}

const bemExample = `// Use camelCase naming
.euiButton {
  // Put mixins first before properties
  @include euiButton;
  @include euiSlightShadow;

  border-radius: $euiBorderRadius;


  // Elements exist within the component
  .euiButton__content {
    padding: 0 ($euiSize - $euiSizeXS);
  }

  // Modifiers augment existing components or elements
  &.euiButton--primary {
    background-color: $euiColorPrimary;
  }

  // States are written with a verb prefix
  &.euiButton-isLoading {
    opacity: .5;
  }
}

// Put breakpoints at the bottom of the document
@include euiBreakpoint("xs", "s") {
  .euiButton {
    width: 100%;
  }
}
`;

const borderRadiusExample = `border: $euiBorderThin;
border-radius: $euiBorderRadius;
`;

const importKibanaExample = `// In Kibana you can add this to the top of your Sass file
@import 'ui/public/styles/styling_constants';
`;

const importOutsideExample = `// In an outside project, import the core variables like so
@import '@elastic/eui/src/global_styling/functions/index';
@import '@elastic/eui/src/global_styling/variables/index';
@import '@elastic/eui/src/global_styling/mixins/index';
`;

const tintOrShadeExample = `// tintOrShade(color, tint_percent, shade_percent)
// will tint the color by % in light themes
// and shade the color by % in dark themes
.themedBox {
  background-color: tintOrShade($euiColorPrimary, 90%, 70%);
  border-left: $euiBorderThick;
  border-color: $euiColorPrimary;
  padding: $euiSize;
  color: $euiTextColor;
}
`;

const contrastExample = `// Make sure text passes a contrast check
.contrastBox {
  $backgroundColor: tintOrShade($euiColorWarning, 90%, 70%);
  background: $backgroundColor;

  // Given two colors, adjust the first until contrast is 4.5
  color: makeHighContrastColor($euiColorWarning, $backgroundColor);
  padding: $euiSize;
  border-left: $euiBorderThick;
  border-color: $euiColorWarning;
}
`;

export const SassGuidelines = ({ selectedTheme }) => {
  const palette = selectedTheme === 'light' ? lightColors : darkColors;

  return (
    <GuidePage title="Sass guidelines">
      <EuiTitle>
        <h2>Core variables</h2>
      </EuiTitle>

      <EuiSpacer size="xxl" />

      <EuiFlexGrid columns={2}>
        <EuiFlexItem>
          <div>
            <EuiTitle size="s">
              <h4>Sizing</h4>
            </EuiTitle>

            <EuiSpacer />

            {euiSizes.map(function(size, index) {
              return renderSize(size, index);
            })}

            <EuiSpacer />

            <EuiTitle size="s">
              <h4>Z-index</h4>
            </EuiTitle>

            <EuiSpacer />

            {euiLevels.map(function(level, index) {
              return renderLevel(level, index);
            })}
          </div>
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiTitle size="s">
            <h4>Color</h4>
          </EuiTitle>

          <EuiSpacer />

          {euiColors.map(function(color, index) {
            return renderPaletteColor(palette, color, index);
          })}
        </EuiFlexItem>
      </EuiFlexGrid>

      <EuiSpacer size="xxl" />

      <GuideRuleTitle>Going beyond the provided colors</GuideRuleTitle>

      <EuiSpacer size="xxl" />

      <EuiFlexGrid columns={2}>
        <EuiFlexItem>
          <EuiTitle size="s">
            <h4>Theming patterns</h4>
          </EuiTitle>

          <EuiSpacer />
          <EuiText>
            <p>
              Often you need to go beyond the provided color set. When doing so{' '}
              <strong>always</strong> use color functions to modify the base
              set. Here are some examples.
            </p>
          </EuiText>
          <EuiSpacer />

          <EuiFlexGroup alignItems="center" responsive={false} gutterSize="s">
            <EuiFlexItem grow={false}>
              <div className="guideSass__swatch guideSass__swatch--danger" />
            </EuiFlexItem>
            <EuiFlexItem grow={false}>
              <EuiCode>$euiCodeDanger</EuiCode>
            </EuiFlexItem>
          </EuiFlexGroup>
          <EuiSpacer />
          <EuiFlexGroup alignItems="center" responsive={false} gutterSize="s">
            <EuiFlexItem grow={false}>
              <div className="guideSass__swatch guideSass__swatch--dangerTint" />
            </EuiFlexItem>
            <EuiFlexItem grow={false}>
              <EuiCode>tint($euiCodeDanger, 30%)</EuiCode>
            </EuiFlexItem>
          </EuiFlexGroup>
          <EuiSpacer />
          <EuiFlexGroup alignItems="center" responsive={false} gutterSize="s">
            <EuiFlexItem grow={false}>
              <div className="guideSass__swatch guideSass__swatch--dangerShade" />
            </EuiFlexItem>
            <EuiFlexItem grow={false}>
              <EuiCode>shade($euiCodeDanger, 30%)</EuiCode>
            </EuiFlexItem>
          </EuiFlexGroup>

          <EuiSpacer />
          <EuiText>
            <p>
              Remember that EUI provides dark and light mode theming support.
              Sometimes the traditional color functions don&apos;t give enough
              flexibility for both modes.
            </p>
            <p>
              For example, depending upon what theme you use{' '}
              <EuiCode>$EuiColorPrimary</EuiCode> will be a different hex value.
            </p>
          </EuiText>
          <EuiSpacer />

          <EuiFlexGroup alignItems="center" responsive={false} gutterSize="s">
            <EuiFlexItem
              grow={false}
              style={{ background: '#FFF', padding: 8 }}>
              <div className="guideSass__swatch guideSass__swatch--primaryLight" />
            </EuiFlexItem>
            <EuiFlexItem grow={false}>
              <EuiCode>$euiColorPrimary</EuiCode>
            </EuiFlexItem>
            <EuiFlexItem grow={false}>
              <EuiText size="s">
                <p>is #0079A5 in the light theme</p>
              </EuiText>
            </EuiFlexItem>
          </EuiFlexGroup>
          <EuiSpacer />
          <EuiFlexGroup alignItems="center" responsive={false} gutterSize="s">
            <EuiFlexItem
              grow={false}
              style={{ background: '#222', padding: 8 }}>
              <div className="guideSass__swatch guideSass__swatch--primaryDark" />
            </EuiFlexItem>
            <EuiFlexItem grow={false}>
              <EuiCode>$euiColorPrimary</EuiCode>
            </EuiFlexItem>
            <EuiFlexItem grow={false}>
              <EuiText size="s">
                <p>is #4da1c0 in the dark theme</p>
              </EuiText>
            </EuiFlexItem>
          </EuiFlexGroup>

          <EuiSpacer />
          <EuiText>
            <p>
              Taking the default primary color above we want to tint the color
              in the light mode, but shade it in the dark mode. This makes the
              background color more subtle in both use cases.
            </p>
          </EuiText>

          <EuiSpacer />

          <EuiCodeBlock
            language="scss"
            transparentBackground
            paddingSize="none">
            {tintOrShadeExample}
          </EuiCodeBlock>

          <EuiSpacer />

          <EuiFlexGrid columns={2}>
            <EuiFlexItem style={{ background: '#FFF', padding: 16 }}>
              <div className="guideSass__themedBox guideSass__themedBox--light">
                Light theme
              </div>
            </EuiFlexItem>
            <EuiFlexItem style={{ background: '#222', padding: 16 }}>
              <div className="guideSass__themedBox guideSass__themedBox--dark">
                Dark theme
              </div>
            </EuiFlexItem>
          </EuiFlexGrid>
        </EuiFlexItem>

        <EuiFlexItem>
          <EuiTitle size="s">
            <h4>Color contrast patterns</h4>
          </EuiTitle>

          <EuiSpacer />

          <EuiText>
            <p>
              EUI provides some nifty color functions for auto-adjusting color
              to pass AA contrast checks. Often this is needed when using the
              base colors on top of each other. Here is an example similar to
              our callouts with a pesky orange.
            </p>
          </EuiText>

          <EuiSpacer />

          <EuiCodeBlock
            language="scss"
            transparentBackground
            paddingSize="none">
            {contrastExample}
          </EuiCodeBlock>

          <EuiSpacer />

          <div className="guideSass__contrastExample">
            This orange text now passes a contrast check!
          </div>

          <EuiSpacer />

          <EuiTitle size="s">
            <h4>More on color contrast</h4>
          </EuiTitle>

          <EuiSpacer />

          <EuiText>
            <p>
              Consult the larger{' '}
              <Link to="/guidelines/colors">color guidelines</Link> page for a
              better explanation about passing color contrast.
            </p>
          </EuiText>

          <EuiSpacer />
        </EuiFlexItem>
      </EuiFlexGrid>

      <GuideRuleTitle>Typography</GuideRuleTitle>

      <EuiText grow={false} className="guideSection__text">
        <p>
          View the{' '}
          <EuiLink href="https://github.com/elastic/eui/blob/master/src/global_styling/variables/_typography.scss">
            variable
          </EuiLink>{' '}
          and{' '}
          <EuiLink href="https://github.com/elastic/eui/blob/master/src/global_styling/mixins/_typography.scss">
            mixins
          </EuiLink>{' '}
          Sass code for typography. For most of your components we recommend
          using <Link to="/display/text">EuiText</Link> or{' '}
          <Link to="/display/title">EuiTitle</Link> instead of these Sass
          variables.
        </p>
      </EuiText>

      <EuiSpacer />
      <EuiCallOut
        size="s"
        color="warning"
        title={
          <span>
            It is more common to use these as a mixin (e.g.{' '}
            <EuiCode language="css">@include euiFontSizeS;</EuiCode>) to
            automatically apply line-height as well as size.
          </span>
        }
      />

      <EuiSpacer />
      <EuiFlexGrid columns={2}>
        <EuiFlexItem>
          <EuiTitle size="s">
            <h4>Text sizes</h4>
          </EuiTitle>

          <EuiSpacer />
          {euiFontSizes.map(function(size, index) {
            return renderFontSize(size, index);
          })}
        </EuiFlexItem>
        <EuiFlexItem>
          <div>
            <EuiTitle size="s">
              <h4>Text colors</h4>
            </EuiTitle>

            <EuiSpacer />

            {euiTextColors.map(function(color, index) {
              return renderPaletteColor(palette, color, index);
            })}

            <EuiSpacer />

            <EuiTitle>
              <h4>Font families</h4>
            </EuiTitle>

            <EuiSpacer />

            <EuiFlexGroup responsive={false} alignItems="center">
              <EuiFlexItem grow={false} className="guideSass__fontFamily">
                Abc
              </EuiFlexItem>
              <EuiFlexItem grow={false}>
                <EuiCode language="css">@include euiFont;</EuiCode>
              </EuiFlexItem>
            </EuiFlexGroup>

            <EuiFlexGroup responsive={false} alignItems="center">
              <EuiFlexItem
                grow={false}
                className="guideSass__fontFamily guideSass__fontFamily--code">
                Abc
              </EuiFlexItem>
              <EuiFlexItem grow={false}>
                <EuiCode language="css">@include euiCodeFont;</EuiCode>
              </EuiFlexItem>
            </EuiFlexGroup>
          </div>
        </EuiFlexItem>
      </EuiFlexGrid>

      <EuiSpacer size="xxl" />

      <GuideRuleTitle>Borders</GuideRuleTitle>

      <EuiSpacer size="xxl" />

      <EuiText grow={false}>
        <p>
          EUI provides some helper variables for setting common border types.
        </p>
      </EuiText>

      <EuiSpacer />

      <EuiFlexGrid columns={3}>
        {euiBorders.map(function(border, index) {
          return renderBorder(border, index);
        })}
      </EuiFlexGrid>

      <EuiSpacer />

      <EuiText grow={false}>
        <p>
          In addition, you can utilize <EuiCode>$euiBorderRadius</EuiCode> to
          round the corners.
        </p>
      </EuiText>

      <EuiSpacer />

      <EuiFlexGrid columns={3}>
        <EuiFlexItem className="guideSass__border guideSass__border--radius">
          <EuiCodeBlock
            language="scss"
            transparentBackground
            paddingSize="none">
            {borderRadiusExample}
          </EuiCodeBlock>
        </EuiFlexItem>
      </EuiFlexGrid>

      <GuideRuleTitle>Shadow and Depth</GuideRuleTitle>

      <EuiFlexGrid columns={2}>
        <EuiFlexItem>
          <EuiTitle size="s">
            <h4>Use mixins for shadows</h4>
          </EuiTitle>

          <EuiText>
            <p>
              <EuiLink href="https://github.com/elastic/eui/blob/master/src/global_styling/mixins/_shadow.scss">
                View the Sass code for shadow mixins
              </EuiLink>
              .
            </p>
          </EuiText>

          <EuiSpacer />

          {euiShadows.map(function(shadow, index) {
            return renderShadow(shadow, index);
          })}
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiTitle size="s">
            <h4>Shadows to create graceful overflows</h4>
          </EuiTitle>

          <EuiText>
            <p>
              Primarily used in modals and flyouts, the overflow shadows add a
              white glow to subtly indicate there is more content below/above.
            </p>
          </EuiText>

          <EuiSpacer />

          <div className="guideSass__overflowShadows">
            <EuiText className="guideSass__overflowShadowText" size="s">
              <p>
                It requires a wrapper with <EuiCode>overflow: hidden</EuiCode>{' '}
                and the content to have{' '}
                <EuiCode>overflow-y: auto; height: 100%;</EuiCode>.
              </p>
              <p>
                <b>Example:</b>
              </p>
              <EuiCodeBlock language="sass" isCopyable paddingSize="s">
                {`.bodyContent {
  @include euiOverflowShadow;
  height: 200px;
  overflow: hidden;

  .bodyContent__overflow {
    height: 100%;
    overflow-y: auto;
  }
}`}
              </EuiCodeBlock>
              <p>
                Consequuntur atque nulla atque nemo tenetur numquam. Assumenda
                aspernatur qui aut sit. Aliquam doloribus iure sint id. Possimus
                dolor qui soluta cum id tempore ea illum. Facilis voluptatem aut
                aut ut similique ut. Sed repellendus commodi iure officiis
                exercitationem praesentium dolor. Ratione non ut nulla accusamus
                et. Optio laboriosam id incidunt. Ipsam voluptate ab quia
                necessitatibus sequi earum voluptate. Porro tempore et veritatis
                quo omnis. Eaque ut libero tempore sit placeat maxime
                laudantium. Mollitia tempore minus qui autem modi adipisci ad.
                Iste reprehenderit accusamus voluptatem velit. Quidem delectus
                eos veritatis et vitae et nisi. Doloribus ut corrupti voluptates
                qui exercitationem dolores.
              </p>
            </EuiText>
          </div>

          <EuiSpacer />

          <EuiTitle size="s">
            <h4>Adding color to shadows</h4>
          </EuiTitle>

          <EuiText>
            <p>Most shadow mixins can also accept color.</p>
          </EuiText>

          <EuiSpacer />

          <div className="guideSass__shadow guideSass__shadow--color eui-textBreakAll">
            <EuiCodeBlock
              language="scss"
              paddingSize="none"
              transparentBackground>
              @include euiBottomShadowLarge(desaturate($euiColorPrimary, 30%));
            </EuiCodeBlock>
          </div>
        </EuiFlexItem>
      </EuiFlexGrid>

      <EuiSpacer size="xxl" />

      <GuideRuleTitle>Media queries and breakpoints</GuideRuleTitle>

      <EuiText className="guideSection__text">
        <p>
          <EuiLink href="https://github.com/elastic/eui/blob/master/src/global_styling/mixins/_responsive.scss">
            View the Sass code for media queries
          </EuiLink>
          .
        </p>
        <p>
          Breakpoints in EUI are provided through the use of a Sass mixin{' '}
          <EuiCode>@include euiBreakpoint()</EuiCode> that accepts an array of
          sizes.
        </p>
      </EuiText>

      <EuiSpacer />
      <div className="guideSass__breakpointExample" />
      <EuiSpacer />

      <EuiFlexGrid columns={2}>
        <EuiFlexItem>
          <div>
            <EuiTitle size="s">
              <h4>Breakpoint sizing</h4>
            </EuiTitle>

            <EuiSpacer />

            {euiBreakPoints.map(function(size, index) {
              return renderBreakpoint(size, index);
            })}
          </div>
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiTitle size="s">
            <h4>Mixin usage</h4>
          </EuiTitle>

          <EuiSpacer />

          <EuiText>
            <p>Target mobile devices only</p>
          </EuiText>
          <EuiCodeBlock language="scss" transparentBackground paddingSize="s">
            {"@include euiBreakpoint('xs','s') {...}"}
          </EuiCodeBlock>

          <EuiSpacer />

          <EuiText>
            <p>Target mobile and tablets</p>
          </EuiText>
          <EuiCodeBlock language="scss" transparentBackground paddingSize="s">
            {"@include euiBreakpoint('xs', 's', 'm') {...}"}
          </EuiCodeBlock>

          <EuiSpacer />

          <EuiText>
            <p>Target tablets only</p>
          </EuiText>
          <EuiCodeBlock language="scss" transparentBackground paddingSize="s">
            {"@include euiBreakpoint('m') {...}"}
          </EuiCodeBlock>

          <EuiSpacer />

          <EuiText>
            <p>Target very wide displays only</p>
          </EuiText>
          <EuiCodeBlock language="scss" transparentBackground paddingSize="s">
            {"@include euiBreakpoint('xl') {...}"}
          </EuiCodeBlock>

          <EuiSpacer />
        </EuiFlexItem>
      </EuiFlexGrid>

      <EuiSpacer size="xxl" />

      <GuideRuleTitle>Animation</GuideRuleTitle>
      <EuiText grow={false} className="guideSection__text">
        <p>
          <EuiLink href="https://github.com/elastic/eui/blob/master/src/global_styling/variables/_animation.scss">
            View the Sass code for animation
          </EuiLink>
          .
        </p>
        <p>
          EUI utilizes the following constants to maintain a similar
          &apos;bounce&apos; to its animations. That said, animations are
          tricky, and if they aren&apos;t working for your specific application
          this is the one place where we think it&apos;s OK to come up with your
          own rules.
        </p>
      </EuiText>
      <EuiSpacer />
      <EuiFlexGrid columns={2}>
        <EuiFlexItem>
          <EuiTitle size="s">
            <h4>Speed</h4>
          </EuiTitle>

          <EuiSpacer />

          {euiAnimationSpeeds.map(function(speed, index) {
            return renderAnimationSpeed(speed, index);
          })}
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiTitle size="s">
            <h4>Timing</h4>
          </EuiTitle>

          <EuiSpacer />

          {euiAnimationTimings.map(function(speed, index) {
            return renderAnimationTiming(speed, index);
          })}
        </EuiFlexItem>
      </EuiFlexGrid>

      <EuiSpacer size="xl" />

      <GuideRuleTitle>Sass best practices</GuideRuleTitle>

      <EuiSpacer size="xl" />

      <EuiFlexGrid columns={2}>
        <EuiFlexItem>
          <EuiText>
            <h3>Component based naming</h3>
            <p>
              EUI is written in a{' '}
              <EuiLink href="http://getbem.com/introduction/">BEM</EuiLink>ish
              style with the addition of verb states (ex:{' '}
              <EuiCode>*-isLoading</EuiCode>). Below is an example of proper
              formatting.
            </p>
          </EuiText>
          <EuiSpacer />
          <EuiCodeBlock
            language="scss"
            transparentBackground
            paddingSize="none">
            {bemExample}
          </EuiCodeBlock>
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiText grow={false} className="guideSection__text">
            <h3>Writing Sass the EUI way</h3>
            <p>
              In general, when writing new SCSS in a project that installs EUI
              as a dependency try to follow these best practices:
            </p>
          </EuiText>
          <EuiSpacer />
          <EuiText size="s" grow={false} className="guideSection__text">
            <ul>
              <li>
                Utilize color variables and functions rather than hard-coded
                values
              </li>
              <li>Utilize the sizing variables for padding and margins</li>
              <li>
                Utilize the animation variables for animations when possible
              </li>
              <li>
                Utilize the responsive mixins for all screen width calculations
              </li>
              <li>
                Utilize the typography mixins and variables for all font family,
                weight, and sizing
              </li>
              <li>
                Utilize the shadow mixins and z-index variables to manage depth
              </li>
              <li>
                Utilize the border and border-radius variable to handle border
                usage
              </li>
              <li>
                Minimize your overwrites and try to make new Sass additive in
                nature
              </li>
            </ul>
          </EuiText>

          <EuiSpacer />

          <EuiTitle size="s">
            <h3>Importing EUI global Sass</h3>
          </EuiTitle>

          <EuiSpacer />

          <EuiText grow={false} className="guideSection__text">
            <p>
              Most EUI based projects should already import the EUI global
              scope. For example, Kibana has its own liner that will give you
              everything on this page.
            </p>
          </EuiText>
          <EuiSpacer />
          <EuiCodeBlock
            language="scss"
            transparentBackground
            paddingSize="none">
            {importKibanaExample}
          </EuiCodeBlock>
          <EuiSpacer />
          <EuiText grow={false} className="guideSection__text">
            <p>
              If you want to construct your own import, you would just need to
              import the following core files into a fresh Sass project.
            </p>
          </EuiText>

          <EuiSpacer />

          <EuiCodeBlock
            language="scss"
            transparentBackground
            paddingSize="none">
            {importOutsideExample}
          </EuiCodeBlock>
        </EuiFlexItem>
      </EuiFlexGrid>
    </GuidePage>
  );
};
