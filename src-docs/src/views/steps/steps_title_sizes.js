import React from 'react';

import {
  EuiCode,
  EuiSpacer,
  EuiSteps,
  EuiText,
} from '../../../../src/components';

const firstSetOfSteps = [
  {
    title:
      'Step 1 with a long title to check what happens during wrapping which should have been fixed.',
    children: <p>Do this first</p>,
  },
  {
    title: 'Step 2',
    children: <p>Then this</p>,
  },
  {
    title: 'Step 3',
    children: <p>Then this</p>,
  },
  {
    title: 'Step 4',
    children: <p>Then this</p>,
    titleSize: 's',
  },
  {
    title: 'Step 5',
    children: <p>Then this</p>,
  },
];

export default () => (
  <div>
    <EuiSteps parentTitleSize="xs" steps={firstSetOfSteps} />
  </div>
);
