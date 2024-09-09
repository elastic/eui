/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the "Elastic License
 * 2.0", the "GNU Affero General Public License v3.0 only", and the "Server Side
 * Public License v 1"; you may not use this file except in compliance with, at
 * your election, the "Elastic License 2.0", the "GNU Affero General Public
 * License v3.0 only", or the "Server Side Public License, v 1".
 */

import React, { useImperativeHandle, createRef, forwardRef } from 'react';
import { render, act } from '@testing-library/react';

import { useForceRender } from './useForceRender';

interface MockRefShape {
  render: () => void;
}

describe('useForceRender', () => {
  const renderTracker = jest.fn();

  // eslint-disable-next-line local/forward-ref
  const MockComponent = forwardRef<MockRefShape>((props, ref) => {
    const render = useForceRender();

    renderTracker();

    // expose the render function on the component's ref
    useImperativeHandle(ref, () => ({ render }), [render]);

    return null;
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('causes the component to re-render', () => {
    const ref = createRef<MockRefShape>();
    render(<MockComponent ref={ref} />);

    expect(renderTracker).toHaveBeenCalledTimes(1);
    act(() => {
      ref.current!.render();
    });
    expect(renderTracker).toHaveBeenCalledTimes(2);
  });
});
