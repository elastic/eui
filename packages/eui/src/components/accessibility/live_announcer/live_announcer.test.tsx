/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { ReactElement } from 'react';
import { act } from '@testing-library/react';
import { screen, render } from '../../../test/rtl';

import { EuiLiveAnnouncer } from './live_announcer';

const content = 'You have new notifications.';

const renderComponent = (component: ReactElement) => {
  const testArgs = render(component);

  act(() => {
    jest.advanceTimersByTime(50);
  });

  return testArgs;
};

describe('EuiLiveAnnouncer', () => {
  jest.useFakeTimers();

  afterEach(() => {
    jest.clearAllTimers();
  });

  it('renders screen reader content when active', () => {
    const { container } = renderComponent(
      <EuiLiveAnnouncer isActive={true}>{content}</EuiLiveAnnouncer>
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders `children` as string correctly', () => {
    renderComponent(<EuiLiveAnnouncer>{content}</EuiLiveAnnouncer>);

    const region = screen.getByRole('status');
    expect(region).toHaveAttribute('aria-live', 'polite');
    expect(region).toHaveAttribute('aria-atomic', 'true');
    expect(region).toHaveTextContent('You have new notifications.');
  });

  it('renders `children` as ReactNode correctly', () => {
    renderComponent(<EuiLiveAnnouncer>{content}</EuiLiveAnnouncer>);

    const region = screen.getByRole('status').firstChild;
    expect(region).toHaveTextContent('You have new notifications.');
  });

  it('clears the message after `clearAfterMs`', () => {
    renderComponent(
      <EuiLiveAnnouncer clearAfterMs={1000}>{content}</EuiLiveAnnouncer>
    );
    const region = screen.getByRole('status');
    expect(region).toHaveTextContent('You have new notifications.');
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(region).toHaveTextContent('');
  });

  it('does not clear the message if `clearAfterMs=false`', () => {
    renderComponent(
      <EuiLiveAnnouncer clearAfterMs={false}>{content}</EuiLiveAnnouncer>
    );
    const region = screen.getByRole('status');
    act(() => {
      jest.advanceTimersByTime(5000);
    });
    expect(region).toHaveTextContent('You have new notifications.');
  });

  it('sets `aria-live` to off when `isActive=false`', () => {
    renderComponent(
      <EuiLiveAnnouncer isActive={false}>{content}</EuiLiveAnnouncer>
    );
    const region = screen.getByRole('status');
    expect(region).toHaveAttribute('aria-live', 'off');
  });

  it('sets custom `role` and `aria-live`', () => {
    renderComponent(
      <EuiLiveAnnouncer role="alert" aria-live="assertive">
        {content}
      </EuiLiveAnnouncer>
    );
    const region = screen.getByRole('alert');
    expect(region).toHaveAttribute('aria-live', 'assertive');
  });

  it('updates the message when `children` change', () => {
    const { rerender } = renderComponent(
      <EuiLiveAnnouncer>{content}</EuiLiveAnnouncer>
    );
    const region = screen.getByRole('status');
    expect(region).toHaveTextContent('You have new notifications.');
    rerender(
      <EuiLiveAnnouncer>You have additional notifications.</EuiLiveAnnouncer>
    );
    expect(region).toHaveTextContent('You have additional notifications.');
  });
});
