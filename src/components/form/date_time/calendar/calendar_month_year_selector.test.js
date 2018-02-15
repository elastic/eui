import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../../../test/required_props';

import { EuiCalendarMonthYearSelector } from './calendar_month_year_selector';

describe('EuiCalendarMonthYearSelector', () => {
  test('is rendered', () => {
    const component = render(
      <EuiCalendarMonthYearSelector {...requiredProps} />
    );

    expect(component)
      .toMatchSnapshot();
  });
});
