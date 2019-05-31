import React from 'react';
import { render, mount } from 'enzyme';

import { EuiColorPicker } from './color_picker';
import { VISUALIZATION_COLORS, keyCodes } from '../../services';
import { requiredProps, findTestSubject } from '../../test';

jest.mock('../portal', () => ({
  EuiPortal: ({ children }) => children,
}));

let onChange;

beforeEach(() => {
  onChange = jest.fn();
});

test('renders EuiColorPicker', () => {
  const colorPicker = render(
    <EuiColorPicker onChange={onChange} color="#ffeedd" {...requiredProps} />
  );
  expect(colorPicker).toMatchSnapshot();
});

test('renders compressed EuiColorPicker', () => {
  const colorPicker = render(
    <EuiColorPicker
      onChange={onChange}
      color="#ffeedd"
      compressed={true}
      {...requiredProps}
    />
  );
  expect(colorPicker).toMatchSnapshot();
});

test('renders readOnly EuiColorPicker', () => {
  const colorPicker = render(
    <EuiColorPicker
      onChange={onChange}
      color="#ffeedd"
      readOnly={true}
      {...requiredProps}
    />
  );
  expect(colorPicker).toMatchSnapshot();
});

test('renders fullWidth EuiColorPicker', () => {
  const colorPicker = render(
    <EuiColorPicker
      onChange={onChange}
      color="#ffeedd"
      fullWidth={true}
      {...requiredProps}
    />
  );
  expect(colorPicker).toMatchSnapshot();
});

test('renders disabled EuiColorPicker', () => {
  const colorPicker = render(
    <EuiColorPicker
      onChange={onChange}
      color="#ffeedd"
      disabled={true}
      {...requiredProps}
    />
  );
  expect(colorPicker).toMatchSnapshot();
});

test('renders EuiColorPicker with an empty swatch when color is null', () => {
  const colorPicker = render(
    <EuiColorPicker onChange={onChange} color={null} {...requiredProps} />
  );
  expect(colorPicker).toMatchSnapshot();
});

test('renders EuiColorPicker with an empty swatch when color is ""', () => {
  const colorPicker = render(
    <EuiColorPicker onChange={onChange} color={''} {...requiredProps} />
  );
  expect(colorPicker).toMatchSnapshot();
});

test('renders EuiColorPicker with a color swatch when color is defined', () => {
  const colorPicker = render(
    <EuiColorPicker onChange={onChange} color={'#ffffff'} {...requiredProps} />
  );
  expect(colorPicker).toMatchSnapshot();
});

test('popover color selector is not shown by default', () => {
  const colorPicker = mount(
    <EuiColorPicker onChange={onChange} color="#ffeedd" {...requiredProps} />
  );

  const colorSelector = findTestSubject(colorPicker, 'colorPickerPopover');
  expect(colorSelector.length).toBe(0);
});

test('popover color selector is shown when the input is clicked', () => {
  const onFocusHandler = jest.fn();
  const colorPicker = mount(
    <EuiColorPicker
      onChange={onChange}
      onFocus={onFocusHandler}
      color="#ffeedd"
      {...requiredProps}
    />
  );

  findTestSubject(colorPicker, 'colorPickerAnchor').simulate('click');
  expect(onFocusHandler).toBeCalled();
  const colorSelector = findTestSubject(colorPicker, 'colorPickerPopover');
  expect(colorSelector.length).toBe(1);
});

test('popover color selector is hidden when the ESC key pressed', () => {
  const onBlurHandler = jest.fn();
  const colorPicker = mount(
    <EuiColorPicker
      onChange={onChange}
      color="#ffeedd"
      onBlur={onBlurHandler}
      {...requiredProps}
    />
  );

  findTestSubject(colorPicker, 'colorPickerAnchor').simulate('click');
  findTestSubject(colorPicker, 'colorPickerPopover').simulate('keydown', {
    keyCode: keyCodes.ESCAPE,
  });
  // Portal removal not working with Jest. The blur handler is called just before the portal would be removed.
  expect(onBlurHandler).toBeCalled();
});

test('popover color selector is hidden and input regains focus when the ENTER key pressed', () => {
  const onBlurHandler = jest.fn();
  const colorPicker = mount(
    <EuiColorPicker
      onChange={onChange}
      color="#ffeedd"
      onBlur={onBlurHandler}
      {...requiredProps}
    />
  );

  findTestSubject(colorPicker, 'colorPickerAnchor').simulate('click');
  document.activeElement.blur();
  findTestSubject(colorPicker, 'colorPickerPopover').simulate('keydown', {
    keyCode: keyCodes.ENTER,
  });
  expect(
    findTestSubject(colorPicker, 'colorPickerAnchor').getDOMNode()
  ).toEqual(document.activeElement);
  // Portal removal not working with Jest. The blur handler is called just before the portal would be removed.
  expect(onBlurHandler).toBeCalled();
});

test('Setting a new color calls onChange', () => {
  const colorPicker = mount(
    <EuiColorPicker onChange={onChange} color="#ffeedd" {...requiredProps} />
  );

  findTestSubject(colorPicker, 'colorPickerAnchor').simulate('click');
  const event = { target: { value: '#000000' } };
  const inputs = colorPicker.find('input[type="text"]');
  expect(inputs.length).toBe(1);
  inputs.simulate('change', event);
  expect(onChange).toBeCalled();
  expect(onChange).toBeCalledWith('#000000');
});

test('Clicking a swatch calls onChange', () => {
  const colorPicker = mount(
    <EuiColorPicker onChange={onChange} color="#ffeedd" {...requiredProps} />
  );

  findTestSubject(colorPicker, 'colorPickerAnchor').simulate('click');
  const swatches = colorPicker.find('button.euiColorPicker__swatchSelect');
  expect(swatches.length).toBe(VISUALIZATION_COLORS.length);
  swatches.first().simulate('click');
  expect(onChange).toBeCalled();
  expect(onChange).toBeCalledWith(VISUALIZATION_COLORS[0]);
});

test('default mode does redners child components', () => {
  const colorPicker = mount(
    <EuiColorPicker onChange={onChange} color="#ffeedd" {...requiredProps} />
  );

  findTestSubject(colorPicker, 'colorPickerAnchor').simulate('click');
  const saturation = colorPicker.find('EuiSaturation');
  expect(saturation.length).toBe(1);
  const hue = colorPicker.find('EuiHue');
  expect(hue.length).toBe(1);
  const swatches = colorPicker.find('button.euiColorPicker__swatchSelect');
  expect(swatches.length).toBe(VISUALIZATION_COLORS.length);
});

test('swatch mode does not render EuiSaturation or EuiHue', () => {
  const colorPicker = mount(
    <EuiColorPicker
      onChange={onChange}
      mode="swatch"
      color="#ffeedd"
      {...requiredProps}
    />
  );

  findTestSubject(colorPicker, 'colorPickerAnchor').simulate('click');
  const saturation = colorPicker.find('EuiSaturation');
  expect(saturation.length).toBe(0);
  const hue = colorPicker.find('EuiHue');
  expect(hue.length).toBe(0);
  const swatches = colorPicker.find('button.euiColorPicker__swatchSelect');
  expect(swatches.length).toBe(VISUALIZATION_COLORS.length);
});

test('picker mode does not render swatches', () => {
  const colorPicker = mount(
    <EuiColorPicker
      onChange={onChange}
      mode="picker"
      color="#ffeedd"
      {...requiredProps}
    />
  );

  findTestSubject(colorPicker, 'colorPickerAnchor').simulate('click');
  const saturation = colorPicker.find('EuiSaturation');
  expect(saturation.length).toBe(1);
  const hue = colorPicker.find('EuiHue');
  expect(hue.length).toBe(1);
  const swatches = colorPicker.find('button.euiColorPicker__swatchSelect');
  expect(swatches.length).toBe(0);
});
