/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { render } from '../../test/rtl';
import { useObserver, Observer } from './use_observer';

const makeObserver = (): jest.Mocked<Observer> => ({
  disconnect: jest.fn(),
  observe: jest.fn(),
});

describe('useObserver', () => {
  it('calls beginObserve when the node is attached', () => {
    const observer = makeObserver();
    const beginObserve = jest.fn().mockReturnValue(observer);

    const TestComponent = () => {
      const updateChildNode = useObserver(beginObserve, 'Test');
      return <div ref={updateChildNode} />;
    };

    render(<TestComponent />);

    expect(beginObserve).toHaveBeenCalledTimes(1);
    expect(beginObserve).toHaveBeenCalledWith(expect.any(HTMLElement));
  });

  it('skips beginObserve when called with null', () => {
    const observer = makeObserver();
    const beginObserve = jest.fn().mockReturnValue(observer);

    const TestComponent = ({ attachRef }: { attachRef: boolean }) => {
      const updateChildNode = useObserver(beginObserve, 'Test');
      return <div ref={attachRef ? updateChildNode : null} />;
    };

    const { rerender } = render(<TestComponent attachRef={true} />);
    expect(beginObserve).toHaveBeenCalledTimes(1);

    // Removing the ref causes updateChildNode(null) – beginObserve should not be called again
    rerender(<TestComponent attachRef={false} />);
    expect(beginObserve).toHaveBeenCalledTimes(1);
  });

  it('deduplicates repeated calls with the same node', () => {
    const observer = makeObserver();
    const beginObserve = jest.fn().mockReturnValue(observer);

    const TestComponent = () => {
      const updateChildNode = useObserver(beginObserve, 'Test');
      return <div ref={updateChildNode} />;
    };

    const { rerender } = render(<TestComponent />);
    // Re-rendering with the same stable ref function and same DOM node
    rerender(<TestComponent />);

    expect(beginObserve).toHaveBeenCalledTimes(1);
    expect(observer.disconnect).not.toHaveBeenCalled();
  });

  it('disconnects the old observer and reconnects when the node changes', () => {
    const observer1 = makeObserver();
    const observer2 = makeObserver();
    const beginObserve = jest
      .fn()
      .mockReturnValueOnce(observer1)
      .mockReturnValueOnce(observer2);

    const TestComponent = ({ elementType }: { elementType: 'div' | 'p' }) => {
      const updateChildNode = useObserver(beginObserve, 'Test');
      return elementType === 'div' ? (
        <div ref={updateChildNode} />
      ) : (
        <p ref={updateChildNode} />
      );
    };

    const { rerender } = render(<TestComponent elementType="div" />);
    expect(beginObserve).toHaveBeenCalledTimes(1);

    rerender(<TestComponent elementType="p" />);

    expect(observer1.disconnect).toHaveBeenCalledTimes(1);
    expect(beginObserve).toHaveBeenCalledTimes(2);
  });

  it('disconnects the observer on unmount', () => {
    const observer = makeObserver();
    const beginObserve = jest.fn().mockReturnValue(observer);

    const TestComponent = () => {
      const updateChildNode = useObserver(beginObserve, 'Test');
      return <div ref={updateChildNode} />;
    };

    const { unmount } = render(<TestComponent />);

    unmount();

    expect(observer.disconnect).toHaveBeenCalledTimes(1);
  });
});
