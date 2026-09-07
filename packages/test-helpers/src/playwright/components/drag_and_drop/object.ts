/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { BaseObject, type ObjectScope } from '../../base_object';
import { EuiDraggableSelectors } from '../../../components/drag_and_drop/selectors';

/**
 * Playwright Component Object for a keyboard-reorderable {@link
 * https://eui.elastic.co/docs/components/drag-and-drop/ EuiDraggable} item.
 *
 * `testSubj` must be set on the item's own drag handle — with the default
 * `customDragHandle={false}` that's the `EuiDraggable` item itself; with a
 * custom handle it's that inner element instead. See the package README for
 * details, the component-type guard, and why there's no settle-wait after a
 * reorder.
 */
export class EuiDraggableObject extends BaseObject {
  constructor(scope: ObjectScope, testSubj: string) {
    super(scope, testSubj, EuiDraggableSelectors.HANDLE_SELECTOR);
  }

  /**
   * Reorders the item via keyboard: focus the handle, lift it (`Space`),
   * move it `steps` positions (`ArrowDown` for positive, `ArrowUp` for
   * negative), drop it (`Space`). Keyboard lift, not a simulated mouse drag —
   * `@hello-pangea/dnd`'s own accessible interaction.
   */
  async reorder(steps: number): Promise<void> {
    await this.root.focus();
    await this.root.press('Space');
    const key = steps > 0 ? 'ArrowDown' : 'ArrowUp';
    for (let i = 0; i < Math.abs(steps); i++) {
      await this.root.press(key);
    }
    await this.root.press('Space');
  }
}
