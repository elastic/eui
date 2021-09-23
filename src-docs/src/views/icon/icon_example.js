import React from 'react';
import { GuideSectionTypes } from '../../components';

import {
  EuiCode,
  EuiIcon,
  EuiToken,
  EuiLink,
  EuiText,
  EuiCallOut,
  EuiSpacer,
} from '../../../../src/components';

import iconConfig from './playground';

import Icons from './icons';

import Tokens from './tokens';

import CustomTokens from './custom_tokens';

import Apps from './apps';

import Editor from './editor';

import Ml from './ml';

import Logos from './logos';

import IconSizes from './icon_sizes';

import IconColors from './icon_colors';
import AppIconColors from './icon_colors_apps';

import IconTypes from './icon_types';
const iconTypesSource = require('!!raw-loader!./icon_types');

export const IconExample = {
  title: 'Icons',
  sections: [
    {
      text: (
        <p>
          <strong>EuiIcon</strong> is a handy component for using our custom
          glyphs and logos. The <EuiCode>type</EuiCode> prop accepts either an
          enumerated name from one of the sets below, a location to a custom SVG
          asset, or a React Element.
        </p>
      ),
      demo: <EuiIcon type="grid" />,
      props: { EuiIcon },
      playground: iconConfig,
    },
    {
      text: (
        <EuiCallOut
          iconType="accessibility"
          title={
            <>
              For better accessibility it&apos;s always recommended to give a
              descriptive <EuiCode>title</EuiCode> based on the icon use.
            </>
          }
          color="warning"
        >
          <p>
            If no title is provided the icon is going to be purely decorative
            and it will get by default an{' '}
            <EuiCode language="js">aria-hidden=true</EuiCode>.
          </p>
        </EuiCallOut>
      ),
    },
    {
      title: 'Glyphs',
      text: (
        <>
          <p>
            Glyphs are small, monochromatic icons that typically should always
            use the default size of{' '}
            <EuiCode language="js">size=&quot;m&quot;</EuiCode>.
          </p>
          <p>
            If you would like to contribute to our growing list of glyphs, you
            can follow{' '}
            <EuiLink to="https://github.com/elastic/eui/blob/master/wiki/creating-icons.md">
              these guidelines
            </EuiLink>
            .
          </p>
        </>
      ),
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
      demo: <Editor />,
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
      demo: <Logos />,
    },
    {
      title: 'Apps',
      text: (
        <p>
          App logos are usually displayed at <EuiCode>32x32</EuiCode> or above
          and can contain multiple colors.
        </p>
      ),
      demo: <Apps />,
    },
    {
      text: (
        <>
          <h3>Machine learning icons</h3>
          <p>
            Machine learning has some specific icons for job creation. Again,
            these are made for <EuiCode>32x32</EuiCode>.
          </p>
        </>
      ),
      demo: <Ml />,
    },
    {
      title: 'Tokens',
      text: (
        <>
          <p>
            Tokens are most commonly used to visually signify field or code
            types. An <strong>EuiToken</strong> accepts any valid{' '}
            <strong>EuiIcon</strong> as its <EuiCode>iconType</EuiCode>{' '}
            property. However, icons designed specifically for use in the{' '}
            <strong>EuiToken</strong> are prefixed with &quot;token&quot; in
            their name and have pre-defined styles.
          </p>
        </>
      ),
      props: { EuiToken },
      demo: <Tokens />,
    },
    {
      wrapText: false,
      text: (
        <>
          <EuiText>
            <h3>Custom tokens</h3>
            <p>
              By default, an <EuiCode>iconType</EuiCode> with the token prefix
              (i.e. those listed above) will have predefined styles. However,
              any valid <EuiCode>iconType</EuiCode> can be passed and, in either
              case, the <EuiCode>shape</EuiCode>, <EuiCode>size</EuiCode>,{' '}
              <EuiCode>color</EuiCode>, and <EuiCode>fill</EuiCode> can be
              customized.
            </p>
          </EuiText>
          <EuiSpacer />
          <CustomTokens />
        </>
      ),
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
            href="https://developer.mozilla.org/en-US/docs/Web/CSS/color_value"
          >
            CSS color data type
          </EuiLink>
          &nbsp;which will be passed down through the inline-style{' '}
          <EuiCode>fill</EuiCode>&nbsp; property.{' '}
          <strong>We recommend relying on the EUI named color palette</strong>{' '}
          unless the custom color is initiated by the user (like as a graph
          color).
        </p>
      ),
      demo: <IconColors />,
    },
    {
      wrapText: false,
      text: (
        <>
          <EuiText>
            <p>
              Two-tone icons, like our app style icons, will behave similarly to
              normal glyphs when provided a specific color by applying the color
              to <strong>all</strong> the shapes within. You can force the icon
              to match the parent&apos;s text color by passing{' '}
              <EuiCode>color=&#34;inherit&#34;</EuiCode> to the icon.
            </p>
          </EuiText>
        </>
      ),
      demo: <AppIconColors />,
    },
    {
      title: 'Custom SVGs',
      text: (
        <>
          <p>
            The <EuiCode>type</EuiCode> prop can accept a valid enum, string or
            React SVG Element. When using a custom SVG, please make sure it sits
            on a square canvas and preferably utilizes one of EUI&apos;s sizes (
            <EuiCode>16x16</EuiCode> or <EuiCode>32x32</EuiCode>).
          </p>
          <p>
            When using custom SVGs for simple glyphs,{' '}
            <strong>remove all fill attributes</strong> on the SVG and utilize
            the CSS helpers if you have complex logos that need to work with
            theming.
          </p>
        </>
      ),
      source: [
        {
          type: GuideSectionTypes.JS,
          code: iconTypesSource,
        },
      ],
      props: { EuiIcon },
      demo: <IconTypes />,
    },
  ],
};
