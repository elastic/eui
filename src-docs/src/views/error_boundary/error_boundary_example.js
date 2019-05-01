import React from 'react';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import { EuiCode, EuiErrorBoundary } from '../../../../src/components';

import ErrorBoundary from './error_boundary';
const errorBoundarySource = require('!!raw-loader!./error_boundary');
const errorBoundaryHtml = renderToHtml(ErrorBoundary);

export const ErrorBoundaryExample = {
  title: 'Error Boundary',
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: errorBoundarySource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: errorBoundaryHtml,
        },
      ],
      text: (
        <p>
          Use <EuiCode>EuiErrorBoundary</EuiCode> to prevent errors from taking
          down the entire app.
        </p>
      ),
      props: { EuiErrorBoundary },
      demo: <ErrorBoundary />,
    },
  ],
};
