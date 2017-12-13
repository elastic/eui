import React from 'react';

import {
  EuiCode,
  EuiSpacer,
  EuiSteps,
  EuiText,
} from '../../../../src/components';

const firstSetOfSteps = [
  {
    title: 'step 1',
    children: (<p>{'Do this first'}</p>)
  },
  {
    title: 'step 2',
    children: (<p>{'Then this'}</p>)
  },
  {
    title: 'step 3',
    children: (<p>{'And finally, do this'}</p>)
  },
];

const nextSetOfSteps = [
  {
    title: 'good step',
    children: (<p>{'Do this first'}</p>)
  },
  {
    title: 'better step',
    children: (<p>{'Then this'}</p>)
  },
  {
    title: 'best step',
    children: (<p>{'And finally, do this'}</p>)
  },
];

export default () => (
  <div>
    <EuiSteps
      steps={firstSetOfSteps}
    />

    <EuiText>
      <EuiSpacer size="m"/>
      <p>
        Set <EuiCode>firstStepNumber</EuiCode> to continue step numbering after any type of break in the content
      </p>
      <EuiSpacer size="m"/>
    </EuiText>

    <EuiSteps
      firstStepNumber={firstSetOfSteps.length}
      steps={nextSetOfSteps}
    />
  </div>
);
