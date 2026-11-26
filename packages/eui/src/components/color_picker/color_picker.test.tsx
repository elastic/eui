/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { act, fireEvent, waitFor } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { requiredProps } from '../../test';
import { shouldRenderCustomStyles } from '../../test/internal';
import {
  render,
  waitForEuiPopoverClose,
  waitForEuiPopoverOpen,
} from '../../test/rtl';
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

  test('popover color selector is shown when the dropdown button is clicked', async () => {
    const onBlurHandler = jest.fn();
    const { getByTestSubject } = render(
      <EuiColorPicker
        onChange={onChange}
        onBlur={onBlurHandler}
        aria-label="Color"
      />
    );
    const input = getByTestSubject('euiColorPickerAnchor');
    const toggleButton = getByTestSubject('euiColorPickerToggle');

    input.focus();
    expect(toggleButton).toHaveAttribute('aria-expanded', 'false');
    expect(toggleButton).toHaveAttribute('aria-haspopup', 'dialog');
    expect(toggleButton).toHaveAttribute(
      'aria-label',
      'Open color selection dialog'
    );

    await act(async () => {
      await userEvent.click(toggleButton);
    });
    expect(getByTestSubject('euiColorPickerPopover')).toBeInTheDocument();
    expect(input).toHaveFocus();
    expect(onBlurHandler).not.toHaveBeenCalled();
    expect(toggleButton).toHaveAttribute('aria-expanded', 'true');
    expect(toggleButton).toHaveAttribute(
      'aria-label',
      'Close color selection dialog'
    );
  });

  test('restores input focus on Escape when opened from another focused control', async () => {
    const { container, getByTestSubject } = render(
      <>
        <input aria-label="Unrelated input" data-test-subj="unrelatedInput" />
        <EuiColorPicker onChange={onChange} aria-label="Color" />
      </>
    );
    const unrelatedInput = getByTestSubject('unrelatedInput');
    const input = getByTestSubject('euiColorPickerAnchor');

    unrelatedInput.focus();
    await act(async () => {
      await userEvent.click(getByTestSubject('euiColorPickerToggle'));
    });
    await waitForEuiPopoverOpen();
    expect(input).toHaveFocus();

    fireEvent.keyDown(input, { key: keys.ARROW_DOWN });
    const saturation = getByTestSubject('euiSaturation');
    expect(saturation).toHaveFocus();

    fireEvent.keyDown(container, {
      key: keys.ESCAPE,
    });
    await waitForEuiPopoverClose();
    await waitFor(() => {
      expect(input).toHaveFocus();
    });
  });

  test('popover color selector is closed once and input is focused when the dropdown button is clicked while open', async () => {
    const onBlurHandler = jest.fn();
    const { getByTestSubject, queryByTestSubject } = render(
      <EuiColorPicker
        onChange={onChange}
        onBlur={onBlurHandler}
        aria-label="Color"
      />
    );
    const input = getByTestSubject('euiColorPickerAnchor');
    const toggleButton = getByTestSubject('euiColorPickerToggle');

    await act(async () => {
      await userEvent.click(input);
    });
    expect(getByTestSubject('euiColorPickerPopover')).toBeInTheDocument();

    await act(async () => {
      await userEvent.click(toggleButton);
    });
    expect(onBlurHandler).toHaveBeenCalledTimes(1);
    expect(input).toHaveFocus();

    await waitFor(() => {
      expect(
        queryByTestSubject('euiColorPickerPopover')
      ).not.toBeInTheDocument();
    });
  });

  test('closes on an outside click and calls onBlur once when focus leaves afterwards', async () => {
    const user = userEvent.setup();
    const onBlurHandler = jest.fn();
    const { getByRole } = render(
      <>
        <EuiColorPicker
          aria-label="Color"
          onBlur={onBlurHandler}
          onChange={onChange}
        />
        {/* Clicking Outside leaves focus in the color input. */}
        <button type="button" onMouseDown={(event) => event.preventDefault()}>
          Outside
        </button>
        <input aria-label="Other" />
      </>
    );
    const colorInput = getByRole('textbox', { name: 'Color' });
    const otherInput = getByRole('textbox', { name: 'Other' });

    await act(() => user.click(colorInput));
    await waitForEuiPopoverOpen();
    await act(() => user.click(getByRole('button', { name: 'Outside' })));

    await waitForEuiPopoverClose();
    expect(colorInput).toHaveFocus();
    await act(() => user.click(otherInput));
    expect(otherInput).toHaveFocus();
    expect(onBlurHandler).toHaveBeenCalledTimes(1);
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
      hex: '#00bda0',
      isValid: true,
      rgba: [0, 189, 160, 1],
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
