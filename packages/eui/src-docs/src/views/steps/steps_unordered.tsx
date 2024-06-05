import React from 'react';

import { EuiCode, EuiSteps } from '../../../../src/components';

const firstSetOfSteps = [
  {
    title: 'Step 1',
    children: (
      <p>
        Steps with <EuiCode>titleSize</EuiCode> set to <EuiCode>xxs</EuiCode>{' '}
        like this one, get a smaller step circle and have no visual number
        indication.
      </p>
    ),
  },
  {
    title: 'Step 2',
    children: (
      <p>
        Steps with <EuiCode>titleSize</EuiCode> set to <EuiCode>xxs</EuiCode>{' '}
        like this one, get a smaller step circle and have no visual number
        indication.
      </p>
    ),
  },
];

export default () => <EuiSteps titleSize="xxs" steps={firstSetOfSteps} />;
