/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { render, mount } from 'enzyme';
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
    const component = render(
      <EuiBottomBar {...requiredProps}>Content</EuiBottomBar>
    );

    expect(component).toMatchSnapshot();
  });

  describe('props', () => {
    describe('paddingSize', () => {
      keysOf(paddingSizeToClassNameMap).forEach((paddingSize) => {
        test(`${paddingSize} is rendered`, () => {
          const component = render(<EuiBottomBar paddingSize={paddingSize} />);

          expect(component).toMatchSnapshot();
        });
      });
    });

    describe('position', () => {
      POSITIONS.forEach((position) => {
        test(`${position} is rendered`, () => {
          const component = render(<EuiBottomBar position={position} />);

          expect(component).toMatchSnapshot();
        });
      });
    });

    test('landmarkHeading', () => {
      const component = render(
        <EuiBottomBar landmarkHeading="This should have been label" />
      );

      expect(component).toMatchSnapshot();
    });

    test('affordForDisplacement can be false', () => {
      const component = render(<EuiBottomBar affordForDisplacement={false} />);

      expect(component).toMatchSnapshot();
    });

    test('usePortal can be false', () => {
      const component = render(<EuiBottomBar usePortal={false} />);

      expect(component).toMatchSnapshot();
    });

    test('bodyClassName is rendered', () => {
      const component = mount(<EuiBottomBar bodyClassName={'customClass'} />);

      expect(takeMountedSnapshot(component)).toMatchSnapshot();
      expect(document.body.classList.contains('customClass')).toBe(true);
    });

    test('style is customized', () => {
      const component = render(<EuiBottomBar style={{ left: 12 }} />);

      expect(component).toMatchSnapshot();
    });

    test('position props are altered', () => {
      const component = render(
        <EuiBottomBar top={30} right={30} bottom={30} left={30} />
      );

      expect(component).toMatchSnapshot();
    });
  });
});
