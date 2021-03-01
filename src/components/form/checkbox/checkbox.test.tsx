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
import {
  requiredProps,
  startThrowingReactWarnings,
  stopThrowingReactWarnings,
} from '../../../test';

import { EuiCheckbox, TYPES } from './checkbox';

beforeAll(startThrowingReactWarnings);
afterAll(stopThrowingReactWarnings);

const checkboxRequiredProps = {
  id: 'id',
  onChange: () => {},
};

describe('EuiCheckbox', () => {
  test('is rendered', () => {
    const component = render(
      <EuiCheckbox id="id" onChange={() => {}} {...requiredProps} />
    );

    expect(component).toMatchSnapshot();
  });

  describe('props', () => {
    test('check is rendered', () => {
      const component = render(
        <EuiCheckbox {...checkboxRequiredProps} checked />
      );

      expect(component).toMatchSnapshot();
    });

    test('label is rendered', () => {
      const component = render(
        <EuiCheckbox {...checkboxRequiredProps} label={<span>Label</span>} />
      );

      expect(component).toMatchSnapshot();
    });

    test('labelProps is rendered', () => {
      const component = render(
        <EuiCheckbox
          {...checkboxRequiredProps}
          label="Label"
          labelProps={requiredProps}
        />
      );

      expect(component).toMatchSnapshot();
    });
    describe('type', () => {
      TYPES.forEach((value) => {
        test(`${value} is rendered`, () => {
          const component = render(
            <EuiCheckbox {...checkboxRequiredProps} type={value} />
          );

          expect(component).toMatchSnapshot();
        });
      });
    });

    describe('disabled', () => {
      test('disabled is rendered', () => {
        const component = render(
          <EuiCheckbox {...checkboxRequiredProps} disabled />
        );

        expect(component).toMatchSnapshot();
      });
    });
  });
});
