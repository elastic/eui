/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

// Temporary workaround for https://github.com/elastic/eui/issues/9404
// remark-parse v8 doesn't implement the CommonMark rule that underscore
// emphasis delimiters flanked by alphanumerics on both sides (intraword)
// cannot open or close emphasis. This causes identifiers like
// `ABCD__PineappleCherry__e` to render with bold formatting.
// This plugin walks the parsed AST and reverses incorrectly applied
// emphasis/strong nodes when both sides are alphanumeric characters.

import { Plugin } from 'unified';
// eslint-disable-next-line import/no-unresolved
import { Node, Parent } from 'unist';

interface TextNode extends Node {
  type: 'text';
  value: string;
}

interface EmphasisOrStrong extends Parent {
  type: 'emphasis' | 'strong';
}

const isTextNode = (node: Node): node is TextNode => node.type === 'text';

const isEmphasisOrStrong = (node: Node): node is EmphasisOrStrong =>
  node.type === 'emphasis' || node.type === 'strong';

const isAlphanumeric = (ch: string): boolean => /[a-zA-Z0-9]/.test(ch);

/**
 * Recursively converts an emphasis/strong node back into plain text
 * with underscore delimiters restored.
 */
function flattenToText(node: EmphasisOrStrong): string {
  const delimiter = node.type === 'emphasis' ? '_' : '__';
  let inner = '';
  for (const child of node.children) {
    if (isTextNode(child)) {
      inner += child.value;
    } else if (isEmphasisOrStrong(child)) {
      inner += flattenToText(child);
    } else {
      // Contains non-text children (links, images, etc.) — leave emphasis intact
      return delimiter + collectText(node) + delimiter;
    }
  }
  return delimiter + inner + delimiter;
}

function collectText(node: Node): string {
  if (isTextNode(node)) return node.value;
  if ('children' in node) {
    return (node as Parent).children.map(collectText).join('');
  }
  return '';
}

function processParent(parent: Parent, source: string) {
  let modified = false;
  let i = 0;

  while (i < parent.children.length) {
    const child = parent.children[i];

    if (isEmphasisOrStrong(child) && isIntraword(parent, i, source)) {
      const textValue = flattenToText(child);
      const replacement: TextNode = {
        type: 'text',
        value: textValue,
      } as TextNode;

      parent.children.splice(i, 1, replacement);
      modified = true;
      // Don't advance — the replaced node may need to merge with neighbors
    } else {
      if ('children' in child) {
        processParent(child as Parent, source);
      }
      i++;
    }

    if (modified) {
      mergeAdjacentText(parent);
      modified = false;
      // After merging, restart scan since indices shifted
      i = 0;
    }
  }
}

function getInnerText(node: Node): string {
  if (isTextNode(node)) return node.value;
  if ('children' in node) {
    const children = (node as Parent).children;
    if (children.length > 0) return getInnerText(children[0]);
  }
  return '';
}

function getInnerTextEnd(node: Node): string {
  if (isTextNode(node)) return node.value;
  if ('children' in node) {
    const children = (node as Parent).children;
    if (children.length > 0)
      return getInnerTextEnd(children[children.length - 1]);
  }
  return '';
}

/**
 * Checks whether the emphasis/strong node at `index` within `parent`
 * is an intraword usage of underscore delimiters.
 *
 * A node is intraword when at least one side has an alphanumeric text
 * neighbor AND the inner content on the corresponding delimiter side
 * also touches word characters — proving the underscores are embedded
 * in a word rather than used as formatting.
 */
function isIntraword(parent: Parent, index: number, source: string): boolean {
  const node = parent.children[index];

  // Verify the delimiter is `_` (not `*`) by inspecting the source
  if (node.position?.start?.offset != null) {
    const ch = source[node.position.start.offset];
    if (ch !== '_') return false;
  }

  const prev = index > 0 ? parent.children[index - 1] : null;
  const next =
    index < parent.children.length - 1 ? parent.children[index + 1] : null;

  const prevChar =
    prev != null && isTextNode(prev) && prev.value.length > 0
      ? prev.value[prev.value.length - 1]
      : null;

  const nextChar =
    next != null && isTextNode(next) && next.value.length > 0
      ? next.value[0]
      : null;

  const prevIsAlpha = prevChar != null && isAlphanumeric(prevChar);
  const nextIsAlpha = nextChar != null && isAlphanumeric(nextChar);

  // Both sides flanked by alphanumeric — classic intraword (e.g. `foo__bar__baz`)
  if (prevIsAlpha && nextIsAlpha) return true;

  // One-sided: prev is alpha or underscore, no alpha next — check inner text
  // starts with alpha (e.g. `Lorem__ipsum__` or `Lorem__ipsum_`)
  if (prevIsAlpha || prevChar === '_') {
    const inner = getInnerText(node);
    if (inner.length > 0 && isAlphanumeric(inner[0])) return true;
  }

  // One-sided: next is alpha or underscore, no alpha prev — check inner text
  // ends with alpha (e.g. `__Lorem__ipsum` or `_Lorem__ipsum`)
  if (nextIsAlpha || nextChar === '_') {
    const inner = getInnerTextEnd(node);
    if (inner.length > 0 && isAlphanumeric(inner[inner.length - 1]))
      return true;
  }

  return false;
}

function mergeAdjacentText(parent: Parent) {
  let i = 0;
  while (i < parent.children.length - 1) {
    if (isTextNode(parent.children[i]) && isTextNode(parent.children[i + 1])) {
      (parent.children[i] as TextNode).value += (
        parent.children[i + 1] as TextNode
      ).value;
      parent.children.splice(i + 1, 1);
    } else {
      i++;
    }
  }
}

const attacher: Plugin = function remarkIntrawordUnderscore() {
  return (tree, file) => {
    const source = String(file);
    processParent(tree as Parent, source);
  };
};

export default attacher;
