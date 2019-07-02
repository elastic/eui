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
            that status the user can take action (e.g. add query as Saved
            Query).
          </p>
          <ul>
            <li>
              <EuiCode>status</EuiCode> is an object that takes{' '}
              <EuiCode>icon</EuiCode>, <EuiCode>color</EuiCode>,{' '}
              <EuiCode>label</EuiCode> and <EuiCode>tooltip</EuiCode>.{' '}
              <EuiCode>icon</EuiCode> supports any of the icons available in
              <EuiCode>EuiIcon</EuiCode>. <EuiCode>color</EuiCode> is the color
              for the icon. <EuiCode>label</EuiCode> is the text to display next
              to the icon. <EuiCode>tooltip</EuiCode> is optional and can be
              added to the status to guide the user on what action to perform
              next.
            </li>
            <li>
              <EuiCode>value</EuiCode> is the current value on the input field.
            </li>
          </ul>
        </div>
      ),
      props: { EuiSuggestInput },
      demo: <SuggestInput />,
    },
  ],
};
