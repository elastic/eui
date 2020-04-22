import React from 'react';

import { EuiCode, EuiSpacer, EuiSteps } from '../../../../src/components';

const firstSetOfSteps = [
  {
    title: 'Step 1',
    children: (
      <p>
        Steps with <EuiCode>titleSize</EuiCode> set to <EuiCode>xs</EuiCode>{' '}
        like this one, get a smaller step circle
      </p>
    ),
  },
  {
    title: 'Step 2',
    children: (
      <p>
        Steps with <EuiCode>titleSize</EuiCode> set to <EuiCode>xs</EuiCode>{' '}
        like this one, get a smaller step circle
      </p>
    ),
  },
];

const secondSetOfSteps = [
  {
    title: 'Step 1',
    children: <p>This step has the default sizing</p>,
  },
  {
    title: 'Step 2',
    children: <p>This step has the default sizing</p>,
  },
];

export default () => (
  <div>
    <EuiSteps titleSize="xs" steps={firstSetOfSteps} />
    <EuiSpacer size="m" />
    <EuiSteps steps={secondSetOfSteps} />
  </div>
);
