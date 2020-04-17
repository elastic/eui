/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
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
        {...requiredProps}>
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
        {...requiredProps}>
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
        {...requiredProps}>
        <span>Test</span>
      </EuiTourStep>
    );

    expect(component).toMatchSnapshot();
  });
});
