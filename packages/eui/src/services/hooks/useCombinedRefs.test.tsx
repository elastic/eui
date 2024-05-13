/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { createRef, useRef } from 'react';
import { render } from '@testing-library/react';
import { setMultipleRefs, useCombinedRefs } from './useCombinedRefs';

describe('setMultipleRefs', () => {
  const mockNode = document.createElement('div');

  it('passes the node to each ref', () => {
    const mockRefFn = jest.fn();
    const mockRefObj = createRef();

    setMultipleRefs([mockRefFn, mockRefObj], mockNode);

    expect(mockRefFn).toHaveBeenCalledWith(mockNode);
    expect(mockRefObj.current).toEqual(mockNode);
  });

  it('ignores undefined/falsy refs', () => {
    expect(() =>
      setMultipleRefs([undefined, undefined], mockNode)
    ).not.toThrow();
  });
});

describe('useCombinedRefs', () => {
  it('creates a memoized callback of setMultipleRefs that can be passed to any `ref` prop', () => {
    const mockRefFn = jest.fn();
    const MockComponent = ({ consumerRef }: any) => {
      const internalRef = useRef<HTMLDivElement | null>(null);
      const refs = useCombinedRefs([internalRef, consumerRef]);
      return <div ref={refs} />;
    };
    render(<MockComponent consumerRef={mockRefFn} />);

    expect(mockRefFn).toHaveBeenCalledWith(expect.any(HTMLDivElement));
  });
});
