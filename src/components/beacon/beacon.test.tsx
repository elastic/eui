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

import { EuiBeacon } from './beacon';

describe('EuiBeacon', () => {
  test('is rendered', () => {
    const component = render(<EuiBeacon {...requiredProps} />);

    expect(component).toMatchSnapshot();
  });

  test('accepts size', () => {
    const component = render(<EuiBeacon size={14} {...requiredProps} />);

    expect(component).toMatchSnapshot();
  });
});
