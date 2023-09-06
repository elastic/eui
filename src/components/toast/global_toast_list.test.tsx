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
import { render, findByTestSubject, queryByTestSubject } from '../../test/rtl';

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
        expect(dismissToastSpy).not.toBeCalled();
        act(() => {
          jest.advanceTimersByTime(1);
        });
        expect(dismissToastSpy).toBeCalled();
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
        expect(dismissToastSpy).not.toBeCalled();
        act(() => {
          jest.advanceTimersByTime(1);
        });
        expect(dismissToastSpy).toBeCalled();
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
        expect(dismissToastSpy).not.toBeCalled();
        act(() => {
          jest.advanceTimersByTime(nowItsTime - notYetTime);
        });
        expect(dismissToastSpy).toBeCalled();
      });
    });

    describe('dismissAllToasts Button', () => {
      test('is not visible when the showClearAllButtonAt prop is set to 0', () => {
        const dismissToastSpy = jest.fn();
        const dismissAllToastsSpy = jest.fn();
        const TOAST_LIFE_TIME_MS = 10;

        const TOAST_COUNT = CLEAR_ALL_TOASTS_THRESHOLD_DEFAULT;

        const { container } = render(
          <EuiGlobalToastList
            toasts={Array.from(new Array(TOAST_COUNT)).map((_, idx) => ({
              id: String(idx),
              'data-test-subj': String(idx),
            }))}
            toastLifeTimeMs={TOAST_LIFE_TIME_MS}
            dismissToast={dismissToastSpy}
            onClearAllToasts={dismissAllToastsSpy}
            showClearAllButtonAt={0}
          />
        );

        const dismissAllToastsButton = queryByTestSubject(
          container,
          'euiClearAllToastsButton'
        );

        expect(dismissAllToastsButton).not.toBeInTheDocument();
      });

      test('is displayed when the number of toasts to be displayed equals the internal default threshold value', async () => {
        const dismissToastSpy = jest.fn();
        const dismissAllToastsSpy = jest.fn();
        const TOAST_LIFE_TIME_MS = 10;

        const TOAST_COUNT = CLEAR_ALL_TOASTS_THRESHOLD_DEFAULT;

        const { container } = render(
          <EuiGlobalToastList
            toasts={Array.from(new Array(TOAST_COUNT)).map((_, idx) => ({
              id: String(idx),
              'data-test-subj': String(idx),
            }))}
            toastLifeTimeMs={TOAST_LIFE_TIME_MS}
            dismissToast={dismissToastSpy}
            onClearAllToasts={dismissAllToastsSpy}
          />
        );

        const dismissAllToastsButton = await findByTestSubject(
          container,
          'euiClearAllToastsButton'
        );

        fireEvent.click(dismissAllToastsButton);

        expect(dismissToastSpy).toHaveBeenCalledTimes(TOAST_COUNT);
        expect(dismissAllToastsSpy).toHaveBeenCalled();
      });

      test('is visible when the number of toasts to be displayed exceeds the threshold value set with the showClearAllButtonAt prop', async () => {
        const dismissToastSpy = jest.fn();
        const dismissAllToastsSpy = jest.fn();
        const TOAST_LIFE_TIME_MS = 10;

        const TOAST_COUNT = 5;

        const { container } = render(
          <EuiGlobalToastList
            toasts={Array.from(new Array(TOAST_COUNT)).map((_, idx) => ({
              id: String(idx),
              'data-test-subj': String(idx),
            }))}
            toastLifeTimeMs={TOAST_LIFE_TIME_MS}
            dismissToast={dismissToastSpy}
            onClearAllToasts={dismissAllToastsSpy}
            showClearAllButtonAt={TOAST_COUNT - 1}
          />
        );

        const dismissAllToastsButton = await findByTestSubject(
          container,
          'euiClearAllToastsButton'
        );

        fireEvent.click(dismissAllToastsButton);

        expect(dismissToastSpy).toHaveBeenCalledTimes(TOAST_COUNT);
        expect(dismissAllToastsSpy).toHaveBeenCalled();
      });
    });
  });
});
