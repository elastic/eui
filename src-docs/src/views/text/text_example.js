import React from 'react';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import {
  EuiCode,
  EuiText,
  EuiTextColor,
  EuiTextAlign,
} from '../../../../src/components';
import Guidelines from '../text_scaling/text_scaling_sandbox';
import { textConfig, textColorConfig } from './playground';

import Text from './text';
const textSource = require('!!raw-loader!./text');
const textHtml = renderToHtml(Text);
const textSnippet = `<EuiText grow={false}><!-- Raw HTML content --></EuiText>
`;

import TextSmall from './text_small';
const textSmallSource = require('!!raw-loader!./text_small');
const textSmallHtml = renderToHtml(TextSmall);
const textSmallSnippet = [
  `<EuiText size="s"><!-- Raw HTML content --></EuiText>
`,
];

import TextColor from './text_color';
const textColorSource = require('!!raw-loader!./text_color');
const textColorHtml = renderToHtml(TextColor);
const textColorSnippet = [
  `<EuiText color="danger"><!-- Raw HTML content --></EuiText>
`,
  `<EuiTextColor color="subdued">Subdued text color</EuiTextColor>
`,
];

import TextAlign from './text_align';
const textAlignSource = require('!!raw-loader!./text_align');
const textAlignHtml = renderToHtml(TextAlign);
const textAlignSnippet = [
  `<EuiText textAlign="center"><!-- Raw HTML content --></EuiText>
`,
  `<EuiTextAlign textAlign="center"><!-- Raw HTML content --></EuiTextAlign>
`,
];

export const TextExample = {
  title: 'Text',
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: textSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: textHtml,
        },
      ],
      text: (
        <div>
          <p>
            <strong>EuiText</strong> is a generic catchall wrapper that will
            apply our standard typography styling and spacing to naked HTML.
            Because of its forced style it{' '}
            <strong>only accepts raw XHTML</strong> and can not / should not be
            used to wrap React components (which would break their styling).
          </p>
          <p>
            <strong>EuiText</strong> can ensure proper line-length for
            readability by setting a{' '}
            <EuiCode language="sass">max-width</EuiCode> on the entire
            component. To add the max-width setting, set{' '}
            <EuiCode language="js">grow=false</EuiCode>.
          </p>
        </div>
      ),
      props: { EuiText },
      snippet: textSnippet,
      demo: <Text />,
    },
    {
      title: 'Text can come in various sizes',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: textSmallSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: textSmallHtml,
        },
      ],
      text: (
        <p>
          Using the <EuiCode>size</EuiCode> prop on <strong>EuiText</strong> you
          can get smaller sizes of text than the default.
        </p>
      ),
      snippet: textSmallSnippet,
      demo: <TextSmall />,
    },
    {
      title: 'Coloring text',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: textColorSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: textColorHtml,
        },
      ],
      text: (
        <p>
          There are two ways to color text. Either individually by applying{' '}
          <strong>EuiTextColor</strong> on individual text objects, or by
          passing the <EuiCode>color</EuiCode> prop directly on{' '}
          <strong>EuiText</strong> for a blanket approach across the entirety of
          your text.
        </p>
      ),
      props: { EuiTextColor },
      snippet: textColorSnippet,
      demo: <TextColor />,
    },
    {
      title: 'Alignment',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: textAlignSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: textAlignHtml,
        },
      ],
      text: (
        <p>
          There are two ways to align text. Either individually by applying{' '}
          <strong>EuiTextAlign</strong> on individual text objects, or by
          passing the <EuiCode>textAlign</EuiCode> prop directly on{' '}
          <strong>EuiText</strong> for a blanket approach across the entirety of
          your text.
        </p>
      ),
      props: { EuiTextAlign },
      snippet: textAlignSnippet,
      demo: <TextAlign />,
    },
  ],
  guidelines: <Guidelines />,
  playground: [textConfig, textColorConfig],
};
