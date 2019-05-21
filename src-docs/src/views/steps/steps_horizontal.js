import React from 'react';

import { EuiStepsHorizontal } from '../../../../src/components';

const horizontalSteps = [
  {
    title: 'Completed Step 1',
    isComplete: true,
    onClick: () => window.alert('Step 1 clicked'),
  },
  {
    title: 'Selected Step 2',
    isSelected: true,
    onClick: () => window.alert('Step 2 clicked'),
  },
  {
    title: 'Incomplete Step 3 which will wrap to the next line',
    onClick: () => window.alert('Step 3 clicked'),
  },
  {
    title: 'Disabled Step 4',
    disabled: true,
    onClick: () => window.alert('Step 4 clicked'),
  },
];

export default () => (
  <div>
    <EuiStepsHorizontal steps={horizontalSteps} />
  </div>
);
