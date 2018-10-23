import React from 'react';
import lightColors from '!!sass-vars-to-js-loader?preserveKeys=true!../../../../src/global_styling/variables/_colors.scss';
import sizes from '!!sass-vars-to-js-loader?preserveKeys=true!../../../../src/global_styling/variables/_size.scss';
import { rgbToHex } from '../../../../src/services';

import {
  Link,
} from 'react-router';

import {
  GuidePage,
  GuideRuleTitle,
} from '../../components';

import {
  EuiText,
  EuiSpacer,
  EuiFlexGroup,
  EuiFlexGrid,
  EuiFlexItem,
  EuiTitle,
  EuiLink,
  EuiCode,
  EuiCallOut,
} from '../../../../src/components';

const euiColors = [
  'euiColorGhost',
  'euiColorEmptyShade',
  'euiColorLightestShade',
  'euiColorLightShade',
  'euiColorMediumShade',
  'euiColorDarkShade',
  'euiColorDarkestShade',
  'euiColorFullShade',
  'euiColorSlightHue',
  'euiColorPrimary',
  'euiColorSecondary',
  'euiColorAccent',
  'euiColorDanger',
  'euiColorWarning',
  'euiColorSuccess',
];

const euiTextColors = [
  'euiTextColor',
  'euiColorDarkShade',
  'euiLinkColor',
];

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

const euiOverFlowShadows = [
  'euiOverflowShadowBottom',
  'euiOverflowShadowTop',
];

function renderPaletteColor(color, index) {
  return (
    <EuiFlexGroup alignItems="center" gutterSize="s" className="guideSass__swatchItem"  key={index}>
      <EuiFlexItem grow={false}>
        <div className="guideSass__swatch" style={{ background: rgbToHex(lightColors[color].rgba).toUpperCase() }} />
      </EuiFlexItem>
      <EuiFlexItem grow={false}>
        <EuiCode>${color}</EuiCode>
      </EuiFlexItem>
    </EuiFlexGroup>
  );
}

function renderSize(size, index) {
  return (
    <EuiFlexGroup alignItems="center" gutterSize="s" key={index}>
      <EuiFlexItem grow={false} className="guideSass__sizeItem">
        <div className="guideSass__size" style={{ width: sizes[size], height: sizes[size] }} />
      </EuiFlexItem>
      <EuiFlexItem grow={false}>
        <EuiCode>${size}</EuiCode>
      </EuiFlexItem>
      <EuiFlexItem>
        <EuiText size="s">
          {sizes[size]}px
        </EuiText>
      </EuiFlexItem>
    </EuiFlexGroup>
  );
}

function renderFontSize(size, index) {
  return (
    <div key={index} className="guideSass__fontSizeExample">
      <div className={`guideSass__fontSize guideSass__fontSize--${size}`}>
        The quick brown fox
      </div>
      <EuiCode>${size}</EuiCode>
    </div>
  );
}

function renderShadow(shadow, index) {
  return (
    <div key={index} className={`guideSass__shadow guideSass__shadow--${shadow}`}>
      <EuiCode language="scss">@include {shadow};</EuiCode>
    </div>
  );
}

console.log(lightColors);

export default() => (

  <GuidePage title="Sass guidelines">

    <EuiSpacer size="xl" />

    <EuiText grow={false} className="guideSection__text">
      <h2>Core rules</h2>
      <p>
        EUI&apos;s CSS is built with a Sass layer that is themable and comes with a slew
        of global variables, functions and mixins to help extend the core functionality.
        In general, when writing new SCSS in a project that installs EUI as a dependency
        try to follow these best practices:
      </p>
      <ul>
        <li>Write SCSS following BEM syntax with proper prefixing</li>
        <li>Utilize color variables and functions rather than hard-coded values</li>
        <li>Utilize the sizing variables for padding and margins</li>
        <li>Utilize the animation variables for animations when possible</li>
        <li>Utilize the responsive mixins for all screen width calculations</li>
        <li>Utilize the typography mixins and variables for all font family, weight and sizing</li>
        <li>Utilize the shadow mixins and z-index variables to manage depth</li>
        <li>Minimize your overwrites and try to make new Sass additive in nature</li>
      </ul>
    </EuiText>

    <EuiSpacer />

    <EuiFlexGrid columns={2}>
      <EuiFlexItem>

        <EuiTitle>
          <h4>Sizing</h4>
        </EuiTitle>

        <EuiSpacer />

        {euiSizes.map(function (size, index) {
          return renderSize(size, index);
        })}


      </EuiFlexItem>
      <EuiFlexItem>
        <EuiTitle>
          <h4>Color</h4>
        </EuiTitle>

        <EuiSpacer />

        {euiColors.map(function (color, index) {
          return renderPaletteColor(color, index);
        })}

      </EuiFlexItem>
    </EuiFlexGrid>

    <EuiSpacer size="xxl"/>

    <GuideRuleTitle>Typography</GuideRuleTitle>

    <EuiText grow={false} className="guideSection__text">
      <p>
        For most of your components we recommend using <Link to="">EuiText</Link> or
        {' '}<Link to="">EuiTitle</Link> instead of these Sass varaibles.
      </p>
    </EuiText>

    <EuiSpacer />
    <EuiCallOut
      size="s"
      color="warning"
      title={
        <span>
          It is more common to use these in a mixin (e.g. <EuiCode language="sass">@include $euiFontSize;</EuiCode>)
          to automatically apply line-height as well as size.
        </span>
      }
    />

    <EuiSpacer />
    <EuiFlexGrid columns={2}>
      <EuiFlexItem>
        {euiFontSizes.map(function (size, index) {
          return renderFontSize(size, index);
        })}
      </EuiFlexItem>
      <EuiFlexItem>
        <div>
          {euiTextColors.map(function (color, index) {
            return renderPaletteColor(color, index);
          })}
        </div>
      </EuiFlexItem>
    </EuiFlexGrid>

    <EuiSpacer size="xxl"/>

    <GuideRuleTitle>Shadow and Depth</GuideRuleTitle>

    <EuiFlexGrid columns={2}>
      <EuiFlexItem>

        <EuiTitle size="s">
          <h4>Use mixins for shadows</h4>
        </EuiTitle>

        <EuiText>
          <p>
            <EuiLink href="https://github.com/elastic/eui/blob/master/src/global_styling/mixins/_shadow.scss">View the Sass code for shadow mixins</EuiLink>.
          </p>
        </EuiText>

        <EuiSpacer />

        {euiShadows.map(function (shadow, index) {
          return renderShadow(shadow, index);
        })}
      </EuiFlexItem>
      <EuiFlexItem>

        <EuiTitle size="s">
          <h4>Shadows to hide overflowing content</h4>
        </EuiTitle>

        <EuiText>
          <p>
            Primarily used in modals and flyouts, the overflow shadows add a white
            glow to subltley hide the content they float above.
          </p>
        </EuiText>

        <EuiSpacer />

        <div className="guideSass__overflowShadows">
          {euiOverFlowShadows.map(function (shadow, index) {
            return renderShadow(shadow, index);
          })}
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
          <EuiCode language="scss">@include euiBottomShadowLarge(desaturate($euiColorPrimary, 30%));</EuiCode>
        </div>
      </EuiFlexItem>
    </EuiFlexGrid>


  </GuidePage>
);
