/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

export type { EUI_THEME } from './themes';
export { EUI_THEMES } from './themes';

export { EuiThemeAmsterdam } from './amsterdam/theme';
export { EuiThemeNew } from './new_theme/theme';

export { isDefaultTheme, isNewTheme } from './flags';

export * from './amsterdam';
// export * from './new_theme';
