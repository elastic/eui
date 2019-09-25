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

import SavedQueries from './saved_queries';
const savedQueriesSource = require('!!raw-loader!./saved_queries');
const savedQueriesHtml = renderToHtml(SavedQueries);

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

const suggestSnippet = [
  `<EuiSuggest
  status={this.state.status}
  tooltipContent={this.state.tooltipContent}
  onInputChange={this.getInputValue}
  onItemClick={this.onItemClick}
  suggestions={[
    {
      type: { iconType: 'kqlField', color: 'tint4' },
      label: 'Field sample',
      description: 'This is the description',
    },
    {
      type: { iconType: 'kqlValue', color: 'tint0' },
      label: 'Value sample',
      description: 'This is the description',
    },
  ]}
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
          <p>
            <EuiCode>EuiSuggest</EuiCode> is a text field component used to
            display suggestions. The status of the component is shown on its
            right side. The available <EuiCode>status</EuiCode> are:{' '}
            <EuiCode>unsaved</EuiCode>, <EuiCode>saved</EuiCode>,
            <EuiCode>unchanged</EuiCode> and <EuiCode>isLoading</EuiCode>.
          </p>
        </div>
      ),
      props: { EuiSuggest },
      snippet: suggestSnippet,
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
    {
      title: 'Saved queries and filters',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: savedQueriesSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: savedQueriesHtml,
        },
      ],
      text: (
        <div>
          <EuiCallOut color="warning" title="Demo of visual pattern only">
            <p>
              This documents a <strong>visual</strong> pattern for Kibana&apos;s
              global query and filter bars. The filter bar has been broken down
              into multiple components. There are still bugs and not all the
              logic is well-formed.
            </p>
          </EuiCallOut>
          <EuiSpacer />
        </div>
      ),
      props: { EuiSuggest },
      demo: <SavedQueries />,
    },
  ],
};
