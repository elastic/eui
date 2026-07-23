/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

/**
 * Manager utility that ensures only one tooltip is visible at a time
 * and lets the next tooltip to open skip its entry animation if another was
 * just opened or just closed.
 *
 * UX rationale (primarily for mouse-only users):
 * @see https://github.com/elastic/kibana/issues/144482
 * @see https://github.com/elastic/eui/issues/5883
 */

/**
 * Time window in ms after a tooltip closes during which the next one to open
 * skips its entry animation.
 */
const SKIP_ANIMATION_WINDOW = 300;

class ToolTipManager {
  // We use a set instead of a single var just in case
  // multiple tooltips are registered via async shenanigans
  toolTipsToHide = new Set<Function>();
  // Timestamp of the last hide; `null` means no tooltip has closed yet.
  lastHiddenAt: number | null = null;

  registerTooltip = (
    hideCallback: Function
  ): { skipAnimation: boolean } | null => {
    if (this.toolTipsToHide.has(hideCallback)) return null;

    const hadOpen = this.toolTipsToHide.size > 0;
    const recentlyClosed =
      this.lastHiddenAt !== null &&
      Date.now() - this.lastHiddenAt < SKIP_ANIMATION_WINDOW;

    this.toolTipsToHide.forEach((hide) => hide());
    this.toolTipsToHide.clear();
    this.toolTipsToHide.add(hideCallback);

    return { skipAnimation: hadOpen || recentlyClosed };
  };

  deregisterToolTip = (hideCallback: Function) => {
    if (this.toolTipsToHide.delete(hideCallback))
      this.lastHiddenAt = Date.now();
  };

  /**
   * Resets all internal state. Primarily intended for tests, so that a
   * tooltip shown in one test doesn't leak into the next (the manager is a
   * module-level singleton).
   */
  reset = () => {
    this.toolTipsToHide.clear();
    this.lastHiddenAt = null;
  };
}

export const toolTipManager = new ToolTipManager();
