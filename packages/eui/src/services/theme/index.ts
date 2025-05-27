/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { defaultComputedTheme } from './context';
import { EuiThemeComputed, EuiThemeShape } from './types';
import { EuiThemeShapeBase } from '@elastic/eui-theme-common';

export {
  EuiSystemContext,
  EuiThemeContext,
  EuiNestedThemeContext,
  EuiModificationsContext,
  EuiColorModeContext,
  EuiHighContrastModeContext,
} from './context';
export type { UseEuiTheme, WithEuiThemeProps } from './hooks';
export {
  useEuiTheme,
  withEuiTheme,
  RenderWithEuiTheme,
  useEuiThemeCSSVariables,
  useIsDarkMode,
} from './hooks';
export type { EuiThemeProviderProps } from './provider';
export { EuiThemeProvider } from './provider';
export {
  useEuiMemoizedStyles,
  withEuiStylesMemoizer,
  type WithEuiStylesMemoizerProps,
  RenderWithEuiStylesMemoizer,
} from './style_memoization';
export { getEuiDevProviderWarning, setEuiDevProviderWarning } from './warning';
export {
  buildTheme,
  computed,
  isInverseColorMode,
  getColorMode,
  getComputed,
  getOn,
  mergeDeep,
  setOn,
  Computed,
} from './utils';
export type {
  ComputedThemeShape,
  EuiThemeColorMode,
  EuiThemeColorModeStandard,
  EuiThemeHighContrastMode,
  EuiThemeHighContrastModeProp,
  EuiThemeComputed,
  EuiThemeModifications,
  EuiThemeShape,
  EuiThemeSystem,
} from './types';
export { COLOR_MODES_STANDARD } from './types';


const generateThemeCSSVarMapping = (
  obj: EuiThemeComputed<EuiThemeShape>,
  prefix = '--euiTheme'
): StringifiedEuiThemeShapeBase => {
  const result: Record<string, any> = {};
  const stack: { target: Record<string, any>; value: any; path: string[] }[] = [
    { target: result, value: obj, path: [] },
  ];

  while (stack.length) {
    const { target, value, path } = stack.pop()!;

    for (const key in value) {
      if (Object.prototype.hasOwnProperty.call(value, key)) {
        const val = value[key];
        if (typeof val === 'object' && val !== null) {
          target[key] = {};
          stack.push({ target: target[key], value: val, path: [...path, key] });
        } else {
          const varRef = `var(${prefix}_${[...path, key].join('_')})`;
          target[key] = varRef;
        }
      }
    }
  }

  return result as unknown as StringifiedEuiThemeShapeBase;
};

type DeepStringify<T> = {
  [K in keyof T]: T[K] extends object ? DeepStringify<T[K]> : string;
};

export type StringifiedEuiThemeShapeBase = DeepStringify<EuiThemeComputed<EuiThemeShape>>;

/**
 * Mirrors the structure of `euiTheme`, but replaces the actual values with corresponding CSS variable names.
 * These variables are resolved at runtime via the theme provider.
 *
 * Example:
 * const euiThemeCssVariables = {
 *   colors: {
 *     ghost: 'var(--euiTheme_colors_ghost)',
 *     ink: 'var(--euiTheme_colors_ink)',
 *     ...
 *   },
 *  border: {...}
 * }
 */
export const euiThemeCssVariables = generateThemeCSSVarMapping(defaultComputedTheme);

