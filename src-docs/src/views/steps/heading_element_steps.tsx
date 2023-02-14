import React from 'react';

import { EuiSteps, EuiTitle, EuiSpacer } from '../../../../src/components';

const steps = [
  {
    title: 'Inspect me',
    children: (
      <EuiTitle size="xs">
        <h3>Did you notice the step title is inside a Heading 2 element?</h3>
      </EuiTitle>
    ),
  },
];

export default () => (
  <>
    <EuiTitle size="l">
      <h1>Heading 1</h1>
    </EuiTitle>

    <EuiSpacer size="xl" />

    <EuiSteps steps={steps} headingElement="h2" />
  </>
);
