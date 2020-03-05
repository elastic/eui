import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test/required_props';

import { EuiProgress } from './progress';

describe('EuiProgress', () => {
  test('is rendered', () => {
    const component = render(<EuiProgress {...requiredProps} />);

    expect(component).toMatchSnapshot();
  });

  test('is rendered meter element', () => {
    const component = render(
      <EuiProgress {...requiredProps} Element="meter" />
    );

    expect(component).toMatchSnapshot();
  });
});
