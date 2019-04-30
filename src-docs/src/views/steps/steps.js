import React from 'react';

import {
  EuiCode,
  EuiSpacer,
  EuiSteps,
  EuiText,
} from '../../../../src/components';

const firstSetOfSteps = [
  {
    title: 'Step 1',
    children: <p>Do this first</p>,
  },
  {
    title: 'Step 2',
    children: <p>Then this</p>,
  },
];

const nextSetOfSteps = [
  {
    title: 'Good step',
    children: <p>Do this first</p>,
  },
  {
    title: 'Better step',
    children: <p>Then this</p>,
  },
];

export default () => (
  <div>
    <EuiSteps steps={firstSetOfSteps} />

    <EuiText>
      <EuiSpacer size="m" />
      <p>
        Set <EuiCode>firstStepNumber</EuiCode> to continue step numbering after
        any type of break in the content
      </p>
      <EuiSpacer size="m" />
    </EuiText>

    <EuiSteps
      firstStepNumber={firstSetOfSteps.length + 1}
      steps={nextSetOfSteps}
    />
  </div>
);
