import React from 'react';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import { EuiCode, EuiSuggestItem } from '../../../../src/components';

import SuggestItem from './suggest_item';
const suggestItemSource = require('!!raw-loader!./suggest_item');
const suggestItemHtml = renderToHtml(SuggestItem);

import SuggestItemLongLabel from './suggest_item_long_label';
const suggestItemLongLabelSource = require('!!raw-loader!./suggest_item_long_label');
const suggestItemLongLabelHtml = renderToHtml(SuggestItemLongLabel);

export const SuggestItemExample = {
  title: 'Suggest Item',
  sections: [
    {
      title: 'SuggestItem',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: suggestItemSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: suggestItemHtml,
        },
      ],
      text: (
        <div>
          <p>
            <EuiCode>EuiSuggestItem</EuiCode> is a list item component useful to
            suggestions when typing queries in input fields.
          </p>
          <ul>
            <li>
              <EuiCode>type</EuiCode> is an object that takes{' '}
              <EuiCode>icon</EuiCode> and <EuiCode>color</EuiCode>.{' '}
              <EuiCode>icon</EuiCode> supports any of the icons available in
              <EuiCode>EuiIcon</EuiCode>. <EuiCode>color</EuiCode> is the color
              for the icon and its background. The background color is
              automatically calculated and it is a ligther shade of
              <EuiCode>color</EuiCode>.
            </li>
            <li>
              <EuiCode>label</EuiCode> is the primary text for the suggestion.
            </li>
            <li>
              <EuiCode>description</EuiCode> is the secondary text for the
              suggestion and it is optional.
            </li>
            <li>
              Use <EuiCode>layout</EuiCode> to change the distribution of the{' '}
              <EuiCode>EuiSuggestItem</EuiCode> elements. The default{' '}
              <EuiCode>layout</EuiCode> is <EuiCode>setColumns</EuiCode>.
            </li>
          </ul>
        </div>
      ),
      props: { EuiSuggestItem },
      demo: <SuggestItem />,
    },
    {
      title: 'Expand long label',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: suggestItemLongLabelSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: suggestItemLongLabelHtml,
        },
      ],
      text: (
        <p>
          By default <EuiCode>EuiSuggestItem</EuiCode>&apos;s{' '}
          <EuiCode>label</EuiCode> will have a fixed width and use ellipsis
          whenever its content is too long. It is possible to show the full text
          by setting <EuiCode>layout</EuiCode> to <EuiCode>inline</EuiCode>.
        </p>
      ),
      props: { EuiSuggestItem },
      demo: <SuggestItemLongLabel />,
    },
  ],
};
