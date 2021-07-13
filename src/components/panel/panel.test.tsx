/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test/required_props';

import { EuiPanel, SIZES, COLORS, BORDER_RADII } from './panel';

describe('EuiPanel', () => {
  test('is rendered', () => {
    const component = render(<EuiPanel {...requiredProps} />);

    expect(component).toMatchSnapshot();
  });

  describe('props', () => {
    describe('hasShadow', () => {
      test('can be false', () => {
        const component = render(<EuiPanel hasShadow={false} />);

        expect(component).toMatchSnapshot();
      });
    });

    describe('grow', () => {
      test('can be false', () => {
        const component = render(<EuiPanel grow={false} />);

        expect(component).toMatchSnapshot();
      });
    });

    describe('hasBorder', () => {
      test('can be false', () => {
        const component = render(<EuiPanel hasBorder={false} />);

        expect(component).toMatchSnapshot();
      });
      test('can be true', () => {
        const component = render(<EuiPanel hasBorder={true} />);

        expect(component).toMatchSnapshot();
      });
    });

    describe('paddingSize', () => {
      SIZES.forEach((size) => {
        test(`${size} is rendered`, () => {
          const component = render(<EuiPanel paddingSize={size} />);

          expect(component).toMatchSnapshot();
        });
      });
    });

    describe('color', () => {
      COLORS.forEach((color) => {
        test(`${color} is rendered`, () => {
          const component = render(<EuiPanel color={color} />);

          expect(component).toMatchSnapshot();
        });
      });
    });

    describe('borderRadius', () => {
      BORDER_RADII.forEach((borderRadius) => {
        test(`${borderRadius} is rendered`, () => {
          const component = render(<EuiPanel borderRadius={borderRadius} />);

          expect(component).toMatchSnapshot();
        });
      });
    });
  });
});
