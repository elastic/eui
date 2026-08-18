/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { queries, within, waitFor, fireEvent, expect } from 'storybook/test';
import * as dataTestSubjQueries from '../src/test/rtl/data_test_subj_queries';

/**
 * Custom Storybook within util with EUI query helpers
 * + additional chained async/waitFor component utils
 *
 * @see https://storybook.js.org/docs/writing-stories/play-function#writing-stories-with-the-play-function
 * @see https://testing-library.com/docs/dom-testing-library/api-within/
 */
const customWithin = (canvasElement: HTMLElement) => {
  const canvas = within<typeof queries & typeof dataTestSubjQueries>(
    canvasElement,
    { ...queries, ...dataTestSubjQueries }
  );

  return {
    ...canvas,

    /**
     * Waits for an element matched by `data-test-subj` to be in the document,
     * then clicks it using `fireEvent.click`. Useful inside Storybook play functions
     * where the target element may not have mounted yet.
     */
    waitForAndClick: async (testSubject: string) => {
      await waitFor(() =>
        expect(canvas.getByTestSubject(testSubject)).toBeInTheDocument()
      );
      await fireEvent.click(canvas.getByTestSubject(testSubject));
    },

    waitForEuiPopoverVisible: async (anchorSelector?: string) => {
      await waitFor(() =>
        expect(canvasElement.querySelector('[data-popover-open]')).toBeVisible()
      );

      const { defaultView, fonts } = canvasElement.ownerDocument;
      await fonts.ready;
      defaultView?.dispatchEvent(new defaultView.Event('resize'));

      if (anchorSelector) {
        await waitFor(() =>
          expect(canvasElement.querySelector(anchorSelector)).toBeTruthy()
        );
      }

      // Popover takes the available space so it can shift depending on the anchor position.
      // Wait until the panel stops moving.

      let lastLeft: number | undefined;
      let lastTop: number | undefined;

      await waitFor(() => {
        const panel =
          canvasElement.ownerDocument.querySelector('[data-popover-panel]') ??
          canvasElement.querySelector('[data-popover-open]');

        if (!panel) throw new Error('Popover did not render');

        const { left, top } = panel.getBoundingClientRect();
        const nextLeft = Math.round(left);
        const nextTop = Math.round(top);
        const settled = lastLeft === nextLeft && lastTop === nextTop;

        lastLeft = nextLeft;
        lastTop = nextTop;

        expect(settled).toBe(true);
      });
    },

    waitForEuiPopoverHidden: async () =>
      await waitFor(() =>
        expect(
          canvasElement.querySelector('[data-popover-panel]')
        ).not.toBeInTheDocument()
      ),
  };
};

export { customWithin as within };
