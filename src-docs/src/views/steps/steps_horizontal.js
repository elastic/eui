import React from 'react';

import { EuiStepsHorizontal } from '../../../../src/components';

const horizontalSteps = [
  {
    title: 'Completed step 1',
    isComplete: true,
    onClick: () => {},
  },
  {
    title: 'Selected step 2',
    isSelected: true,
    onClick: () => {},
  },
  {
    title: 'Incomplete step 3 which will wrap to the next line',
    onClick: () => {},
  },
  {
    title: 'Disabled step 4',
    disabled: true,
    onClick: () => {},
  },
];

export default () => <EuiStepsHorizontal steps={horizontalSteps} />;
