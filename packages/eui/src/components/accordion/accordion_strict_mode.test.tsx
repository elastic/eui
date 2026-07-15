/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { StrictMode } from 'react';
import { render, screen } from '../../test/rtl';
import { createResizeObserverMock } from '../../test/internal';
import { EuiAccordion } from './accordion';
import { EuiFlyout, EuiFlyoutBody } from '../flyout';

jest.mock('../portal', () => ({
  EuiPortal: ({ children }: { children: React.ReactNode }) => children,
}));

const resizeObserverMockRef: {
  current: ReturnType<typeof createResizeObserverMock> | null;
} = { current: null };

jest.mock('../observer/resize_observer/resize_observer.tsx', () => {
  const { createResizeObserverMock } = jest.requireActual<
    typeof import('../../test/internal')
  >('../../test/internal');
  resizeObserverMockRef.current = createResizeObserverMock();
  global.ResizeObserver = resizeObserverMockRef.current.ResizeObserver;

  return jest.requireActual('../observer/resize_observer/resize_observer.tsx');
});

const createMockEntry = (
  element: Element,
  { width = 500, height = 100 } = {}
): ResizeObserverEntry => ({
  target: element,
  contentRect: new DOMRect(0, 0, width, height),
  borderBoxSize: [{ inlineSize: width, blockSize: height }],
  contentBoxSize: [],
  devicePixelContentBoxSize: [],
});

const ISSUE_9029_CONTENT =
  'Accordion content inside flyout (issue #9029)';

const renderAccordionInFlyout = () =>
  render(
    <StrictMode>
      <EuiFlyout onClose={() => {}} aria-label="Flyout">
        <EuiFlyoutBody>
          <EuiAccordion
            id="accordion-in-flyout-9029"
            initialIsOpen
            buttonContent="Accordion in flyout"
          >
            <div>{ISSUE_9029_CONTENT}</div>
          </EuiAccordion>
        </EuiFlyoutBody>
      </EuiFlyout>
    </StrictMode>
  );

describe('EuiAccordion Strict Mode regressions', () => {
  beforeEach(() => {
    resizeObserverMockRef.current?.ResizeObserver.mockClear();
  });

  /**
   * https://github.com/elastic/eui/issues/9029
   */
  it('renders open accordion content inside EuiFlyout under Strict Mode', () => {
    const resizeObserverMock = resizeObserverMockRef.current!;
    renderAccordionInFlyout();

    const content = screen.getByText(ISSUE_9029_CONTENT);
    const childWrapper = content.closest(
      '.euiAccordion__childWrapper'
    ) as HTMLElement;

    expect(childWrapper).toBeInTheDocument();
    expect(childWrapper).not.toHaveStyle({ blockSize: '0px' });
    expect(content).toBeVisible();

    // Simulate resize notifications after Strict Mode observer reconnect
    const observers = resizeObserverMock.ResizeObserver.mock.results.map(
      (result) => result.value
    );
    const observedElement = childWrapper.querySelector(
      '.euiAccordion__children'
    ) as HTMLElement;

    observers.forEach((observer) => {
      resizeObserverMock.triggerCallback(
        [createMockEntry(observedElement)],
        observer
      );
    });

    expect(childWrapper).not.toHaveStyle({ blockSize: '0px' });
    expect(content).toBeVisible();
  });
});
