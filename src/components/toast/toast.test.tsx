/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { render, mount } from 'enzyme';
import { findTestSubject, requiredProps } from '../../test';

import { COLORS, EuiToast } from './toast';

describe('EuiToast', () => {
  test('is rendered', () => {
    const component = render(
      <EuiToast {...requiredProps} title="test title">
        <p>Hi</p>
      </EuiToast>
    );

    expect(component).toMatchSnapshot();
  });

  describe('Props', () => {
    describe('title', () => {
      test('is rendered', () => {
        const component = <EuiToast title="toast title" />;
        expect(mount(component)).toMatchSnapshot();
      });
    });

    describe('color', () => {
      COLORS.forEach((color) => {
        test(`${color} is rendered`, () => {
          const component = <EuiToast color={color} title="test title" />;
          expect(mount(component)).toMatchSnapshot();
        });
      });
    });

    describe('iconType', () => {
      test('is rendered', () => {
        const component = <EuiToast iconType="user" title="test title" />;
        expect(mount(component)).toMatchSnapshot();
      });
    });

    describe('onClose', () => {
      test('is called when the close button is clicked', () => {
        const onCloseHandler = jest.fn();

        const component = mount(
          <EuiToast onClose={onCloseHandler} title="test title" />
        );
        const closeButton = findTestSubject(component, 'toastCloseButton');
        closeButton.simulate('click');

        expect(onCloseHandler).toBeCalledTimes(1);
      });
    });
  });
});
