/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { fireEvent } from '@testing-library/react';
import { requiredProps } from '../../test/required_props';
import { shouldRenderCustomStyles } from '../../test/internal';
import { render } from '../../test/rtl';

import { STATUS } from './step_number';
import { EuiStepHorizontal } from './step_horizontal';
import { SIZES } from './steps_horizontal';

describe('EuiStepHorizontal', () => {
  shouldRenderCustomStyles(
    <EuiStepHorizontal {...requiredProps} onClick={() => {}} />
  );

  test('is rendered', () => {
    const { container } = render(
      <EuiStepHorizontal {...requiredProps} onClick={() => {}} />
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  describe('props', () => {
    test('step', () => {
      const { container } = render(
        <EuiStepHorizontal step={5} onClick={() => {}} />
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    test('title', () => {
      const { container } = render(
        <EuiStepHorizontal title={'First step'} onClick={() => {}} />
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    describe('status', () => {
      STATUS.forEach((status) => {
        test(`${status} is rendered`, () => {
          const { container } = render(
            <EuiStepHorizontal status={status} onClick={() => {}} />
          );

          expect(container.firstChild).toMatchSnapshot();
        });
      });

      test('disabled overrides the passed status', () => {
        const { container } = render(
          <EuiStepHorizontal status="current" disabled onClick={() => {}} />
        );

        expect(container.firstChild).toMatchSnapshot();
      });
    });

    describe('size', () => {
      SIZES.forEach((size) => {
        test(`${size} is rendered`, () => {
          const { container } = render(
            <EuiStepHorizontal size={size} onClick={() => {}} />
          );

          expect(container.firstChild).toMatchSnapshot();
        });
      });
    });

    describe('onClick', () => {
      test('is called when clicked', () => {
        const onClickHandler = jest.fn();

        const { getByRole } = render(
          <EuiStepHorizontal step={1} onClick={onClickHandler} />
        );

        fireEvent.click(getByRole('button'));
        expect(onClickHandler).toHaveBeenCalledTimes(1);
      });

      test("isn't called when clicked if it's disabled", () => {
        const onClickHandler = jest.fn();

        const { getByRole } = render(
          <EuiStepHorizontal disabled step={1} onClick={onClickHandler} />
        );

        fireEvent.click(getByRole('button'));
        expect(onClickHandler).not.toHaveBeenCalled();
      });
    });
  });
});
