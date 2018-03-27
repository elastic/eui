import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../../test/required_props';

import { EuiHeaderAlert } from './header_alert';

describe('EuiHeaderAlert', () => {
  test('is rendered', () => {
    const component = render(
      <EuiHeaderAlert
        {...requiredProps}
        title="title"
        date="date"
      />
    );

    expect(component)
      .toMatchSnapshot();
  });
});
