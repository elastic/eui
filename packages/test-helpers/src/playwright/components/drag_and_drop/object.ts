/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { BaseObject, type ObjectScope } from '../../base_object';

/**
 * Playwright Component Object for a keyboard-reorderable {@link
 * https://eui.elastic.co/docs/components/drag-and-drop/ EuiDraggable} item.
 *
 * `testSubj` must be set on the item's own drag handle (the element EUI's
 * `provided.dragHandleProps` are spread onto), not on the `EuiDraggable` item
 * wrapper — that's what every current consumer already renders a handle
 * `data-test-subj` for. No `componentSelector` is enforced: the handle is
 * consumer-markup (often a button or icon), not a fixed EUI element.
 */
export class EuiDraggableObject extends BaseObject {
  constructor(scope: ObjectScope, testSubj: string) {
    super(scope, testSubj);
  }

  /**
   * Reorders the item via keyboard: focus the handle, lift it (`Space`),
   * move it `steps` positions (`ArrowDown` for positive, `ArrowUp` for
   * negative), drop it (`Space`).
   *
   * Keyboard lift is used deliberately instead of simulating a mouse drag:
   * it's what `@hello-pangea/dnd` (which `EuiDraggable` wraps) itself
   * supports as an accessible interaction, and it's what every current
   * consumer already drives it with. No settle-wait follows the drop — EUI
   * doesn't expose a synchronous, stable signal for "reorder animation
   * finished" (the class some consumers checked for, `euiDraggable--isDragging`,
   * hasn't existed since this styling moved to Emotion; that check was a
   * no-op). Callers relying on the new order should assert it with a
   * retrying `expect`, which settles on its own.
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
