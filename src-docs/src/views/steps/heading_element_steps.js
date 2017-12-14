import React from 'react';

import {
  EuiSteps,
} from '../../../../src/components';

const steps = [
  {
    title: 'inspect me',
    children: (<h3>{'Did you notice the step title is inside a Heading 2 element?'}</h3>)
  }
];

export default () => (
  <div>
    <h1>Heading 1</h1>
    <EuiSteps
      steps={steps}
      headingElement={'h2'}
    />
  </div>
);
