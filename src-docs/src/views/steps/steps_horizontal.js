import React from 'react';

import { EuiStepsHorizontal } from '../../../../src/components';

const horizontalSteps = [
  {
    title: 'Completed step 1',
    isComplete: true,
    onClick: () => window.alert('Step 1 clicked'),
  },
  {
    title: 'Selected step 2',
    isSelected: true,
    onClick: () => window.alert('Step 2 clicked'),
  },
  {
    title: 'Incomplete step 3 which will wrap to the next line',
    onClick: () => window.alert('Step 3 clicked'),
  },
  {
    title: 'Disabled step 4',
    disabled: true,
    onClick: () => window.alert('Step 4 clicked'),
  },
];

export default () => (
  <div>
    <EuiStepsHorizontal steps={horizontalSteps} />
  </div>
);
