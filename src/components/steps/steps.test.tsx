import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test/required_props';

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
  test('renders steps', () => {
    const component = render(<EuiSteps {...requiredProps} steps={steps} />);

    expect(component).toMatchSnapshot();
  });

  test('renders steps with firstStepNumber', () => {
    const component = render(
      <EuiSteps {...requiredProps} steps={steps} firstStepNumber={10} />
    );

    expect(component).toMatchSnapshot();
  });

  test('renders step title inside "headingElement" element', () => {
    const component = render(
      <EuiSteps {...requiredProps} steps={steps} headingElement="h2" />
    );

    expect(component).toMatchSnapshot();
  });
});
