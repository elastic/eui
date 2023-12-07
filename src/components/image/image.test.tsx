/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { fireEvent } from '@testing-library/react';
import { render, screen } from '../../test/rtl';
import { requiredProps as commonProps } from '../../test';
import { shouldRenderCustomStyles } from '../../test/internal';
import { keys } from '../../services';

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
  shouldRenderCustomStyles(<EuiImage allowFullScreen {...requiredProps} />, {
    skip: { parentTest: true },
    childProps: ['wrapperProps'],
    targetSelector: '.euiImageFullScreenWrapper',
    renderCallback: ({ getByTestSubject }) => {
      fireEvent.click(getByTestSubject('activateFullScreenButton'));
    },
  });

  test('is rendered', () => {
    const { container } = render(<EuiImage {...requiredProps} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  describe('props', () => {
    describe('src vs url', () => {
      test('src', () => {
        const { container } = render(<EuiImage alt="" src="/dog.jpg" />);
        expect(container.firstChild).toMatchSnapshot();
      });

      test('url', () => {
        const { container } = render(<EuiImage alt="" url="/dog.jpg" />);
        expect(container.firstChild).toMatchSnapshot();
      });

      it('picks src over url when both are present (and throws a typescript error)', () => {
        const { container } = render(
          // @ts-expect-error - 'types of property url are incompatible'
          <EuiImage alt="" url="/cat.jpg" src="/dog.jpg" />
        );
        expect(container.querySelector('img')?.getAttribute('src')).toEqual(
          '/dog.jpg'
        );
      });
    });

    test('float', () => {
      const { container } = render(
        <EuiImage {...requiredProps} float="left" />
      );
      expect(container.firstChild).toMatchSnapshot();
    });

    test('margin', () => {
      const { container } = render(<EuiImage {...requiredProps} margin="l" />);
      expect(container.firstChild).toMatchSnapshot();
    });

    test('size', () => {
      const { container } = render(<EuiImage {...requiredProps} size={50} />);
      expect(container.firstChild).toMatchSnapshot();
    });

    test('caption', () => {
      const { container } = render(
        <EuiImage {...requiredProps} caption={<span>caption</span>} />
      );
      expect(container.firstChild).toMatchSnapshot();
    });

    test('allowFullScreen', () => {
      const { container } = render(
        <EuiImage {...requiredProps} allowFullScreen />
      );
      expect(container.firstChild).toMatchSnapshot();
    });

    test('fullScreenIconColor', () => {
      const { container } = render(
        <EuiImage
          {...requiredProps}
          allowFullScreen
          fullScreenIconColor="dark"
        />
      );
      expect(container.firstChild).toMatchSnapshot();
    });

    test('hasShadow', () => {
      const { container } = render(
        <EuiImage
          {...requiredProps}
          size="fullWidth"
          allowFullScreen
          hasShadow
        />
      );
      expect(container.firstChild).toMatchSnapshot();
    });

    test('wrapperProps', () => {
      const { container } = render(
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
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('fullscreen behaviour', () => {
    beforeEach(() => {
      const { getByTestSubject } = render(
        <EuiImage
          {...requiredProps}
          wrapperProps={requiredProps}
          alt="example alt text"
          allowFullScreen
        />
      );
      fireEvent.click(getByTestSubject('activateFullScreenButton'));
    });

    test('fullscreen image is rendered', () => {
      const overlayMask = screen.getByTestSubject('fullScreenOverlayMask');
      const fullScreenImage = overlayMask.querySelector('figure img');
      expect(fullScreenImage).not.toBeNull();
    });

    test('close using close icon', () => {
      const deactivateFullScreenBtn = screen.getByTestSubject(
        'deactivateFullScreenButton'
      );
      fireEvent.click(deactivateFullScreenBtn);

      expect(screen.queryByTestSubject('fullScreenOverlayMask')).toBeNull();
    });

    test('close using ESCAPE key', () => {
      const deactivateFullScreenBtn = screen.getByTestSubject(
        'deactivateFullScreenButton'
      );

      // Ignores non-escape keys
      fireEvent.keyDown(deactivateFullScreenBtn, { key: keys.TAB });

      // Removes full screen overlay on escape key
      fireEvent.keyDown(deactivateFullScreenBtn, { key: keys.ESCAPE });

      expect(screen.queryByTestSubject('fullScreenOverlayMask')).toBeNull();
    });

    // Clicking the mask to close is now handled by EuiFocusTrap
    // and we can't use Enzyme to test this behavior.
    // A Cypress test exists in the EuiFocusTrap suite that
    // sufficiently covers this behavior
  });
});
