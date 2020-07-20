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

import { EuiHeaderSection } from './header_section';

describe('EuiHeaderSection', () => {
  test('is rendered', () => {
    const component = render(<EuiHeaderSection {...requiredProps} />);

    expect(component).toMatchSnapshot();
  });

  test('renders optional params', () => {
    const component = render(
      <EuiHeaderSection style={{ color: 'blue' }}>
        <span>Some years ago never mind how long precisely...</span>
      </EuiHeaderSection>
    );

    expect(component).toMatchSnapshot();
  });

  describe('grow', () => {
    test('defaults to false', () => {
      const component = render(<EuiHeaderSection />);

      expect(component).toMatchSnapshot();
    });

    test('renders true', () => {
      const component = render(<EuiHeaderSection grow />);

      expect(component).toMatchSnapshot();
    });
  });

  describe('side', () => {
    test('defaults to left', () => {
      const component = render(<EuiHeaderSection />);

      expect(component).toMatchSnapshot();
    });

    test('renders right', () => {
      const component = render(<EuiHeaderSection side="right" />);

      expect(component).toMatchSnapshot();
    });
  });
});
