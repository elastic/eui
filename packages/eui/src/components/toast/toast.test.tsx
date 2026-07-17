/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { fireEvent } from '@testing-library/react';
import { requiredProps } from '../../test';
import { render } from '../../test/rtl';

import { EuiToast, COLOR_TO_NOTIFICATION_ICON_MAP } from './toast';
import { COLORS } from './types';
import { NOTIFICATION_ICONS_MAP } from '../notification_icon/notification_icon';

describe('EuiToast', () => {
  test('is rendered', () => {
    const { container } = render(
      <EuiToast {...requiredProps} title="Toast title" text="Toast body text" />
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  describe('props', () => {
    describe('title', () => {
      it('is rendered', () => {
        const title = 'Toast title';
        const { getByTestSubject } = render(<EuiToast title={title} />);

        expect(getByTestSubject('euiToastHeader__title')).toHaveTextContent(
          title
        );
      });
    });

    describe('text', () => {
      it('is rendered', () => {
        const text = 'Toast body text';
        const { getByTestSubject } = render(
          <EuiToast title="Toast title" text={text} data-test-subj="euiToast" />
        );

        expect(getByTestSubject('euiToast')).toHaveTextContent(text);
      });
    });

    describe('color', () => {
      COLORS.forEach((color) => {
        test(`${color} renders default notification icon`, () => {
          const { container } = render(<EuiToast color={color} />);
          const iconType = COLOR_TO_NOTIFICATION_ICON_MAP[color];
          const iconName = NOTIFICATION_ICONS_MAP[iconType].name;

          expect(
            container.querySelector(`[data-euiicon-type="${iconName}"]`)
          ).toBeInTheDocument();
        });
      });
    });

    describe('iconType', () => {
      it('renders a custom icon', () => {
        const { container } = render(
          <EuiToast title="Toast title" iconType="user" />
        );

        expect(
          container.querySelector('[data-euiicon-type="user"]')
        ).toBeInTheDocument();
      });

      it('renders default notification icon if not passed', () => {
        const { container } = render(<EuiToast title="Toast title" />);

        expect(
          container.querySelector(
            `[data-euiicon-type="${NOTIFICATION_ICONS_MAP.info.name}"]`
          )
        ).toBeInTheDocument();
      });
    });

    describe('actionProps', () => {
      it('renders a primary action button', () => {
        const { getByTestSubject } = render(
          <EuiToast
            title="Toast title"
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
          <EuiToast
            title="Toast title"
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

      it('renders a standalone secondary action button', () => {
        const { container } = render(
          <EuiToast
            title="Toast title"
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
        ).toBeInTheDocument();
      });
    });

    describe('animationMs', () => {
      it('sets the animation duration CSS variable when provided', () => {
        const { getByTestSubject } = render(
          <EuiToast
            title="Toast title"
            animationMs={5000}
            data-test-subj="euiToast"
          />
        );

        expect(
          getByTestSubject('euiToast').style.getPropertyValue(
            '--euiToastAnimationMs'
          )
        ).toBe('5000ms');
      });

      it('does not set the animation duration CSS variable when not provided', () => {
        const { getByTestSubject } = render(
          <EuiToast title="Toast title" data-test-subj="euiToast" />
        );

        expect(
          getByTestSubject('euiToast').style.getPropertyValue(
            '--euiToastAnimationMs'
          )
        ).toBe('');
      });
    });

    describe('onClose', () => {
      it('renders dismiss button and fires callback', () => {
        const onClose = jest.fn();
        const { getByTestSubject } = render(
          <EuiToast onClose={onClose} title="Toast title" />
        );

        fireEvent.click(getByTestSubject('toastCloseButton'));
        expect(onClose).toHaveBeenCalledTimes(1);
      });

      it('dismiss button has aria-label', () => {
        const { getByTestSubject } = render(
          <EuiToast onClose={() => {}} title="Toast title" />
        );

        expect(getByTestSubject('toastCloseButton')).toHaveAttribute(
          'aria-label',
          'Dismiss toast'
        );
      });
    });
  });
});
