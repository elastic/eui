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
import { render, shallow } from 'enzyme';
import { requiredProps } from '../../test';

import { EuiKeyPadMenuItem } from './key_pad_menu_item';

describe('EuiKeyPadMenuItem', () => {
  test('is rendered', () => {
    const component = render(
      <EuiKeyPadMenuItem label="Label" {...requiredProps} href="#">
        Icon
      </EuiKeyPadMenuItem>
    );

    expect(component).toMatchSnapshot();
  });

  test('renders href', () => {
    const component = render(
      <EuiKeyPadMenuItem label="Label" href="#">
        Icon
      </EuiKeyPadMenuItem>
    );

    expect(component).toMatchSnapshot();
  });

  test('renders href with rel', () => {
    const component = render(
      <EuiKeyPadMenuItem label="Label" href="#" rel="noreferrer">
        Icon
      </EuiKeyPadMenuItem>
    );

    expect(component).toMatchSnapshot();
  });

  test('renders button', () => {
    const onClickHandler = jest.fn();

    const component = render(
      <EuiKeyPadMenuItem label="Label" onClick={onClickHandler}>
        Icon
      </EuiKeyPadMenuItem>
    );

    expect(component).toMatchSnapshot();
  });

  test("onClick isn't called upon instantiation", () => {
    const onClickHandler = jest.fn();

    shallow(
      <EuiKeyPadMenuItem label="Label" onClick={onClickHandler}>
        Icon
      </EuiKeyPadMenuItem>
    );

    expect(onClickHandler).not.toBeCalled();
  });

  test('onClick is called when the button is clicked', () => {
    const onClickHandler = jest.fn();

    const $button = shallow(
      <EuiKeyPadMenuItem label="Label" onClick={onClickHandler}>
        Icon
      </EuiKeyPadMenuItem>
    );

    $button.simulate('click');

    expect(onClickHandler).toBeCalledTimes(1);
  });
});
