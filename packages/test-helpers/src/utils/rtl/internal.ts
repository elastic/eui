/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import {
  screen,
  within,
  queries as originalQueries,
  type BoundFunctions,
  type waitForOptions,
} from '@testing-library/react';
import { dataTestSubjQueries } from './data_test_subj_queries';
import { withQueries } from './with_queries';

/**
 * @internal
 */
export type WaitForOptions = Omit<waitForOptions, 'container'>;

/**
 * React Testing Library's `screen` with custom test helpers queries available.
 * This is meant for internal use only.
 * @internal
 */
export const testHelpersScreen = withQueries(screen, dataTestSubjQueries);

export const getTargetContainer = (
  container?: HTMLElement
): BoundFunctions<typeof originalQueries & typeof dataTestSubjQueries> => {
  if (container) {
    return within<typeof originalQueries & typeof dataTestSubjQueries>(
      container,
      { ...originalQueries, ...dataTestSubjQueries }
    );
  }

  return testHelpersScreen;
};

/**
 * @internal
 */
export const getAriaControlsElement = (element: HTMLElement) => {
  const controlsId = element.getAttribute('aria-controls');
  if (!controlsId) {
    return null;
  }

  return document.getElementById(controlsId);
};

/**
 * @internal
 */
export const getAriaDescribedByElement = (element: HTMLElement) => {
  const describedBy = element.getAttribute('aria-describedby');
  if (!describedBy) {
    return null;
  }

  return document.getElementById(describedBy);
}
