import React from 'react';

import { GuideSectionTypes } from '../../components';

import { EuiCallOut, EuiPageTemplate } from '../../../../src';

import QueryBar from './query_bar';
const queryBarSource = require('!!raw-loader!./query_bar');

export const QueryBarExample = {
  title: 'Query bar',
  intro: (
    <>
      <EuiCallOut color="warning" title="Demo of visual pattern only">
        <p>
          This documents a <strong>visual</strong> pattern for Kibana&apos;s
          global query and filter bars. The filter bar has been broken down into
          multiple components. There are still bugs and not all the logic is
          well-formed.
        </p>
      </EuiCallOut>
    </>
  ),
  sections: [
    {
      title: 'Saved queries and filters',
      text: <></>,
      demo: <QueryBar />,
      source: [
        {
          type: GuideSectionTypes.TSX,
          code: queryBarSource,
        },
      ],
    },
    {
      fullScreen: {
        slug: 'query-bar',
        demo: (
          <EuiPageTemplate template="empty">
            <QueryBar />
          </EuiPageTemplate>
        ),
      },
    },
  ],
};
