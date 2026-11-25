/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { createContext } from 'react';

interface StorybookItem {
  id: string;
  label: string;
}

type DocStorybook = string | StorybookItem[] | undefined;

function isStorybookItem(value: unknown): value is StorybookItem {
  return (
    typeof value === 'object' &&
    value !== null &&
    'id' in value &&
    typeof value.id === 'string' &&
    value.id.trim().length > 0 &&
    'label' in value &&
    typeof value.label === 'string' &&
    value.label.trim().length > 0
  );
}

export function getDocStorybook(value: unknown): DocStorybook {
  if (typeof value === 'string') return value.trim();
  if (Array.isArray(value)) return value.filter(isStorybookItem);
  return undefined;
}

// Only document pages provide this context; other MDX headings remain unchanged.
export const DocStorybookContext = createContext<DocStorybook>(undefined);
