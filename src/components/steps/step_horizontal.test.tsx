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
import { shouldRenderCustomStyles } from '../../test/internal';

import { STATUS } from './step_number';
import { EuiStepHorizontal } from './step_horizontal';

describe('EuiStepHorizontal', () => {
  shouldRenderCustomStyles(
    <EuiStepHorizontal {...requiredProps} onClick={() => {}} />
  );

  test('is rendered', () => {
    const component = render(
      <EuiStepHorizontal {...requiredProps} onClick={() => {}} />
    );

    expect(component).toMatchSnapshot();
  });

  describe('props', () => {
    test('step', () => {
      const component = render(
        <EuiStepHorizontal step={5} onClick={() => {}} />
      );

      expect(component).toMatchSnapshot();
    });

    test('title', () => {
      const component = render(
        <EuiStepHorizontal title={'First step'} onClick={() => {}} />
      );

      expect(component).toMatchSnapshot();
    });

    describe('status', () => {
      STATUS.forEach((status) => {
        test(`${status} is rendered`, () => {
          const component = render(
            <EuiStepHorizontal status={status} onClick={() => {}} />
          );

          expect(component).toMatchSnapshot();
        });
      });

      test('disabled overrides the passed status', () => {
        const component = render(
          <EuiStepHorizontal status="current" disabled onClick={() => {}} />
        );

        expect(component).toMatchSnapshot();
      });
    });

    describe('onClick', () => {
      test('is called when clicked', () => {
        const onClickHandler = jest.fn();

        const component = mount(
          <EuiStepHorizontal step={1} onClick={onClickHandler} />
        );

        component.find('button').simulate('click');
        expect(onClickHandler.mock.calls.length).toEqual(1);
      });

      test("isn't called when clicked if it's disabled", () => {
        const onClickHandler = jest.fn();

        const component = mount(
          <EuiStepHorizontal disabled step={1} onClick={onClickHandler} />
        );

        component.find('button').simulate('click');
        expect(onClickHandler.mock.calls.length).toEqual(0);
      });
    });
  });
});
