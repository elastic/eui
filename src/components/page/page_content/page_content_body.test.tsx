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
import { requiredProps } from '../../../test/required_props';

import { EuiPageContentBody, PADDING_SIZES } from './page_content_body';

describe('EuiPageContentBody', () => {
  test('is rendered', () => {
    const component = render(<EuiPageContentBody {...requiredProps} />);

    expect(component).toMatchSnapshot();
  });

  describe('paddingSize', () => {
    PADDING_SIZES.forEach((size) => {
      it(`${size} is rendered`, () => {
        const component = render(<EuiPageContentBody paddingSize={size} />);

        expect(component).toMatchSnapshot();
      });
    });
  });

  describe('restrict width', () => {
    test('can be set to a default', () => {
      const component = render(<EuiPageContentBody restrictWidth={true} />);

      expect(component).toMatchSnapshot();
    });

    test('can be set to a custom number', () => {
      const component = render(<EuiPageContentBody restrictWidth={1024} />);

      expect(component).toMatchSnapshot();
    });

    test('can be set to a custom value and does not override custom style', () => {
      const component = render(
        <EuiPageContentBody restrictWidth="24rem" style={{ color: 'red ' }} />
      );

      expect(component).toMatchSnapshot();
    });
  });
});
