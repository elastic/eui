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
import {
  EuiFormControlLayoutCustomIcon,
  EuiFormControlLayoutCustomIconProps,
} from './form_control_layout_custom_icon';
import { requiredProps } from '../../../test';

describe('EuiFormControlLayoutCustomIcon', () => {
  test('is rendered as button', () => {
    const props: EuiFormControlLayoutCustomIconProps = {
      onClick: () => null,
      type: 'alert',
      iconRef: 'icon',
    };
    const component = render(
      <EuiFormControlLayoutCustomIcon {...props} {...requiredProps} />
    );

    expect(component).toMatchSnapshot();
  });

  test('is rendered as span', () => {
    const props: EuiFormControlLayoutCustomIconProps = {
      type: 'alert',
      iconRef: 'icon',
    };
    const component = render(
      <EuiFormControlLayoutCustomIcon {...props} {...requiredProps} />
    );

    expect(component).toMatchSnapshot();
  });

  test('size is rendered', () => {
    const component = render(
      <EuiFormControlLayoutCustomIcon type="alert" size="s" />
    );

    expect(component).toMatchSnapshot();
  });
});
