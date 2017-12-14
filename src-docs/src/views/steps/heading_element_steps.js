import React from 'react';

import {
  EuiText,
  EuiSteps,
} from '../../../../src/components';

const steps = [
  {
    title: 'Inspect me',
    children: (<EuiText><h3>{'Did you notice the step title is inside a Heading 2 element?'}</h3></EuiText>)
  }
];

export default () => (
  <div>
    <EuiText><h1>Heading 1</h1></EuiText>

    <br/><br/>

    <EuiSteps
      steps={steps}
      headingElement={'h2'}
    />
  </div>
);
