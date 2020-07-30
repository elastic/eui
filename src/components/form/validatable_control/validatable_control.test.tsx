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
import { render, mount } from 'enzyme';

import { EuiValidatableControl } from './validatable_control';

describe('EuiValidatableControl', () => {
  test('is rendered', () => {
    const component = render(
      <EuiValidatableControl>
        <input />
      </EuiValidatableControl>
    );

    expect(component).toMatchSnapshot();
  });

  describe('ref management', () => {
    it('calls a ref function', () => {
      const ref = jest.fn();

      mount(
        <EuiValidatableControl>
          <input id="testInput" ref={ref} />
        </EuiValidatableControl>
      );

      expect(ref).toHaveBeenCalledTimes(1);

      const input = ref.mock.calls[0][0];
      expect(input.getAttribute('id')).toBe('testInput');
    });

    it('sets a ref object\'s "current" property', () => {
      const ref = React.createRef<HTMLInputElement>();

      mount(
        <EuiValidatableControl>
          <input id="testInput" ref={ref} />
        </EuiValidatableControl>
      );

      expect(ref.current).not.toBeNull();
      expect(ref.current!.getAttribute('id')).toBe('testInput');
    });
  });
});
