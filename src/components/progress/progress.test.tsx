import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test/required_props';

import { EuiProgress } from './progress';

describe('EuiProgress', () => {
  test('is rendered', () => {
    const component = render(<EuiProgress {...requiredProps} />);

    expect(component).toMatchSnapshot();
  });

  test('has max', () => {
    const component = render(<EuiProgress max={100} {...requiredProps} />);

    expect(component).toMatchSnapshot();
  });

  test('has value', () => {
    const component = render(<EuiProgress value={100} {...requiredProps} />);

    expect(component).toMatchSnapshot();
  });

  test('is determinate', () => {
    const val = 50;
    const component = render(
      <EuiProgress max={val ? 100 : undefined} value={val} {...requiredProps} />
    );

    expect(component).toMatchSnapshot();
  });

  test('is indeterminate', () => {
    const val = undefined;
    const component = render(
      <EuiProgress max={val ? 100 : undefined} value={val} {...requiredProps} />
    );

    expect(component).toMatchSnapshot();
  });
});
