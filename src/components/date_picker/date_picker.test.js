import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test';

import { EuiDatePicker } from './date_picker';

describe('EuiDatePicker', () => {
  test('is rendered', () => {
    const component = render(
      <EuiDatePicker {...requiredProps} />
    );

    expect(component)
      .toMatchSnapshot();
  });
});
