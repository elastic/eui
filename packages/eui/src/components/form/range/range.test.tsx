/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { act, fireEvent } from '@testing-library/react';
import { shouldRenderCustomStyles } from '../../../test/internal';
import { requiredProps } from '../../../test/required_props';
import { render } from '../../../test/rtl';

import { EuiForm } from '../form';
import { EuiRange } from './range';

const props = {
  value: '8',
  min: 0,
  max: 100,
};

describe('EuiRange', () => {
  shouldRenderCustomStyles(<EuiRange {...props} {...requiredProps} />, {
    skip: { style: true },
  });
  // style is in ...rest and is spread to a different location than className/css
  shouldRenderCustomStyles(<EuiRange {...props} {...requiredProps} />, {
    targetSelector: '.euiRangeSlider',
    skip: { className: true, css: true },
  });
  shouldRenderCustomStyles(
    <EuiRange
      {...props}
      showInput="inputWithPopover"
      data-test-subj="triggerPopover"
    />,
    {
      skip: { parentTest: true },
      childProps: ['inputPopoverProps'],
      renderCallback: ({ getByTestSubject }) => {
        fireEvent.focus(getByTestSubject('triggerPopover'));
      },
    }
  );

  test('is rendered', () => {
    const { container } = render(
      <EuiRange
        name="name"
        id="id"
        onChange={() => {}}
        {...props}
        {...requiredProps}
      />
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  describe('props', () => {
    test('disabled should render', () => {
      const { container } = render(<EuiRange {...props} disabled />);

      expect(container.firstChild).toMatchSnapshot();
    });

    test('fullWidth should render', () => {
      const { container } = render(<EuiRange {...props} fullWidth />);

      expect(container.firstChild).toMatchSnapshot();
    });

    test('compressed should render', () => {
      const { container } = render(<EuiRange {...props} compressed />);

      expect(container.firstChild).toMatchSnapshot();
    });

    test('labels should render', () => {
      const { container } = render(<EuiRange {...props} showLabels />);

      expect(container.firstChild).toMatchSnapshot();
    });

    test('ticks should render', () => {
      const { container } = render(
        <EuiRange {...props} showTicks tickInterval={20} />
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    test('custom ticks should render', () => {
      const { container } = render(
        <EuiRange
          {...props}
          showTicks
          ticks={[
            { label: '20kb', value: 20 },
            { label: '100kb', value: 100 },
          ]}
        />
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    test('range should render', () => {
      const { container } = render(<EuiRange {...props} showRange />);

      expect(container.firstChild).toMatchSnapshot();
    });

    test('value should render', () => {
      const { value, ...localProps } = props;
      const { container } = render(
        <EuiRange
          value="200"
          showValue
          valuePrepend="before"
          valueAppend="after"
          {...localProps}
        />
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    test('input should render', () => {
      const { container } = render(
        <EuiRange
          name="name"
          id="id"
          onChange={() => {}}
          showInput
          {...props}
          {...requiredProps}
        />
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    test('slider should display in popover', () => {
      const { container, baseElement, getByTestSubject } = render(
        <EuiRange
          name="name"
          id="id"
          onChange={() => {}}
          showInput="inputWithPopover"
          inputPopoverProps={{ panelProps: { 'data-test-subj': 'test' } }}
          {...props}
          {...requiredProps}
        />
      );
      fireEvent.focus(container.querySelector('input')!);

      expect(baseElement).toMatchSnapshot();
      expect(getByTestSubject('test')).toBeInTheDocument();
    });

    test('loading should display when showInput="inputWithPopover"', () => {
      const { container } = render(
        <EuiRange
          name="name"
          id="id"
          onChange={() => {}}
          showInput="inputWithPopover"
          isLoading
          {...props}
          {...requiredProps}
        />
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    test('levels should render', () => {
      const { container } = render(
        <EuiRange
          levels={[
            {
              min: 0,
              max: 20,
              color: 'danger',
            },
            {
              min: 20,
              max: 100,
              color: 'success',
            },
          ]}
          value={20}
          min={0}
          max={100}
        />
      );

      expect(container.firstChild).toMatchSnapshot();
    });
  });

  test('allows value prop to accept a number', () => {
    const { value, ...localProps } = props;
    const { container } = render(
      <EuiRange value={8} onChange={() => {}} showValue {...localProps} />
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('allows value prop to accept empty string', () => {
    const { value, ...localProps } = props;
    const { container } = render(
      <EuiRange value={''} onChange={() => {}} {...localProps} />
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  describe('behavior', () => {
    afterEach(() => {
      jest.useRealTimers();
      jest.restoreAllMocks();
    });

    test('keeps its generated ID stable across rerenders', () => {
      const { getByRole, rerender } = render(<EuiRange {...props} />);
      const initialId = getByRole('slider').id;

      rerender(<EuiRange {...props} value="20" />);

      expect(initialId).not.toBe('');
      expect(getByRole('slider')).toHaveAttribute('id', initialId);
    });

    test('keeps its initial custom ID across rerenders', () => {
      const { getByRole, rerender } = render(
        <EuiRange {...props} id="initial-id" />
      );

      rerender(<EuiRange {...props} id="updated-id" />);

      expect(getByRole('slider')).toHaveAttribute('id', 'initial-id');
    });

    test('keeps the number input and slider synchronized', () => {
      const onChange = jest.fn();
      const ControlledRange = () => {
        const [value, setValue] = React.useState<string | number>(8);

        return (
          <EuiRange
            {...props}
            value={value}
            showInput
            onChange={(event, isValid) => {
              onChange(event.currentTarget.value, isValid);
              setValue(event.currentTarget.value);
            }}
          />
        );
      };
      const { container, getByRole } = render(<ControlledRange />);
      const input = getByRole('spinbutton');
      const slider = container.querySelector('.euiRangeSlider')!;

      fireEvent.change(input, { target: { value: '20' } });
      expect(onChange).toHaveBeenLastCalledWith('20', true);
      expect(input).toHaveValue(20);
      expect(slider).toHaveValue('20');

      fireEvent.change(slider, { target: { value: '40' } });
      expect(onChange).toHaveBeenLastCalledWith('40', true);
      expect(input).toHaveValue(40);
      expect(slider).toHaveValue('40');
    });

    test.each([
      ['0', true],
      ['100', true],
      ['-1', false],
      ['101', false],
      ['', false],
    ])('reports whether a changed value of %p is valid', (value, isValid) => {
      const onChange = jest.fn();
      const { getByRole } = render(
        <EuiRange {...props} showInput onChange={onChange} />
      );

      fireEvent.change(getByRole('spinbutton'), { target: { value } });

      expect(onChange).toHaveBeenCalledWith(expect.anything(), isValid);
    });

    test('only renders the range highlight for valid values', () => {
      const { container, rerender } = render(
        <EuiRange {...props} showRange value="20" />
      );

      expect(container.querySelector('.euiRangeHighlight')).toBeInTheDocument();

      rerender(<EuiRange {...props} showRange value="101" />);
      expect(
        container.querySelector('.euiRangeHighlight')
      ).not.toBeInTheDocument();

      rerender(<EuiRange {...props} showRange value="" />);
      expect(
        container.querySelector('.euiRangeHighlight')
      ).not.toBeInTheDocument();
    });

    test('uses the latest event callbacks after rerendering', () => {
      jest.useFakeTimers();
      const initialOnChange = jest.fn();
      const initialOnFocus = jest.fn();
      const initialOnBlur = jest.fn();
      const updatedOnChange = jest.fn();
      const updatedOnFocus = jest.fn();
      const updatedOnBlur = jest.fn();
      const latestOnBlur = jest.fn();
      const { getByRole, rerender } = render(
        <EuiRange
          {...props}
          showInput="inputWithPopover"
          onChange={initialOnChange}
          onFocus={initialOnFocus}
          onBlur={initialOnBlur}
        />
      );

      rerender(
        <EuiRange
          {...props}
          showInput="inputWithPopover"
          onChange={updatedOnChange}
          onFocus={updatedOnFocus}
          onBlur={updatedOnBlur}
        />
      );
      const input = getByRole('spinbutton');
      fireEvent.focus(input);
      fireEvent.change(input, { target: { value: '20' } });
      fireEvent.blur(input);
      rerender(
        <EuiRange
          {...props}
          showInput="inputWithPopover"
          onChange={updatedOnChange}
          onFocus={updatedOnFocus}
          onBlur={latestOnBlur}
        />
      );
      act(() => jest.advanceTimersByTime(200));

      expect(initialOnChange).not.toHaveBeenCalled();
      expect(initialOnFocus).not.toHaveBeenCalled();
      expect(initialOnBlur).not.toHaveBeenCalled();
      expect(updatedOnChange).toHaveBeenCalledTimes(1);
      expect(updatedOnFocus).toHaveBeenCalledTimes(1);
      expect(updatedOnBlur).not.toHaveBeenCalled();
      expect(latestOnBlur).toHaveBeenCalledTimes(1);
    });

    test('forwards input focus events without opening a popover', () => {
      const onFocus = jest.fn();
      const onBlur = jest.fn();
      const { getByRole, queryByTestSubject } = render(
        <EuiRange
          {...props}
          showInput
          onFocus={onFocus}
          onBlur={onBlur}
          inputPopoverProps={{
            panelProps: { 'data-test-subj': 'rangePopover' },
          }}
        />
      );
      const input = getByRole('spinbutton');

      fireEvent.focus(input);
      fireEvent.blur(input);

      expect(onFocus).toHaveBeenCalledTimes(1);
      expect(onBlur).toHaveBeenCalledTimes(1);
      expect(queryByTestSubject('rangePopover')).not.toBeInTheDocument();
    });

    test('waits 200ms after input blur before closing the popover', () => {
      jest.useFakeTimers();
      const onBlur = jest.fn();
      const { getByRole, getByTestSubject, queryByTestSubject } = render(
        <EuiRange
          {...props}
          showInput="inputWithPopover"
          onBlur={onBlur}
          inputPopoverProps={{
            panelProps: { 'data-test-subj': 'rangePopover' },
          }}
        />
      );
      const input = getByRole('spinbutton');

      fireEvent.focus(input);
      fireEvent.blur(input);
      act(() => jest.advanceTimersByTime(199));
      expect(onBlur).not.toHaveBeenCalled();
      expect(getByTestSubject('rangePopover')).toBeInTheDocument();

      act(() => jest.advanceTimersByTime(1));
      expect(onBlur).toHaveBeenCalledTimes(1);
      act(() => jest.advanceTimersByTime(250));
      expect(queryByTestSubject('rangePopover')).not.toBeInTheDocument();
    });

    test('keeps the popover open when the slider is clicked during input blur', () => {
      jest.useFakeTimers();
      const onBlur = jest.fn();
      const { baseElement, getByRole, getByTestSubject, queryByTestSubject } =
        render(
          <EuiRange
            {...props}
            showInput="inputWithPopover"
            onBlur={onBlur}
            inputPopoverProps={{
              panelProps: { 'data-test-subj': 'rangePopover' },
            }}
          />
        );
      const input = getByRole('spinbutton');

      fireEvent.focus(input);
      fireEvent.mouseDown(baseElement.querySelector('input[type="range"]')!);
      fireEvent.blur(input);
      act(() => jest.advanceTimersByTime(200));

      expect(onBlur).not.toHaveBeenCalled();
      expect(getByTestSubject('rangePopover')).toBeInTheDocument();

      fireEvent.blur(input);
      act(() => jest.advanceTimersByTime(200));
      expect(onBlur).toHaveBeenCalledTimes(1);
      act(() => jest.advanceTimersByTime(250));
      expect(queryByTestSubject('rangePopover')).not.toBeInTheDocument();
    });

    test('updates levels when the slider track is measured', () => {
      jest
        .spyOn(HTMLElement.prototype, 'getBoundingClientRect')
        .mockReturnValue({ width: 400, height: 20 } as DOMRect);
      const { container } = render(
        <EuiRange
          {...props}
          value="50"
          showRange
          levels={[{ min: 0, max: 100, color: 'success' }]}
        />
      );

      expect(
        container.querySelector('.euiRangeHighlight > div > div')
      ).toHaveStyle({ inlineSize: '400px' });
    });

    test('reports valid tick changes through onChange', () => {
      const onChange = jest.fn();
      const { getByRole } = render(
        <EuiRange
          {...props}
          showTicks
          ticks={[{ label: 'Twenty', value: 20 }]}
          onChange={onChange}
        />
      );

      fireEvent.click(getByRole('button', { name: 'Twenty' }));

      expect(onChange).toHaveBeenCalledWith(expect.anything(), true);
    });
  });

  describe('inherits', () => {
    test('fullWidth from <EuiForm />', () => {
      const { container } = render(
        <EuiForm fullWidth>
          <EuiRange value={20} min={0} max={100} />
        </EuiForm>
      );

      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('input aria-valuetext', () => {
    it('should exist when the current value has an accessible label', () => {
      const { getByRole } = render(
        <EuiRange
          {...props}
          showTicks
          ticks={[
            {
              label: '20kb',
              value: 20,
              accessibleLabel: 'twenty kilobytes',
            },
            {
              label: '100kb',
              value: 100,
              accessibleLabel: 'one-hundred kilobytes',
            },
          ]}
          value={20}
        />
      );
      expect(getByRole('slider')).toHaveAttribute(
        'aria-valuetext',
        '20, (twenty kilobytes)'
      );
    });

    it('falls back to string `label`s if `accessibleLabel` does not exist', () => {
      const { getByRole } = render(
        <EuiRange
          {...props}
          showTicks
          ticks={[
            { label: '20kb', value: 20 },
            { label: '100kb', value: 100 },
          ]}
          value={20}
        />
      );

      expect(getByRole('slider')).toHaveAttribute(
        'aria-valuetext',
        '20, (20kb)'
      );
    });

    it('should not exist when the current value does not have a matching label', () => {
      const { getByRole } = render(
        <EuiRange
          {...props}
          showTicks
          ticks={[
            { value: 20, label: '20kb', accessibleLabel: 'twenty kilobytes' },
          ]}
          value={10}
        />
      );

      expect(getByRole('slider')).not.toHaveAttribute('aria-valuetext');
    });
  });
});
