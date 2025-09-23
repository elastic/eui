/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { PopoverAnchorPosition } from '@elastic/eui';

export interface _EuiThemePopover {
  hasArrow: boolean;
  anchorPosition: PopoverAnchorPosition;
  offset: number;
}

// Component-specific configurations
export const popoverConfig = {
  hasArrow: false,    // Reduced from default true
  anchorPosition: 'downLeft' as PopoverAnchorPosition, // Changed from default 'downCenter'
  offset: 4,         // Changed from default 0
};

// Main export (following the same pattern as other theme categories)
export const popover = popoverConfig;
