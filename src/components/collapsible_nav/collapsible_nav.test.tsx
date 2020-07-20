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
import { render, mount } from 'enzyme';
import { requiredProps, takeMountedSnapshot } from '../../test';

import { EuiCollapsibleNav } from './collapsible_nav';

jest.mock('../overlay_mask', () => ({
  EuiOverlayMask: ({ headerZindexLocation, ...props }: any) => (
    <div {...props} />
  ),
}));

const propsNeededToRender = { id: 'id', isOpen: true };

describe('EuiCollapsibleNav', () => {
  test('is rendered', () => {
    const component = mount(
      <EuiCollapsibleNav {...propsNeededToRender} {...requiredProps} />
    );

    expect(
      takeMountedSnapshot(component, {
        hasArrayOutput: true,
      })
    ).toMatchSnapshot();
  });

  describe('props', () => {
    test('onClose', () => {
      const component = mount(
        <EuiCollapsibleNav {...propsNeededToRender} onClose={() => {}} />
      );

      expect(
        takeMountedSnapshot(component, {
          hasArrayOutput: true,
        })
      ).toMatchSnapshot();
    });

    test('isDocked', () => {
      const component = render(
        <EuiCollapsibleNav {...propsNeededToRender} isDocked={true} />
      );

      expect(component).toMatchSnapshot();
    });

    test('dockedBreakpoint', () => {
      const component = mount(
        <EuiCollapsibleNav {...propsNeededToRender} dockedBreakpoint={500} />
      );

      expect(
        takeMountedSnapshot(component, {
          hasArrayOutput: true,
        })
      ).toMatchSnapshot();
    });

    test('button', () => {
      const component = mount(
        <EuiCollapsibleNav {...propsNeededToRender} button={<button />} />
      );

      expect(
        takeMountedSnapshot(component, {
          hasArrayOutput: true,
        })
      ).toMatchSnapshot();
    });

    test('showButtonIfDocked', () => {
      const component = mount(
        <EuiCollapsibleNav
          {...propsNeededToRender}
          button={<button />}
          isDocked={true}
          showButtonIfDocked={true}
        />
      );

      expect(
        takeMountedSnapshot(component, {
          hasArrayOutput: true,
        })
      ).toMatchSnapshot();
    });

    test('can alter mask props with maskProps without throwing error', () => {
      const component = mount(
        <EuiCollapsibleNav
          {...propsNeededToRender}
          maskProps={{ headerZindexLocation: 'above' }}
        />
      );

      expect(
        takeMountedSnapshot(component, {
          hasArrayOutput: true,
        })
      ).toMatchSnapshot();
    });
  });

  describe('close button', () => {
    test('can be hidden', () => {
      const component = mount(
        <EuiCollapsibleNav {...propsNeededToRender} showCloseButton={false} />
      );

      expect(
        takeMountedSnapshot(component, {
          hasArrayOutput: true,
        })
      ).toMatchSnapshot();
    });

    test('extends EuiButtonEmpty', () => {
      const component = mount(
        <EuiCollapsibleNav
          {...propsNeededToRender}
          closeButtonProps={{ className: 'class', 'data-test-subj': 'test' }}
        />
      );

      expect(
        takeMountedSnapshot(component, {
          hasArrayOutput: true,
        })
      ).toMatchSnapshot();
    });
  });

  test('does not render if isOpen is false', () => {
    const component = render(<EuiCollapsibleNav id="id" />);

    expect(component).toMatchSnapshot();
  });
});
