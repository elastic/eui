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

import { EuiTourStepIndicator } from './tour_step_indicator';

describe('EuiTourStepIndicator', () => {
  test('is rendered', () => {
    const component = render(
      <EuiTourStepIndicator number={1} status="active" {...requiredProps} />
    );

    expect(component).toMatchSnapshot();
  });

  test('can be complete', () => {
    const component = render(
      <EuiTourStepIndicator number={1} status="complete" {...requiredProps} />
    );

    expect(component).toMatchSnapshot();
  });

  test('can be incomplete', () => {
    const component = render(
      <EuiTourStepIndicator number={1} status="incomplete" {...requiredProps} />
    );

    expect(component).toMatchSnapshot();
  });
});
