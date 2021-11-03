import React, { useContext } from 'react';
import { ThemeContext } from '../../components/with_theme';

import { GuideSectionTypes } from '../../components';

import {
  EuiCode,
  EuiText,
  EuiTextColor,
  EuiTextAlign,
} from '../../../../src/components';
import { textConfig, textColorConfig } from './playground';

import Text from './text';
const textSource = require('!!raw-loader!./text');
const textSnippet = `<EuiText grow={false}><!-- Raw HTML content --></EuiText>
`;

import TextScaling from './text_scaling';
const textScalingSource = require('!!raw-loader!./text_scaling');
const textScalingSnippet = [
  `<EuiText size="s"><!-- Raw HTML content --></EuiText>
`,
];

import TextColor from './text_color';
const textColorSource = require('!!raw-loader!./text_color');
const textColorSnippet = [
  `<EuiText color="danger"><!-- Raw HTML content --></EuiText>
`,
  `<EuiTextColor color="subdued">Subdued text color</EuiTextColor>
`,
];

import TextAlign from './text_align';
const textAlignSource = require('!!raw-loader!./text_align');
const textAlignSnippet = [
  `<EuiText textAlign="center"><!-- Raw HTML content --></EuiText>
`,
  `<EuiTextAlign textAlign="center"><!-- Raw HTML content --></EuiTextAlign>
`,
];

const LineHeightText = () => {
  const themeContext = useContext(ThemeContext);
  let text;
  switch (themeContext.theme) {
    case 'light':
    case 'dark':
      text = '';
      break;
    default:
      text = (
        <>
          The goal is that the every line-height lands on the{' '}
          <EuiCode>4px</EuiCode> baseline grid.
        </>
      );
  }

  return text;
};

export const TextExample = {
  title: 'Text',
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: textSource,
        },
      ],
      text: (
        <>
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
        </>
      ),
      props: { EuiText },
      snippet: textSnippet,
      demo: <Text />,
      playground: textConfig,
    },
    {
      title: 'Text can come in various sizes',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: textScalingSource,
        },
      ],
      text: (
        <p>
          Using the <EuiCode>size</EuiCode> prop on <strong>EuiText</strong> you
          can get smaller sizes of text than the default. This demo compares the
          scaling for all sizes. <LineHeightText />
        </p>
      ),
      snippet: textScalingSnippet,
      demo: <TextScaling />,
    },
    {
      title: 'Coloring text',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: textColorSource,
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
      playground: textColorConfig,
    },
    {
      title: 'Alignment',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: textAlignSource,
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
};
