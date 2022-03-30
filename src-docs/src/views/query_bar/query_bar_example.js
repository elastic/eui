import React from 'react';

import { GuideSectionTypes } from '../../components';

import {
  EuiCallOut,
  EuiPageTemplate,
  EuiSpacer,
  EuiAspectRatio,
  EuiTitle,
} from '../../../../src';

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
          <EuiPageTemplate template="empty" restrictWidth={false}>
            <EuiTitle>
              <h1>EUI Docs</h1>
            </EuiTitle>

            <EuiSpacer />
            <QueryBar />
            <EuiSpacer />
            <EuiAspectRatio width={4} height={3}>
              <iframe
                title="Elastic is a search company"
                height="600"
                width="800"
                src="http://localhost:5601/tjd/app/dashboards#/view/7adfa750-4c81-11e8-b3d7-01146121b73d?embed=true&_g=()&show-top-menu=true&hide-filter-bar=true&show-time-filter=true"
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </EuiAspectRatio>
          </EuiPageTemplate>
        ),
      },
    },
  ],
};
