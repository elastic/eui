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
  'BR',
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

// Elements whose accessible name replaces their content. A labelled region
// or group still exposes its content, so those are read through.
const NAMED_BY_LABEL_TAGS = new Set([
  'BUTTON',
  'IMG',
  'INPUT',
  'SELECT',
  'TEXTAREA',
]);
const NAMED_BY_LABEL_ROLES = new Set([
  'button',
  'checkbox',
  'combobox',
  'img',
  'link',
  'listbox',
  'menuitem',
  'menuitemcheckbox',
  'menuitemradio',
  'meter',
  'option',
  'progressbar',
  'radio',
  'searchbox',
  'slider',
  'spinbutton',
  'switch',
  'tab',
  'textbox',
]);

/**
 * Plain text for a live announcement. Inline nodes keep their own spacing, so
 * `un` + `available` stays one word. Blocks and labelled controls are kept
 * apart from their neighbours, and a control contributes its accessible name.
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
  if (
    element.hasAttribute('hidden') ||
    element.getAttribute('aria-hidden') === 'true'
  ) {
    return '';
  }

  const name = labelName(element);
  if (name) return name;

  return readNodes(element.childNodes);
};

const readNodes = (nodes: ArrayLike<Node>) => {
  let text = '';
  let afterBoundary = false;

  for (const node of Array.from(nodes)) {
    const boundary = isBoundary(node);
    const part = readNode(node);

    if (part) {
      text += afterBoundary || boundary ? ` ${part}` : part;
    }
    if (part || boundary) afterBoundary = boundary;
  }

  return text;
};

// Links stay inline so `Read <a>more</a>.` keeps its wording. Buttons are
// separate controls, so adjacent ones do not run together.
const isBoundary = (node: Node) => {
  if (node.nodeType !== Node.ELEMENT_NODE) return false;
  const element = node as Element;
  return (
    BLOCK_TAGS.has(element.tagName) ||
    element.tagName === 'BUTTON' ||
    element.getAttribute('role') === 'button' ||
    labelName(element) != null
  );
};

const isNamedByLabel = (element: Element) => {
  const role = element.getAttribute('role');
  if (role) return NAMED_BY_LABEL_ROLES.has(role);
  if (element.tagName === 'A') return element.hasAttribute('href');
  return NAMED_BY_LABEL_TAGS.has(element.tagName);
};

const labelName = (element: Element) => {
  if (!isNamedByLabel(element)) return null;

  const labelledBy = element.getAttribute('aria-labelledby');
  if (labelledBy) {
    const text = collapse(
      labelledBy
        .split(/\s+/)
        .map(
          (id) => element.ownerDocument.getElementById(id)?.textContent ?? ''
        )
        .join(' ')
    );
    if (text) return text;
  }

  const ariaLabel = element.getAttribute('aria-label')?.trim();
  if (ariaLabel) return ariaLabel;

  if (element.tagName === 'IMG') {
    return element.getAttribute('alt')?.trim() || null;
  }

  return null;
};
