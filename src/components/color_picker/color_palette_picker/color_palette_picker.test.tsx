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

import {
  EuiColorPalettePicker,
  EuiColorPalettePickerPaletteProps,
} from './color_palette_picker';
import { requiredProps } from '../../../test';

jest.mock('./../../../services/accessibility', () => ({
  htmlIdGenerator: () => () => 'generated-id',
}));

const palettes: EuiColorPalettePickerPaletteProps[] = [
  {
    value: 'palette1',
    title: 'Palette 1',
    palette: ['#1fb0b2', '#ffdb6d'],
    type: 'fixed',
  },
];

describe('EuiColorPalettePicker', () => {
  test('is rendered', () => {
    const component = render(
      <EuiColorPalettePicker
        {...requiredProps}
        palettes={palettes}
        onChange={() => {}}
        valueOfSelected="palette1"
      />
    );

    expect(component).toMatchSnapshot();
  });

  describe('props', () => {
    test('selectionDisplay title is rendered', () => {
      const component = render(
        <EuiColorPalettePicker
          {...requiredProps}
          palettes={palettes}
          onChange={() => {}}
          valueOfSelected="palette1"
          selectionDisplay="title"
        />
      );

      expect(component).toMatchSnapshot();
    });

    test('palettes with type fixed is rendered', () => {
      const component = render(
        <EuiColorPalettePicker
          {...requiredProps}
          palettes={[
            {
              value: 'palette1',
              title: 'Fixed',
              palette: ['#1fb0b2', '#ffdb6d', '#ee9191', '#ffffff', '#888094'],
              type: 'fixed',
            },
          ]}
          onChange={() => {}}
          valueOfSelected="palette1"
        />
      );

      expect(component).toMatchSnapshot();
    });

    test('palettes with type gradient is rendered', () => {
      const component = render(
        <EuiColorPalettePicker
          {...requiredProps}
          palettes={[
            {
              value: 'palette1',
              title: 'Linear Gradient',
              palette: ['#1fb0b2', '#ffdb6d', '#ee9191', '#ffffff', '#888094'],
              type: 'gradient',
            },
          ]}
          onChange={() => {}}
          valueOfSelected="palette1"
        />
      );

      expect(component).toMatchSnapshot();
    });

    test('palettes with type gradient with stops is rendered', () => {
      const component = render(
        <EuiColorPalettePicker
          {...requiredProps}
          palettes={[
            {
              value: 'palette1',
              title: 'Linear Gradient with stops',
              palette: [
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
              ],
              type: 'gradient',
            },
          ]}
          onChange={() => {}}
          valueOfSelected="palette1"
        />
      );

      expect(component).toMatchSnapshot();
    });

    test('palettes with type text is rendered', () => {
      const component = render(
        <EuiColorPalettePicker
          {...requiredProps}
          palettes={[
            {
              value: 'custom',
              title: 'Plain text as a custom option',
              type: 'text',
            },
          ]}
          onChange={() => {}}
          valueOfSelected="custom"
        />
      );

      expect(component).toMatchSnapshot();
    });
  });
});
