/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import { keysOf } from '../common';
import { requiredProps, takeMountedSnapshot } from '../../test';

import {
  EuiBottomBar,
  paddingSizeToClassNameMap,
  POSITIONS,
} from './bottom_bar';

// @ts-ignore TODO: Temporary hack which we can remove once react-test-renderer supports portals.
// More info at https://github.com/facebook/react/issues/11565.
ReactDOM.createPortal = (children) => {
  // hack to make enzyme treat the portal as a fragment
  if (children == null) return [['nested']];
  return children;
};

describe('EuiBottomBar', () => {
  test('is rendered', () => {
    const component = mount(
      <EuiBottomBar {...requiredProps}>Content</EuiBottomBar>
    );

    expect(takeMountedSnapshot(component)).toMatchSnapshot();
  });

  describe('props', () => {
    describe('paddingSize', () => {
      keysOf(paddingSizeToClassNameMap).forEach((paddingSize) => {
        test(`${paddingSize} is rendered`, () => {
          const component = mount(<EuiBottomBar paddingSize={paddingSize} />);

          expect(takeMountedSnapshot(component)).toMatchSnapshot();
        });
      });
    });

    describe('position', () => {
      POSITIONS.forEach((position) => {
        test(`${position} is rendered`, () => {
          const component = mount(<EuiBottomBar position={position} />);

          expect(takeMountedSnapshot(component)).toMatchSnapshot();
        });
      });
    });

    test('landmarkHeading', () => {
      const component = mount(
        <EuiBottomBar landmarkHeading="This should have been label" />
      );

      expect(takeMountedSnapshot(component)).toMatchSnapshot();
    });

    test('affordForDisplacement can be false', () => {
      const component = mount(<EuiBottomBar affordForDisplacement={false} />);

      expect(takeMountedSnapshot(component)).toMatchSnapshot();
    });

    test('usePortal can be false', () => {
      const component = mount(<EuiBottomBar usePortal={false} />);

      expect(takeMountedSnapshot(component)).toMatchSnapshot();
    });

    test('bodyClassName is rendered', () => {
      const component = mount(<EuiBottomBar bodyClassName={'customClass'} />);

      expect(takeMountedSnapshot(component)).toMatchSnapshot();
      expect(document.body.classList.contains('customClass')).toBe(true);
    });

    test('style is customized', () => {
      const component = mount(<EuiBottomBar style={{ left: 12 }} />);

      expect(takeMountedSnapshot(component)).toMatchSnapshot();
    });

    test('position props are altered', () => {
      const component = mount(
        <EuiBottomBar top={30} right={30} bottom={30} left={30} />
      );

      expect(takeMountedSnapshot(component)).toMatchSnapshot();
    });
  });
});
