import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../../../test/required_props';

import { EuiCalendar } from './calendar';

describe('EuiCalendar', () => {
  test('is rendered', () => {
    const component = render(
      <EuiCalendar {...requiredProps} />
    );

    expect(component)
      .toMatchSnapshot();
  });
});
