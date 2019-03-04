import React from 'react';

import { renderToHtml } from '../../services';

import {
  GuideSectionTypes,
} from '../../components';

import {
  EuiCode,
  EuiIcon,
  EuiToken,
  EuiLink,
} from '../../../../src/components';

const iconHtmlWarning = () => (
  <p>
    HTML preview disabled. Icons use SVG and are not usable
    usable without React unless you load the icons manually through a
    separate asset loader.
  </p>
);

const iconsHtml = renderToHtml(iconHtmlWarning);

import Icons from './icons';
const iconsSource = require('!!raw-loader!./icons');

import Tokens from './tokens';
const tokensSource = require('!!raw-loader!./tokens');

import Apps from './apps';
const appsSource = require('!!raw-loader!./apps');

import Ml from './ml';
const mlSource = require('!!raw-loader!./ml');

import Logos from './logos';
const logosSource = require('!!raw-loader!./logos');

import LogosThird from './logos_third';
const logosThirdSource = require('!!raw-loader!./logos_third');

import IconSizes from './icon_sizes';
const iconSizesSource = require('!!raw-loader!./icon_sizes');

import IconColors from './icon_colors';
const iconColorsSource = require('!!raw-loader!./icon_colors');

import Accessibility from './accessibility';
const accessibilitySource = require('!!raw-loader!./accessibility');

export const IconExample = {
  title: 'Icons',
  sections: [{
    source: [{
      type: GuideSectionTypes.JS,
      code: iconsSource,
    }, {
      type: GuideSectionTypes.HTML,
      code: iconsHtml,
    }],
    text: (
      <div>
        <p>
          <EuiCode>EuiIcon</EuiCode> can build out an icon from our SVG
          icon library. Icons are resized and recolored through a
          CSS <EuiCode>Fill</EuiCode> declaration.
        </p>
        <p>
          New icons should be placed in
          the <EuiCode>/icons/assets/</EuiCode> folder on
          a <EuiCode>16x16</EuiCode> empty canvas.
          Icons in the general set should be monochromatic and the code
          itself <strong>should not contain any fill attributes</strong>. Use the SVGO plugin
          for Sketch when exporting to compress / clean your SVG of junk.
        </p>
        <p>
          Note: <EuiCode>guideDemo__icon</EuiCode> styling is applied on the
          below grid for documentation presentation only. Do not copy
          this class into production.
        </p>
      </div>
    ),
    props: { EuiIcon },
    demo: <Icons />,
  }, {
    title: 'Apps',
    source: [{
      type: GuideSectionTypes.JS,
      code: appsSource,
    }, {
      type: GuideSectionTypes.HTML,
      code: iconsHtml,
    }],
    text: (
      <p>
        App logos are usually displayed at <EuiCode>32x32</EuiCode> or above
        and can contain multiple colors.
      </p>
    ),
    demo: <Apps />,
  }, {
    title: 'Tokens',
    source: [{
      type: GuideSectionTypes.JS,
      code: tokensSource,
    }, {
      type: GuideSectionTypes.HTML,
      code: iconsHtml,
    }],
    text: (
      <div>
        <p>
          Tokens are most commonly used in search to help visually classify results.
          The tokens included in EUI can be used to identify a number of code-based
          search results.
        </p>

        <p>
          An <EuiCode>EuiToken</EuiCode> accepts any valid <EuiCode>EuiIcon</EuiCode> as its
          <EuiCode>iconType</EuiCode> property. However, icons designed specifically for
          use in the <EuiCode>EuiToken</EuiCode> are prefixed with &quot;token&quot; in their name.
        </p>

        <p>
          Multiple variants are available including: <EuiCode>shape</EuiCode>, <EuiCode>size</EuiCode>,
          <EuiCode>color</EuiCode>, <EuiCode>hideBorder</EuiCode>, and <EuiCode>fill</EuiCode>.
        </p>
      </div>
    ),
    props: { EuiToken },
    demo: <Tokens />,
  }, {
    title: 'Machine learning icons',
    source: [{
      type: GuideSectionTypes.JS,
      code: mlSource,
    }, {
      type: GuideSectionTypes.HTML,
      code: iconsHtml,
    }],
    text: (
      <p>
        ML has some specific icons for job creation.
        Again, these are made for <EuiCode>32x32</EuiCode>.
      </p>
    ),
    demo: <Ml />,
  }, {
    title: 'Elastic logos',
    source: [{
      type: GuideSectionTypes.JS,
      code: logosSource,
    }, {
      type: GuideSectionTypes.HTML,
      code: iconsHtml,
    }],
    text: (
      <p>
        Product logos follow similar rules as app logos. Note the use of <EuiCode>.euiIcon__fillNegative</EuiCode> on
        portions of the SVGs to handle flipping colors for dark mode.
      </p>
    ),
    demo: <Logos />,
  }, {
    title: 'Third party logos',
    source: [{
      type: GuideSectionTypes.JS,
      code: logosThirdSource,
    }, {
      type: GuideSectionTypes.HTML,
      code: iconsHtml,
    }],
    demo: <LogosThird />,
  }, {
    title: 'Sizes',
    source: [{
      type: GuideSectionTypes.JS,
      code: iconSizesSource,
    }, {
      type: GuideSectionTypes.HTML,
      code: iconsHtml,
    }],
    text: (
      <p>
        Use the <EuiCode>size</EuiCode> prop to automatically size your icons.
        Medium is the default, and will output a <EuiCode>16x16</EuiCode> icon.
      </p>
    ),
    demo: <IconSizes />,
  }, {
    title: 'Colors',
    source: [{
      type: GuideSectionTypes.JS,
      code: iconColorsSource,
    }, {
      type: GuideSectionTypes.HTML,
      code: iconsHtml,
    }],
    text: (
      <p>
        The default behavior of icons is to inherit from the text color. You can
        use the <EuiCode>color</EuiCode> prop to assign a custom color which
        accepts a named color from our palette or a valid&nbsp;
        <EuiLink target="_blank" href="https://developer.mozilla.org/en-US/docs/Web/CSS/color_value">CSS color data type</EuiLink>
        &nbsp;which will be passed down through the inline-style <EuiCode>fill</EuiCode>&nbsp;
        property. <strong>We recommend relying on the EUI named color palette</strong>&nbsp;
        unless the custom color is initiated by the user (like as a graph color).
      </p>
    ),
    demo: <IconColors />,
  }, {
    title: 'Accessibility',
    source: [{
      type: GuideSectionTypes.JS,
      code: accessibilitySource,
    }, {
      type: GuideSectionTypes.HTML,
      code: iconsHtml,
    }],
    text: (
      <p>
        You can title the SVG by passing the <EuiCode>aria-label</EuiCode> prop to <EuiCode>EuiCode</EuiCode>. No value is set by default.
      </p>
    ),
    demo: <Accessibility />,
  }],
};
