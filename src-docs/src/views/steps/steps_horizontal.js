import React from 'react';

import { EuiStepsHorizontal } from '../../../../src/components';

const horizontalSteps = [
  {
    title: 'Completed step 1',
    status: 'complete',
    onClick: () => {},
  },
  {
    title: 'Selected step 2',
    status: 'current',
    onClick: () => {},
  },
  {
    title: 'Incomplete step 3 which will wrap to the next line',
    onClick: () => {},
  },
  {
    title: 'Disabled step 4',
    status: 'disabled',
    onClick: () => {},
  },
];

export default () => <EuiStepsHorizontal steps={horizontalSteps} />;
