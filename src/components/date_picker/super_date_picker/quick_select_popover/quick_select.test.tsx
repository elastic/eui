/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import React from 'react';
import { shallow } from 'enzyme';

import { EuiQuickSelect } from './quick_select';

const noop = () => {};
const defaultProps = {
  applyTime: noop,
  end: 'now',
  start: 'now-15m',
};

describe('EuiQuickSelect', () => {
  test('is rendered', () => {
    const component = shallow(<EuiQuickSelect {...defaultProps} />);

    expect(component).toMatchSnapshot();
  });

  test('prevQuickSelect', () => {
    const component = shallow(
      <EuiQuickSelect
        {...defaultProps}
        prevQuickSelect={{
          timeTense: 'Next',
          timeUnits: 'M',
          timeValue: 32,
        }}
      />
    );

    expect(component).toMatchSnapshot();
  });
});
