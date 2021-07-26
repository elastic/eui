import React from 'react';

import { EuiStepsHorizontal } from '../../../../src/components';

const horizontalSteps = [
  {
    title: 'Completed step 1',
    status: 'complete',
    onClick: () => {},
  },
  {
    title: 'Using deprecated isSelected',
    onClick: () => {},
    isSelected: true,
  },
  {
    title: 'Using status = current',
    status: 'current',
    onClick: () => {},
  },
  {
    title: 'Disabled step 4',
    status: 'disabled',
    onClick: () => {},
  },
];

export default () => <EuiStepsHorizontal steps={horizontalSteps} />;
