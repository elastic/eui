/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test';

import { EuiToken, COLORS, SHAPES, SIZES, FILLS } from './token';
import { TOKEN_MAP } from './token_map';
import { keysOf } from '../common';

const tokenTypes = keysOf(TOKEN_MAP);
const tokenColors = COLORS;

describe('EuiToken', () => {
  test('is rendered', () => {
    const component = render(<EuiToken iconType="dot" {...requiredProps} />);

    expect(component).toMatchSnapshot();
  });

  describe('props', () => {
    describe('iconType as EuiTokenMapType', () => {
      tokenTypes.forEach((type) => {
        test(`${type} is rendered`, () => {
          const component = render(<EuiToken iconType={type} />);

          expect(component).toMatchSnapshot();
        });
      });
    });

    describe('shape', () => {
      SHAPES.forEach((shape) => {
        test(`${shape} is rendered`, () => {
          const component = render(<EuiToken iconType="dot" shape={shape} />);

          expect(component).toMatchSnapshot();
        });
      });
    });

    describe('color', () => {
      tokenColors.forEach((color) => {
        test(`${color} is rendered`, () => {
          const component = render(<EuiToken iconType="dot" color={color} />);

          expect(component).toMatchSnapshot();
        });
      });

      test('can be a custom hex', () => {
        const component = render(<EuiToken iconType="dot" color="#FF0000" />);

        expect(component).toMatchSnapshot();
      });
    });

    describe('size', () => {
      SIZES.forEach((tokenSize) => {
        test(`${tokenSize} is rendered`, () => {
          const component = render(
            <EuiToken iconType="dot" size={tokenSize} />
          );

          expect(component).toMatchSnapshot();
        });
      });
    });

    describe('fill', () => {
      FILLS.forEach((fill) => {
        test(`${fill} is rendered`, () => {
          const component = render(<EuiToken iconType="dot" fill={fill} />);

          expect(component).toMatchSnapshot();
        });
      });
    });
  });
});
