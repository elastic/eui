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
import { requiredProps } from '../../test';

import { STATUS, EuiStepNumber } from './step_number';

describe('EuiStepNumber', () => {
  test('is rendered', () => {
    const component = render(<EuiStepNumber {...requiredProps} />);

    expect(component).toMatchSnapshot();
  });

  describe('props', () => {
    describe('isHollow', () => {
      it('is rendered', () => {
        const component = render(<EuiStepNumber number={1} isHollow />);

        expect(component).toMatchSnapshot();
      });
    });

    describe('has titleSize', () => {
      it('is rendered', () => {
        const component = render(<EuiStepNumber titleSize="xs" number={1} />);

        expect(component).toMatchSnapshot();
      });
    });

    describe('status', () => {
      STATUS.forEach(status => {
        test(`${status} is rendered`, () => {
          const component = render(
            <EuiStepNumber number={1} status={status} />
          );

          expect(component).toMatchSnapshot();
        });
      });
    });
  });
});
