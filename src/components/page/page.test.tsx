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

import { EuiPage, SIZES } from './page';

describe('EuiPage', () => {
  test('is rendered', () => {
    const component = render(<EuiPage {...requiredProps} />);

    expect(component).toMatchSnapshot();
  });

  describe('paddingSize', () => {
    SIZES.forEach((size) => {
      it(`${size} is rendered`, () => {
        const component = render(<EuiPage paddingSize={size} />);

        expect(component).toMatchSnapshot();
      });
    });
  });

  describe('grow', () => {
    test('can be false', () => {
      const component = render(<EuiPage grow={false} />);

      expect(component).toMatchSnapshot();
    });
  });

  describe('direction', () => {
    test('can be row', () => {
      const component = render(<EuiPage direction="row" />);

      expect(component).toMatchSnapshot();
    });
  });

  describe('restrict width', () => {
    test('can be set to a default', () => {
      const component = render(<EuiPage restrictWidth={true} />);

      expect(component).toMatchSnapshot();
    });

    test('can be set to a custom number', () => {
      const component = render(<EuiPage restrictWidth={1024} />);

      expect(component).toMatchSnapshot();
    });

    test('can be set to a custom value and does not override custom style', () => {
      const component = render(
        <EuiPage restrictWidth="24rem" style={{ color: 'red ' }} />
      );

      expect(component).toMatchSnapshot();
    });
  });
});
