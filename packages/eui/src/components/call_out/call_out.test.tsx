/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { act, fireEvent } from '@testing-library/react';
import { requiredProps } from '../../test/required_props';
import { render, screen } from '../../test/rtl';

import { EuiCallOut, COLORS, HEADINGS } from './call_out';

describe('EuiCallOut', () => {
  test('is rendered', () => {
    const { container } = render(
      <EuiCallOut {...requiredProps}>Content</EuiCallOut>
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  describe('props', () => {
    describe('title', () => {
      it('is rendered', () => {
        const { container } = render(
          <EuiCallOut title="Title">Content</EuiCallOut>
        );

        expect(container.firstChild).toMatchSnapshot();
      });
    });

    describe('iconType', () => {
      it('is rendered', () => {
        const { container } = render(<EuiCallOut iconType="user" />);

        expect(container.firstChild).toMatchSnapshot();
      });
    });

    describe('color', () => {
      COLORS.forEach((color) => {
        test(`${color} is rendered`, () => {
          const { container } = render(<EuiCallOut color={color} />);

          expect(container.firstChild).toMatchSnapshot();
        });
      });
    });

    describe('heading', () => {
      HEADINGS.forEach((heading) => {
        test(`${heading} is rendered`, () => {
          const { container } = render(<EuiCallOut heading={heading} />);

          expect(container.firstChild).toMatchSnapshot();
        });
      });
    });

    test('onDismiss', () => {
      const onDismiss = jest.fn();
      render(<EuiCallOut onDismiss={onDismiss}>Content</EuiCallOut>);

      fireEvent.click(screen.getByTestSubject('euiDismissCalloutButton'));
      expect(onDismiss).toHaveBeenCalledTimes(1);
    });

    describe('announceOnMount', () => {
      jest.useFakeTimers();

      afterEach(() => {
        jest.clearAllTimers();
      });

      it('announces the callout content in an aria-live region when announceOnMount is true', () => {
        render(
          <EuiCallOut announceOnMount title="Announcement title">
            Announcement content
          </EuiCallOut>
        );

        act(() => {
          jest.advanceTimersByTime(50);
        });

        // The live region should exist and contain the announcement
        const liveRegion = screen.getByRole('status');
        expect(liveRegion).toHaveTextContent(
          'Announcement title, Announcement content'
        );
      });

      it('clears the announcement after 2000ms', () => {
        render(
          <EuiCallOut announceOnMount title="Announcement title">
            Announcement content
          </EuiCallOut>
        );

        act(() => {
          jest.advanceTimersByTime(50);
        });

        // The live region should exist and contain the announcement
        const liveRegion = screen.getByRole('status');
        expect(liveRegion).toHaveTextContent(
          'Announcement title, Announcement content'
        );

        act(() => {
          jest.advanceTimersByTime(2000);
        });

        expect(liveRegion).toHaveTextContent('');
      });
    });
  });
});
