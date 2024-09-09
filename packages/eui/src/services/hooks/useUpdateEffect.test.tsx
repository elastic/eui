/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the "Elastic License
 * 2.0", the "GNU Affero General Public License v3.0 only", and the "Server Side
 * Public License v 1"; you may not use this file except in compliance with, at
 * your election, the "Elastic License 2.0", the "GNU Affero General Public
 * License v3.0 only", or the "Server Side Public License, v 1".
 */

import React from 'react';
import { render } from '@testing-library/react';

import { useUpdateEffect } from './useUpdateEffect';

describe('useUpdateEffect', () => {
  const mockEffect = jest.fn();
  const mockCleanup = jest.fn();

  const MockComponent = ({ test }: { test?: boolean }) => {
    useUpdateEffect(() => {
      mockEffect();
      return () => mockCleanup();
    }, [test]);

    return null;
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('does not invoke the passed effect on initial mount', () => {
    render(<MockComponent />);

    expect(mockEffect).not.toHaveBeenCalled();
  });

  it('invokes the passed effect on each component update/rerender', () => {
    const { rerender } = render(<MockComponent />);

    rerender(<MockComponent test={true} />);
    expect(mockEffect).toHaveBeenCalledTimes(1);

    rerender(<MockComponent test={false} />);
    expect(mockEffect).toHaveBeenCalledTimes(2);

    rerender(<MockComponent test={true} />);
    expect(mockEffect).toHaveBeenCalledTimes(3);
  });

  it('invokes returned cleanup, same as useEffect', () => {
    const { rerender, unmount } = render(<MockComponent />);

    rerender(<MockComponent test={true} />); // Trigger first update/call
    expect(mockCleanup).not.toHaveBeenCalled();

    unmount(); // Trigger cleanup
    expect(mockCleanup).toHaveBeenCalled();
  });
});
