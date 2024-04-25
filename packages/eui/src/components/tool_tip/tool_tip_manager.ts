/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

/**
 * Manager utility that ensures only one tooltip is visible at a time
 *
 * UX rationale (primarily for mouse-only users):
 * @see https://github.com/elastic/kibana/issues/144482
 * @see https://github.com/elastic/eui/issues/5883
 */
class ToolTipManager {
  // We use a set instead of a single var just in case
  // multiple tooltips are registered via async shenanigans
  toolTipsToHide = new Set<Function>();

  registerTooltip = (hideCallback: Function) => {
    this.toolTipsToHide.forEach((hide) => hide());
    this.toolTipsToHide.clear();
    this.toolTipsToHide.add(hideCallback);
  };

  deregisterToolTip = (hideCallback: Function) => {
    this.toolTipsToHide.delete(hideCallback);
  };
}

export const toolTipManager = new ToolTipManager();
