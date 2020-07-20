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
import { useDependentState } from './useDependentState';

describe('useDependentState', () => {
  it('sets the base state', () => {
    // this is a huge abuse of closure scope
    // but allows for jest's built in mock expect'ing
    let sourceValue = 2;
    const doubler = jest.fn(() => {
      return sourceValue * 2;
    });

    function Foo() {
      const [value] = useDependentState(doubler, [sourceValue]);

      return <div>{value}</div>;
    }

    // mount the component verify the state function was called with no previous state value
    const component = mount(<Foo />);
    expect(doubler).toHaveBeenCalledTimes(1);
    expect(doubler).toHaveBeenCalledWith();
    expect(component.text()).toBe('4'); // 2 * 2

    doubler.mockClear();

    // update the source value, force a re-render, and run checks
    sourceValue = 4;
    component.setProps({});
    expect(doubler).toHaveBeenCalledTimes(1);
    expect(doubler).toHaveBeenCalledWith(4); // check previous state value
    expect(component.text()).toBe('8'); // new value should be 4 * 2
  });
});
