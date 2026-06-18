/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

/**
 * Returns the Storybook iframe URL for a given story ID and optional args.
 *
 * @param id - The Storybook story ID (e.g. `'forms-euicombobox--playground'`)
 * @param args - Optional semicolon-separated Storybook args string (e.g. `'data-test-subj:myCombo;singleSelection:true'`)
 */
export const storyUrl = (id: string, args?: string): string =>
  `/iframe.html?id=${id}&viewMode=story${args ? `&args=${args}` : ''}`;
