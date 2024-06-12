/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { render } from '@testing-library/react';

import { EuiWindowEvent } from './window_event';

describe('EuiWindowEvent', () => {
  beforeEach(() => {
    window.addEventListener = jest.fn();
    window.removeEventListener = jest.fn();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('attaches handler to window event on mount', () => {
    const handler = () => null;
    render(<EuiWindowEvent event="click" handler={handler} />);
    expect(window.addEventListener).toHaveBeenCalledTimes(1);
    expect(window.addEventListener).toHaveBeenCalledWith('click', handler);
  });

  test('removes handler on unmount', () => {
    const handler = () => null;
    const { unmount } = render(
      <EuiWindowEvent event="click" handler={handler} />
    );
    unmount();
    expect(window.removeEventListener).toHaveBeenLastCalledWith(
      'click',
      handler
    );
  });

  test('removes and re-attaches handler to window event on update', () => {
    const handler1 = () => null;
    const handler2 = () => null;
    const { rerender } = render(
      <EuiWindowEvent event="click" handler={handler1} />
    );

    expect(window.addEventListener).toHaveBeenLastCalledWith('click', handler1);

    rerender(<EuiWindowEvent event="keydown" handler={handler2} />);

    expect(window.removeEventListener).toHaveBeenLastCalledWith(
      'click',
      handler1
    );
    expect(window.addEventListener).toHaveBeenLastCalledWith(
      'keydown',
      handler2
    );
  });

  test('does not remove or re-attach handler if update is irrelevant', () => {
    const handler = () => null;
    const { rerender } = render(
      <EuiWindowEvent event="click" handler={handler} />
    );
    expect(window.addEventListener).toHaveBeenCalledTimes(1);

    rerender(
      <EuiWindowEvent
        event="click"
        handler={handler}
        data-test-subj="whatever"
      />
    );
    expect(window.addEventListener).toHaveBeenCalledTimes(1);
    expect(window.removeEventListener).not.toHaveBeenCalled();
  });
});
