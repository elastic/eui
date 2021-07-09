/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test/required_props';

import { EuiSaturation } from './saturation';

const onChange = () => {
  /* empty */
};

describe('EuiHue', () => {
  test('is rendered', () => {
    const component = render(
      <EuiSaturation onChange={onChange} {...requiredProps} />
    );

    expect(component).toMatchSnapshot();
  });

  test('accepts a color', () => {
    const component = render(
      <EuiSaturation
        color={[180, 1, 0.5]}
        onChange={onChange}
        {...requiredProps}
      />
    );

    expect(component).toMatchSnapshot();
  });
});
