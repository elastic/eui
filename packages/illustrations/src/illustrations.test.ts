/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { readdirSync } from 'fs';
import { join } from 'path';

import { illustrations } from './generated';

const SVG_FILE = /^(.+)\.(light|dark)\.svg$/;
const ID_ATTR = /\bid="([^"]+)"/g;
const URL_REF = /url\(#([^)]+)\)/g;

const toCamelCase = (name: string) =>
  name.replace(/[-_](.)/g, (_, char: string) => char.toUpperCase());

const catalog = Object.values(illustrations);

const sourceIds = [
  ...new Set(
    readdirSync(join(__dirname, 'svgs'))
      .map((fileName) => fileName.match(SVG_FILE)?.[1])
      .filter((id): id is string => Boolean(id))
  ),
].sort();

const svgVariants = catalog.flatMap(({ id, light, dark }) => [
  { source: `${id}.light`, svg: light },
  { source: `${id}.dark`, svg: dark },
]);

describe('illustrations catalog', () => {
  it('exports one entry per src/svgs pair', () => {
    expect(catalog.map(({ id }) => id).sort()).toEqual(sourceIds);
  });

  it('exposes each illustration on the camelCase export name', () => {
    for (const illustration of catalog) {
      expect(illustrations[toCamelCase(illustration.id)]).toBe(illustration);
    }
  });

  it('ships light and dark SVGs with a viewBox', () => {
    for (const { svg } of svgVariants) {
      expect(svg).toMatch(/^<svg\b/);
      expect(svg).toContain('viewBox=');
    }
  });

  it('does not reuse SVG ids across the catalog', () => {
    const seen = new Map<string, string>();
    const duplicates: string[] = [];

    for (const { source, svg } of svgVariants) {
      for (const match of svg.matchAll(ID_ATTR)) {
        const svgId = match[1];
        const previous = seen.get(svgId);
        if (previous) {
          duplicates.push(`"${svgId}" in ${source} and ${previous}`);
        } else {
          seen.set(svgId, source);
        }
      }
    }

    expect(duplicates).toEqual([]);
  });

  it('keeps url() references inside the same SVG', () => {
    const broken: string[] = [];

    for (const { source, svg } of svgVariants) {
      const ids = new Set([...svg.matchAll(ID_ATTR)].map((match) => match[1]));
      for (const match of svg.matchAll(URL_REF)) {
        if (!ids.has(match[1])) {
          broken.push(`${source} references #${match[1]}`);
        }
      }
    }

    expect(broken).toEqual([]);
  });
});
