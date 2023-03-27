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
    children: (
      <EuiText>
        <p>Do this first</p>
      </EuiText>
    ),
  },
  {
    title: 'Step 2',
    children: (
      <EuiText>
        <p>Then this</p>
      </EuiText>
    ),
  },
];

const nextSetOfSteps = [
  {
    title: 'Good step',
    children: (
      <EuiText>
        <p>Do this first</p>
      </EuiText>
    ),
  },
  {
    title: 'Better step',
    children: (
      <EuiText>
        <p>Then this</p>
      </EuiText>
    ),
  },
];

export default () => (
  <>
    <EuiSteps steps={firstSetOfSteps} />

    <EuiSpacer size="m" />
    <EuiText>
      <p>
        Set <EuiCode>firstStepNumber</EuiCode> to continue step numbering after
        any type of break in the content
      </p>
    </EuiText>
    <EuiSpacer size="m" />

    <EuiSteps
      firstStepNumber={firstSetOfSteps.length + 1}
      steps={nextSetOfSteps}
    />
  </>
);
