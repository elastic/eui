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

import { EuiExpression, COLORS } from './expression';

describe('EuiExpression', () => {
  test('renders', () => {
    const component = (
      <EuiExpression
        description="the answer is"
        value="42"
        isActive={false}
        onClick={() => {}}
        {...requiredProps}
      />
    );

    expect(render(component)).toMatchSnapshot();
  });

  test('render with only description', () => {
    const component = (
      <EuiExpression
        description="the answer is"
        isActive={false}
        onClick={() => {}}
        {...requiredProps}
      />
    );
    expect(render(component)).toMatchSnapshot();
  });

  describe('props', () => {
    describe('color', () => {
      COLORS.forEach((color) => {
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
