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
import { shouldRenderCustomStyles } from '../../test/internal';

import { EuiCollapsibleNav } from './collapsible_nav';
import { EuiOverlayMaskProps } from '../overlay_mask';

jest.mock('../overlay_mask', () => ({
  EuiOverlayMask: ({ headerZindexLocation, maskRef, ...props }: any) => (
    <div {...props} ref={maskRef} />
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
  shouldRenderCustomStyles(<EuiCollapsibleNav {...propsNeededToRender} />);

  test('is rendered', () => {
    const { container } = render(
      <EuiCollapsibleNav {...propsNeededToRender} {...requiredProps} />
    );

    expect(container).toMatchSnapshot();
  });

  describe('props', () => {
    test('onClose', () => {
      const { container } = render(
        <EuiCollapsibleNav {...propsNeededToRender} onClose={() => {}} />
      );

      expect(container).toMatchSnapshot();
    });

    test('size', () => {
      const { container } = render(
        <EuiCollapsibleNav {...propsNeededToRender} size={240} />
      );

      expect(container).toMatchSnapshot();
    });

    test('isDocked', () => {
      const { container } = render(
        <EuiCollapsibleNav {...propsNeededToRender} isDocked={true} />
      );

      expect(container).toMatchSnapshot();
    });

    test('dockedBreakpoint', () => {
      const { container } = render(
        <EuiCollapsibleNav {...propsNeededToRender} dockedBreakpoint="s" />
      );

      expect(container).toMatchSnapshot();
    });

    test('button', () => {
      const { container } = render(
        <EuiCollapsibleNav {...propsNeededToRender} button={<button />} />
      );

      expect(container).toMatchSnapshot();
    });

    test('showButtonIfDocked', () => {
      const { container } = render(
        <EuiCollapsibleNav
          {...propsNeededToRender}
          button={<button />}
          isDocked={true}
          showButtonIfDocked={true}
        />
      );

      expect(container).toMatchSnapshot();
    });

    test('accepts EuiFlyout props', () => {
      const { container } = render(
        <EuiCollapsibleNav {...propsNeededToRender} {...flyoutProps} />
      );

      expect(container).toMatchSnapshot();
    });
  });

  describe('close button', () => {
    test('can be hidden', () => {
      const { container } = render(
        <EuiCollapsibleNav {...propsNeededToRender} hideCloseButton={true} />
      );

      expect(container).toMatchSnapshot();
    });
  });

  test('does not render if isOpen is false', () => {
    const { container } = render(
      <EuiCollapsibleNav onClose={() => {}} id="id" />
    );

    expect(container).toMatchSnapshot();
  });
});
