import React from 'react';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import { EuiCode, EuiContext, EuiI18n } from '../../../../src/components';

import Context from './context';
const contextSource = require('!!raw-loader!./context');
const contextHtml = renderToHtml(Context);

export const ContextExample = {
  title: 'Context',
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: contextSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: contextHtml,
        },
      ],
      text: (
        <p>
          <EuiCode>EuiContext</EuiCode> allows setting global
          internationalization copy for EUI components. Any components used
          within this context will lookup their display values from this
          mapping.
        </p>
      ),
      components: { EuiContext },
      demo: <Context />,
      props: { EuiContext, EuiI18n },
    },
  ],
};
