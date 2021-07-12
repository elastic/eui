/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { render, mount, ReactWrapper } from 'enzyme';
import { requiredProps, findTestSubject } from '../../test';
import { act } from 'react-dom/test-utils';
import { keys } from '../../services';

import { EuiImage } from './image';

describe('EuiImage', () => {
  test('is rendered', () => {
    const component = render(
      <EuiImage alt="alt" size="l" url="/cat.jpg" {...requiredProps} />
    );

    expect(component).toMatchSnapshot();
  });

  test('is rendered and allows full screen', () => {
    const component = render(
      <EuiImage
        alt="alt"
        size="l"
        url="/cat.jpg"
        allowFullScreen
        {...requiredProps}
      />
    );

    expect(component).toMatchSnapshot();
  });

  test('is rendered with src', () => {
    const component = render(
      <EuiImage alt="alt" float="left" src="/cat.jpg" />
    );

    expect(component).toMatchSnapshot();
  });

  test('is rendered with a float', () => {
    const component = render(
      <EuiImage alt="alt" float="left" url="/cat.jpg" />
    );

    expect(component).toMatchSnapshot();
  });

  test('is rendered with a margin', () => {
    const component = render(<EuiImage alt="alt" margin="l" url="/cat.jpg" />);

    expect(component).toMatchSnapshot();
  });

  test('is rendered with custom size', () => {
    const component = render(<EuiImage alt="alt" size={50} url="/cat.jpg" />);

    expect(component).toMatchSnapshot();
  });

  test('is rendered with a node as the caption', () => {
    const component = render(
      <EuiImage alt="alt" caption={<span>caption</span>} url="/cat.jpg" />
    );

    expect(component).toMatchSnapshot();
  });

  describe('Full screen behaviour', () => {
    let component: ReactWrapper;

    beforeEach(() => {
      const testProps = {
        ...requiredProps,
        'data-test-subj': 'euiImage',
      };

      component = mount(
        <EuiImage
          alt="alt"
          size="l"
          url="/cat.jpg"
          allowFullScreen
          {...testProps}
        />
      );

      findTestSubject(component, 'activateFullScreenButton').simulate('click');
    });

    test('full screen image is rendered', () => {
      const overlayMask = document.querySelectorAll(
        '[data-test-subj=fullScreenOverlayMask]'
      );
      expect(overlayMask.length).toBe(1);

      const fullScreenImage = overlayMask[0].querySelectorAll(
        '[data-test-subj=euiImage]'
      );
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
      const deactivateFullScreenBtn = document.querySelectorAll(
        '[data-test-subj=deactivateFullScreenButton]'
      );
      expect(deactivateFullScreenBtn.length).toBe(1);

      act(() => {
        const escapeKeydownEvent = new KeyboardEvent('keydown', {
          key: keys.ESCAPE,
          bubbles: true,
        });
        (deactivateFullScreenBtn[0] as HTMLElement).dispatchEvent(
          escapeKeydownEvent
        );
      });

      const overlayMask = document.querySelectorAll(
        '[data-test-subj=fullScreenOverlayMask]'
      );
      expect(overlayMask.length).toBe(0);
    });

    test('close using overlay mask', () => {
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
