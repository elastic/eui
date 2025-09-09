/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { fireEvent } from '@testing-library/react';
import { shouldRenderCustomStyles } from '../../test/internal';
import { requiredProps } from '../../test/required_props';
import { render } from '../../test/rtl';

import { EuiExpression, COLORS } from './expression';

describe('EuiExpression', () => {
  shouldRenderCustomStyles(
    <EuiExpression description="the answer is" value="42" />,
    { childProps: ['descriptionProps', 'valueProps'] }
  );

  test('renders', () => {
    const { container } = render(
      <EuiExpression
        description="the answer is"
        value="42"
        isActive={false}
        onClick={() => {}}
        {...requiredProps}
      />
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('render with only description', () => {
    const { container } = render(
      <EuiExpression
        description="the answer is"
        isActive={false}
        onClick={() => {}}
        {...requiredProps}
      />
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  describe('props', () => {
    describe('color', () => {
      COLORS.forEach((color) => {
        test(`${color} is rendered`, () => {
          const { container } = render(
            <EuiExpression
              description="the answer is"
              value="42"
              color={color}
              {...requiredProps}
            />
          );

          expect(container.firstChild).toMatchSnapshot();
        });
      });
    });

    describe('uppercase', () => {
      test('true renders uppercase', () => {
        const { container } = render(
          <EuiExpression
            description="the answer is"
            value="42"
            uppercase={true}
          />
        );

        expect(container.firstChild).toMatchSnapshot();
      });

      test('false renders inherited case', () => {
        const { container } = render(
          <EuiExpression
            description="the answer is"
            value="42"
            uppercase={false}
          />
        );

        expect(container.firstChild).toMatchSnapshot();
      });
    });

    describe('display', () => {
      test('can be columns', () => {
        const { container } = render(
          <EuiExpression
            description="the answer is"
            value="42"
            display="columns"
          />
        );

        expect(container.firstChild).toMatchSnapshot();
      });
    });

    describe('isInvalid', () => {
      test('renders error state', () => {
        const { container } = render(
          <EuiExpression description="the answer is" value="42" isInvalid />
        );

        expect(container.firstChild).toMatchSnapshot();
      });
    });

    describe('descriptionWidth', () => {
      test('changes the description&apos;s width when using columns', () => {
        const { container } = render(
          <EuiExpression
            description="the answer is"
            descriptionWidth={50}
            value="42"
            isInvalid
            display="columns"
          />
        );

        expect(container.firstChild).toMatchSnapshot();
      });
    });

    describe('textWrap', () => {
      test('can truncate text', () => {
        const { container } = render(
          <EuiExpression
            description="the answer is"
            value="42"
            textWrap="truncate"
          />
        );

        expect(container.firstChild).toMatchSnapshot();
      });
    });

    describe('isActive', () => {
      test('true renders active', () => {
        const { container } = render(
          <EuiExpression
            description="the answer is"
            value="42"
            isActive={true}
          />
        );

        expect(container.firstChild).toMatchSnapshot();
      });

      test('false renders inactive', () => {
        const { container } = render(
          <EuiExpression
            description="the answer is"
            value="42"
            isActive={false}
          />
        );

        expect(container.firstChild).toMatchSnapshot();
      });
    });

    describe('onClick', () => {
      it('is called when the button is clicked', () => {
        const handler = jest.fn();
        const { getByRole } = render(
          <EuiExpression
            description="the answer is"
            value="42"
            isActive={false}
            onClick={handler}
            {...requiredProps}
          />
        );
        fireEvent.click(getByRole('button'));
        expect(handler).toHaveBeenCalledTimes(1);
      });
    });
  });
});
