/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { existsSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

/**
 * `button` → `Button`. `button-group` → `ButtonGroup`.
 */
export const pascal = (id) =>
  id.replace(/(^|-)(\w)/g, (_, __, char) => char.toUpperCase());

/**
 * `button` → `button`. `button-group` → `buttonGroup`.
 */
export const camel = (id) => {
  const name = pascal(id);

  return name[0].toLowerCase() + name.slice(1);
};

/**
 * Component ids: directories under `src/` that contain `mount.ts`.
 * `base` is CSS-only and is not a component id.
 */
export const listComponentIds = (pkgRoot) =>
  readdirSync(join(pkgRoot, 'src'), { withFileTypes: true })
    .filter(
      (entry) =>
        entry.isDirectory() &&
        existsSync(join(pkgRoot, 'src', entry.name, 'mount.ts'))
    )
    .map((entry) => entry.name)
    .sort();

export const sheetFile = (pkgRoot, id) =>
  join(pkgRoot, 'scripts/css/sheets', `${id}.ts`);

const listComponentSheetIds = (pkgRoot) =>
  readdirSync(join(pkgRoot, 'scripts/css/sheets'))
    .filter((name) => name.endsWith('.ts') && name !== 'base.ts')
    .map((name) => name.slice(0, -3))
    .sort();

/**
 * Sheet ids (except `base`) must match `src/<id>/mount.ts`, and vice versa.
 */
export const assertComponentIds = (pkgRoot) => {
  const componentIds = listComponentIds(pkgRoot);
  const sheetIds = listComponentSheetIds(pkgRoot);

  for (const id of componentIds) {
    if (!sheetIds.includes(id)) {
      throw new Error(
        `Component "${id}" has src/${id}/mount.ts but no scripts/css/sheets/${id}.ts`
      );
    }
  }

  for (const id of sheetIds) {
    if (!componentIds.includes(id)) {
      throw new Error(
        `Sheet "${id}" has no src/${id}/mount.ts`
      );
    }
  }

  return componentIds;
};
