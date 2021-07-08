/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
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
