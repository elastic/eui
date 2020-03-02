import React from 'react';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import { EuiCode, EuiCollapsibleNav } from '../../../../src/components';

import CollapsibleNav from './collapsible_nav';
const collapsibleNavSource = require('!!raw-loader!./collapsible_nav');
const collapsibleNavHtml = renderToHtml(CollapsibleNav);

export const CollapsibleNavExample = {
  title: 'CollapsibleNav',
  sections: [
    {
      title: 'CollapsibleNav',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: collapsibleNavSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: collapsibleNavHtml,
        },
      ],
      text: (
        <p>
          Description needed: how to use the{' '}
          <EuiCode>EuiCollapsibleNav</EuiCode> component.
        </p>
      ),
      props: { EuiCollapsibleNav },
      demo: <CollapsibleNav />,
    },
  ],
};
