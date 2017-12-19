import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../../test/required_props';

import { EuiDateTime } from './date_time';

describe('EuiDateTime', () => {
  test('is rendered', () => {
    const component = render(
      <EuiDateTime {...requiredProps} />
    );

    expect(component)
      .toMatchSnapshot();
  });
});
