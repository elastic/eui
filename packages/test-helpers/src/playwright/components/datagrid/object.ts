/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import type { Locator } from '@playwright/test';

import { BaseObject, type ObjectScope } from '../../base_object';
import { EuiDataGridSelectors } from '../../../components/datagrid/selectors';

/**
 * Playwright Component Object for {@link
 * https://eui.elastic.co/docs/components/data-grid EuiDataGrid}.
 *
 * `testSubj` must match the `data-test-subj` set by the consumer on the
 * `EuiDataGrid` itself (the component-type guard enforces it) — EUI toggles
 * state classes (fullscreen) on that element. When the subj is not unique on
 * the page (e.g. portal-rendered duplicates), narrow with the `scope`
 * parameter instead of pointing the subj at a wrapper.
 */
export class EuiDataGridObject extends BaseObject {
  constructor(scope: ObjectScope, testSubj: string) {
    super(scope, testSubj, EuiDataGridSelectors.ROOT_SELECTOR);
  }

  /**
   * The rows currently mounted in the DOM, as a `Locator` so callers keep
   * Playwright auto-retry for count and content assertions
   * (e.g. `expect(rows).toHaveCount(pageSize)`, `expect(rows).not.toHaveCount(0)`).
   * For a paginated grid this is the current page's rows. Rows are virtualized,
   * so on a grid too tall for its container this is only the visible window —
   * never treat it as the full data set.
   */
  public get rows(): Locator {
    return this.root.locator(EuiDataGridSelectors.ROW_SELECTOR);
  }

  /**
   * A single data cell, addressed by row index and column id. Column order and
   * virtualized horizontal scrolling do not affect the column id.
   */
  cell(rowIndex: number, columnId: string): Locator {
    return this.root.locator(EuiDataGridSelectors.cellFor(columnId, rowIndex));
  }

  /**
   * All currently rendered data cells of a column. Rows are virtualized, so
   * this is the rendered window, not necessarily every row.
   */
  cells(columnId: string): Locator {
    return this.root.locator(EuiDataGridSelectors.columnCellsFor(columnId));
  }

  /**
   * Opens the header actions of a column and clicks the given action.
   * `columnId` is the grid column id (matched verbatim), `actionLabel` is the
   * visible action label (e.g. 'Hide column', 'Sort A-Z').
   */
  async doActionOnColumn(columnId: string, actionLabel: string): Promise<void> {
    const headerCell = this.root.locator(
      EuiDataGridSelectors.headerCellFor(columnId)
    );
    // The actions button only becomes interactable when the header cell is
    // focused/hovered and inside the viewport.
    await headerCell.scrollIntoViewIfNeeded();
    await headerCell.focus();
    await headerCell.hover();
    await headerCell
      .locator(EuiDataGridSelectors.HEADER_ACTIONS_BUTTON_SELECTOR)
      .click();

    const actionsMenu = this.root
      .page()
      .locator(EuiDataGridSelectors.headerActionsMenuFor(columnId));
    await actionsMenu.waitFor({ state: 'visible' });
    await actionsMenu.getByTitle(actionLabel, { exact: true }).click();
    await actionsMenu.waitFor({ state: 'hidden' });
  }

  /** Enters fullscreen mode via the toolbar button. */
  async openFullScreenMode(): Promise<void> {
    await this.clickFullScreenButton();
    await this.fullScreenGrid.waitFor({ state: 'visible' });
  }

  /** Exits fullscreen mode via the toolbar button. */
  async closeFullScreenMode(): Promise<void> {
    await this.clickFullScreenButton();
    await this.fullScreenGrid.waitFor({ state: 'detached' });
  }

  /** The grid element only while it carries the fullscreen state class. */
  private get fullScreenGrid(): Locator {
    return this.root.and(
      this.root.page().locator(EuiDataGridSelectors.FULL_SCREEN_ROOT_SELECTOR)
    );
  }

  /**
   * The fullscreen button sits in a tooltip wrapper and keeps focus after the
   * click, which keeps the tooltip open over the grid — blur it right away.
   */
  private async clickFullScreenButton(): Promise<void> {
    const button = this.root.getByTestId(
      EuiDataGridSelectors.FULL_SCREEN_BUTTON_TEST_SUBJ
    );
    await button.click();
    await button.blur();
  }
}
