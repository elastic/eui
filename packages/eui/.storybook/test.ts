/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { queries, within, waitFor, fireEvent, expect } from '@storybook/test';
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
     * 1. Loki doesn't like userEvent, only fireEvent
     * 2. Storybook fires fireEvents too early (esp. on page load), so we add a waitFor
     */
    waitForAndClick: async (testSubject: string) => {
      await waitFor(() =>
        expect(canvas.getByTestSubject(testSubject)).toBeInTheDocument()
      );
      await fireEvent.click(canvas.getByTestSubject(testSubject));
    },

    waitForEuiPopoverVisible: async () =>
      await waitFor(() =>
        expect(canvasElement.querySelector('[data-popover-open]')).toBeVisible()
      ),
    waitForEuiPopoverHidden: async () =>
      await waitFor(() =>
        expect(
          canvasElement.querySelector('[data-popover-panel]')
        ).not.toBeInTheDocument()
      ),
  };
};

export { customWithin as within };
