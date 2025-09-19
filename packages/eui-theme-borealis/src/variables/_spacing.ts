/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

// Component-specific spacing configurations
export const emptyPromptSpacing = {
  titleBodySpacing: 's',    // Reduced from default 'm' (16px → 8px)
  bodyActionsSpacing: 'm',  // Reduced from default 'l' (24px → 16px)
  paddingSize: 'm',         // Reduced from default 'l' (24px → 16px)
};

// Main spacing export (following the same pattern as _typography.ts)
export const spacing = {
  emptyPrompt: emptyPromptSpacing,
};
