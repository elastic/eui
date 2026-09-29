/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { fireEvent } from '@testing-library/react';
import { requiredProps } from '../../test';
import { shouldRenderCustomStyles } from '../../test/internal';
import { render } from '../../test/rtl';
import { euiPaletteColorBlind, keys } from '../../services';

import { EuiColorPicker } from './color_picker';

const VISUALIZATION_COLORS = euiPaletteColorBlind();

jest.mock('../portal', () => ({
  EuiPortal: ({ children }: { children: any }) => children,
}));

describe('EuiColorPicker', () => {
  const onChange = jest.fn();
  beforeEach(() => jest.clearAllMocks());

  shouldRenderCustomStyles(
    <EuiColorPicker onChange={onChange} display="inline" />,
    { skip: { style: true } } // No ...rest
  );

  it('renders', () => {
    const { container } = render(
      <EuiColorPicker onChange={onChange} color="#ffeedd" {...requiredProps} />
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('compressed', () => {
    const { container } = render(
      <EuiColorPicker
        onChange={onChange}
        color="#ffeedd"
        compressed={true}
        {...requiredProps}
      />
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('readOnly', () => {
    const { container } = render(
      <EuiColorPicker
        onChange={onChange}
        color="#ffeedd"
        readOnly={true}
        {...requiredProps}
      />
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('fullWidth', () => {
    const { container } = render(
      <EuiColorPicker
        onChange={onChange}
        color="#ffeedd"
        fullWidth={true}
        {...requiredProps}
      />
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('disabled', () => {
    const { container } = render(
      <EuiColorPicker
        onChange={onChange}
        color="#ffeedd"
        disabled={true}
        {...requiredProps}
      />
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('inline', () => {
    const { container } = render(
      <EuiColorPicker
        onChange={onChange}
        color="#ffeedd"
        display="inline"
        {...requiredProps}
      />
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('prepend and append', () => {
    const { container } = render(
      <EuiColorPicker
        onChange={onChange}
        color="#ffeedd"
        prepend="prepend"
        append="append"
        {...requiredProps}
      />
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('showAlpha', () => {
    const { container } = render(
      <EuiColorPicker
        onChange={onChange}
        color="#ffeedd"
        showAlpha={true}
        {...requiredProps}
      />
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  describe('color', () => {
    test('null', () => {
      const { container } = render(
        <EuiColorPicker onChange={onChange} color={null} {...requiredProps} />
      );
      expect(container.firstChild).toMatchSnapshot();
    });

    test('empty string', () => {
      const { container } = render(
        <EuiColorPicker onChange={onChange} color={''} {...requiredProps} />
      );
      expect(container.firstChild).toMatchSnapshot();
    });

    test('valid string', () => {
      const { container } = render(
        <EuiColorPicker
          onChange={onChange}
          color="#ffffff"
          {...requiredProps}
        />
      );
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  test('placeholder', () => {
    const { container } = render(
      <EuiColorPicker
        onChange={onChange}
        placeholder="Auto"
        {...requiredProps}
      />
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('isClearable', () => {
    const { container } = render(
      <EuiColorPicker
        onChange={onChange}
        color={'#ffeedd'}
        isClearable={true}
        {...requiredProps}
      />
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('popover color selector is not shown by default', () => {
    const { queryByTestSubject } = render(
      <EuiColorPicker onChange={onChange} color="#ffeedd" {...requiredProps} />
    );

    expect(queryByTestSubject('euiColorPickerPopover')).not.toBeInTheDocument();
  });

  test('popover color selector is shown when the input is clicked', () => {
    const onFocusHandler = jest.fn();
    const { getByTestSubject } = render(
      <EuiColorPicker onChange={onChange} onFocus={onFocusHandler} />
    );

    fireEvent.click(getByTestSubject('euiColorPickerAnchor'));
    expect(onFocusHandler).toHaveBeenCalled();
    expect(getByTestSubject('euiColorPickerPopover')).toBeInTheDocument();
  });

  test('popover color selector is hidden when the ESC key pressed', async () => {
    const onBlurHandler = jest.fn();
    const { getByTestSubject } = render(
      <EuiColorPicker onChange={onChange} onBlur={onBlurHandler} />
    );

    fireEvent.click(getByTestSubject('euiColorPickerAnchor'));
    fireEvent.keyDown(getByTestSubject('euiColorPickerAnchor'), {
      key: keys.ENTER,
    });
    expect(getByTestSubject('euiColorPickerPopover')).toBeInTheDocument();

    fireEvent.keyDown(getByTestSubject('euiColorPickerPopover'), {
      key: keys.ESCAPE,
    });
    await (async () => {
      expect(getByTestSubject('euiColorPickerPopover')).not.toBeInTheDocument();
      expect(onBlurHandler).toHaveBeenCalled(); // The blur handler is called just before the portal would be removed.
    });
  });

  test('popover color selector is hidden and input regains focus when the ENTER key pressed', async () => {
    const onBlurHandler = jest.fn();
    const { getByTestSubject } = render(
      <EuiColorPicker onChange={onChange} onBlur={onBlurHandler} />
    );

    fireEvent.click(getByTestSubject('euiColorPickerAnchor'));
    fireEvent.keyDown(getByTestSubject('euiColorPickerAnchor'), {
      key: keys.ENTER,
    });
    await (async () => {
      expect(getByTestSubject('euiColorPickerAnchor')).toHaveFocus();
      expect(getByTestSubject('euiColorPickerPopover')).not.toBeInTheDocument();
    });
  });

  test('Setting a new color calls onChange', () => {
    const { getByTestSubject } = render(<EuiColorPicker onChange={onChange} />);

    const event = { target: { value: '#000000' } };
    fireEvent.change(getByTestSubject('euiColorPickerAnchor'), event);

    expect(onChange).toHaveBeenCalled();
    expect(onChange).toHaveBeenCalledWith('#000000', {
      hex: '#000000',
      isValid: true,
      rgba: [0, 0, 0, 1],
    });
  });

  test('Clicking a swatch calls onChange', () => {
    const { getByTestSubject } = render(<EuiColorPicker onChange={onChange} />);

    fireEvent.click(getByTestSubject('euiColorPickerAnchor'));

    const swatches = document.querySelectorAll('button.euiColorPickerSwatch');
    expect(swatches.length).toBe(VISUALIZATION_COLORS.length);

    fireEvent.click(swatches[0]);
    expect(onChange).toHaveBeenCalled();
    expect(onChange).toHaveBeenCalledWith(VISUALIZATION_COLORS[0], {
      hex: '#16c5c0',
      isValid: true,
      rgba: [22, 197, 192, 1],
    });
  });

  test('Setting a new alpha value calls onChange', () => {
    const { getByTestSubject, getAllByTestSubject } = render(
      <EuiColorPicker onChange={onChange} color="#ffeedd" showAlpha={true} />
    );

    fireEvent.click(getByTestSubject('euiColorPickerAnchor'));

    // Slider
    const [range, input] = getAllByTestSubject('euiColorPickerAlpha');
    fireEvent.change(range, { target: { value: '50' } });
    expect(onChange).toHaveBeenCalledWith('#ffeedd80', {
      hex: '#ffeedd80',
      isValid: true,
      rgba: [255, 238, 221, 0.5],
    });
    // Number input
    fireEvent.change(input, { target: { value: '25' } });
    expect(onChange).toHaveBeenCalledWith('#ffeedd40', {
      hex: '#ffeedd40',
      isValid: true,
      rgba: [255, 238, 221, 0.25],
    });
  });

  test('Clicking the "clear" button calls onChange', () => {
    const { getByLabelText } = render(
      <EuiColorPicker onChange={onChange} color="#ffeedd" isClearable={true} />
    );

    fireEvent.click(getByLabelText('Clear input'));
    expect(onChange).toHaveBeenCalled();
    expect(onChange).toHaveBeenCalledWith('', {
      hex: '',
      isValid: false,
      rgba: [NaN, NaN, NaN, 1],
    });
  });

  test('default mode does renders child components', () => {
    const { getByTestSubject } = render(
      <EuiColorPicker onChange={onChange} color="#ffeedd" />
    );
    fireEvent.click(getByTestSubject('euiColorPickerAnchor'));

    expect(document.querySelector('.euiSaturation')).toBeInTheDocument();
    expect(document.querySelector('.euiHue')).toBeInTheDocument();
    expect(
      document.querySelectorAll('button.euiColorPickerSwatch').length
    ).toBe(VISUALIZATION_COLORS.length);
  });

  test('swatch mode does not render EuiSaturation or EuiHue', () => {
    const { getByTestSubject } = render(
      <EuiColorPicker onChange={onChange} mode="swatch" />
    );
    fireEvent.click(getByTestSubject('euiColorPickerAnchor'));

    expect(document.querySelector('.euiSaturation')).not.toBeInTheDocument();
    expect(document.querySelector('.euiHue')).not.toBeInTheDocument();
    expect(
      document.querySelectorAll('button.euiColorPickerSwatch').length
    ).toBe(VISUALIZATION_COLORS.length);
  });

  test('picker mode does not render swatches', () => {
    const { getByTestSubject } = render(
      <EuiColorPicker onChange={onChange} mode="picker" />
    );
    fireEvent.click(getByTestSubject('euiColorPickerAnchor'));

    expect(document.querySelector('.euiSaturation')).toBeInTheDocument();
    expect(document.querySelector('.euiHue')).toBeInTheDocument();
    expect(
      document.querySelectorAll('button.euiColorPickerSwatch').length
    ).toBe(0);
  });

  test('secondaryInputDisplay `top` has a popover panel input', () => {
    const { getByTestSubject, queryByTestSubject } = render(
      <EuiColorPicker onChange={onChange} secondaryInputDisplay="top" />
    );
    fireEvent.click(getByTestSubject('euiColorPickerAnchor'));

    expect(queryByTestSubject('euiColorPickerInput_top')).toBeInTheDocument();
    expect(
      queryByTestSubject('euiColorPickerInput_bottom')
    ).not.toBeInTheDocument();
  });

  test('secondaryInputDisplay `bottom` has a popover panel input', () => {
    const { getByTestSubject, queryByTestSubject } = render(
      <EuiColorPicker onChange={onChange} secondaryInputDisplay="bottom" />
    );
    fireEvent.click(getByTestSubject('euiColorPickerAnchor'));

    expect(
      queryByTestSubject('euiColorPickerInput_top')
    ).not.toBeInTheDocument();
    expect(
      queryByTestSubject('euiColorPickerInput_bottom')
    ).toBeInTheDocument();
  });
});
