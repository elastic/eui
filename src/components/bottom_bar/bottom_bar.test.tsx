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
import { keysOf } from '../common';

import {
  EuiBottomBar,
  paddingSizeToClassNameMap,
  POSITIONS,
} from './bottom_bar';

describe('EuiBottomBar', () => {
  test('is rendered', () => {
    const { baseElement } = render(
      <EuiBottomBar {...requiredProps}>Content</EuiBottomBar>
    );

    expect(baseElement).toMatchSnapshot();
  });

  describe('props', () => {
    describe('paddingSize', () => {
      keysOf(paddingSizeToClassNameMap).forEach((paddingSize) => {
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
});
