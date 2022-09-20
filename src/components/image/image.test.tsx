/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { render, mount, ReactWrapper } from 'enzyme';
import { requiredProps as commonProps, findTestSubject } from '../../test';
import { act } from 'react-dom/test-utils';
import { keys } from '../../services';
import { shouldRenderCustomStyles } from '../../test/internal';

import { EuiImage } from './image';

describe('EuiImage', () => {
  const requiredProps = {
    ...commonProps,
    alt: '',
    src: '/cat.jpg',
  };

  shouldRenderCustomStyles(<EuiImage {...requiredProps} />, {
    childProps: ['wrapperProps'],
  });

  test('is rendered', () => {
    const component = render(<EuiImage {...requiredProps} />);
    expect(component).toMatchSnapshot();
  });

  describe('props', () => {
    describe('src vs url', () => {
      test('src', () => {
        const component = render(<EuiImage alt="" src="/dog.jpg" />);
        expect(component).toMatchSnapshot();
      });

      test('url', () => {
        const component = render(<EuiImage alt="" url="/dog.jpg" />);
        expect(component).toMatchSnapshot();
      });

      it('picks src over url when both are present (and throws a typescript error)', () => {
        const component = render(
          // @ts-expect-error - 'types of property url are incompatible'
          <EuiImage alt="" url="/cat.jpg" src="/dog.jpg" />
        );
        expect(component.find('img').attr('src')).toEqual('/dog.jpg');
      });
    });

    test('float', () => {
      const component = render(<EuiImage {...requiredProps} float="left" />);
      expect(component).toMatchSnapshot();
    });

    test('margin', () => {
      const component = render(<EuiImage {...requiredProps} margin="l" />);
      expect(component).toMatchSnapshot();
    });

    test('size', () => {
      const component = render(<EuiImage {...requiredProps} size={50} />);
      expect(component).toMatchSnapshot();
    });

    test('caption', () => {
      const component = render(
        <EuiImage {...requiredProps} caption={<span>caption</span>} />
      );
      expect(component).toMatchSnapshot();
    });

    test('allowFullScreen', () => {
      const component = render(<EuiImage {...requiredProps} allowFullScreen />);
      expect(component).toMatchSnapshot();
    });

    test('fullScreenIconColor', () => {
      const component = render(
        <EuiImage
          {...requiredProps}
          allowFullScreen
          fullScreenIconColor="dark"
        />
      );
      expect(component).toMatchSnapshot();
    });

    test('hasShadow', () => {
      const component = render(
        <EuiImage
          {...requiredProps}
          size="fullWidth"
          allowFullScreen
          hasShadow
        />
      );
      expect(component).toMatchSnapshot();
    });

    test('wrapperProps', () => {
      const component = render(
        <EuiImage
          alt="alt"
          caption={<span>caption</span>}
          url="/cat.jpg"
          wrapperProps={{
            ...requiredProps,
            style: { border: '2px solid red' },
          }}
        />
      );
      expect(component).toMatchSnapshot();
    });
  });

  describe('fullscreen behaviour', () => {
    let component: ReactWrapper;

    beforeAll(() => {
      component = mount(
        <EuiImage
          {...requiredProps}
          wrapperProps={requiredProps}
          alt="example alt text"
          allowFullScreen
        />
      );
    });

    beforeEach(() => {
      findTestSubject(component, 'activateFullScreenButton').simulate('click');
    });

    test('fullscreen image is rendered', () => {
      const overlayMask = document.querySelectorAll(
        '[data-test-subj=fullScreenOverlayMask]'
      );
      expect(overlayMask.length).toBe(1);

      const fullScreenImage = overlayMask[0].querySelectorAll('figure img');
      expect(fullScreenImage.length).toBe(1);
    });

    test('close using close icon', () => {
      const deactivateFullScreenBtn = document.querySelectorAll(
        '[data-test-subj=deactivateFullScreenButton]'
      );
      expect(deactivateFullScreenBtn.length).toBe(1);

      act(() => {
        (deactivateFullScreenBtn[0] as HTMLElement).click();
      });

      const overlayMask = document.querySelectorAll(
        '[data-test-subj=fullScreenOverlayMask]'
      );
      expect(overlayMask.length).toBe(0);
    });

    test('close using ESCAPE key', () => {
      const deactivateFullScreenBtn = document.querySelector<HTMLElement>(
        '[data-test-subj=deactivateFullScreenButton]'
      );
      expect(deactivateFullScreenBtn).toBeTruthy();

      // Ignores non-escape keys
      act(() => {
        const escapeKeydownEvent = new KeyboardEvent('keydown', {
          key: keys.TAB,
          bubbles: true,
        });
        deactivateFullScreenBtn!.dispatchEvent(escapeKeydownEvent);
      });
      expect(deactivateFullScreenBtn).toBeTruthy();

      // Removes full screen overlay on escape key
      act(() => {
        const escapeKeydownEvent = new KeyboardEvent('keydown', {
          key: keys.ESCAPE,
          bubbles: true,
        });
        deactivateFullScreenBtn!.dispatchEvent(escapeKeydownEvent);
      });

      const overlayMask = document.querySelector(
        '[data-test-subj=fullScreenOverlayMask]'
      );
      expect(overlayMask).toBeFalsy();
    });

    // Clicking the mask to close is now handled by EuiFocusTrap
    // and we can't use Enzyme to test this behavior.
    // A Cypress test exists in the EuiFocusTrap suite that
    // sufficiently covers this behavior
    test.skip('close using overlay mask', () => {
      let overlayMask = document.querySelectorAll(
        '[data-test-subj=fullScreenOverlayMask]'
      );
      expect(overlayMask.length).toBe(1);

      act(() => {
        (overlayMask[0] as HTMLElement).click();
      });

      overlayMask = document.querySelectorAll(
        '[data-test-subj=fullScreenOverlayMask]'
      );
      expect(overlayMask.length).toBe(0);
    });
  });
});
