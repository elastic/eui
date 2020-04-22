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

import { EuiStep } from './step';
import { STATUS } from './step_number';

describe('EuiStep', () => {
  test('is rendered', () => {
    const component = render(
      <EuiStep {...requiredProps} title={'First step'}>
        <p>Do this</p>
      </EuiStep>
    );

    expect(component).toMatchSnapshot();
  });

  describe('props', () => {
    test('headingElement', () => {
      const component = render(
        <EuiStep headingElement={'h3'} title={'First step'}>
          <p>Do this</p>
        </EuiStep>
      );

      expect(component).toMatchSnapshot();
    });

    test('step', () => {
      const component = render(
        <EuiStep step={5} title={'First step'}>
          <p>Do this</p>
        </EuiStep>
      );

      expect(component).toMatchSnapshot();
    });

    describe('status', () => {
      STATUS.forEach(status => {
        test(`${status} is rendered`, () => {
          const component = render(
            <EuiStep status={status} title={'First step'}>
              <p>Do this</p>
            </EuiStep>
          );

          expect(component).toMatchSnapshot();
        });
      });
    });
  });
});
