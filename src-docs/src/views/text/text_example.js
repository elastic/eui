import React from 'react';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import {
  EuiCode,
  EuiText,
  EuiTextColor,
  EuiTextAlign,
} from '../../../../src/components';

import Text from './text';
const textSource = require('!!raw-loader!./text');
const textHtml = renderToHtml(Text);

import TextSmall from './text_small';
const textSmallSource = require('!!raw-loader!./text_small');
const textSmallHtml = renderToHtml(TextSmall);

import TextColor from './text_color';
const textColorSource = require('!!raw-loader!./text_color');
const textColorHtml = renderToHtml(TextColor);

import TextAlign from './text_align';
const textAlignSource = require('!!raw-loader!./text_align');
const textAlignHtml = renderToHtml(TextAlign);

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
            <EuiCode>EuiText</EuiCode> is a generic catchall wrapper that will
            apply our standard typography styling and spacing to naked HTML.
            Because of its forced style it{' '}
            <strong>only accepts raw HTML</strong> and can not / should not be
            used to wrap React components (which would break their styling).
          </p>
          <p>
            <EuiCode>EuiText</EuiCode> can ensure proper line-length for
            readability by setting a <EuiCode>max-width</EuiCode> on the entire
            component. To add the max-width setting, set{' '}
            <EuiCode>grow = false</EuiCode>.
          </p>
        </div>
      ),
      props: { EuiText },
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
          Using the <EuiCode>size</EuiCode> prop on <EuiCode>EuiText</EuiCode>{' '}
          you can get smaller sizes of text than the default.
        </p>
      ),
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
          <EuiCode>EuiTextColor</EuiCode> on individual text objects, or by
          passing the <EuiCode>color</EuiCode> prop directly on{' '}
          <EuiCode>EuiText</EuiCode> for a blanket approach across the entirety
          of your text.
        </p>
      ),
      props: { EuiTextColor },
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
          <EuiCode>EuiTextAlign</EuiCode> on individual text objects, or by
          passing the <EuiCode>textAlign</EuiCode> prop directly on{' '}
          <EuiCode>EuiText</EuiCode> for a blanket approach across the entirety
          of your text.
        </p>
      ),
      props: { EuiTextAlign },
      demo: <TextAlign />,
    },
  ],
};
