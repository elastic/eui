/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { render, mount } from 'enzyme';
import { requiredProps } from '../../test/required_props';

import { EuiSuggestInput, ALL_STATUS } from './suggest_input';

describe('EuiSuggestInput', () => {
  test('is rendered', () => {
    const component = render(
      <EuiSuggestInput suggestions={<div />} {...requiredProps} />
    );

    expect(component).toMatchSnapshot();
  });

  describe('props', () => {
    describe('status', () => {
      ALL_STATUS.forEach((status) => {
        test(`status: ${status} is rendered`, () => {
          const component = render(
            <EuiSuggestInput
              {...requiredProps}
              suggestions={<div />}
              status={status}
            />
          );

          expect(component).toMatchSnapshot();
        });
      });
    });

    test('append', () => {
      const component = render(
        <EuiSuggestInput
          {...requiredProps}
          suggestions={<div />}
          append={<span>Appended</span>}
        />
      );

      expect(component).toMatchSnapshot();
    });

    describe('tooltipContent', () => {
      ALL_STATUS.forEach((status) => {
        test(`tooltipContent for status: ${status} is rendered`, () => {
          const component = render(
            <EuiSuggestInput
              {...requiredProps}
              suggestions={<div />}
              status={status}
              tooltipContent={status}
            />
          );

          expect(component).toMatchSnapshot();
        });
      });
    });

    test('sendValue', () => {
      const handler = jest.fn();
      const component = mount(
        <EuiSuggestInput
          {...requiredProps}
          suggestions={<div />}
          sendValue={handler}
        />
      );

      component.find('input').simulate('change', { value: 'a' });
      expect(handler).toBeCalled();
    });
  });
});
