import React from 'react';

import {
  EuiCode,
  EuiSteps,
  EuiText,
  EuiCodeBlock,
} from '../../../../src/components';

const steps = [
  {
    title: 'Step 1 has intro plus code snippet',
    children: (
      <EuiText>
        <p>Run this code snippet to install things.</p>
        <EuiCodeBlock language="bash">
          npm install
        </EuiCodeBlock>
      </EuiText>
    )
  },
  {
    title: 'Step 2 has sub steps',
    children: (
      <EuiText>
        <p>In order to complete this step, do the following things <strong>in order</strong>.</p>
        <ol>
          <li>Do thing 1</li>
          <li>Do thing 2</li>
          <li>Do thing 3</li>
        </ol>
        <p>Here are some bullet point reminders.</p>
        <ul>
          <li>Reminder 1</li>
          <li>Reminder 2</li>
          <li>Reminder 3</li>
        </ul>
      </EuiText>
    )
  },
  {
    title: 'Step 3 has an intro and one line instruction',
    children: (
      <EuiText>
        <p>Now that you&apos;ve completed step 2, go find the <EuiCode>thing</EuiCode>.</p>
        <p>
          Go to <strong>Overview &gt;&gt; Endpoints</strong> note
          <strong>Elasticsearch</strong> as <EuiCode>&lt;thing&gt;</EuiCode>.
        </p>
      </EuiText>
    )
  },
  {
    title: 'The last step has two options',
    children: (
      <EuiText>
        <h3><strong>Option 1:</strong> If you have this type of instance</h3>
        <ol>
          <li>Do thing 1</li>
          <li>Do thing 2</li>
          <li>Do thing 3</li>
        </ol>
        <h3><strong>Option 2:</strong> If you have the other type of instance</h3>
        <ol>
          <li>Do thing 1</li>
          <li>Do thing 2</li>
          <li>Do thing 3</li>
        </ol>
      </EuiText>
    )
  },
];

export default () => (
  <div>
    <EuiSteps
      headingElement="h2"
      steps={steps}
    />
  </div>
);
