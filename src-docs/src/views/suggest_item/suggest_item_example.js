import React from 'react';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import { EuiCode, EuiSuggestItem } from '../../../../src/components';

import SuggestItem from './suggest_item';
const suggestItemSource = require('!!raw-loader!./suggest_item');
const suggestItemHtml = renderToHtml(SuggestItem);

export const SuggestItemExample = {
  title: 'SuggestItem',
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
        <p>
          Description needed: how to use the <EuiCode>EuiSuggestItem</EuiCode>{' '}
          component.
        </p>
      ),
      props: { EuiSuggestItem },
      demo: <SuggestItem />,
    },
  ],
};
