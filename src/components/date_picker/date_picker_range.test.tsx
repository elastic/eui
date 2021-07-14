/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

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
