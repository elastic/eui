import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test/required_props';

import { EuiTourStep } from './tour_step';

const steps = [
  {
    step: 1,
    subtitle: 'Step 1',
    content: 'You are here',
  },
];

const config = {
  isTourActive: true,
  onSkip: () => {},
  onEnd: () => {},
  stepsTotal: 1,
  title: 'A demo',
};

describe('EuiTourStep', () => {
  test('is rendered', () => {
    const component = render(
      <EuiTourStep {...config} {...steps[0]} {...requiredProps}>
        <span>Test</span>
      </EuiTourStep>
    );

    expect(component).toMatchSnapshot();
  });

  test('can be inactive', () => {
    const component = render(
      <EuiTourStep
        {...config}
        {...steps[0]}
        isTourActive={false}
        {...requiredProps}>
        <span>Test</span>
      </EuiTourStep>
    );

    expect(component).toMatchSnapshot();
  });
});
