/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { render, mount } from 'enzyme';
import { requiredProps, takeMountedSnapshot } from '../../test';

import { EuiCollapsibleNav } from './collapsible_nav';
import { EuiOverlayMaskProps } from '../overlay_mask';

jest.mock('../overlay_mask', () => ({
  EuiOverlayMask: ({ headerZindexLocation, ...props }: any) => (
    <div {...props} />
  ),
}));

jest.mock('../portal', () => ({
  EuiPortal: ({ children }: { children: any }) => children,
}));

const propsNeededToRender = { id: 'id', isOpen: true, onClose: () => {} };
const flyoutProps = {
  size: 240,
  ownFocus: false,
  outsideClickCloses: false,
  maskProps: { headerZindexLocation: 'above' } as EuiOverlayMaskProps,
};

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

    test('size', () => {
      const component = mount(
        <EuiCollapsibleNav {...propsNeededToRender} size={240} />
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

    test('accepts EuiFlyout props', () => {
      const component = mount(
        <EuiCollapsibleNav {...propsNeededToRender} {...flyoutProps} />
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
        <EuiCollapsibleNav {...propsNeededToRender} hideCloseButton={true} />
      );

      expect(
        takeMountedSnapshot(component, {
          hasArrayOutput: true,
        })
      ).toMatchSnapshot();
    });
  });

  test('does not render if isOpen is false', () => {
    const component = render(<EuiCollapsibleNav onClose={() => {}} id="id" />);

    expect(component).toMatchSnapshot();
  });
});
