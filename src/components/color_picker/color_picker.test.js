import React from 'react';
import { render, mount } from 'enzyme';
import sinon from 'sinon';

import { EuiColorPicker } from './color_picker';
import { requiredProps } from '../../test/required_props';

let onChange;

beforeEach(() => {
  onChange = sinon.spy();

  // There's a `console.error` within `react-color`, so we're just "hiding it"
  sinon.stub(console, 'error');
});

afterEach(() => {
  console.error.restore(); // eslint-disable-line no-console
});

test('renders EuiColorPicker', () => {
  const colorPicker = render(
    <EuiColorPicker onChange={onChange} color="#ffeedd" {...requiredProps} />
  );
  expect(colorPicker).toMatchSnapshot();
});

test('renders EuiColorPicker with an empty swatch when color is null', () => {
  const colorPicker = render(
    <EuiColorPicker onChange={onChange} color={null} {...requiredProps} />
  );
  expect(colorPicker).toMatchSnapshot();
});

test('renders EuiColorPicker without a color label when showColorLabel is false', () => {
  const colorPicker = render(
    <EuiColorPicker
      onChange={onChange}
      color={'#ffffff'}
      showColorLabel={false}
      {...requiredProps}
    />
  );
  expect(colorPicker).toMatchSnapshot();
});

test('pop up color selector is not shown by default', () => {
  const colorPicker = mount(
    <EuiColorPicker onChange={onChange} color="#ffeedd" {...requiredProps} />
  );

  const colorSelector = colorPicker.find('[data-test-subj="colorPickerPopup"]');
  expect(colorSelector.length).toBe(0);
});

test('pop up color selector is shown when the color swatch is clicked', () => {
  const colorPicker = mount(
    <EuiColorPicker onChange={onChange} color="#ffeedd" {...requiredProps} />
  );

  colorPicker.find('[data-test-subj="colorSwatch"]').simulate('click');
  const colorSelector = colorPicker.find('[data-test-subj="colorPickerPopup"]');
  expect(colorSelector.length).toBe(1);
});

test('pop up color selector is hidden when the color swatch is clicked twice', () => {
  const colorPicker = mount(
    <EuiColorPicker onChange={onChange} color="#ffeedd" {...requiredProps} />
  );

  colorPicker.find('[data-test-subj="colorSwatch"]').simulate('click');
  colorPicker.find('[data-test-subj="colorSwatch"]').simulate('click');
  const colorSelector = colorPicker.find('[data-test-subj="colorPickerPopup"]');
  expect(colorSelector.length).toBe(0);
});

test('Setting a new color calls onChange', () => {
  const colorPicker = mount(
    <EuiColorPicker onChange={onChange} color="#ffeedd" {...requiredProps} />
  );

  colorPicker.find('[data-test-subj="colorSwatch"]').simulate('click');
  const event = { target: { value: '#000000' } };
  const inputs = colorPicker.find('input');
  expect(inputs.length).toBe(1);
  inputs.simulate('change', event);
  sinon.assert.calledOnce(onChange);
  sinon.assert.calledWith(onChange, '#000000');
});
