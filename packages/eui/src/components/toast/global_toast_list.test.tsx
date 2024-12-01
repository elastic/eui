/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { act, fireEvent } from '@testing-library/react';
import { mount } from 'enzyme';
import { requiredProps, findTestSubject } from '../../test';
import { render } from '../../test/rtl';

import {
  EuiGlobalToastList,
  Toast,
  TOAST_FADE_OUT_MS,
  CLEAR_ALL_TOASTS_THRESHOLD_DEFAULT,
} from './global_toast_list';

jest.useFakeTimers();

describe('EuiGlobalToastList', () => {
  test('is rendered', () => {
    const { container } = render(
      <EuiGlobalToastList
        {...requiredProps}
        dismissToast={() => {}}
        toastLifeTimeMs={5}
      />
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  describe('props', () => {
    describe('toasts', () => {
      test('is rendered', () => {
        const toasts: Toast[] = [
          {
            title: 'A',
            text: 'a',
            color: 'success',
            iconType: 'check',
            'data-test-subj': 'a',
            id: 'a',
          },
          {
            title: 'B',
            text: 'b',
            color: 'danger',
            iconType: 'warning',
            'data-test-subj': 'b',
            id: 'b',
          },
        ];

        const { container } = render(
          <EuiGlobalToastList
            toasts={toasts}
            dismissToast={() => {}}
            toastLifeTimeMs={5}
          />
        );

        expect(container.firstChild).toMatchSnapshot();
      });
    });

    describe('side', () => {
      test('can be changed to left', () => {
        const toasts: Toast[] = [
          {
            title: 'A',
            text: 'a',
            color: 'success',
            iconType: 'check',
            'data-test-subj': 'a',
            id: 'a',
          },
          {
            title: 'B',
            text: 'b',
            color: 'danger',
            iconType: 'warning',
            'data-test-subj': 'b',
            id: 'b',
          },
        ];

        const { container } = render(
          <EuiGlobalToastList
            toasts={toasts}
            dismissToast={() => {}}
            toastLifeTimeMs={5}
            side="left"
          />
        );
        expect(container.firstChild).toMatchSnapshot();
      });
    });

    describe('dismissToast', () => {
      test('is called when a toast is clicked', () => {
        const dismissToastSpy = jest.fn();
        const component = mount(
          <EuiGlobalToastList
            toasts={[
              {
                'data-test-subj': 'b',
                id: 'b',
              },
            ]}
            dismissToast={dismissToastSpy}
            toastLifeTimeMs={100}
          />
        );

        const toastB = findTestSubject(component, 'b');
        const closeButton = findTestSubject(toastB, 'toastCloseButton');
        closeButton.simulate('click');

        act(() => {
          jest.advanceTimersByTime(TOAST_FADE_OUT_MS - 1);
        });
        expect(dismissToastSpy).not.toHaveBeenCalled();
        act(() => {
          jest.advanceTimersByTime(1);
        });
        expect(dismissToastSpy).toHaveBeenCalled();
      });

      test('is called when the toast lifetime elapses', () => {
        const TOAST_LIFE_TIME_MS = 5;
        const dismissToastSpy = jest.fn();
        mount(
          <EuiGlobalToastList
            toasts={[
              {
                'data-test-subj': 'b',
                id: 'b',
              },
            ]}
            dismissToast={dismissToastSpy}
            toastLifeTimeMs={TOAST_LIFE_TIME_MS}
          />
        );

        act(() => {
          jest.advanceTimersByTime(TOAST_LIFE_TIME_MS + TOAST_FADE_OUT_MS - 1);
        });
        expect(dismissToastSpy).not.toHaveBeenCalled();
        act(() => {
          jest.advanceTimersByTime(1);
        });
        expect(dismissToastSpy).toHaveBeenCalled();
      });

      test('toastLifeTimeMs is overrideable by individidual toasts', () => {
        const TOAST_LIFE_TIME_MS = 10;
        const TOAST_LIFE_TIME_MS_OVERRIDE = 100;
        const dismissToastSpy = jest.fn();
        mount(
          <EuiGlobalToastList
            toasts={[
              {
                'data-test-subj': 'b',
                id: 'b',
                toastLifeTimeMs: TOAST_LIFE_TIME_MS_OVERRIDE,
              },
            ]}
            dismissToast={dismissToastSpy}
            toastLifeTimeMs={TOAST_LIFE_TIME_MS}
          />
        );

        const notYetTime = TOAST_LIFE_TIME_MS + TOAST_FADE_OUT_MS;
        const nowItsTime = TOAST_LIFE_TIME_MS_OVERRIDE + TOAST_FADE_OUT_MS;
        act(() => {
          jest.advanceTimersByTime(notYetTime);
        });
        expect(dismissToastSpy).not.toHaveBeenCalled();
        act(() => {
          jest.advanceTimersByTime(nowItsTime - notYetTime);
        });
        expect(dismissToastSpy).toHaveBeenCalled();
      });
    });

    describe('clear all toasts button', () => {
      const createMockToasts = (toastCount: number) =>
        Array.from(new Array(toastCount)).map((_, idx) => ({
          id: String(idx),
          'data-test-subj': String(idx),
        }));

      const sharedProps = {
        toastLifeTimeMs: 10,
        dismissToast: jest.fn(),
        toasts: createMockToasts(CLEAR_ALL_TOASTS_THRESHOLD_DEFAULT),
      };

      afterEach(() => {
        sharedProps.dismissToast.mockClear();
      });

      test('is not visible when the showClearAllButtonAt prop is set to 0', () => {
        const { queryByTestSubject } = render(
          <EuiGlobalToastList {...sharedProps} showClearAllButtonAt={0} />
        );

        expect(
          queryByTestSubject('euiClearAllToastsButton')
        ).not.toBeInTheDocument();
      });

      it('is not visible when the number of toasts to be displayed is below the set toast dismiss threshold', () => {
        const TOAST_COUNT = CLEAR_ALL_TOASTS_THRESHOLD_DEFAULT - 1;

        const { queryByTestSubject } = render(
          <EuiGlobalToastList
            {...sharedProps}
            toasts={createMockToasts(TOAST_COUNT)}
          />
        );

        expect(
          queryByTestSubject('euiClearAllToastsButton')
        ).not.toBeInTheDocument();
      });

      test('is displayed when the number of toasts to be displayed equals the internal default threshold value', () => {
        const { getByTestSubject } = render(
          <EuiGlobalToastList {...sharedProps} />
        );

        expect(getByTestSubject('euiClearAllToastsButton')).toBeInTheDocument();
      });

      test('is visible when the number of toasts to be displayed exceeds the threshold value set with the showClearAllButtonAt prop', () => {
        const TOAST_COUNT = 5;

        const { getByTestSubject } = render(
          <EuiGlobalToastList
            {...sharedProps}
            toasts={createMockToasts(TOAST_COUNT)}
            showClearAllButtonAt={TOAST_COUNT - 1}
          />
        );

        expect(getByTestSubject('euiClearAllToastsButton')).toBeInTheDocument();
      });

      test('fires the optional onClearAllToasts callback if provided when the clear toast button is clicked', () => {
        const onClearAllToastsSpy = jest.fn();

        const TOAST_COUNT = 5;

        const { getByTestSubject } = render(
          <EuiGlobalToastList
            {...sharedProps}
            toasts={createMockToasts(TOAST_COUNT)}
            onClearAllToasts={onClearAllToastsSpy}
          />
        );

        fireEvent.click(getByTestSubject('euiClearAllToastsButton'));

        expect(onClearAllToastsSpy).toHaveBeenCalledTimes(1);
        expect(sharedProps.dismissToast).toHaveBeenCalledTimes(TOAST_COUNT);
      });
    });

    test('role', () => {
      const { queryByRole } = render(
        <EuiGlobalToastList
          dismissToast={() => {}}
          toastLifeTimeMs={5}
          role="alert"
        />
      );

      expect(queryByRole('alert')).toBeInTheDocument();
      expect(queryByRole('log')).not.toBeInTheDocument();
    });
  });
});
