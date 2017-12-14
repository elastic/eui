import React from 'react';

import {
  EuiErrorBoundary,
} from '../../../../src/components';

const BadComponent = () => {
  throw new Error('There was a terrible error!');
};

export default () => (
  <EuiErrorBoundary>
    <BadComponent />
  </EuiErrorBoundary>
);
