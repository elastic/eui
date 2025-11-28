/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { renderHook } from '../../test/rtl/render_hook';
import { UseEuiFlyoutZIndex, useEuiFlyoutZIndex } from './use_flyout_z_index';

const defaultProps: UseEuiFlyoutZIndex = {
  isPushed: false,
  managedFlyoutIndex: 0,
  isChildFlyout: false,
};

describe('useEuiFlyoutZIndex', () => {
  const render = (initialProps: Partial<UseEuiFlyoutZIndex> = {}) =>
    renderHook((props: UseEuiFlyoutZIndex) => useEuiFlyoutZIndex(props), {
      initialProps: {
        ...defaultProps,
        ...initialProps,
      },
    });

  it('returns values including the `managedFlyoutIndex` value', () => {
    const { result, rerender } = render();
    expect(result.current.flyoutZIndex).toEqual(1000);
    expect(result.current.maskZIndex).toEqual(998);

    rerender({ ...defaultProps, managedFlyoutIndex: 100 });
    expect(result.current.flyoutZIndex).toEqual(1100);
    expect(result.current.maskZIndex).toEqual(1098);
  });

  it('returns correct values when isChildFlyout = true', () => {
    const { result, rerender } = render({ isChildFlyout: true });
    expect(result.current.flyoutZIndex).toEqual(999);
    expect(result.current.maskZIndex).toEqual(998);

    rerender({ ...defaultProps, isChildFlyout: true, managedFlyoutIndex: 100 });
    expect(result.current.flyoutZIndex).toEqual(1099);
    expect(result.current.maskZIndex).toEqual(1098);
  });

  it('returns flyout level based z-index values when isPushed = true', () => {
    const { result, rerender } = render();
    expect(result.current.flyoutZIndex).toEqual(1000);
    expect(result.current.maskZIndex).toEqual(998);

    rerender({
      ...defaultProps,
      isPushed: true,
      maskProps: { headerZindexLocation: 'above' },
    });
    expect(result.current.flyoutZIndex).toEqual(1000);
    expect(result.current.maskZIndex).toEqual(998);

    rerender({
      ...defaultProps,
      isPushed: true,
      maskProps: { headerZindexLocation: 'below' },
    });
    expect(result.current.flyoutZIndex).toEqual(1000);
    expect(result.current.maskZIndex).toEqual(998);
  });

  it('returns flyout level based z-index values when maskProps.headerZindexLocation != "above"', () => {
    const { result, rerender } = render({ isPushed: false, maskProps: {} });
    expect(result.current.flyoutZIndex).toEqual(1000);
    expect(result.current.maskZIndex).toEqual(998);

    rerender({
      ...defaultProps,
      isPushed: false,
      maskProps: { headerZindexLocation: 'below' },
    });
    expect(result.current.flyoutZIndex).toEqual(1000);
    expect(result.current.maskZIndex).toEqual(998);
  });

  it('returns mask level based z-index values when maskProps.headerZindexLocation = "above"', () => {
    const { result } = render({
      isPushed: false,
      maskProps: { headerZindexLocation: 'above' },
    });
    expect(result.current.flyoutZIndex).toEqual(6000);
    expect(result.current.maskZIndex).toEqual(5998);
  });
});
