import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test/required_props';

import { EuiCallOut } from './call_out';

describe('EuiCallOut', () => {
  test('is rendered', () => {
    const component = render(
      <EuiCallOut {...requiredProps} />
    );

    expect(component)
      .toMatchSnapshot();
  });
});
