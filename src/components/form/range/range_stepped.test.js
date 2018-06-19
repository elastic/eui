import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../../test';

import { EuiRangeStepped } from './range_stepped';

describe('EuiRangeStepped', () => {
  test('is rendered', () => {
    const component = render(
      <EuiRangeStepped {...requiredProps} />
    );

    expect(component)
      .toMatchSnapshot();
  });
});
