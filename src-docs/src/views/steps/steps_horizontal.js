import React from 'react';

import {
  EuiStepsHorizontal,
} from '../../../../src/components';

const horizontalSteps = [
  {
    title: 'Completed Step 1',
    isComplete: true,
    onClick: () => window.alert('Step 1 clicked')
  },
  {
    title: 'Selected Step 2',
    isSelected: true,
  },
  {
    title: 'Incomplete Step 3',
  },
  {
    title: 'Disabled Step 4',
    disabled: true,
  },
];

export default () => (
  <div>
    <EuiStepsHorizontal
      steps={horizontalSteps}
    />
  </div>
);
