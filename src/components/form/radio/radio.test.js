import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test/required_props';

import { EuiRadio } from './radio';

describe('EuiRadio', () => {
  test('is rendered', () => {
    const component = render(
      <EuiRadio {...requiredProps} />
    );

    expect(component)
      .toMatchSnapshot();
  });
});
