/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent, useState } from 'react';
import { mount } from 'enzyme';
import { EuiResizeObserver, useResizeObserver } from './resize_observer';
import { sleep } from '../../../test';
import { act } from 'react-dom/test-utils';

export async function waitforResizeObserver(period = 30) {
  // `period` defaults to 30 because its the delay used by the ResizeObserver polyfill
  await sleep(period);
}

// EuiResizeObserver and useResizeObserver do not have a fallback for
// environments that do not implement the ResizeObserver API.
// jsdom does not implement ResizeObserver and we therefore
// cannot currently test production functionality of those components.
// Re-enable these tests when test support changes.
describe.skip('testResizeObservers', () => {
  // refactor the tests structure to make sure that `EuiResizeObserver` test can get
  // the proper size of the dom element.
  type GetBoundingClientRect = typeof HTMLElement['prototype']['getBoundingClientRect'];
  let _originalgetBoundingClientRect: undefined | GetBoundingClientRect;
  beforeAll(() => {
    _originalgetBoundingClientRect =
      HTMLElement.prototype.getBoundingClientRect;
    HTMLElement.prototype.getBoundingClientRect = function () {
      // use the length of the element's HTML to represent its height
      return { width: 100, height: this.innerHTML.length } as ReturnType<
        GetBoundingClientRect
      >;
    };
  });
  afterAll(() => {
    HTMLElement.prototype.getBoundingClientRect = _originalgetBoundingClientRect!;
  });

  describe('EuiResizeObserver', () => {
    it('watches for a resize', async () => {
      expect.assertions(2);
      const onResize = jest.fn();

      const Wrapper: FunctionComponent<{}> = ({ children }) => {
        return (
          <EuiResizeObserver onResize={onResize}>
            {(resizeRef: (e: HTMLElement | null) => void) => (
              <div ref={resizeRef}>{children}</div>
            )}
          </EuiResizeObserver>
        );
      };

      const component = mount(<Wrapper children={<div>Hello World</div>} />);

      // Resize observer is expected to fire once on mount
      await waitforResizeObserver();
      expect(onResize).toHaveBeenCalledTimes(1);

      component.setProps({
        children: (
          <div>
            <div>Hello World</div>
            <div>Hello Again</div>
          </div>
        ),
      });

      await waitforResizeObserver();

      // Expect 2 calls because it's called once on mount
      expect(onResize).toHaveBeenCalledTimes(2);
    });
  });

  describe('useResizeObserver', () => {
    it('watches for a resize', async () => {
      expect.assertions(2);

      const Wrapper: FunctionComponent<{}> = jest.fn(({ children }) => {
        const [ref, setRef] = useState<Element | null>(null);
        useResizeObserver(ref);
        return <div ref={setRef}>{children}</div>;
      });

      const component = mount(<Wrapper children={<div>Hello World</div>} />);

      // Expect the initial render, re-render when the ref is created, and a 3rd for the onresize callback
      await act(() => waitforResizeObserver());
      expect(Wrapper).toHaveBeenCalledTimes(3);

      component.setProps({
        children: (
          <div>
            <div>Hello World</div>
            <div>Hello Again</div>
          </div>
        ),
      });

      await waitforResizeObserver();

      // Expect two more calls because children changed (re-render) & resize observer reacted
      expect(Wrapper).toHaveBeenCalledTimes(5);
    });
  });
});
