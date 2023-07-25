/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { shouldRenderCustomStyles } from '../../test/internal';
import { requiredProps } from '../../test/required_props';
import { render } from '../../test/rtl';

import { EuiContainedStepProps, EuiSteps } from './steps';

const steps: EuiContainedStepProps[] = [
  {
    title: 'first title',
    children: <p>Do this first</p>,
  },
  {
    title: 'second title',
    children: <p>Then this</p>,
  },
  {
    title: 'third title',
    children: <p>And finally, do this</p>,
    status: 'incomplete',
  },
];

describe('EuiSteps', () => {
  shouldRenderCustomStyles(<EuiSteps {...requiredProps} steps={steps} />);

  test('renders steps', () => {
    const { container } = render(<EuiSteps {...requiredProps} steps={steps} />);

    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders steps with firstStepNumber', () => {
    const { container } = render(
      <EuiSteps {...requiredProps} steps={steps} firstStepNumber={10} />
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders steps with titleSize', () => {
    const { container } = render(
      <EuiSteps {...requiredProps} steps={steps} titleSize="xs" />
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders step title inside "headingElement" element', () => {
    const { container } = render(
      <EuiSteps {...requiredProps} steps={steps} headingElement="h2" />
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});
