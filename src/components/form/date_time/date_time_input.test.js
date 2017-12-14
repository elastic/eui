import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test';

import { EuiDateTimeInput } from './date_time_input';

describe('EuiDateTimeInput', () => {
  test('is rendered', () => {
    const component = render(
      <EuiDateTimeInput {...requiredProps} />
    );

    expect(component)
      .toMatchSnapshot();
  });
});
