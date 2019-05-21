import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test';

import { EuiDatePickerRange } from './date_picker_range';
import { EuiDatePicker } from './date_picker';

describe('EuiDatePickerRange', () => {
  test('is rendered', () => {
    const component = render(
      <EuiDatePickerRange
        startDateControl={<EuiDatePicker />}
        endDateControl={<EuiDatePicker />}
        {...requiredProps}
      />
    );

    expect(component).toMatchSnapshot();
  });
});
