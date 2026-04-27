/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

/**
 * List of available stable selectors for
 * {@link https://eui.elastic.co/#/display/tooltip|EuiToolTip}
 */
export const EuiToolTipSelectors = {
  /**
   * CSS selector to find the popover element wrapping EuiToolTip's content.
   *
   * Note: The popover element is rendered only when a pointer hovers over
   * the children of EuiToolTip!
   */
  POPOVER: '.euiToolTipPopover',
}
