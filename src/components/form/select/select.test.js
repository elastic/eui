import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../../test/required_props';

import { EuiSelect } from './select';

describe('EuiSelect', () => {
  test('is rendered', () => {
    const component = render(
      <EuiSelect {...requiredProps} />
    );

    expect(component)
      .toMatchSnapshot();
  });
});
