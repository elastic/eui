import React from 'react';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import {
  EuiCode,
  EuiIcon,
  EuiToken,
  EuiLink,
  EuiText,
  EuiSpacer,
  EuiCallOut,
} from '../../../../src/components';

import Icons from './icons';
const iconsSnippet = '<EuiIcon type="alert" />';

import Tokens from './tokens';
const tokensSnippet = [
  '<EuiToken type="tokenAnnotation" />',
  `<EuiToken
  iconType="tokenElement"
  color="euiColorVis07"
  shape="circle"
/>`,
  `<EuiToken
  iconType="visMapCoordinate"
  size="l"
  color="#FF0000"
  shape="rectangle"
  fill="dark"
/>`,
];

import Apps from './apps';
const appsSnippet = '<EuiIcon type="addDataApp" size="xl" />';

import Editor from './editor';
const editorSnippet = '<EuiIcon type="editorAlignLeft" />';

import Ml from './ml';
const mlSnippet = '<EuiIcon type="dataVisualizer" size="xl" />';

import Logos from './logos';
const logosSnippet = '<EuiIcon type="logoElasticsearch" size="xl" />';

import LogosThird from './logos_third';
const logosThirdSnippet = '<EuiIcon type="logoApache" size="xl" />';

import IconSizes from './icon_sizes';
const iconSizesSnippet = '<EuiIcon type="logoElasticStack" size="xl" />';

import IconColors from './icon_colors';
const iconColorsSnippet = [
  '<EuiIcon type="brush" color="primary" />',
  '<EuiIcon type="brush" color="#DA8B45" />',
];

import IconTypes from './icon_types';
const iconTypesSource = require('!!raw-loader!./icon_types');
const iconTypesHtml = renderToHtml(IconTypes);
const iconTypesSnippet = [
  '<EuiIcon type="logoElastic" size="xl" />',
  '<EuiIcon type={reactSVGElement} size="xl" />',
  '<EuiIcon type="https://upload.wikimedia.org/wikipedia/commons/0/02/SVG_logo.svg" size="xl" title="My SVG logo" />',
  '<EuiButton iconType={reactSVGElement}>Works in other components too</EuiButton>',
];

export const IconExample = {
  title: 'Icons',
  intro: (
    <div>
      <EuiText>
        <p>
          <strong>EuiIcon</strong> is a handy component for using our custom
          glyphs and logos. The <EuiCode>type</EuiCode> prop accepts either an
          enumerated name from one of the sets below, a location to a custom SVG
          asset, or a React Element.
        </p>
        <p>
          When using custom SVGs please{' '}
          <strong>remove all fill attributes</strong> on the SVG and utilize the
          CSS helpers if you have complex logos that need to work with theming.
        </p>
      </EuiText>
      <EuiSpacer />
      <EuiCallOut
        title={
          <>
            For better accessibility it's always recommended to give a
            descriptive <EuiCode>title</EuiCode> based on the icon use.
          </>
        }
        color="warning">
        <p>
          If no title is provided the icon is going to be purely decorative and
          it will get by default an <EuiCode language="js">aria-hidden=true</EuiCode>.
        </p>
      </EuiCallOut>
      <EuiSpacer />
    </div>
  ),
  sections: [
    {
      title: 'Glyphs',
      text: (
        <div>
          <p>
            Glyphs are small, monochromatic icons that typically should always
            use the default size of <EuiCode language="js">size=&quot;m&quot;</EuiCode>. They
            tend to be pixel perfect and don&apos;t scale very well into larger
            sizes.
          </p>
        </div>
      ),
      props: { EuiIcon },
      snippet: iconsSnippet,
      demo: <Icons />,
    },
    {
      title: 'Editor controls',
      text: (
        <p>
          Editor icons relate to the visual styling of elements and are commonly
          used within <strong>EuiButtonGroup</strong> components.
        </p>
      ),
      snippet: editorSnippet,
      demo: <Editor />,
    },
    {
      title: 'Apps',
      text: (
        <p>
          App logos are usually displayed at <EuiCode>32x32</EuiCode> or above
          and can contain multiple colors.
        </p>
      ),
      snippet: appsSnippet,
      demo: <Apps />,
    },
    {
      title: 'Tokens',
      text: (
        <div>
          <p>
            Tokens are most commonly used to visually signify field or code
            types. An <strong>EuiToken</strong> accepts any valid{' '}
            <strong>EuiIcon</strong> as its
            <EuiCode>iconType</EuiCode> property. However, icons designed
            specifically for use in the <strong>EuiToken</strong> are prefixed
            with &quot;token&quot; in their name and have pre-defined styles.
          </p>
        </div>
      ),
      props: { EuiToken },
      snippet: tokensSnippet,
      demo: <Tokens />,
    },
    {
      title: 'Machine learning icons',
      text: (
        <p>
          ML has some specific icons for job creation. Again, these are made for{' '}
          <EuiCode>32x32</EuiCode>.
        </p>
      ),
      snippet: mlSnippet,
      demo: <Ml />,
    },
    {
      title: 'Elastic logos',
      text: (
        <p>
          Product logos follow similar rules as app logos. Note the use of{' '}
          <EuiCode>.euiIcon__fillNegative</EuiCode> on portions of the SVGs to
          handle flipping colors for dark mode.
        </p>
      ),
      snippet: logosSnippet,
      demo: <Logos />,
    },
    {
      title: 'Sizes',
      text: (
        <p>
          Use the <EuiCode>size</EuiCode> prop to automatically size your icons.
          Medium is the default, and will output a <EuiCode>16x16</EuiCode>{' '}
          icon.
        </p>
      ),
      snippet: iconSizesSnippet,
      demo: <IconSizes />,
    },
    {
      title: 'Colors',
      text: (
        <p>
          The default behavior of icons is to inherit from the text color. You
          can use the <EuiCode>color</EuiCode> prop to assign a custom color
          which accepts a named color from our palette or a valid&nbsp;
          <EuiLink
            target="_blank"
            href="https://developer.mozilla.org/en-US/docs/Web/CSS/color_value">
            CSS color data type
          </EuiLink>
          &nbsp;which will be passed down through the inline-style{' '}
          <EuiCode>fill</EuiCode>&nbsp; property.{' '}
          <strong>We recommend relying on the EUI named color palette</strong>
          &nbsp; unless the custom color is initiated by the user (like as a
          graph color).
        </p>
      ),
      snippet: iconColorsSnippet,
      demo: <IconColors />,
    },
    {
      title: 'Custom SVGs',
      text: (
        <p>
          The <EuiCode>type</EuiCode> prop can accept a valid enum, string or
          React SVG Element. When using a custom SVG, please make sure it sits
          on a square canvas and preferably utilizes one of EUI&apos;s sizes
          (16x16, 32x32...etc). For IE11 compatibility, the SVG file{' '}
          <em>must</em> contain a <EuiCode>viewBox</EuiCode>.
        </p>
      ),
      source: [
        {
          type: GuideSectionTypes.JS,
          code: iconTypesSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: iconTypesHtml,
        },
      ],
      props: { EuiIcon },
      snippet: iconTypesSnippet,
      demo: <IconTypes />,
    },
    {
      title: 'Third party logos',
      text: (
        <p>
          EUI's library of third party logos are mostly maintained for legacy usages.{' '}
          <strong>EuiIcon</strong> now accepts custom SVG and image content which is how we recommend displaying external logos.
        </p>
      ),
      snippet: logosThirdSnippet,
      demo: <LogosThird />,
    },
  ],
};
