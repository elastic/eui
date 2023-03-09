import React from 'react';
import { Link } from 'react-router-dom';

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
import { suggestConfig } from './playground';

import SavedQueries from './saved_queries';
const savedQueriesSource = require('!!raw-loader!./saved_queries');

import SuggestItem from './suggest_item_example';
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
  `<EuiSuggestItem
  type={sampleItem.type}
  label={sampleItem.label}
  description={sampleItem.description}
  labelWidth="30"
/>`,
  `<EuiSuggestItem
  type={sampleItem.type}
  label={sampleItem.label}
  description={sampleItem.description}
  descriptionDisplay="wrap"
/>`,
];

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
          type: GuideSectionTypes.TSX,
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
          <p>
            Note that <strong>EuiSuggest</strong> does not maintain internal
            selection state. Use the <EuiCode>onChange</EuiCode> callback to
            update your application state with the desired selection changes.
          </p>
        </>
      ),
      props: { EuiSuggest },
      snippet: suggestSnippet,
      demo: <Suggest />,
      playground: suggestConfig,
    },
    {
      title: 'Suggest item',
      wrapText: false,
      text: (
        <>
          <EuiText>
            <p>
              <strong>EuiSuggestItem</strong> is a list item component to
              display suggestions when typing queries into{' '}
              <strong>EuiSuggest</strong>. Each item requires a{' '}
              <EuiCode>label</EuiCode> and <EuiCode>type</EuiCode> and can
              optionally display a <EuiCode>description</EuiCode>. By default,
              labels will have a width of 50% which you can adjust by setting{' '}
              <EuiCode>labelWidth</EuiCode> to a multiple of{' '}
              <EuiCode>10</EuiCode>.
            </p>
            <p>
              Suggest item types are an object that requires an{' '}
              <EuiCode>iconType</EuiCode> and <EuiCode>color</EuiCode>.
            </p>
            <p>
              Set <EuiCode>truncate</EuiCode> to false to encourage
              line-wrapping of both the label and description. Note that when
              the virtualized setting on, truncation will be enforced. See{' '}
              <Link to="/forms/selectable#rendering-the-options">
                EuiSelectable
              </Link>{' '}
              for more information on rendering items virtually.
            </p>
          </EuiText>
          <EuiSpacer />
          <SuggestItem />
        </>
      ),
      snippet: suggestItemSnippet,
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
        <>
          <EuiCallOut color="warning" title="Demo of visual pattern only">
            <p>
              This documents a <strong>visual</strong> pattern for Kibana&apos;s
              global query and filter bars. The filter bar has been broken down
              into multiple components. There are still bugs and not all the
              logic is well-formed.
            </p>
          </EuiCallOut>
        </>
      ),
      props: { EuiSuggest },
      demo: <SavedQueries />,
    },
  ],
};
