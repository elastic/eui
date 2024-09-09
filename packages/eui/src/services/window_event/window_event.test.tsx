/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the "Elastic License
 * 2.0", the "GNU Affero General Public License v3.0 only", and the "Server Side
 * Public License v 1"; you may not use this file except in compliance with, at
 * your election, the "Elastic License 2.0", the "GNU Affero General Public
 * License v3.0 only", or the "Server Side Public License, v 1".
 */

import React from 'react';
import { render } from '@testing-library/react';

import { EuiWindowEvent } from './window_event';

describe('EuiWindowEvent', () => {
  let windowAddCount = 0;
  let windowRemoveCount = 0;

  beforeAll(() => {
    // React 16 and 17 register a bunch of error listeners which we don't need to capture
    window.addEventListener = jest.fn((event: string) => {
      if (event !== 'error') windowAddCount++;
    });
    window.removeEventListener = jest.fn((event: string) => {
      if (event !== 'error') windowRemoveCount++;
    });
  });

  beforeEach(() => {
    // Reset counts
    windowAddCount = 0;
    windowRemoveCount = 0;
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  test('attaches handler to window event on mount', () => {
    const handler = () => null;
    render(<EuiWindowEvent event="click" handler={handler} />);
    expect(window.addEventListener).toHaveBeenCalledWith('click', handler);
    expect(windowAddCount).toEqual(1);
  });

  test('removes handler on unmount', () => {
    const handler = () => null;
    const { unmount } = render(
      <EuiWindowEvent event="click" handler={handler} />
    );
    unmount();
    expect(window.removeEventListener).toHaveBeenCalledWith('click', handler);
    expect(windowRemoveCount).toEqual(1);
  });

  test('removes and re-attaches handler to window event on update', () => {
    const handler1 = () => null;
    const handler2 = () => null;
    const { rerender } = render(
      <EuiWindowEvent event="click" handler={handler1} />
    );

    expect(window.addEventListener).toHaveBeenCalledWith('click', handler1);

    rerender(<EuiWindowEvent event="keydown" handler={handler2} />);

    expect(window.removeEventListener).toHaveBeenCalledWith('click', handler1);
    expect(window.addEventListener).toHaveBeenCalledWith('keydown', handler2);
  });

  test('does not remove or re-attach handler if update is irrelevant', () => {
    const handler = () => null;
    const { rerender } = render(
      <EuiWindowEvent event="click" handler={handler} />
    );
    expect(windowAddCount).toEqual(1);

    rerender(
      <EuiWindowEvent
        event="click"
        handler={handler}
        data-test-subj="whatever"
      />
    );
    expect(windowAddCount).toEqual(1);
    expect(windowRemoveCount).toEqual(0);
  });
});
