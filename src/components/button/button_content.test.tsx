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

import { EuiButtonContent } from './button_content';

describe('EuiButtonContent', () => {
  test('is rendered', () => {
    const component = render(<EuiButtonContent {...requiredProps} />);

    expect(component).toMatchSnapshot();
  });

  describe('props', () => {
    test('children is rendered', () => {
      const component = render(<EuiButtonContent>Content</EuiButtonContent>);

      expect(component).toMatchSnapshot();
    });

    test('iconType is rendered', () => {
      const component = render(<EuiButtonContent iconType="bolt" />);

      expect(component).toMatchSnapshot();
    });

    test('iconSide is rendered', () => {
      const component = render(
        <EuiButtonContent iconSide="right" iconType="bolt" />
      );

      expect(component).toMatchSnapshot();
    });

    test('isLoading is rendered', () => {
      const component = render(<EuiButtonContent isLoading />);

      expect(component).toMatchSnapshot();
    });

    test('isLoading replaces iconType with spinner', () => {
      const component = render(<EuiButtonContent isLoading iconType="bolt" />);

      expect(component).toMatchSnapshot();
    });

    test('textProps is rendered', () => {
      const component = render(<EuiButtonContent textProps={requiredProps} />);

      expect(component).toMatchSnapshot();
    });
  });
});
