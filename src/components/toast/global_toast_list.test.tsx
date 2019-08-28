import React from 'react';
import { render, mount } from 'enzyme';
import { requiredProps, findTestSubject } from '../../test';

import {
  EuiGlobalToastList,
  Toast,
  TOAST_FADE_OUT_MS,
} from './global_toast_list';

jest.useFakeTimers();

describe('EuiGlobalToastList', () => {
  test('is rendered', () => {
    const component = render(
      <EuiGlobalToastList
        {...requiredProps}
        dismissToast={() => {}}
        toastLifeTimeMs={5}
      />
    );

    expect(component).toMatchSnapshot();
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
            iconType: 'alert',
            'data-test-subj': 'b',
            id: 'b',
          },
        ];

        const component = render(
          <EuiGlobalToastList
            toasts={toasts}
            dismissToast={() => {}}
            toastLifeTimeMs={5}
          />
        );

        expect(component).toMatchSnapshot();
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

        jest.advanceTimersByTime(TOAST_FADE_OUT_MS - 1);
        expect(dismissToastSpy).not.toBeCalled();
        jest.advanceTimersByTime(1);
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

        jest.advanceTimersByTime(TOAST_LIFE_TIME_MS + TOAST_FADE_OUT_MS - 1);
        expect(dismissToastSpy).not.toBeCalled();
        jest.advanceTimersByTime(1);
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
        jest.advanceTimersByTime(notYetTime);
        expect(dismissToastSpy).not.toBeCalled();
        jest.advanceTimersByTime(nowItsTime - notYetTime);
        expect(dismissToastSpy).toBeCalled();
      });
    });
  });
});
