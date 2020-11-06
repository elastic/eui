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

import { EuiColorPaletteDisplay, SIZES } from './color_palette_display';
import { requiredProps } from '../../../test';

const palette = ['#1fb0b2', '#ffdb6d', '#ee9191', '#ffffff', '#888094'];

const paletteWithStops = [
  {
    stop: 100,
    color: '#54B399',
  },
  {
    stop: 250,
    color: '#D36086',
  },
  {
    stop: 350,
    color: '#9170B8',
  },
  {
    stop: 470,
    color: '#F5A700',
  },
];

describe('EuiColorPaletteDisplay', () => {
  test('is rendered', () => {
    const component = render(
      <EuiColorPaletteDisplay {...requiredProps} palette={palette} />
    );

    expect(component).toMatchSnapshot();
  });

  describe('props', () => {
    describe('type and palette', () => {
      it('are rendered with type fixed and palette without stops', () => {
        const component = render(
          <EuiColorPaletteDisplay
            {...requiredProps}
            palette={palette}
            type="fixed"
          />
        );

        expect(component).toMatchSnapshot();
      });

      it('are rendered with type gradient and palette without stops', () => {
        const component = render(
          <EuiColorPaletteDisplay
            {...requiredProps}
            palette={palette}
            type="gradient"
          />
        );

        expect(component).toMatchSnapshot();
      });

      it('are rendered with type fixed and palette with stops', () => {
        const component = render(
          <EuiColorPaletteDisplay
            {...requiredProps}
            palette={paletteWithStops}
            type="fixed"
          />
        );

        expect(component).toMatchSnapshot();
      });

      it('are rendered with type gradient and palette with stops', () => {
        const component = render(
          <EuiColorPaletteDisplay
            {...requiredProps}
            palette={paletteWithStops}
            type="gradient"
          />
        );

        expect(component).toMatchSnapshot();
      });
    });

    describe('size', () => {
      SIZES.forEach((size) => {
        it(`${size} is rendered`, () => {
          const component = render(
            <EuiColorPaletteDisplay
              {...requiredProps}
              size={size}
              palette={palette}
            />
          );

          expect(component).toMatchSnapshot();
        });
      });
    });

    describe('HTML attributes', () => {
      it('accepts span attributes', () => {
        const component = render(
          <EuiColorPaletteDisplay
            {...requiredProps}
            palette={palette}
            type="fixed"
            id="id"
            title="title"
          />
        );

        expect(component).toMatchSnapshot();
      });
    });
  });
});
