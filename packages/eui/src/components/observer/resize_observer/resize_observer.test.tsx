/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent, PropsWithChildren, useState } from 'react';
import { sleep } from '../../../test';
import { render } from '../../../test/rtl';
import { act } from '@testing-library/react';
import { createResizeObserverMock } from '../../../test/internal';
import { EuiResizeObserver, useResizeObserver } from './resize_observer';

const resizeObserverMockRef: {
  current: ReturnType<typeof createResizeObserverMock> | null;
} = { current: null };

jest.mock('./resize_observer.tsx', () => {
  const { createResizeObserverMock } = jest.requireActual<
    typeof import('../../../test/internal')
  >('../../../test/internal');
  resizeObserverMockRef.current = createResizeObserverMock();
  global.ResizeObserver = resizeObserverMockRef.current.ResizeObserver;

  return jest.requireActual('./resize_observer.tsx');
});

export async function waitforResizeObserver(period = 30) {
  // `period` defaults to 30 because its the delay used by the ResizeObserver polyfill
  await sleep(period);
}

const createMockEntry = (
  element: Element,
  { width = 500, height = 100 } = {}
): ResizeObserverEntry => ({
  target: element,
  contentRect: new DOMRect(),
  borderBoxSize: [{ inlineSize: width, blockSize: height }],
  contentBoxSize: [],
  devicePixelContentBoxSize: [],
});

describe('EuiResizeObserver', () => {
  beforeEach(() => {
    resizeObserverMockRef.current?.ResizeObserver.mockClear();
  });

  it('calls onResize again after observer reconnects with the same dimensions', () => {
    const resizeObserverMock = resizeObserverMockRef.current!;
    const onResize = jest.fn();

    const TestComponent = ({ attached }: { attached: boolean }) => (
      <EuiResizeObserver onResize={onResize}>
        {(resizeRef) =>
          attached ? (
            <div ref={resizeRef} data-testid="target">
              content
            </div>
          ) : null
        }
      </EuiResizeObserver>
    );

    const { getByTestId, rerender } = render(<TestComponent attached />);

    const element = getByTestId('target');
    const firstObserver =
      resizeObserverMock.ResizeObserver.mock.results[0]?.value;

    resizeObserverMock.triggerCallback(
      [createMockEntry(element)],
      firstObserver
    );
    expect(onResize).toHaveBeenCalledTimes(1);
    expect(onResize).toHaveBeenCalledWith({ height: 100, width: 500 });

    rerender(<TestComponent attached={false} />);
    rerender(<TestComponent attached />);

    const secondObserver =
      resizeObserverMock.ResizeObserver.mock.results[1]?.value;

    expect(resizeObserverMock.ResizeObserver).toHaveBeenCalledTimes(2);

    resizeObserverMock.triggerCallback(
      [createMockEntry(getByTestId('target'))],
      secondObserver
    );
    expect(onResize).toHaveBeenCalledTimes(2);
    expect(onResize).toHaveBeenLastCalledWith({ height: 100, width: 500 });
  });
});

// EuiResizeObserver and useResizeObserver do not have a fallback for
// environments that do not implement the ResizeObserver API.
// jsdom does not implement ResizeObserver and we therefore
// cannot currently test production functionality of those components.
// Re-enable these tests when test support changes.
describe.skip('testResizeObservers', () => {
  // refactor the tests structure to make sure that `EuiResizeObserver` test can get
  // the proper size of the dom element.
  type GetBoundingClientRect =
    (typeof HTMLElement)['prototype']['getBoundingClientRect'];
  let _originalgetBoundingClientRect: undefined | GetBoundingClientRect;
  beforeAll(() => {
    _originalgetBoundingClientRect =
      HTMLElement.prototype.getBoundingClientRect;
    HTMLElement.prototype.getBoundingClientRect = function () {
      // use the length of the element's HTML to represent its height
      return {
        width: 100,
        height: this.innerHTML.length,
      } as ReturnType<GetBoundingClientRect>;
    };
  });
  afterAll(() => {
    HTMLElement.prototype.getBoundingClientRect =
      _originalgetBoundingClientRect!;
  });

  describe('EuiResizeObserver', () => {
    it('watches for a resize', async () => {
      expect.assertions(2);
      const onResize = jest.fn();

      const Wrapper: FunctionComponent<PropsWithChildren> = ({ children }) => {
        return (
          <EuiResizeObserver onResize={onResize}>
            {(resizeRef: (e: HTMLElement | null) => void) => (
              <div ref={resizeRef}>{children}</div>
            )}
          </EuiResizeObserver>
        );
      };

      const { rerender } = render(
        <Wrapper children={<div>Hello World</div>} />
      );

      // Resize observer is expected to fire once on mount
      await waitforResizeObserver();
      expect(onResize).toHaveBeenCalledTimes(1);

      rerender(
        <Wrapper
          children={
            <div>
              <div>Hello World</div>
              <div>Hello Again</div>
            </div>
          }
        />
      );

      await waitforResizeObserver();

      // Expect 2 calls because it's called once on mount
      expect(onResize).toHaveBeenCalledTimes(2);
    });
  });

  describe('useResizeObserver', () => {
    it('watches for a resize', async () => {
      expect.assertions(2);

      const Wrapper: FunctionComponent<PropsWithChildren> = jest.fn(
        ({ children }) => {
          const [ref, setRef] = useState<Element | null>(null);
          useResizeObserver(ref);
          return <div ref={setRef}>{children}</div>;
        }
      );

      const { rerender } = render(
        <Wrapper children={<div>Hello World</div>} />
      );

      // Expect the initial render, re-render when the ref is created, and a 3rd for the onresize callback
      await act(() => waitforResizeObserver());
      expect(Wrapper).toHaveBeenCalledTimes(3);

      rerender(
        <Wrapper
          children={
            <div>
              <div>Hello World</div>
              <div>Hello Again</div>
            </div>
          }
        />
      );

      await waitforResizeObserver();

      // Expect two more calls because children changed (re-render) & resize observer reacted
      expect(Wrapper).toHaveBeenCalledTimes(5);
    });
  });
});
