/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
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
