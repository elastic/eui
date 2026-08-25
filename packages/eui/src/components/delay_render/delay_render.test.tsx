/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { act } from '@testing-library/react';
import { render } from '../../test/rtl';

import { EuiDelayRender } from './delay_render';

describe('EuiDelayRender', () => {
  jest.useFakeTimers();

  afterEach(() => {
    jest.clearAllTimers();
  });

  it('renders its children after the default 500ms delay', () => {
    const { container, getByText } = render(
      <EuiDelayRender>
        <span>content</span>
      </EuiDelayRender>
    );
    expect(container).toBeEmptyDOMElement();

    act(() => {
      jest.advanceTimersByTime(499);
    });
    expect(container).toBeEmptyDOMElement();

    act(() => {
      jest.advanceTimersByTime(1);
    });
    expect(getByText('content')).toBeInTheDocument();
  });

  it('respects a custom `delay`', () => {
    const { container, getByText } = render(
      <EuiDelayRender delay={1000}>
        <span>content</span>
      </EuiDelayRender>
    );

    act(() => {
      jest.advanceTimersByTime(999);
    });
    expect(container).toBeEmptyDOMElement();

    act(() => {
      jest.advanceTimersByTime(1);
    });
    expect(getByText('content')).toBeInTheDocument();
  });

  it('hides updated children and shows them again after the delay', () => {
    const { container, getByText, rerender } = render(
      <EuiDelayRender>
        <span>first</span>
      </EuiDelayRender>
    );
    act(() => {
      jest.advanceTimersByTime(500);
    });
    expect(getByText('first')).toBeInTheDocument();

    rerender(
      <EuiDelayRender>
        <span>second</span>
      </EuiDelayRender>
    );
    expect(container).toBeEmptyDOMElement();

    act(() => {
      jest.advanceTimersByTime(500);
    });
    expect(getByText('second')).toBeInTheDocument();
  });

  it('never renders updated children before the delay has passed', () => {
    // Unlike the DOM assertions above, this catches content being committed
    // and immediately hidden again within the same act() flush, which would
    // still trigger aria-live announcements
    const onRender = jest.fn();
    const Probe = ({ label }: { label: string }) => {
      onRender(label);
      return <span>{label}</span>;
    };

    const { getByText, rerender } = render(
      <EuiDelayRender>
        <Probe label="first" />
      </EuiDelayRender>
    );
    act(() => {
      jest.advanceTimersByTime(500);
    });
    expect(getByText('first')).toBeInTheDocument();

    rerender(
      <EuiDelayRender>
        <Probe label="second" />
      </EuiDelayRender>
    );
    expect(onRender).not.toHaveBeenCalledWith('second');

    act(() => {
      jest.advanceTimersByTime(500);
    });
    expect(getByText('second')).toBeInTheDocument();
  });

  it('stays hidden until updates stop arriving for the delay duration', () => {
    const { container, getByText, rerender } = render(
      <EuiDelayRender>
        <span>first</span>
      </EuiDelayRender>
    );
    act(() => {
      jest.advanceTimersByTime(500);
    });

    rerender(
      <EuiDelayRender>
        <span>second</span>
      </EuiDelayRender>
    );
    act(() => {
      jest.advanceTimersByTime(300);
    });
    expect(container).toBeEmptyDOMElement();

    rerender(
      <EuiDelayRender>
        <span>third</span>
      </EuiDelayRender>
    );
    act(() => {
      jest.advanceTimersByTime(300);
    });
    expect(container).toBeEmptyDOMElement();

    act(() => {
      jest.advanceTimersByTime(200);
    });
    expect(getByText('third')).toBeInTheDocument();
  });

  it('does not re-delay when re-rendered with unchanged children', () => {
    const children = <span>stable</span>;
    const { getByText, rerender } = render(
      <EuiDelayRender>{children}</EuiDelayRender>
    );
    act(() => {
      jest.advanceTimersByTime(500);
    });
    expect(getByText('stable')).toBeInTheDocument();

    rerender(<EuiDelayRender>{children}</EuiDelayRender>);
    expect(getByText('stable')).toBeInTheDocument();
  });

  it('clears the pending timeout on unmount', () => {
    const { unmount } = render(
      <EuiDelayRender>
        <span>content</span>
      </EuiDelayRender>
    );
    expect(jest.getTimerCount()).toBe(1);

    unmount();
    expect(jest.getTimerCount()).toBe(0);
  });
});
