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

import { EuiSwitch } from './switch';

const props = {
  checked: false,
  label: 'Label',
  onChange: () => {},
};

describe('EuiSwitch', () => {
  test('is rendered', () => {
    const component = render(
      <EuiSwitch id="test" {...props} {...requiredProps} />
    );

    expect(component).toMatchSnapshot();
  });

  test('assigns automatically generated ID to label', () => {
    const component = render(<EuiSwitch {...props} />);

    expect(component).toMatchSnapshot();
  });
  describe('labelProps', () => {
    it('is rendered', () => {
      const component = render(
        <EuiSwitch {...props} labelProps={requiredProps} />
      );

      expect(component).toMatchSnapshot();
    });
  });
});
