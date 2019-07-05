import React from 'react';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import { EuiCode, EuiSuggestInput } from '../../../../src/components';

import SuggestInput from './suggest_input';
const suggestInputSource = require('!!raw-loader!./suggest_input');
const suggestInputHtml = renderToHtml(SuggestInput);

export const SuggestInputExample = {
  title: 'SuggestInput',
  sections: [
    {
      title: 'SuggestInput',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: suggestInputSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: suggestInputHtml,
        },
      ],
      text: (
        <div>
          <p>
            <EuiCode>EuiSuggestInput</EuiCode> is an input field component to
            use when performing queries that will display suggestions. When
            inputting a query, <EuiCode>EuiSuggestInput</EuiCode> will show the
            status of that query (no new changes, changes saved, etc). Based on
            that status the user can take action (e.g. add query as a Saved
            Query).
          </p>
          <ul>
            <li>
              <EuiCode>status</EuiCode> can take any of the following values: &apos;notYetSaved&apos;, &apos;saved&apos;, &apos;noNewChanges&apos; and &apos;isLoading&apos;.
            </li>
            <li>
              <EuiCode>value</EuiCode> is the current value of the input field.
            </li>
          </ul>
        </div>
      ),
      props: { EuiSuggestInput },
      demo: <SuggestInput />,
    },
  ],
};
