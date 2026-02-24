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
// `SBQQ__OrderProductBookings__c` to render with bold formatting.
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

/**
 * Checks whether the emphasis/strong node at `index` within `parent`
 * is an intraword usage of underscore delimiters.
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

  const prevEndsWithAlpha =
    prev != null &&
    isTextNode(prev) &&
    prev.value.length > 0 &&
    isAlphanumeric(prev.value[prev.value.length - 1]);

  const nextStartsWithAlpha =
    next != null &&
    isTextNode(next) &&
    next.value.length > 0 &&
    isAlphanumeric(next.value[0]);

  return prevEndsWithAlpha && nextStartsWithAlpha;
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
