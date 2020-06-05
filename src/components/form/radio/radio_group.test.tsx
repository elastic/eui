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
import { requiredProps } from '../../../test';

import { EuiRadioGroup } from './radio_group';

jest.mock('../radio', () => ({ EuiRadio: 'eui_radio' }));

describe('EuiRadioGroup', () => {
  test('is rendered', () => {
    const component = render(
      <EuiRadioGroup {...requiredProps} options={[]} onChange={() => {}} />
    );

    expect(component).toMatchSnapshot();
  });

  describe('props', () => {
    test('options are rendered', () => {
      const component = render(
        <EuiRadioGroup
          options={[
            { id: '1', label: 'Option #1' },
            { id: '2', label: 'Option #2', disabled: true },
          ]}
          onChange={() => {}}
        />
      );

      expect(component).toMatchSnapshot();
    });

    test('name is propagated to radios', () => {
      const component = render(
        <EuiRadioGroup
          name="radiogroupname"
          options={[
            { id: '1', label: 'Option #1' },
            { id: '2', label: 'Option #2' },
          ]}
          onChange={() => {}}
        />
      );

      expect(component).toMatchSnapshot();
    });

    test('idSelected is rendered', () => {
      const component = render(
        <EuiRadioGroup
          options={[
            { id: '1', label: 'Option #1' },
            { id: '2', label: 'Option #2' },
          ]}
          idSelected="1"
          onChange={() => {}}
        />
      );

      expect(component).toMatchSnapshot();
    });

    test('value is propagated to radios', () => {
      const component = render(
        <EuiRadioGroup
          name="radiogroupname"
          options={[
            { id: '1', label: 'Option #1', value: 'Value #1' },
            { id: '2', label: 'Option #2', value: 'Value #2' },
          ]}
          onChange={() => {}}
        />
      );

      expect(component).toMatchSnapshot();
    });

    test('legend is rendered', () => {
      const component = render(
        <EuiRadioGroup
          options={[
            { id: '1', label: 'Option #1' },
            { id: '2', label: 'Option #2' },
          ]}
          onChange={() => {}}
          legend={{
            children: 'A legend',
          }}
        />
      );

      expect(component).toMatchSnapshot();
    });
  });

  describe('callbacks', () => {
    test('id is used in callbacks when no value is available', () => {
      const callback = jest.fn();

      const component = mount(
        <EuiRadioGroup
          name="radiogroupname"
          options={[
            { id: '1', label: 'Option #1' },
            { id: '2', label: 'Option #2' },
          ]}
          onChange={callback}
        />
      );

      component.find('input[id="2"]').simulate('change');

      expect(callback).toHaveBeenCalledTimes(1);
      const event = expect.any(Object);
      expect(callback).toHaveBeenCalledWith('2', undefined, event);
    });

    test('value is used in callbacks when available', () => {
      const callback = jest.fn();

      const component = mount(
        <EuiRadioGroup
          name="radiogroupname"
          options={[
            { id: '1', label: 'Option #1', value: 'Value #1' },
            { id: '2', label: 'Option #2', value: 'Value #2' },
          ]}
          onChange={callback}
        />
      );

      component.find('input[id="2"]').simulate('change');

      expect(callback).toHaveBeenCalledTimes(1);
      const event = expect.any(Object);
      expect(callback).toHaveBeenCalledWith('2', 'Value #2', event);
    });
  });
});
