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

import { EuiTourStep } from './tour_step';

const steps = [
  {
    step: 1,
    subtitle: 'Step 1',
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
    const component = render(
      <EuiTourStep {...config} {...steps[0]} {...requiredProps}>
        <span>Test</span>
      </EuiTourStep>
    );

    expect(component).toMatchSnapshot();
  });

  test('can be closed', () => {
    const component = render(
      <EuiTourStep
        {...config}
        {...steps[0]}
        isStepOpen={false}
        {...requiredProps}
      >
        <span>Test</span>
      </EuiTourStep>
    );

    expect(component).toMatchSnapshot();
  });

  test('can set a minWidth', () => {
    const component = render(
      <EuiTourStep {...config} {...steps[0]} minWidth={240} {...requiredProps}>
        <span>Test</span>
      </EuiTourStep>
    );

    expect(component).toMatchSnapshot();
  });

  test('can override the footer action', () => {
    const component = render(
      <EuiTourStep
        {...config}
        {...steps[0]}
        footerAction={<button onClick={() => {}}>Test</button>}
        {...requiredProps}
      >
        <span>Test</span>
      </EuiTourStep>
    );

    expect(component).toMatchSnapshot();
  });

  test('can turn off the beacon', () => {
    const component = render(
      <EuiTourStep
        {...config}
        {...steps[0]}
        decoration="none"
        {...requiredProps}
      >
        <span>Test</span>
      </EuiTourStep>
    );

    expect(component).toMatchSnapshot();
  });
});
