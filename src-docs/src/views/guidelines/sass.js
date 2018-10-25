import React from 'react';
import lightColors from '!!sass-vars-to-js-loader?preserveKeys=true!../../../../src/global_styling/variables/_colors.scss';
import sizes from '!!sass-vars-to-js-loader?preserveKeys=true!../../../../src/global_styling/variables/_size.scss';
import zindexs from '!!sass-vars-to-js-loader?preserveKeys=true!../../../../src/global_styling/variables/_z_index.scss';
import animations from '!!sass-vars-to-js-loader?preserveKeys=true!../../../../src/global_styling/variables/_animations.scss';
import breakpoints from '!!sass-vars-to-js-loader?preserveKeys=true!../../../../src/global_styling/variables/_responsive.scss';
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
  EuiCodeBlock,
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

const euiBorders = [
  'euiBorderThin',
  'euiBorderThick',
  'euiBorderEditable',
];

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

const euiAnimationTimings = [
  'euiAnimSlightBounce',
  'euiAnimSlightResistance',
];

const euiOverFlowShadows = [
  'euiOverflowShadowBottom',
  'euiOverflowShadowTop',
];

const euiBreakPoints = Object.getOwnPropertyNames(breakpoints.euiBreakpoints);

function renderPaletteColor(color, index) {
  return (
    <EuiFlexGroup responsive={false} alignItems="center" gutterSize="s" className="guideSass__swatchItem"  key={index}>
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
    <EuiFlexGroup responsive={false} alignItems="center" gutterSize="s" key={index} className="guideSass__sizeRow">
      <EuiFlexItem grow={false} className="guideSass__sizeItem">
        <div className="guideSass__size" style={{ width: sizes[size], height: sizes[size] }} />
      </EuiFlexItem>
      <EuiFlexItem grow={false} style={{ width: 184 }}>
        <div>
          <EuiCode>${size}</EuiCode>
        </div>
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

function renderLevel(level, index) {
  return (
    <EuiFlexGroup responsive={false} alignItems="center" gutterSize="s" key={index}  className="guideSass__levelRow">
      <EuiFlexItem grow={false}>
        <div className="guideSass__level" style={{ opacity: (1 - (index * .1)) }} />
      </EuiFlexItem>
      <EuiFlexItem grow={false} style={{ width: 200, paddingLeft: 16 }}>
        <div>
          <EuiCode>${level}</EuiCode>
        </div>
      </EuiFlexItem>
      <EuiFlexItem>
        <EuiText size="s">
          {zindexs[level]}
        </EuiText>
      </EuiFlexItem>
    </EuiFlexGroup>
  );
}

function renderShadow(shadow, index) {
  return (
    <div key={index} className={`guideSass__shadow guideSass__shadow--${shadow}`}>
      <EuiCodeBlock language="scss" paddingSize="none" transparentBackground>@include {shadow};</EuiCodeBlock>
    </div>
  );
}

function renderBorder(border, index) {
  return (
    <EuiFlexItem key={index} className={`guideSass__border guideSass__border--${border}`}>
      <EuiCodeBlock language="scss" paddingSize="none" transparentBackground>border: ${border}</EuiCodeBlock>
    </EuiFlexItem>
  );
}

function renderAnimationSpeed(speed, index) {
  return (
    <div key={index} className={`guideSass__animRow guideSass__animRow--${speed}`}>
      <EuiFlexGroup alignItems="center" gutterSize="s" key={index}>
        <EuiFlexItem grow={false}>
          {animations[speed]}ms
          <EuiSpacer size="s" />
          <EuiCodeBlock transparentBackground paddingSize="none" language="scss">animation-duration: ${speed}</EuiCodeBlock>
          <EuiSpacer size="s" />
        </EuiFlexItem>
      </EuiFlexGroup>
      <div key={index} className={`guideSass__animParent`}>
        <div className="guideSass__animChild" />
      </div>
    </div>
  );
}

function renderAnimationTiming(speed, index) {
  return (
    <div key={index} className={`guideSass__animRow guideSass__animRow--${speed}`}>
      <EuiFlexGroup alignItems="center" gutterSize="s" key={index}>
        <EuiFlexItem grow={false}>
          {animations[speed]}
          <EuiSpacer size="s" />
          <EuiCodeBlock transparentBackground paddingSize="none" language="scss">animation-timing-function: ${speed}</EuiCodeBlock>
          <EuiSpacer size="s" />
        </EuiFlexItem>
      </EuiFlexGroup>
      <div key={index} className={`guideSass__animParent`}>
        <div className="guideSass__animChild" />
      </div>
    </div>
  );
}

function renderBreakpoint(size, index) {
  return (
    <EuiFlexGroup responsive={false} alignItems="center" gutterSize="s" key={index}>
      <EuiFlexItem grow={false}>
        <EuiText size="s" className="eui-textRight" style={{ width: 50 }}>
          <EuiCode>{size}</EuiCode>
        </EuiText>
      </EuiFlexItem>
      <EuiFlexItem>
        <EuiText size="s">
          {breakpoints.euiBreakpoints[size]}px
        </EuiText>
      </EuiFlexItem>
    </EuiFlexGroup>
  );
}

const bemExample = (`// camelCase all selectors
.euiButton {
  // Put mixins first before properties
  @include euiButton;
  @include euiSlightShadow;

  border-radius: $euiBorderRadius;


  // Elements exist within the main block
  .euiButton__content {
    padding: 0 ($euiSize - $euiSizeXS);
  }

  // Modifiers augment existing selectors
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
`);

const borderRadiusExample = (`border: $euiBorderThin;
border-radius: $euiBorderRadius;
`);

const importKibanaExample = (`// In Kibana you can add this to the top of your Sass file
@import 'ui/public/styles/styling_constants';
`);

const importOutsideExample = (`// In an outside project, import the core variables like so
@import '@elastic/eui/src/global_styling/functions/index';
@import '@elastic/eui/src/global_styling/variables/index';
@import '@elastic/eui/src/global_styling/mixins/index';
`);

export default() => (

  <GuidePage title="Sass guidelines">

    <EuiSpacer size="xl" />
    <EuiFlexGrid columns={2}>
      <EuiFlexItem>
        <EuiText>
          <h2>BEM syntax with verb states</h2>
          <p>
            EUI is written in BEM-style with the addition of verb states (ex: <EuiCode>*-isLoading</EuiCode>).
            Below is an example of proper formatting.
          </p>
        </EuiText>
        <EuiSpacer />
        <EuiCodeBlock language="scss" transparentBackground paddingSize="none">{bemExample}</EuiCodeBlock>
      </EuiFlexItem>
      <EuiFlexItem>
        <EuiText grow={false} className="guideSection__text">
          <h2>Writing Sass the EUI way</h2>
          <p>
            In general, when writing new SCSS in a project that installs EUI as a dependency
            try to follow these best practices:
          </p>
        </EuiText>
        <EuiSpacer />
        <EuiText size="s" grow={false} className="guideSection__text">
          <ul>
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

        <EuiTitle>
          <h4>Importing EUI global Sass</h4>
        </EuiTitle>

        <EuiSpacer />

        <EuiText grow={false} className="guideSection__text">
          <p>
            Most EUI based projects should already import the EUI global
            scope. For example, Kibana has its own
            liner that will give you everything on this page.
          </p>
        </EuiText>
        <EuiSpacer />
        <EuiCodeBlock language="scss" transparentBackground paddingSize="none">
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

        <EuiCodeBlock language="scss" transparentBackground paddingSize="none">
          {importOutsideExample}
        </EuiCodeBlock>

      </EuiFlexItem>
    </EuiFlexGrid>


    <EuiSpacer size="xxl"/>

    <GuideRuleTitle>Core variables</GuideRuleTitle>

    <EuiFlexGrid columns={2}>
      <EuiFlexItem>
        <div>
          <EuiTitle>
            <h4>Sizing</h4>
          </EuiTitle>

          <EuiSpacer />

          {euiSizes.map(function (size, index) {
            return renderSize(size, index);
          })}

          <EuiSpacer />

          <EuiTitle>
            <h4>Z-index</h4>
          </EuiTitle>

          <EuiSpacer />

          {euiLevels.map(function (level, index) {
            return renderLevel(level, index);
          })}
        </div>

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
        <EuiTitle>
          <h4>Text sizes</h4>
        </EuiTitle>

        <EuiSpacer />
        {euiFontSizes.map(function (size, index) {
          return renderFontSize(size, index);
        })}
      </EuiFlexItem>
      <EuiFlexItem>
        <div>
          <EuiTitle>
            <h4>Text colors</h4>
          </EuiTitle>

          <EuiSpacer />

          {euiTextColors.map(function (color, index) {
            return renderPaletteColor(color, index);
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
              <EuiCode>$euiFontFamily</EuiCode>
            </EuiFlexItem>
          </EuiFlexGroup>

          <EuiFlexGroup responsive={false} alignItems="center">
            <EuiFlexItem grow={false} className="guideSass__fontFamily guideSass__fontFamily--code">
              Abc
            </EuiFlexItem>
            <EuiFlexItem grow={false}>
              <EuiCode>$euiCodeFontFamily</EuiCode>
            </EuiFlexItem>
          </EuiFlexGroup>
        </div>
      </EuiFlexItem>
    </EuiFlexGrid>

    <EuiSpacer size="xxl"/>

    <GuideRuleTitle>Borders</GuideRuleTitle>

    <EuiSpacer size="xxl"/>

    <EuiText grow={false}>
      <p>EUI provides some helper variables for setting common border types.</p>
    </EuiText>

    <EuiSpacer />

    <EuiFlexGrid columns={3}>
      {euiBorders.map(function (border, index) {
        return renderBorder(border, index);
      })}
    </EuiFlexGrid>

    <EuiSpacer />

    <EuiText grow={false}>
      <p>In addition, you can utilize <EuiCode>$euiBorderRadius</EuiCode> to round the corners.</p>
    </EuiText>

    <EuiSpacer />

    <EuiFlexGrid columns={3}>
      <EuiFlexItem className="guideSass__border guideSass__border--radius">
        <EuiCodeBlock language="scss" transparentBackground paddingSize="none">
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
          <EuiCodeBlock
            language="scss"
            paddingSize="none"
            transparentBackground
          >
              @include euiBottomShadowLarge(desaturate($euiColorPrimary, 30%));
          </EuiCodeBlock>
        </div>
      </EuiFlexItem>
    </EuiFlexGrid>

    <EuiSpacer size="xxl"/>

    <GuideRuleTitle>Media queries and breakpoints</GuideRuleTitle>

    <EuiText className="guideSection__text">
      <p>
        <Link to="">View the sass code for media queries</Link>.
      </p>
      <p>
        Breakpoints in EUI are provided through the use of a sass
        mixin <EuiCode>@include euiBreapoint()</EuiCode> that
        accepts an array of sizes.
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

          {euiBreakPoints.map(function (size, index) {
            return renderBreakpoint(size, index);
          })}


        </div>

      </EuiFlexItem>
      <EuiFlexItem>
        <EuiTitle size="s">
          <h4>Mixin usage</h4>
        </EuiTitle>

        <EuiSpacer />

        <EuiText><p>Target mobile devices only</p></EuiText>
        <EuiCodeBlock language="scss" transparentBackground paddingSize="s">
          {'@include euiBreakpoint(\'xs\',\'s\') {...}'}
        </EuiCodeBlock>

        <EuiSpacer />

        <EuiText><p>Target mobile and tablets</p></EuiText>
        <EuiCodeBlock language="scss" transparentBackground paddingSize="s">
          {'@include euiBreakpoint(\'xs\', \'s\', \'m\') {...}'}
        </EuiCodeBlock>

        <EuiSpacer />

        <EuiText><p>Target tablets only</p></EuiText>
        <EuiCodeBlock language="scss" transparentBackground paddingSize="s">
          {'@include euiBreakpoint(\'m\') {...}'}
        </EuiCodeBlock>

        <EuiSpacer />

        <EuiText><p>Target very wide displays only</p></EuiText>
        <EuiCodeBlock language="scss" transparentBackground paddingSize="s">
          {'@include euiBreakpoint(\'xl\') {...}'}
        </EuiCodeBlock>

        <EuiSpacer />
      </EuiFlexItem>
    </EuiFlexGrid>

    <EuiSpacer size="xxl"/>

    <GuideRuleTitle>Animation</GuideRuleTitle>
    <EuiText grow={false} className="guideSection__text">
      <p>
        EUI utilizes the following constants to maintain a similar &apos;bounce&apos; to its animations.
        That said, animationsa are tricky, and if they aren&apos;t working for your specific application
        this is the one place where we think it&apos;s OK to come up with your own rules.
      </p>
    </EuiText>
    <EuiSpacer />
    <EuiFlexGrid columns={2}>
      <EuiFlexItem>
        <EuiTitle size="s">
          <h4>Speed</h4>
        </EuiTitle>

        <EuiSpacer />

        {euiAnimationSpeeds.map(function (speed, index) {
          return renderAnimationSpeed(speed, index);
        })}
      </EuiFlexItem>
      <EuiFlexItem>
        <EuiTitle size="s">
          <h4>Timing</h4>
        </EuiTitle>

        <EuiSpacer />

        {euiAnimationTimings.map(function (speed, index) {
          return renderAnimationTiming(speed, index);
        })}
      </EuiFlexItem>
    </EuiFlexGrid>

  </GuidePage>
);
