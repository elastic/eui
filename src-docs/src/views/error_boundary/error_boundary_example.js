import React from 'react';

import { GuideSectionTypes } from '../../components';

import { EuiErrorBoundary } from '../../../../src/components';

import ErrorBoundary from './error_boundary';
const errorBoundarySource = require('!!raw-loader!./error_boundary');

export const ErrorBoundaryExample = {
  title: 'Error boundary',
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: errorBoundarySource,
        },
      ],
      text: (
        <p>
          Use <strong>EuiErrorBoundary</strong> to prevent errors from taking
          down the entire app.
        </p>
      ),
      props: { EuiErrorBoundary },
      demo: <ErrorBoundary />,
    },
  ],
};
