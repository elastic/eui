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

import { EuiExpression, COLORS } from './expression';

describe('EuiExpression', () => {
  test('renders', () => {
    const component = (
      <EuiExpression
        description="the answer is"
        value="42"
        isActive={false}
        // tslint:disable no-empty
        onClick={() => {}}
        {...requiredProps}
      />
    );

    expect(render(component)).toMatchSnapshot();
  });

  describe('props', () => {
    describe('color', () => {
      COLORS.forEach(color => {
        test(`${color} is rendered`, () => {
          const component = render(
            <EuiExpression
              description="the answer is"
              value="42"
              color={color}
              {...requiredProps}
            />
          );

          expect(component).toMatchSnapshot();
        });
      });
    });

    describe('uppercase', () => {
      test('true renders uppercase', () => {
        const component = (
          <EuiExpression
            description="the answer is"
            value="42"
            uppercase={true}
          />
        );

        expect(render(component)).toMatchSnapshot();
      });

      test('false renders inherited case', () => {
        const component = (
          <EuiExpression
            description="the answer is"
            value="42"
            uppercase={false}
          />
        );

        expect(render(component)).toMatchSnapshot();
      });
    });

    describe('display', () => {
      test('can be columns', () => {
        const component = (
          <EuiExpression
            description="the answer is"
            value="42"
            display="columns"
          />
        );

        expect(render(component)).toMatchSnapshot();
      });
    });

    describe('isInvalid', () => {
      test('renders error state', () => {
        const component = (
          <EuiExpression description="the answer is" value="42" isInvalid />
        );

        expect(render(component)).toMatchSnapshot();
      });
    });

    describe('descriptionWidth', () => {
      test('changes the description&apos;s width when using columns', () => {
        const component = (
          <EuiExpression
            description="the answer is"
            descriptionWidth={50}
            value="42"
            isInvalid
            display="columns"
          />
        );

        expect(render(component)).toMatchSnapshot();
      });
    });

    describe('textWrap', () => {
      test('can truncate text', () => {
        const component = (
          <EuiExpression
            description="the answer is"
            value="42"
            textWrap="truncate"
          />
        );

        expect(render(component)).toMatchSnapshot();
      });
    });

    describe('isActive', () => {
      test('true renders active', () => {
        const component = (
          <EuiExpression
            description="the answer is"
            value="42"
            isActive={true}
          />
        );

        expect(render(component)).toMatchSnapshot();
      });

      test('false renders inactive', () => {
        const component = (
          <EuiExpression
            description="the answer is"
            value="42"
            isActive={false}
          />
        );

        expect(render(component)).toMatchSnapshot();
      });
    });

    describe('onClick', () => {
      it('is called when the button is clicked', () => {
        const handler = jest.fn();
        const component = mount(
          <EuiExpression
            description="the answer is"
            value="42"
            isActive={false}
            onClick={handler}
            {...requiredProps}
          />
        );
        component.find('button').simulate('click');
        expect(handler.mock.calls.length).toEqual(1);
      });
    });
  });
});
