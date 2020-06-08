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
import { mount } from 'enzyme';

import { findTestSubject } from './find_test_subject';

describe('findTestSubject', () => {
  test('finds the specified element in a mounted component', () => {
    const TestComponent = () => <div data-test-subj="test" />;
    const component = mount(<TestComponent />);
    const element = findTestSubject(component, 'test');

    expect(element.length).toBe(1);
  });

  test('finds the specified element even if it has multiple identifiers', () => {
    const TestComponent = () => <div data-test-subj="test1 test2" />;
    const component = mount(<TestComponent />);
    const element = findTestSubject(component, 'test2');

    expect(element.length).toBe(1);
  });

  test('finds multiple elements with the same identifier', () => {
    const TestComponent = () => (
      <div>
        <div data-test-subj="test" />
        <div data-test-subj="test" />
      </div>
    );
    const component = mount(<TestComponent />);
    const element = findTestSubject(component, 'test');

    expect(element.length).toBe(2);
  });

  describe('matcher optional argument', () => {
    test('finds multiple elements with identifiers beginning with the same string', () => {
      const TestComponent = () => (
        <div>
          <div data-test-subj="test1" />
          <div data-test-subj="test2" />
        </div>
      );
      const component = mount(<TestComponent />);
      const element = findTestSubject(component, 'test', '^=');

      expect(element.length).toBe(2);
    });

    test('throws an error if unsupported matcher is provided', () => {
      const TestComponent = () => <div data-test-subj="test" />;
      const component = mount(<TestComponent />);
      // @ts-ignore intentional error
      expect(() => findTestSubject(component, 'test', '===')).toThrow();
    });
  });
});
