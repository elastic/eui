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

import { EuiCallOut } from './call_out';
import { COLORS, EuiCallOutSize, HEADINGS, SIZES } from './types';
import { NOTIFICATION_ICONS_MAP } from '../notification_icon/notification_icon';

describe('EuiCallOut', () => {
  test('is rendered', () => {
    const { container } = render(
      <EuiCallOut title="Callout title" {...requiredProps} text="content" />
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  describe('props', () => {
    describe('title', () => {
      it('is rendered', () => {
        const title = 'Callout title';
        const { getByTestSubject } = render(
          <EuiCallOut title={title} data-test-subj="euiCallout" />
        );

        expect(getByTestSubject('euiCallout')).toHaveTextContent(title);
      });
    });

    describe('text', () => {
      it('is rendered', () => {
        const text = 'Callout body text';
        const { getByTestSubject } = render(
          <EuiCallOut
            title="Callout title"
            text={text}
            data-test-subj="euiCallout"
          />
        );

        expect(getByTestSubject('euiCallout')).toHaveTextContent(text);
      });
    });

    describe('color', () => {
      COLORS.forEach((color) => {
        test(`${color} is rendered`, () => {
          const { container } = render(
            <EuiCallOut title="Callout title" color={color} />
          );

          expect(container.firstChild).toHaveClass(`euiCallOut--${color}`);
        });
      });

      it('normalizes legacy accent runtime values to primary', () => {
        const { container } = render(
          <EuiCallOut
            title="Callout title"
            color={'accent' as unknown as any}
          />
        );

        expect(container.firstChild).toHaveClass('euiCallOut--primary');
        expect(
          container.querySelector(
            `[data-euiicon-type="${NOTIFICATION_ICONS_MAP.info.name}"]`
          )
        ).toBeInTheDocument();
      });
    });

    describe('iconType', () => {
      it('renders', () => {
        const { container } = render(
          <EuiCallOut title="Callout title" iconType="user" />
        );

        expect(
          container.querySelector(`[data-euiicon-type="user"]`)
        ).toBeInTheDocument();
      });

      it('renders default notification icons if not passed', () => {
        const { container } = render(<EuiCallOut title="Callout title" />);

        expect(
          container.querySelector(
            `[data-euiicon-type="${NOTIFICATION_ICONS_MAP.info.name}"]`
          )
        ).toBeInTheDocument();
      });
    });

    describe('size', () => {
      SIZES.forEach((size) => {
        test(`${size} is rendered`, () => {
          const { getByTestSubject } = render(
            <EuiCallOut
              title="Callout title"
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
          const { container } = render(
            <EuiCallOut title="Callout title" heading={heading} />
          );

          expect(container.firstChild).toMatchSnapshot();
        });
      });
    });

    describe('actionProps', () => {
      it('renders a primary action button', () => {
        const { getByTestSubject } = render(
          <EuiCallOut
            title="Callout title"
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
            title="Callout title"
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
            title="Callout title"
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

      describe('tooltipProps', () => {
        it('renders the primary action with a tooltip', () => {
          const { getByTestSubject, queryByRole } = render(
            <EuiCallOut
              title="Callout title"
              actionProps={{
                primary: {
                  children: 'Primary action',
                  'data-test-subj': 'primaryAction',
                  tooltipProps: { content: 'Tooltip content' },
                },
              }}
            />
          );

          expect(queryByRole('tooltip')).not.toBeInTheDocument();

          fireEvent.mouseOver(getByTestSubject('primaryAction'));
          expect(queryByRole('tooltip')).toBeInTheDocument();
          expect(queryByRole('tooltip')).toHaveTextContent('Tooltip content');

          fireEvent.mouseOut(getByTestSubject('primaryAction'));
          expect(queryByRole('tooltip')).not.toBeInTheDocument();
        });

        it('renders the secondary action with a tooltip', () => {
          const { getByTestSubject, queryByRole } = render(
            <EuiCallOut
              title="Callout title"
              actionProps={{
                primary: { children: 'Primary action' },
                secondary: {
                  children: 'Secondary action',
                  'data-test-subj': 'secondaryAction',
                  tooltipProps: { content: 'Secondary tooltip' },
                },
              }}
            />
          );

          expect(queryByRole('tooltip')).not.toBeInTheDocument();

          fireEvent.mouseOver(getByTestSubject('secondaryAction'));
          expect(queryByRole('tooltip')).toBeInTheDocument();
          expect(queryByRole('tooltip')).toHaveTextContent('Secondary tooltip');
        });
      });

      describe('popoverProps', () => {
        it('does not render popover content when isOpen is false', () => {
          const { queryByText } = render(
            <EuiCallOut
              title="Callout title"
              actionProps={{
                primary: {
                  children: 'Primary action',
                  popoverProps: {
                    isOpen: false,
                    closePopover: () => {},
                    children: <span>Popover content</span>,
                  },
                },
              }}
            />
          );

          expect(queryByText('Popover content')).not.toBeInTheDocument();
        });

        it('renders popover content for the primary action when isOpen is true', () => {
          const { queryByText } = render(
            <EuiCallOut
              title="Callout title"
              actionProps={{
                primary: {
                  children: 'Primary action',
                  popoverProps: {
                    isOpen: true,
                    closePopover: () => {},
                    children: <span>Popover content</span>,
                  },
                },
              }}
            />
          );

          expect(queryByText('Popover content')).toBeInTheDocument();
        });

        it('renders popover content for the secondary action when isOpen is true', () => {
          const { queryByText } = render(
            <EuiCallOut
              title="Callout title"
              actionProps={{
                primary: { children: 'Primary action' },
                secondary: {
                  children: 'Secondary action',
                  popoverProps: {
                    isOpen: true,
                    closePopover: () => {},
                    children: <span>Secondary popover content</span>,
                  },
                },
              }}
            />
          );

          expect(queryByText('Secondary popover content')).toBeInTheDocument();
        });
      });
    });

    describe('onDismiss', () => {
      it('renders dismiss button and fires callback', () => {
        const onDismiss = jest.fn();
        const { getByTestSubject } = render(
          <EuiCallOut
            title="Callout title"
            text="Content"
            onDismiss={onDismiss}
          />
        );

        fireEvent.click(getByTestSubject('euiDismissCalloutButton'));
        expect(onDismiss).toHaveBeenCalledTimes(1);
      });

      it('dismiss button has aria-label', () => {
        const onDismiss = jest.fn();
        const { getByTestSubject } = render(
          <EuiCallOut
            title="Callout title"
            text="Content"
            onDismiss={onDismiss}
          />
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
            title="Callout title"
            text="Content"
            onDismiss={onDismiss}
            dismissButtonProps={{
              'aria-label': 'Custom label',
              'data-example': 'value',
            }}
          />
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
          />
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
          />
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
