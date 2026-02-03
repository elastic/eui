/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';

import { render } from '../../test/rtl';
import {
  EuiDateRangePicker,
  type EuiDateRangePickerProps,
} from './date_range_picker';

const defaultProps: EuiDateRangePickerProps = {
  value: 'last 20 minutes',
  onTimeChange: () => {},
};

describe('EuiDateRangePicker', () => {
  it('renders', () => {
    const { container } = render(<EuiDateRangePicker {...defaultProps} />);

    expect(container.firstChild).toMatchSnapshot();
  });
});
