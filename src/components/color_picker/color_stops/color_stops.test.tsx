/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { render, mount } from 'enzyme';

import { EuiColorStops } from './color_stops';

import {
  VISUALIZATION_COLORS,
  DEFAULT_VISUALIZATION_COLOR,
  keys,
} from '../../../services';
import { requiredProps, findTestSubject } from '../../../test';
import { EuiFieldNumber } from '../../form/field_number';

jest.mock('../../portal', () => ({
  EuiPortal: ({ children }: { children: any }) => children,
}));

const onChange = jest.fn();

const colorStopsArray = [
  { stop: 0, color: '#FF0000' },
  { stop: 25, color: '#00FF00' },
  { stop: 35, color: '#0000FF' },
];

// Note: A couple tests that would be nice, but can't be accomplished at the moment:
// - Tab to bypass thumbs (tabindex="-1" not respected)
// - Drag to reposition thumb (we can't get real page position info)

test('renders EuiColorStops', () => {
  const colorStops = render(
    <EuiColorStops
      label="Test"
      onChange={onChange}
      colorStops={colorStopsArray}
      min={0}
      max={100}
      {...requiredProps}
    />
  );
  expect(colorStops).toMatchSnapshot();
});

test('renders free-range EuiColorStops', () => {
  const colorStops = render(
    <EuiColorStops
      label="Test"
      onChange={onChange}
      colorStops={[]}
      {...requiredProps}
    />
  );
  expect(colorStops).toMatchSnapshot();
});

test('renders min-only EuiColorStops', () => {
  const colorStops = render(
    <EuiColorStops
      label="Test"
      onChange={onChange}
      colorStops={[]}
      min={0}
      {...requiredProps}
    />
  );
  expect(colorStops).toMatchSnapshot();
});

test('renders max-only EuiColorStops', () => {
  const colorStops = render(
    <EuiColorStops
      label="Test"
      onChange={onChange}
      colorStops={[]}
      max={100}
      {...requiredProps}
    />
  );
  expect(colorStops).toMatchSnapshot();
});

test('renders compressed EuiColorStops', () => {
  const colorStops = render(
    <EuiColorStops
      label="Test"
      onChange={onChange}
      colorStops={colorStopsArray}
      min={0}
      max={100}
      compressed={true}
      {...requiredProps}
    />
  );
  expect(colorStops).toMatchSnapshot();
});

test('renders readOnly EuiColorStops', () => {
  const colorStops = render(
    <EuiColorStops
      label="Test"
      onChange={onChange}
      colorStops={colorStopsArray}
      min={0}
      max={100}
      readOnly={true}
      {...requiredProps}
    />
  );
  expect(colorStops).toMatchSnapshot();
});

test('renders fullWidth EuiColorStops', () => {
  const colorStops = render(
    <EuiColorStops
      label="Test"
      onChange={onChange}
      colorStops={colorStopsArray}
      min={0}
      max={100}
      fullWidth={true}
      {...requiredProps}
    />
  );
  expect(colorStops).toMatchSnapshot();
});

test('renders disabled EuiColorStops', () => {
  const colorStops = render(
    <EuiColorStops
      label="Test"
      onChange={onChange}
      colorStops={colorStopsArray}
      min={0}
      max={100}
      disabled={true}
      {...requiredProps}
    />
  );
  expect(colorStops).toMatchSnapshot();
});

test('renders fixed stop EuiColorStops', () => {
  const colorStops = render(
    <EuiColorStops
      label="Test"
      onChange={onChange}
      colorStops={colorStopsArray}
      min={0}
      max={100}
      stopType="fixed"
      {...requiredProps}
    />
  );
  expect(colorStops).toMatchSnapshot();
});

test('renders stepped stop EuiColorStops', () => {
  const colorStops = mount(
    <EuiColorStops
      label="Test"
      onChange={onChange}
      colorStops={colorStopsArray}
      min={0}
      max={100}
      stopType="stepped"
      stepNumber={10}
      {...requiredProps}
    />
  );
  expect(
    colorStops.find('.euiRangeHighlight__progress').prop('style')
  ).toMatchSnapshot();
});

test('renders empty EuiColorStops', () => {
  const colorStops = render(
    <EuiColorStops
      label="Test"
      onChange={onChange}
      colorStops={[]}
      min={0}
      max={100}
      {...requiredProps}
    />
  );
  expect(colorStops).toMatchSnapshot();
});

test('popover color selector is shown when the thumb is clicked', () => {
  const colorStops = mount(
    <EuiColorStops
      label="Test"
      onChange={onChange}
      colorStops={colorStopsArray}
      min={0}
      max={100}
      {...requiredProps}
    />
  );

  findTestSubject(colorStops, 'euiColorStopThumb')
    .first()
    .simulate('mousedown', { pageX: 0, pageY: 0 });
  const colorSelector = findTestSubject(colorStops, 'euiColorStopPopover');
  expect(colorSelector.length).toBe(1);
});

test('passes value input props to number input', () => {
  const colorStops = mount(
    <EuiColorStops
      label="Test"
      onChange={onChange}
      colorStops={colorStopsArray}
      min={0}
      max={100}
      valueInputProps={{
        append: '%',
      }}
      {...requiredProps}
    />
  );

  findTestSubject(colorStops, 'euiColorStopThumb')
    .first()
    .simulate('mousedown', { pageX: 0, pageY: 0 });
  const colorSelector = findTestSubject(colorStops, 'euiColorStopPopover');
  expect(colorSelector.find(EuiFieldNumber).prop('append')).toEqual('%');
});

test('stop input updates stops', () => {
  const colorStops = mount(
    <EuiColorStops
      label="Test"
      onChange={onChange}
      colorStops={colorStopsArray}
      min={0}
      max={100}
      {...requiredProps}
    />
  );

  findTestSubject(colorStops, 'euiColorStopThumb')
    .first()
    .simulate('mousedown', { pageX: 0, pageY: 0 });
  const event = { target: { value: '10' } };
  const inputs = colorStops.find('input[type="number"]');
  expect(inputs.length).toBe(1);
  inputs.simulate('change', event);
  expect(onChange).toBeCalled();
  expect(onChange).toBeCalledWith(
    [
      { color: '#FF0000', stop: 10 },
      { color: '#00FF00', stop: 25 },
      { color: '#0000FF', stop: 35 },
    ],
    false
  );
});

test('stop input updates stops with error prevention (reset to bounds)', () => {
  const colorStops = mount(
    <EuiColorStops
      label="Test"
      onChange={onChange}
      colorStops={colorStopsArray}
      min={0}
      max={100}
      {...requiredProps}
    />
  );

  findTestSubject(colorStops, 'euiColorStopThumb')
    .first()
    .simulate('mousedown', { pageX: 0, pageY: 0 });
  const event = { target: { value: '1000' } };
  const inputs = colorStops.find('input[type="number"]');
  inputs.simulate('change', event);
  expect(onChange).toBeCalled();
  expect(onChange).toBeCalledWith(
    [
      { color: '#FF0000', stop: 100 },
      { color: '#00FF00', stop: 25 },
      { color: '#0000FF', stop: 35 },
    ],
    false
  );
});

test('hex input updates stops', () => {
  const colorStops = mount(
    <EuiColorStops
      label="Test"
      onChange={onChange}
      colorStops={colorStopsArray}
      min={0}
      max={100}
      {...requiredProps}
    />
  );

  findTestSubject(colorStops, 'euiColorStopThumb')
    .first()
    .simulate('mousedown', { pageX: 0, pageY: 0 });
  const event = { target: { value: '#FFFFFF' } };
  const inputs = colorStops.find('input[type="text"]');
  expect(inputs.length).toBe(1);
  inputs.simulate('change', event);
  expect(onChange).toBeCalled();
  expect(onChange).toBeCalledWith(
    [
      { color: '#FFFFFF', stop: 0 },
      { color: '#00FF00', stop: 25 },
      { color: '#0000FF', stop: 35 },
    ],
    false
  );
});

test('hex input updates stops with error', () => {
  const colorStops = mount(
    <EuiColorStops
      label="Test"
      onChange={onChange}
      colorStops={colorStopsArray}
      min={0}
      max={100}
      {...requiredProps}
    />
  );

  findTestSubject(colorStops, 'euiColorStopThumb')
    .first()
    .simulate('mousedown', { pageX: 0, pageY: 0 });
  const event = { target: { value: '#FFFFF' } };
  const inputs = colorStops.find('input[type="text"]');
  inputs.simulate('change', event);
  expect(onChange).toBeCalled();
  expect(onChange).toBeCalledWith(
    [
      { color: '#FFFFF', stop: 0 },
      { color: '#00FF00', stop: 25 },
      { color: '#0000FF', stop: 35 },
    ],
    true // isInvalid
  );
});

test('picker updates stops', () => {
  const colorStops = mount(
    <EuiColorStops
      label="Test"
      onChange={onChange}
      colorStops={colorStopsArray}
      min={0}
      max={100}
      {...requiredProps}
    />
  );

  findTestSubject(colorStops, 'euiColorStopThumb')
    .first()
    .simulate('mousedown', { pageX: 0, pageY: 0 });
  const swatches = colorStops.find('button.euiColorPicker__swatchSelect');
  expect(swatches.length).toBe(VISUALIZATION_COLORS.length);
  swatches.first().simulate('click');
  expect(onChange).toBeCalled();
  expect(onChange).toBeCalledWith(
    [
      { color: VISUALIZATION_COLORS[0], stop: 0 },
      { color: '#00FF00', stop: 25 },
      { color: '#0000FF', stop: 35 },
    ],
    false
  );
});

test('thumb focus changes', () => {
  const colorStops = mount(
    <EuiColorStops
      label="Test"
      onChange={onChange}
      colorStops={colorStopsArray}
      min={0}
      max={100}
      {...requiredProps}
    />
  );

  const wrapper = findTestSubject(colorStops, 'euiColorStops');
  const thumbs = findTestSubject(colorStops, 'euiColorStopThumb');
  wrapper.simulate('focus');
  wrapper.simulate('keydown', {
    key: keys.ARROW_DOWN,
  });
  expect(thumbs.first().getDOMNode()).toEqual(document.activeElement);
  thumbs.first().simulate('keydown', {
    key: keys.ARROW_DOWN,
  });
  expect(thumbs.at(1).getDOMNode()).toEqual(document.activeElement);
});

test('thumb direction movement', () => {
  const colorStops = mount(
    <EuiColorStops
      label="Test"
      onChange={onChange}
      colorStops={colorStopsArray}
      min={0}
      max={100}
      {...requiredProps}
    />
  );

  const wrapper = findTestSubject(colorStops, 'euiColorStops');
  const thumbs = findTestSubject(colorStops, 'euiColorStopThumb');
  wrapper.simulate('focus');
  wrapper.simulate('keydown', {
    key: keys.ARROW_DOWN,
  });
  expect(thumbs.first().getDOMNode()).toEqual(document.activeElement);
  thumbs.first().simulate('keydown', {
    key: keys.ARROW_RIGHT,
  });
  expect(onChange).toBeCalledWith(
    [
      { color: '#FF0000', stop: 1 },
      { color: '#00FF00', stop: 25 },
      { color: '#0000FF', stop: 35 },
    ],
    false
  );
  thumbs.first().simulate('keydown', {
    key: keys.ARROW_LEFT,
  });
  expect(onChange).toBeCalledWith(
    [
      { color: '#FF0000', stop: 0 },
      { color: '#00FF00', stop: 25 },
      { color: '#0000FF', stop: 35 },
    ],
    false
  );
});

test('add new thumb via keyboard', () => {
  const colorStops = mount(
    <EuiColorStops
      label="Test"
      onChange={onChange}
      colorStops={colorStopsArray}
      min={0}
      max={100}
      {...requiredProps}
    />
  );

  const wrapper = findTestSubject(colorStops, 'euiColorStops');
  wrapper.simulate('focus');
  wrapper.simulate('keydown', {
    key: keys.ENTER,
  });
  expect(onChange).toBeCalled();
  expect(onChange).toBeCalledWith(
    [
      { color: '#FF0000', stop: 0 },
      { color: '#00FF00', stop: 25 },
      { color: '#0000FF', stop: 35 },
      { color: DEFAULT_VISUALIZATION_COLOR, stop: 45 },
    ],
    false
  );
});

test('add new thumb via click', () => {
  const colorStops = mount(
    <EuiColorStops
      label="Test"
      onChange={onChange}
      colorStops={colorStopsArray}
      min={0}
      max={100}
      {...requiredProps}
    />
  );

  const wrapper = findTestSubject(colorStops, 'euiColorStopsAdd');
  wrapper.simulate('click', { pageX: 45, pageY: 0 });
  expect(onChange).toBeCalled();
  // This is a very odd expectation.
  // But we can't get actual page positions in this environment (no getBoundingClientRect)
  // So we'll expect the _correct_ color and _incorrect_ stop value (NaN),
  // with the `isInvalid` arg _correctly_ true as a result.
  expect(onChange).toBeCalledWith(
    [
      { color: '#FF0000', stop: 0 },
      { color: '#00FF00', stop: 25 },
      { color: '#0000FF', stop: 35 },
      { color: DEFAULT_VISUALIZATION_COLOR, stop: NaN },
    ],
    true // isInvalid
  );
});
