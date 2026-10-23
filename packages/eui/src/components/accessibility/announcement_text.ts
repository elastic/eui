/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

const BLOCK_TAGS = new Set([
  'ADDRESS',
  'ARTICLE',
  'ASIDE',
  'BLOCKQUOTE',
  'DD',
  'DIV',
  'DL',
  'DT',
  'FIELDSET',
  'FIGCAPTION',
  'FIGURE',
  'FOOTER',
  'FORM',
  'H1',
  'H2',
  'H3',
  'H4',
  'H5',
  'H6',
  'HEADER',
  'HR',
  'LI',
  'MAIN',
  'NAV',
  'OL',
  'P',
  'PRE',
  'SECTION',
  'TABLE',
  'UL',
]);

/**
 * Plain text for a live announcement. Inline nodes keep their own spacing.
 * A space is inserted only before a block, or before a node whose name comes
 * from an attribute, so `un` + `available` stays one word and an icon button
 * still contributes its `aria-label`.
 */
export const getAnnouncementText = (node: Node | null | undefined) =>
  collapse(readNode(node));

export const getAnnouncementTextFromNodes = (nodes: ArrayLike<Node>) =>
  collapse(readNodes(nodes));

const collapse = (value: string) => value.replace(/\s+/g, ' ').trim();

const readNode = (node: Node | null | undefined): string => {
  if (!node) return '';
  if (node.nodeType === Node.TEXT_NODE) return node.textContent ?? '';
  if (node.nodeType !== Node.ELEMENT_NODE) return '';

  const element = node as Element;
  if (element.getAttribute('aria-hidden') === 'true') return '';

  const named = explicitName(element);
  if (named) return named;

  return readNodes(element.childNodes);
};

const readNodes = (nodes: ArrayLike<Node>) => {
  let text = '';

  for (const node of Array.from(nodes)) {
    const part = readNode(node);
    if (!part) continue;

    if (
      text &&
      needsSeparator(node) &&
      !/\s$/.test(text) &&
      !/^\s/.test(part)
    ) {
      text += ' ';
    }
    text += part;
  }

  return text;
};

const needsSeparator = (node: Node) => {
  if (node.nodeType !== Node.ELEMENT_NODE) return false;
  const element = node as Element;
  return BLOCK_TAGS.has(element.tagName) || explicitName(element) != null;
};

const explicitName = (element: Element) => {
  const ariaLabel = element.getAttribute('aria-label')?.trim();
  if (ariaLabel) return ariaLabel;

  const labelledBy = element.getAttribute('aria-labelledby');
  if (labelledBy) {
    const text = labelledBy
      .split(/\s+/)
      .map((id) => element.ownerDocument.getElementById(id)?.textContent ?? '')
      .join(' ');
    if (text.trim()) return text;
  }

  if (element.tagName === 'IMG') {
    return element.getAttribute('alt')?.trim() || null;
  }

  return null;
};
