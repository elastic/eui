/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { requiredProps } from '../../test';
import { shouldRenderCustomStyles } from '../../test/internal';
import { render } from '../../test/rtl';

import { EuiToken } from './token';
import { COLORS, SHAPES, SIZES, FILLS } from './token_types';
import { TOKEN_MAP_AMSTERDAM } from './token_map';
import { keysOf } from '../common';

const tokenTypes = keysOf(TOKEN_MAP_AMSTERDAM);
const tokenColors = COLORS;

describe('EuiToken', () => {
  shouldRenderCustomStyles(<EuiToken iconType="dot" />);

  test('is rendered', () => {
    const { container } = render(
      <EuiToken iconType="dot" {...requiredProps} />
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  describe('props', () => {
    describe('iconType as EuiTokenMapType', () => {
      tokenTypes.forEach((type) => {
        test(`${type} is rendered`, () => {
          const { container } = render(<EuiToken iconType={type} />);

          expect(container.firstChild).toMatchSnapshot();
        });
      });
    });

    describe('shape', () => {
      SHAPES.forEach((shape) => {
        test(`${shape} is rendered`, () => {
          const { container } = render(
            <EuiToken iconType="dot" shape={shape} />
          );

          expect(container.firstChild).toMatchSnapshot();
        });
      });
    });

    describe('color', () => {
      tokenColors.forEach((color) => {
        test(`${color} is rendered`, () => {
          const { container } = render(
            <EuiToken iconType="dot" color={color} />
          );

          expect(container.firstChild).toMatchSnapshot();
        });
      });

      test('can be a custom hex', () => {
        const { container } = render(
          <EuiToken iconType="dot" color="#FF0000" />
        );

        expect(container.firstChild).toMatchSnapshot();
      });
    });

    describe('size', () => {
      SIZES.forEach((tokenSize) => {
        test(`${tokenSize} is rendered`, () => {
          const { container } = render(
            <EuiToken iconType="dot" size={tokenSize} />
          );

          expect(container.firstChild).toMatchSnapshot();
        });
      });
    });

    describe('fill', () => {
      FILLS.forEach((fill) => {
        test(`${fill} is rendered`, () => {
          const { container } = render(<EuiToken iconType="dot" fill={fill} />);

          expect(container.firstChild).toMatchSnapshot();
        });
      });
    });
  });
});
