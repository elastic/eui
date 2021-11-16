import React from 'react';

import { GuideSectionTypes } from '../../components';

import {
  EuiCallOut,
  EuiCode,
  EuiSpacer,
  EuiSuggest,
  EuiText,
} from '../../../../src/components';

import Suggest from './suggest';
const suggestSource = require('!!raw-loader!./suggest');

import SavedQueries from './saved_queries';
const savedQueriesSource = require('!!raw-loader!./saved_queries');

import SuggestItem from './suggest_item_example';

const suggestSnippet = [
  `<EuiSuggest
  status={status}
  tooltipContent={tooltipContent}
  onInputChange={getInputValue}
  onItemClick={onItemClick}
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
      ],
      text: (
        <>
          <p>
            <strong>EuiSuggest</strong> is a text field component used to
            display suggestions. The status of the component is shown on its
            right side. The available <EuiCode>status</EuiCode> are:{' '}
            <EuiCode>unsaved</EuiCode>, <EuiCode>saved</EuiCode>,
            <EuiCode>unchanged</EuiCode> and <EuiCode>isLoading</EuiCode>.
          </p>
        </>
      ),
      props: { EuiSuggest },
      snippet: suggestSnippet,
      demo: <Suggest />,
    },
    {
      title: 'Suggest item',
      wrapText: false,
      text: (
        <>
          <EuiText>
            <p>
              <strong>EuiSuggestItem</strong> is a list item component to
              display suggestions when typing queries in{' '}
              <strong>EuiSuggest</strong>. By default, labels will have a width
              of 50%, you can adjust this by setting{' '}
              <EuiCode>labelWidth</EuiCode>. Use <EuiCode>truncate</EuiCode> to
              set whether both the label and description should truncate.
            </p>
          </EuiText>
          <EuiSpacer size="l" />
          <SuggestItem />
        </>
      ),
    },
    {
      title: 'Saved queries and filters',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: savedQueriesSource,
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
