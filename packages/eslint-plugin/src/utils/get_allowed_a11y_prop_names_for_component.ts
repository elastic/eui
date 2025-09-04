/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

export type A11yConfig = {
  interactiveComponentsWithLabel: ReadonlyArray<string>;
  wrappingComponents: ReadonlyArray<string>;
  baseA11yProps: ReadonlyArray<string>;
};

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