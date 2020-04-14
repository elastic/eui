import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test/required_props';

import { EuiTourStepIndicator } from './tour_step_indicator';

describe('EuiTourStepIndicator', () => {
  test('is rendered', () => {
    const component = render(
      <EuiTourStepIndicator number={1} status="active" {...requiredProps} />
    );

    expect(component).toMatchSnapshot();
  });

  test('can be complete', () => {
    const component = render(
      <EuiTourStepIndicator number={1} status="complete" {...requiredProps} />
    );

    expect(component).toMatchSnapshot();
  });

  test('can be incomplete', () => {
    const component = render(
      <EuiTourStepIndicator number={1} status="incomplete" {...requiredProps} />
    );

    expect(component).toMatchSnapshot();
  });
});
