/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import {
  requiredProps,
  startThrowingReactWarnings,
  stopThrowingReactWarnings,
} from '../../test';
import { shouldRenderCustomStyles } from '../../test/internal';
import { render } from '../../test/rtl';

import { EuiFlexItem } from './flex_item';

beforeAll(startThrowingReactWarnings);
afterAll(stopThrowingReactWarnings);

describe('EuiFlexItem', () => {
  shouldRenderCustomStyles(<EuiFlexItem />);

  it('renders', () => {
    const { container } = render(<EuiFlexItem {...requiredProps} />);

    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders as the passed component element', () => {
    const { container } = render(<EuiFlexItem component="span" />);

    expect(container.firstChild?.nodeName).toEqual('SPAN');
  });

  describe('grow', () => {
    // For some reason, `expect(...).toHaveStyle` is flaky, so we
    // have to assert on generated Emotion classNames instead
    const assertClassName = (expectedGrowClass: string) =>
      expect(
        document
          .querySelector('.euiFlexItem')!
          .className.endsWith(expectedGrowClass)
      ).toBeTruthy;

    describe('falsy values', () => {
      const VALUES = [0, false, null] as const;

      VALUES.forEach((value) => {
        test(`${value} generates a flex-grow of 0`, () => {
          render(<EuiFlexItem grow={value} />);
          assertClassName('growZero');
        });
      });
    });

    describe('default values', () => {
      const VALUES = [true, undefined] as const;

      VALUES.forEach((value) => {
        test(`${value} generates a flex-grow of 1`, () => {
          render(<EuiFlexItem grow={value} />);
          assertClassName('grow-1');
        });
      });
    });

    describe('numeric values', () => {
      const VALUES = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as const;

      VALUES.forEach((value) => {
        test(`${value} generates a flex-grow of ${value}`, () => {
          render(<EuiFlexItem grow={value} />);
          assertClassName(`grow-${value}`);
        });
      });
    });

    it('throws an error for invalid values', () => {
      // @ts-expect-error testing invalid type
      expect(() => render(<EuiFlexItem grow={11} />)).toThrowError();
    });
  });
});
