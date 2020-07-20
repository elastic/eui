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
import { requiredProps } from '../../test/required_props';

import { STATUS } from './step_number';
import { EuiStepHorizontal } from './step_horizontal';

describe('EuiStepHorizontal', () => {
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

    test('isSelected', () => {
      const component = render(
        <EuiStepHorizontal isSelected onClick={() => {}} />
      );

      expect(component).toMatchSnapshot();
    });

    test('isComplete', () => {
      const component = render(
        <EuiStepHorizontal isComplete onClick={() => {}} />
      );

      expect(component).toMatchSnapshot();
    });

    describe('status', () => {
      STATUS.forEach(status => {
        test(`${status} is rendered`, () => {
          const component = render(
            <EuiStepHorizontal status={status} onClick={() => {}} />
          );

          expect(component).toMatchSnapshot();
        });
      });
    });

    describe('onClick', () => {
      test('is called when clicked', () => {
        const onClickHandler = jest.fn();

        const component = mount(
          <EuiStepHorizontal step={1} onClick={onClickHandler} />
        );

        component.simulate('click');

        expect(onClickHandler).toBeCalledTimes(1);
      });

      test("isn't called when clicked if it's disabled", () => {
        const onClickHandler = jest.fn();

        const component = mount(
          <EuiStepHorizontal disabled step={1} onClick={onClickHandler} />
        );

        component.simulate('click');

        expect(onClickHandler).not.toBeCalled();
      });
    });
  });
});
