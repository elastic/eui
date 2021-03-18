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

import { EuiCodeBlockImpl } from './_code_block';

const code = `var some = 'code';
console.log(some);`;

describe('EuiCodeBlockImpl', () => {
  describe('inline', () => {
    test('renders an inline code tag', () => {
      const component = render(
        <EuiCodeBlockImpl inline={true} {...requiredProps}>
          {code}
        </EuiCodeBlockImpl>
      );

      expect(component).toMatchSnapshot();
    });

    test('highlights javascript code, adding "js" class', () => {
      const component = render(
        <EuiCodeBlockImpl inline={true} language="js" />
      );

      expect(component).toMatchSnapshot();
    });

    test('renders with transparent background', () => {
      const component = render(
        <EuiCodeBlockImpl inline={true} transparentBackground={true} />
      );

      expect(component).toMatchSnapshot();
    });
  });

  describe('block', () => {
    test('renders a pre block tag', () => {
      const component = render(
        <EuiCodeBlockImpl inline={false} {...requiredProps}>
          {code}
        </EuiCodeBlockImpl>
      );

      expect(component).toMatchSnapshot();
    });

    test('highlights javascript code, adding "js" class', () => {
      const component = render(
        <EuiCodeBlockImpl inline={false} language="js" />
      );

      expect(component).toMatchSnapshot();
    });

    test('renders with transparent background', () => {
      const component = render(
        <EuiCodeBlockImpl inline={false} transparentBackground={true} />
      );

      expect(component).toMatchSnapshot();
    });

    test('renders a pre block tag with a css class modifier', () => {
      const component = render(
        <EuiCodeBlockImpl inline={false} whiteSpace="pre" {...requiredProps}>
          {code}
        </EuiCodeBlockImpl>
      );
      expect(component).toMatchSnapshot();
    });
  });
});
