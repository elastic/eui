/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { useCallback, useEffect, useState } from 'react';
import tabbable from 'tabbable';

export const useHeaderIsInteractive = (gridElement: HTMLElement | null) => {
  const [headerIsInteractive, setHeaderIsInteractive] = useState(false);

  const handleHeaderChange = useCallback<(headerRow: HTMLElement) => void>(
    (headerRow) => {
      const tabbables = tabbable(headerRow);
      const managed = headerRow.querySelectorAll('[data-euigrid-tab-managed]');
      const hasInteractives = tabbables.length > 0 || managed.length > 0;
      if (hasInteractives !== headerIsInteractive) {
        setHeaderIsInteractive(hasInteractives);
      }
    },
    [headerIsInteractive]
  );

  // Set headerIsInteractive on data grid init/load
  useEffect(() => {
    if (gridElement) {
      const headerElement = gridElement.querySelector(
        '[data-test-subj~=dataGridHeader]'
      );
      if (headerElement) {
        handleHeaderChange(headerElement as HTMLElement);
      }
    }
  }, [gridElement, handleHeaderChange]);

  // Update headerIsInteractive if the header changes (e.g., columns are hidden)
  // Used in header mutation observer set in EuiDataGridBody
  const handleHeaderMutation = useCallback<MutationCallback>(
    (records) => {
      const [{ target }] = records;

      // find the wrapping header div
      let headerRow = target.parentElement;
      while (
        headerRow &&
        (headerRow.getAttribute('data-test-subj') || '')
          .split(/\s+/)
          .indexOf('dataGridHeader') === -1
      ) {
        headerRow = headerRow.parentElement;
      }

      if (headerRow) handleHeaderChange(headerRow);
    },
    [handleHeaderChange]
  );

  return { headerIsInteractive, handleHeaderMutation };
};
