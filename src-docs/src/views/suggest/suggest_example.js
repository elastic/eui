import React from 'react';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import {
  EuiCallOut,
  EuiCode,
  EuiSpacer,
  EuiSuggest,
  EuiSuggestItem,
} from '../../../../src/components';

import Suggest from './suggest';
const suggestSource = require('!!raw-loader!./suggest');
const suggestHtml = renderToHtml(Suggest);

import SuggestItem from './suggest_item';
const suggestItemSource = require('!!raw-loader!./suggest_item');
const suggestItemHtml = renderToHtml(SuggestItem);
const suggestItemSnippet = [
  `<EuiSuggestItem
  type={sampleItem.type}
  label={sampleItem.label}
  description={sampleItem.description}
/>
`,
  `<EuiSuggestItem
  type={sampleItem.type}
  label={sampleItem.label}
  description={sampleItem.description}
  labelDisplay="expand"
/>`,
];

export const SuggestExample = {
  title: 'Suggest',
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: suggestSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: suggestHtml,
        },
      ],
      text: (
        <div>
          <EuiCallOut color="warning" title="Demo of visual pattern only">
            <p>
              This documents a <strong>visual</strong> pattern for the eventual
              replacement of Kibana&apos;s global query and filter bars. The
              filter bar has been broken down into multiple components. There
              are still bugs and not all the logic is well-formed.
            </p>
          </EuiCallOut>
          <EuiSpacer />
          <p>
            <EuiCode>EuiSuggest</EuiCode> is an input field component to use
            when performing queries that will display suggestions. When
            inputting a query, <EuiCode>EuiSuggest</EuiCode> will show the
            status of that query (&apos;notYetSaved&apos;, &apos;saved&apos;,
            &apos;noNewChanges&apos; and &apos;isLoading&apos;). Based on that
            status the user can take action (e.g. add query as a Saved Query).
          </p>
        </div>
      ),
      props: { EuiSuggest },
      demo: <Suggest />,
    },
    {
      title: 'Suggest Item',
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
            <EuiCode>EuiSuggestItem</EuiCode> is a list item component to
            display suggestions when typing queries in{' '}
            <EuiCode>EuiSuggest</EuiCode>. Use <EuiCode>labelDisplay</EuiCode>{' '}
            to set whether the <EuiCode>label</EuiCode> has a fixed width or
            not.
          </p>
        </div>
      ),
      props: { EuiSuggestItem },
      snippet: suggestItemSnippet,
      demo: <SuggestItem />,
    },
  ],
};
