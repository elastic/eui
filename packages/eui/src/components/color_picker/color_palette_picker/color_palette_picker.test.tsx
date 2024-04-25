/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { mount } from 'enzyme';
import { render } from '../../../test/rtl';

import {
  EuiColorPalettePicker,
  EuiColorPalettePickerPaletteProps,
} from './color_palette_picker';
import { requiredProps, takeMountedSnapshot } from '../../../test';

const palettes: EuiColorPalettePickerPaletteProps[] = [
  {
    value: 'paletteFixed',
    title: 'Palette 1',
    palette: ['#1fb0b2', '#ffdb6d', '#ee9191', '#ffffff', '#888094'],
    type: 'fixed',
    'data-test-subj': 'fixed-data-test-subj',
    className: 'paletteFixedClass',
    'aria-label': 'my palette fixed',
  },
  {
    value: 'paletteLinear',
    title: 'Linear Gradient',
    palette: ['#1fb0b2', '#ffdb6d', '#ee9191', '#ffffff', '#888094'],
    type: 'gradient',
    'data-test-subj': 'gradient-data-test-subj',
    className: 'paletteLinearClass',
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
    'data-test-subj': 'gradient-with-stops-data-test-subj',
  },
  {
    value: 'custom',
    title: 'Plain text as a custom option',
    type: 'text',
    'data-test-subj': 'text-data-test-subj',
  },
];

describe('EuiColorPalettePicker', () => {
  test('is rendered', () => {
    const { container } = render(
      <EuiColorPalettePicker
        {...requiredProps}
        palettes={palettes}
        onChange={() => {}}
      />
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('is rendered with a selected fixed palette', () => {
    const { container } = render(
      <EuiColorPalettePicker
        {...requiredProps}
        palettes={palettes}
        onChange={() => {}}
        valueOfSelected="paletteFixed"
      />
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('is rendered with a selected gradient palette', () => {
    const { container } = render(
      <EuiColorPalettePicker
        {...requiredProps}
        palettes={palettes}
        onChange={() => {}}
        valueOfSelected="paletteLinear"
      />
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('is rendered with a selected gradient palette with stops', () => {
    const { container } = render(
      <EuiColorPalettePicker
        {...requiredProps}
        palettes={palettes}
        onChange={() => {}}
        valueOfSelected="paletteLinearStops"
      />
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('is rendered with a selected custom text', () => {
    const { container } = render(
      <EuiColorPalettePicker
        {...requiredProps}
        palettes={palettes}
        onChange={() => {}}
        valueOfSelected="custom"
      />
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('is rendered with the prop selectionDisplay set as title ', () => {
    const { container } = render(
      <EuiColorPalettePicker
        {...requiredProps}
        palettes={palettes}
        onChange={() => {}}
        valueOfSelected="paletteFixed"
        selectionDisplay="title"
      />
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('more props are propagated to each option', () => {
    const component = mount(
      <EuiColorPalettePicker
        palettes={palettes}
        valueOfSelected="paletteFixed"
        onChange={() => {}}
        data-test-subj="colorPalettePicker"
      />
    );

    component
      .find('button[data-test-subj="colorPalettePicker"]')
      .simulate('click');

    expect(takeMountedSnapshot(component)).toMatchSnapshot();
  });
});
