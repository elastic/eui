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

import { EuiCallOut, TYPE_TO_VARIANT_MAP } from './call_out';
import { EuiCallOutSize, EuiCallOutType, HEADINGS, SIZES } from './types';

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
        const title = 'Callout title';
        const { getByTestSubject } = render(
          <EuiCallOut title={title} data-test-subj="euiCallout">
            Content
          </EuiCallOut>
        );

        expect(getByTestSubject('euiCallout')).toHaveTextContent(title);
      });
    });

    describe('text', () => {
      it('is rendered', () => {
        const text = 'Callout body text';
        const { getByTestSubject } = render(
          <EuiCallOut text={text} data-test-subj="euiCallout">
            Content
          </EuiCallOut>
        );

        expect(getByTestSubject('euiCallout')).toHaveTextContent(text);
      });
    });

    describe('type', () => {
      Object.keys(TYPE_TO_VARIANT_MAP).forEach((type) => {
        test(`${type} is rendered`, () => {
          const { container, getByTestSubject } = render(
            <EuiCallOut
              type={type as EuiCallOutType}
              data-test-subj="euiCallout"
            />
          );

          const callout = getByTestSubject('euiCallout');

          expect(
            container.querySelector(
              `[data-euiicon-type="${
                TYPE_TO_VARIANT_MAP[type as EuiCallOutType].iconType
              }"]`
            )
          ).toBeInTheDocument();
          expect(callout).toHaveAttribute('data-type', type);
        });
      });
    });

    describe('size', () => {
      SIZES.forEach((size) => {
        test(`${size} is rendered`, () => {
          const { getByTestSubject } = render(
            <EuiCallOut
              size={size as EuiCallOutSize}
              data-test-subj="euiCallout"
            />
          );

          const callout = getByTestSubject('euiCallout');

          expect(callout).toHaveAttribute('data-size', size);
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

    describe('actionProps', () => {
      it('renders a primary action button', () => {
        const { getByTestSubject } = render(
          <EuiCallOut
            actionProps={{
              primary: {
                children: 'Primary action',
                'data-test-subj': 'primaryAction',
              },
            }}
          />
        );

        expect(getByTestSubject('primaryAction')).toBeInTheDocument();
      });

      it('renders a primary and secondary action button', () => {
        const { getByTestSubject } = render(
          <EuiCallOut
            actionProps={{
              primary: {
                children: 'Primary action',
                'data-test-subj': 'primaryAction',
              },
              secondary: {
                children: 'Secondary action',
                'data-test-subj': 'secondaryAction',
              },
            }}
          />
        );

        expect(getByTestSubject('primaryAction')).toBeInTheDocument();
        expect(getByTestSubject('secondaryAction')).toBeInTheDocument();
      });

      it('does not render a standalone secondary action button', () => {
        const { container } = render(
          <EuiCallOut
            actionProps={{
              secondary: {
                children: 'Secondary action',
                'data-test-subj': 'secondaryAction',
              },
            }}
          />
        );

        expect(
          container.querySelector('[data-test-subj="secondaryAction"]')
        ).not.toBeInTheDocument();
      });
    });

    describe('onDismiss', () => {
      it('renders dismiss button and fires callback', () => {
        const onDismiss = jest.fn();
        const { getByTestSubject } = render(
          <EuiCallOut onDismiss={onDismiss}>Content</EuiCallOut>
        );

        fireEvent.click(getByTestSubject('euiDismissCalloutButton'));
        expect(onDismiss).toHaveBeenCalledTimes(1);
      });

      it('dismiss button has aria-label', () => {
        const onDismiss = jest.fn();
        const { getByTestSubject } = render(
          <EuiCallOut onDismiss={onDismiss}>Content</EuiCallOut>
        );

        expect(getByTestSubject('euiDismissCalloutButton')).toHaveAttribute(
          'aria-label',
          'Dismiss this callout'
        );
      });

      it('takes props in dismissButtonProps', () => {
        const onDismiss = () => {};
        const { getByTestSubject } = render(
          <EuiCallOut
            onDismiss={onDismiss}
            dismissButtonProps={{
              'aria-label': 'Custom label',
              'data-example': 'value',
            }}
          >
            Content
          </EuiCallOut>
        );

        expect(getByTestSubject('euiDismissCalloutButton')).toHaveAttribute(
          'data-example',
          'value'
        );
        expect(getByTestSubject('euiDismissCalloutButton')).toHaveAttribute(
          'aria-label',
          'Custom label'
        );
      });
    });

    describe('announceOnMount', () => {
      jest.useFakeTimers();

      afterEach(() => {
        jest.clearAllTimers();
      });

      it('announces the callout content in an aria-live region when announceOnMount is true', () => {
        render(
          <EuiCallOut
            announceOnMount
            title="Announcement title"
            text="Announcement content"
          ></EuiCallOut>
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
          <EuiCallOut
            announceOnMount
            title="Announcement title"
            text="Announcement content"
          ></EuiCallOut>
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
