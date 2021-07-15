/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
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
