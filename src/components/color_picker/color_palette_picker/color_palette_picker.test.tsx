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
    value: 'paletteFixed',
    title: 'Palette 1',
    palette: ['#1fb0b2', '#ffdb6d', '#ee9191', '#ffffff', '#888094'],
    type: 'fixed',
  },
  {
    value: 'paletteLinear',
    title: 'Linear Gradient',
    palette: ['#1fb0b2', '#ffdb6d', '#ee9191', '#ffffff', '#888094'],
    type: 'gradient',
  },
  {
    value: 'paletteLinearStops',
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
  {
    value: 'custom',
    title: 'Plain text as a custom option',
    type: 'text',
  },
];

describe('EuiColorPalettePicker', () => {
  test('is rendered', () => {
    const component = render(
      <EuiColorPalettePicker
        {...requiredProps}
        palettes={palettes}
        onChange={() => {}}
      />
    );

    expect(component).toMatchSnapshot();
  });

  test('is rendered with a selected fixed palette', () => {
    const component = render(
      <EuiColorPalettePicker
        {...requiredProps}
        palettes={palettes}
        onChange={() => {}}
        valueOfSelected="paletteFixed"
      />
    );

    expect(component).toMatchSnapshot();
  });

  test('is rendered with a selected gradient palette', () => {
    const component = render(
      <EuiColorPalettePicker
        {...requiredProps}
        palettes={palettes}
        onChange={() => {}}
        valueOfSelected="paletteLinear"
      />
    );

    expect(component).toMatchSnapshot();
  });

  test('is rendered with a selected gradient palette with stops', () => {
    const component = render(
      <EuiColorPalettePicker
        {...requiredProps}
        palettes={palettes}
        onChange={() => {}}
        valueOfSelected="paletteLinearStops"
      />
    );

    expect(component).toMatchSnapshot();
  });

  test('is rendered with a selected custom text', () => {
    const component = render(
      <EuiColorPalettePicker
        {...requiredProps}
        palettes={palettes}
        onChange={() => {}}
        valueOfSelected="custom"
      />
    );

    expect(component).toMatchSnapshot();
  });

  test('is rendered with the prop selectionDisplay set as title ', () => {
    const component = render(
      <EuiColorPalettePicker
        {...requiredProps}
        palettes={palettes}
        onChange={() => {}}
        valueOfSelected="paletteFixed"
        selectionDisplay="title"
      />
    );

    expect(component).toMatchSnapshot();
  });
});
