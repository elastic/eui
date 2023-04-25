/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { render } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';

import {
  EuiValidatableControl,
  useEuiValidatableControl,
} from './validatable_control';

describe('EuiValidatableControl', () => {
  test('is rendered', () => {
    const { container, rerender } = render(
      <EuiValidatableControl isInvalid>
        <input />
      </EuiValidatableControl>
    );
    expect(container.firstChild).toMatchInlineSnapshot(`
      <input
        aria-invalid="true"
      />
    `);

    rerender(
      <EuiValidatableControl>
        <input />
      </EuiValidatableControl>
    );
    expect(container.firstChild).toMatchInlineSnapshot('<input />');
  });

  test('aria-invalid allows falling back to prop set on the child input', () => {
    const { container } = render(
      <EuiValidatableControl>
        <input aria-invalid={true} />
      </EuiValidatableControl>
    );

    expect(container.firstChild).toMatchInlineSnapshot(`
      <input
        aria-invalid="true"
      />
    `);
  });

  describe('ref management', () => {
    it('calls a ref function', () => {
      const ref = jest.fn();

      render(
        <EuiValidatableControl>
          <input id="testInput" ref={ref} />
        </EuiValidatableControl>
      );

      expect(ref).toHaveBeenCalledTimes(1);

      const input = ref.mock.calls[0][0];
      expect(input.getAttribute('id')).toBe('testInput');
    });

    it('sets a ref object\'s "current" property', () => {
      const ref = React.createRef<HTMLInputElement>();

      render(
        <EuiValidatableControl>
          <input id="testInput" ref={ref} />
        </EuiValidatableControl>
      );

      expect(ref.current).not.toBeNull();
      expect(ref.current!.getAttribute('id')).toBe('testInput');
    });

    it('calls stable ref function only once on re-render', async () => {
      const ref = jest.fn();

      const Component = () => (
        <EuiValidatableControl>
          <input id="testInput" ref={ref} />
        </EuiValidatableControl>
      );

      const { rerender } = render(<Component />);

      expect(ref).toHaveBeenCalledTimes(1);
      expect(ref.mock.calls[0][0].getAttribute('id')).toBe('testInput');

      // Force re-render
      rerender(<Component />);

      expect(ref).toHaveBeenCalledTimes(1);
      expect(ref.mock.calls[0][0].getAttribute('id')).toBe('testInput');
    });

    it('calls unstable ref function again on re-render', async () => {
      const ref = jest.fn();

      const Component = () => (
        <EuiValidatableControl>
          <input id="testInput" ref={(el) => ref(el)} />
        </EuiValidatableControl>
      );

      const { rerender } = render(<Component />);

      expect(ref).toHaveBeenCalledTimes(1);
      expect(ref.mock.calls[0][0].getAttribute('id')).toBe('testInput');

      // Force re-render
      rerender(<Component />);

      expect(ref).toHaveBeenCalledTimes(3);

      expect(ref.mock.calls[1][0]).toBe(null);
      expect(ref.mock.calls[2][0].getAttribute('id')).toBe('testInput');
    });

    it('calls a ref function again when the child element changes', () => {
      const ref = jest.fn();

      const Component = ({ change }: { change: boolean }) => (
        <EuiValidatableControl>
          {!change ? (
            <input key="1" id="testInput" ref={ref} />
          ) : (
            <input key="2" id="testInput2" ref={ref} />
          )}
        </EuiValidatableControl>
      );

      const { rerender } = render(<Component change={false} />);

      expect(ref).toHaveBeenCalledTimes(1);
      expect(ref.mock.calls[0][0].getAttribute('id')).toBe('testInput');

      rerender(<Component change={true} />);

      expect(ref).toHaveBeenCalledTimes(3);

      expect(ref.mock.calls[1][0]).toBe(null);
      expect(ref.mock.calls[2][0].getAttribute('id')).toBe('testInput2');

      // Ensure that the child element has changed
      expect(ref.mock.calls[0][0]).not.toBe(ref.mock.calls[2][0]);
    });

    it('sets a ref object\'s "current" property when the child element changes', () => {
      const ref = React.createRef<HTMLInputElement>();

      const Component = ({ change }: { change: boolean }) => (
        <EuiValidatableControl>
          {!change ? (
            <input key="1" id="testInput" ref={ref} />
          ) : (
            <input key="2" id="testInput2" ref={ref} />
          )}
        </EuiValidatableControl>
      );

      const { rerender } = render(<Component change={false} />);

      expect(ref.current).not.toBeNull();
      expect(ref.current!.getAttribute('id')).toBe('testInput');

      const prevRef = ref.current;

      rerender(<Component change={true} />);

      expect(ref.current).not.toBeNull();
      expect(ref.current!.getAttribute('id')).toBe('testInput2');

      // Ensure that the child element has changed
      expect(ref.current).not.toBe(prevRef);
    });
  });
});

describe('useEuiValidatableControl', () => {
  const controlEl = document.createElement('input');

  it('sets the validity of the passed control element', () => {
    const { rerender } = renderHook(useEuiValidatableControl, {
      initialProps: { isInvalid: true, controlEl },
    });
    expect(controlEl.validity.valid).toEqual(false);

    rerender({ isInvalid: false, controlEl });
    expect(controlEl.validity.valid).toEqual(true);
  });

  it('sets the `aria-invalid` of the passed control element', () => {
    const { rerender } = renderHook(useEuiValidatableControl, {
      initialProps: { isInvalid: true, controlEl },
    });
    expect(controlEl.getAttribute('aria-invalid')).toEqual('true');

    rerender({ isInvalid: false, controlEl });
    expect(controlEl.getAttribute('aria-invalid')).toEqual('false');
  });
});
