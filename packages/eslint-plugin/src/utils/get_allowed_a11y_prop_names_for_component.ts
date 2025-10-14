/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

/**
 * Configuration describing which components accept a `label` prop
 * and the baseline set of accessibility prop names allowed across components.
 */
export type A11yConfig = {
  interactiveComponentsWithLabel: ReadonlyArray<string>;
  wrappingComponents: ReadonlyArray<string>;
  baseA11yProps: ReadonlyArray<string>;
};

/**
 * Compute the set of allowed accessibility prop names for a given component.
 *
 * - Always includes the provided `baseA11yProps`.
 * - Conditionally includes `label` if the component is listed in either
 *   `interactiveComponentsWithLabel` or `wrappingComponents`.
 * - Does **not** mutate the provided configuration; a new array is returned.
 *
 * @param componentName - The EUI component name (e.g., `'EuiButtonIcon'`).
 * @param cfg - The accessibility configuration to use when resolving allowed props.
 * @returns A new array of allowed prop names for `componentName`.
 *
 */
export function getAllowedA11yPropNamesForComponent(
  componentName: string,
  cfg: A11yConfig
): string[] {
  const componentsWithLabel = new Set<string>([
    ...cfg.interactiveComponentsWithLabel,
    ...cfg.wrappingComponents,
  ]);

  if (componentsWithLabel.has(componentName)) {
    return [...cfg.baseA11yProps, 'label'];
  }
  return [...cfg.baseA11yProps];
}
