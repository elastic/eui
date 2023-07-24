/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { shouldRenderCustomStyles } from '../../test/internal';
import { requiredProps } from '../../test/required_props';
import { render } from '../../test/rtl';

import { EuiPanel, SIZES, COLORS, BORDER_RADII } from './panel';

describe('EuiPanel', () => {
  shouldRenderCustomStyles(<EuiPanel />);

  test('is rendered', () => {
    const { container } = render(<EuiPanel {...requiredProps} />);

    expect(container.firstChild).toMatchSnapshot();
  });

  describe('props', () => {
    describe('hasShadow', () => {
      test('can be false', () => {
        const { container } = render(<EuiPanel hasShadow={false} />);

        expect(container.firstChild).toMatchSnapshot();
      });
    });

    describe('grow', () => {
      test('can be false', () => {
        const { container } = render(<EuiPanel grow={false} />);

        expect(container.firstChild).toMatchSnapshot();
      });
    });

    describe('hasBorder', () => {
      test('can be false', () => {
        const { container } = render(<EuiPanel hasBorder={false} />);

        expect(container.firstChild).toMatchSnapshot();
      });
      test('can be true', () => {
        const { container } = render(<EuiPanel hasBorder={true} />);

        expect(container.firstChild).toMatchSnapshot();
      });
    });

    describe('paddingSize', () => {
      SIZES.forEach((size) => {
        test(`${size} is rendered`, () => {
          const { container } = render(<EuiPanel paddingSize={size} />);

          expect(container.firstChild).toMatchSnapshot();
        });
      });
    });

    describe('color', () => {
      COLORS.forEach((color) => {
        test(`${color} is rendered`, () => {
          const { container } = render(<EuiPanel color={color} />);

          expect(container.firstChild).toMatchSnapshot();
        });
      });
    });

    describe('borderRadius', () => {
      BORDER_RADII.forEach((borderRadius) => {
        test(`${borderRadius} is rendered`, () => {
          const { container } = render(
            <EuiPanel borderRadius={borderRadius} />
          );

          expect(container.firstChild).toMatchSnapshot();
        });
      });
    });

    describe('onClick', () => {
      const { container } = render(
        <EuiPanel {...requiredProps} onClick={jest.fn()} />
      );

      expect(container.firstChild).toMatchSnapshot();
    });
  });
});
