/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { useEffect } from 'react';

/** Copies the focused data cell value when nothing is selected. */
export const copyFocusedDataGridCell = (event: ClipboardEvent): void => {
  if (event.defaultPrevented) return;

  const cell = document.activeElement;
  if (!(cell instanceof HTMLElement)) return;
  if (!cell.classList.contains('euiDataGridRowCell')) return;
  if (cell.classList.contains('euiDataGridRowCell--controlColumn')) return;
  if (window.getSelection()?.toString()) return;
  if (!event.clipboardData) return;

  const cellContent = cell.querySelector<HTMLElement>(
    '[data-datagrid-cellcontent]'
  );
  const text = cellContent?.innerText ?? cellContent?.textContent ?? '';
  if (!text) return;

  event.clipboardData.setData('text/plain', text);
  event.preventDefault();
};

export const useCopyFocusedDataGridCell = () => {
  useEffect(() => {
    // The handler is static, so the browser dedupes identical listeners.
    // Do not remove on unmount — that would disable copy for remaining grids.
    // Same approach as OverrideCopiedTabularContent.
    document.addEventListener('copy', copyFocusedDataGridCell);
  }, []);
};
