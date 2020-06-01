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
      tokenTypes.forEach(type => {
        test(`${type} is rendered`, () => {
          const component = render(<EuiToken iconType={type} />);

          expect(component).toMatchSnapshot();
        });
      });
    });

    describe('shape', () => {
      SHAPES.forEach(shape => {
        test(`${shape} is rendered`, () => {
          const component = render(<EuiToken iconType="dot" shape={shape} />);

          expect(component).toMatchSnapshot();
        });
      });
    });

    describe('color', () => {
      tokenColors.forEach(color => {
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
      SIZES.forEach(tokenSize => {
        test(`${tokenSize} is rendered`, () => {
          const component = render(
            <EuiToken iconType="dot" size={tokenSize} />
          );

          expect(component).toMatchSnapshot();
        });
      });
    });

    describe('fill', () => {
      FILLS.forEach(fill => {
        test(`${fill} is rendered`, () => {
          const component = render(<EuiToken iconType="dot" fill={fill} />);

          expect(component).toMatchSnapshot();
        });
      });
    });
  });
});
