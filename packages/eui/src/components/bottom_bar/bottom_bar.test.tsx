/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { render } from '../../test/rtl';
import { requiredProps } from '../../test';

import { EuiBottomBar, PADDING_SIZES, POSITIONS } from './bottom_bar';

describe('EuiBottomBar', () => {
  test('is rendered', () => {
    const { baseElement } = render(
      <EuiBottomBar {...requiredProps}>Content</EuiBottomBar>
    );

    expect(baseElement).toMatchSnapshot();
  });

  describe('props', () => {
    describe('paddingSize', () => {
      PADDING_SIZES.forEach((paddingSize) => {
        test(`${paddingSize} is rendered`, () => {
          const { baseElement } = render(
            <EuiBottomBar paddingSize={paddingSize} />
          );

          expect(baseElement).toMatchSnapshot();
        });
      });
    });

    describe('position', () => {
      POSITIONS.forEach((position) => {
        test(`${position} is rendered`, () => {
          const { baseElement } = render(<EuiBottomBar position={position} />);

          expect(baseElement).toMatchSnapshot();
        });
      });
    });

    test('landmarkHeading', () => {
      const { baseElement } = render(
        <EuiBottomBar landmarkHeading="This should have been label" />
      );

      expect(baseElement).toMatchSnapshot();
    });

    test('affordForDisplacement can be false', () => {
      const { baseElement } = render(
        <EuiBottomBar affordForDisplacement={false} />
      );

      expect(baseElement).toMatchSnapshot();
    });

    test('usePortal can be false', () => {
      const { baseElement } = render(<EuiBottomBar usePortal={false} />);

      expect(baseElement).toMatchSnapshot();
    });

    test('bodyClassName is rendered', () => {
      const { baseElement } = render(
        <EuiBottomBar bodyClassName={'customClass'} />
      );

      expect(baseElement).toMatchSnapshot();
      expect(document.body.classList.contains('customClass')).toBe(true);
    });

    test('style is customized', () => {
      const { baseElement } = render(<EuiBottomBar style={{ left: 12 }} />);

      expect(baseElement).toMatchSnapshot();
    });

    test('position props are altered', () => {
      const { baseElement } = render(
        <EuiBottomBar top={30} right={30} bottom={30} left={30} />
      );

      expect(baseElement).toMatchSnapshot();
    });
  });

  describe('CSS variables', () => {
    test('sets the correct css variable for the bottom bar', () => {
      const { unmount } = render(
        <EuiBottomBar affordForDisplacement={true} usePortal={true}>
          Content
        </EuiBottomBar>
      );

      // The CSS variable should be set on the document root
      const cssVarValue = getComputedStyle(
        document.documentElement
      ).getPropertyValue('--euiBottomBarOffset');
      expect(cssVarValue).toBeTruthy();
      expect(cssVarValue).toMatch(/\d+px/);

      unmount();

      // After unmounting, the CSS variable should be cleared
      const clearedValue = getComputedStyle(
        document.documentElement
      ).getPropertyValue('--euiBottomBarOffset');
      expect(clearedValue.trim()).toBe('');
    });

    test('does not set css variable when affordForDisplacement is false', () => {
      render(
        <EuiBottomBar affordForDisplacement={false}>Content</EuiBottomBar>
      );

      const cssVarValue = getComputedStyle(
        document.documentElement
      ).getPropertyValue('--euiBottomBarOffset');
      expect(cssVarValue.trim()).toBe('');
    });

    test('does not set css variable when usePortal is false', () => {
      render(
        <EuiBottomBar affordForDisplacement={true} usePortal={false}>
          Content
        </EuiBottomBar>
      );

      const cssVarValue = getComputedStyle(
        document.documentElement
      ).getPropertyValue('--euiBottomBarOffset');
      expect(cssVarValue.trim()).toBe('');
    });

    test('does not set css variable for non-fixed positions', () => {
      const { unmount: unmountSticky } = render(
        <EuiBottomBar position="sticky">Content</EuiBottomBar>
      );

      let cssVarValue = getComputedStyle(
        document.documentElement
      ).getPropertyValue('--euiBottomBarOffset');
      expect(cssVarValue.trim()).toBe('');

      unmountSticky();

      const { unmount: unmountStatic } = render(
        <EuiBottomBar position="static">Content</EuiBottomBar>
      );

      cssVarValue = getComputedStyle(document.documentElement).getPropertyValue(
        '--euiBottomBarOffset'
      );
      expect(cssVarValue.trim()).toBe('');

      unmountStatic();
    });
  });
});
