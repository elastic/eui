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
import { shallow, mount } from 'enzyme';

import { EuiSuperUpdateButton } from './super_update_button';
import { EuiButton, EuiButtonProps } from '../../button';

const noop = () => {};

describe('EuiSuperUpdateButton', () => {
  test('is rendered', () => {
    const component = shallow(<EuiSuperUpdateButton onClick={noop} />);

    expect(component).toMatchSnapshot();
  });

  test('needsUpdate', () => {
    const component = shallow(
      <EuiSuperUpdateButton needsUpdate onClick={noop} />
    );

    expect(component).toMatchSnapshot();
  });

  test('isDisabled', () => {
    const component = shallow(
      <EuiSuperUpdateButton isDisabled onClick={noop} />
    );

    expect(component).toMatchSnapshot();
  });

  test('isLoading', () => {
    const component = shallow(
      <EuiSuperUpdateButton isLoading onClick={noop} />
    );

    expect(component).toMatchSnapshot();
  });

  test('showTooltip', () => {
    const component = shallow(
      <EuiSuperUpdateButton showTooltip onClick={noop} />
    );

    expect(component).toMatchSnapshot();
  });

  test('forwards props to EuiButton', () => {
    const speciallyHandledProps = {
      className: 'testClass',
      textProps: {
        className: 'textPropsTestClass',
        id: 'test',
      },
    };
    const extraProps: Partial<EuiButtonProps> = {
      fill: false,
      size: 's',
      contentProps: { id: 'contentSpan' },
    };

    const component = mount(
      <EuiSuperUpdateButton
        onClick={() => {}}
        {...speciallyHandledProps}
        {...extraProps}
      />
    );

    const {
      // props not passed through
      isDisabled,
      isLoading,
      onClick,

      // props with special handling
      className,
      textProps,

      ...forwardedProps
    } = component.find(EuiButton).props();

    expect(className).toBe('euiSuperUpdateButton testClass');
    expect(textProps).toEqual({
      className: 'euiSuperUpdateButton__text textPropsTestClass',
      id: 'test',
    });
    expect(forwardedProps).toMatchObject(extraProps);
  });
});
