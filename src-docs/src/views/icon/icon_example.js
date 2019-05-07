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
  EuiText,
  EuiSpacer,
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
const iconsSnippet = `<EuiIcon type="alert" />`;

import Tokens from './tokens';
const tokensSource = require('!!raw-loader!./tokens');
const tokensSnippet = [`<EuiToken type="tokenAnnotation" />`,
  `<EuiToken
  iconType="visMapCoordinate"
  displayOptions={{
    color: 'tokenTint05',
    shape: 'circle',
  }}
/>`,
  `<EuiToken
  iconType="tokenElement"
  size="l"
  displayOptions={{
    color: 'tokenTint07',
    shape: 'rectangle',
    hideBorder: true
  }}
/>`];


import Apps from './apps';
const appsSource = require('!!raw-loader!./apps');
const appsSnippet = `<EuiIcon type="addDataApp" size="xl" />`;

import Ml from './ml';
const mlSource = require('!!raw-loader!./ml');
const mlSnippet = `<EuiIcon type="dataVisualizer" size="xl" />`;

import Logos from './logos';
const logosSource = require('!!raw-loader!./logos');
const logosSnippet = `<EuiIcon type="logoElasticsearch" size="xl" />`;

import LogosThird from './logos_third';
const logosThirdSource = require('!!raw-loader!./logos_third');
const logosThirdSnippet = `<EuiIcon type="logoApache" size="xl" />`;

import IconSizes from './icon_sizes';
const iconSizesSource = require('!!raw-loader!./icon_sizes');
const iconSizesSnippet = `<EuiIcon type="logoElasticStack" size="xl" />`;

import IconColors from './icon_colors';
const iconColorsSource = require('!!raw-loader!./icon_colors');
const iconColorsSnippet = [`<EuiIcon type="brush" color="primary" />`,
  `<EuiIcon type="brush" color="#F98510" />`];

import Accessibility from './accessibility';
const accessibilitySource = require('!!raw-loader!./accessibility');

import IconTypes from './icon_types';
const iconTypesSource = require('!!raw-loader!./icon_types');
const iconTypesSnippet = [`<EuiIcon type="logoElastic" size="xl" />`,
  `<EuiIcon type={reactSVGElement} size="xl" />`,
  `<EuiIcon type="https://upload.wikimedia.org/wikipedia/commons/0/02/SVG_logo.svg" size="xl" />`,
  `<EuiButton iconType={reactSVGElement}>Works in other components too</EuiButton>`];

export const IconExample = {
  title: 'Icons',
  intro: (
    <div>
      <EuiText>
        <p>
          <EuiCode>EuiIcon</EuiCode> is a handy component for using our custom glyphs and logos.
          The <EuiCode>type</EuiCode> prop accepts either an enumerated name from one of the sets below,
          a location to a custom SVG asset, or a React Element.
        </p>
        <p>
          When using custom SVGs please <strong>remove all fill attributes</strong> on the SVG and
          utilize the CSS helpers if you have complex logos that need to work with theming.
        </p>
      </EuiText>
      <EuiSpacer />
    </div>

  ),
  sections: [{
    source: [{
      type: GuideSectionTypes.JS,
      code: iconsSource,
    }, {
      type: GuideSectionTypes.HTML,
      code: iconsHtml,
    }],
    title: 'Glyphs',
    text: (
      <div>
        <p>
          Glyphs are small, monochromatic icons that typically should always use the default size
          of <EuiCode>size=&quot;m&quot;</EuiCode>. They tend to be pixel perfect and don&apos;t
          scale very well into larger sizes.
        </p>
      </div>
    ),
    props: { EuiIcon },
    snippet: iconsSnippet,
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
    snippet: appsSnippet,
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
    snippet: tokensSnippet,
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
    snippet: mlSnippet,
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
    snippet: logosSnippet,
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
    snippet: logosThirdSnippet,
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
    snippet: iconSizesSnippet,
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
    snippet: iconColorsSnippet,
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
  }, {
    title: 'Custom SVGs',
    text: (
      <p>
        The <EuiCode>type</EuiCode> prop can accept a valid enum, string or React SVG Element. When using a custom SVG, please make sure
        it sits on a square canvas and preferably utilizes one of EUI&apos;s sizes (16x16, 32x32...etc). For IE11 compatibility, the SVG
        file <em>must</em> contain a <EuiCode>viewBox</EuiCode>.
      </p>
    ),
    source: [{
      type: GuideSectionTypes.JS,
      code: iconTypesSource,
    }, {
      type: GuideSectionTypes.HTML,
      code: iconsHtml,
    }],
    props: { EuiIcon },
    snippet: iconTypesSnippet,
    demo: <IconTypes />,
  }],
};
