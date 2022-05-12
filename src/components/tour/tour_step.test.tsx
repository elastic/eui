/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { mount } from 'enzyme';
import { requiredProps } from '../../test/required_props';

import { EuiTourStep } from './tour_step';

jest.mock('../portal', () => ({
  EuiPortal: ({ children }: any) => children,
}));

const steps = [
  {
    step: 1,
    content: 'You are here',
  },
];

const config = {
  onFinish: () => {},
  stepsTotal: 1,
  title: 'A demo',
};

describe('EuiTourStep', () => {
  test('is rendered', () => {
    const component = mount(
      <EuiTourStep {...config} {...steps[0]} isStepOpen {...requiredProps}>
        <span>Test</span>
      </EuiTourStep>
    );

    expect(component.render()).toMatchSnapshot();
  });

  test('can have subtitle', () => {
    const component = mount(
      <EuiTourStep
        {...config}
        {...steps[0]}
        isStepOpen
        subtitle="Subtitle"
        {...requiredProps}
      >
        <span>Test</span>
      </EuiTourStep>
    );

    expect(component.render()).toMatchSnapshot();
  });

  test('can be closed', () => {
    const component = mount(
      <EuiTourStep
        {...config}
        {...steps[0]}
        isStepOpen={false}
        {...requiredProps}
      >
        <span>Test</span>
      </EuiTourStep>
    );

    expect(component.render()).toMatchSnapshot();
  });

  test('can change the minWidth and maxWidth', () => {
    const component = mount(
      <EuiTourStep
        {...config}
        {...steps[0]}
        minWidth={240}
        maxWidth={420}
        isStepOpen
        {...requiredProps}
      >
        <span>Test</span>
      </EuiTourStep>
    );

    expect(component.render()).toMatchSnapshot();
  });

  test('can override the footer action', () => {
    const component = mount(
      <EuiTourStep
        {...config}
        {...steps[0]}
        isStepOpen
        footerAction={<button onClick={() => {}}>Test</button>}
        {...requiredProps}
      >
        <span>Test</span>
      </EuiTourStep>
    );

    expect(component.render()).toMatchSnapshot();
  });

  test('can turn off the beacon', () => {
    const component = mount(
      <EuiTourStep
        {...config}
        {...steps[0]}
        isStepOpen
        decoration="none"
        {...requiredProps}
      >
        <span>Test</span>
      </EuiTourStep>
    );

    expect(component.render()).toMatchSnapshot();
  });
});
