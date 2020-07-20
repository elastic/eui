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

import { EuiCheckboxGroup } from './checkbox_group';

// This exists because we need to run the following tests
// without mocking the Checkbox component, such as testing
// an interaction that is handled by the Checkbox component.
describe('EuiCheckboxGroup behavior', () => {
  test('id is bound to onChange', () => {
    const onChangeHandler = jest.fn();
    const component = mount(
      <EuiCheckboxGroup
        options={[{ id: '1', label: 'kibana', disabled: false }]}
        idToSelectedMap={{
          '1': true,
        }}
        onChange={onChangeHandler}
      />
    );

    component.find('input[type="checkbox"]').simulate('change');
    expect(onChangeHandler).toBeCalledTimes(1);
    expect(onChangeHandler.mock.calls[0][0]).toBe('1');
  });
});
