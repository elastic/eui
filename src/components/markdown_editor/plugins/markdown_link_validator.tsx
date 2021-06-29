/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import visit from 'unist-util-visit';

interface LinkOrTextNode {
  type: string;
  url?: string;
  title?: string | null;
  value?: string;
  children?: Array<{ value: string }>;
}

export function markdownLinkValidator() {
  return (ast: any) => {
    visit(ast, 'link', (_node: unknown) => {
      const node = _node as LinkOrTextNode;

      if (!validateUrl(node.url!)) {
        mutateLinkToText(node);
      }
    });
  };
}

export function mutateLinkToText(node: LinkOrTextNode) {
  node.type = 'text';
  node.value = `[${node.children![0]?.value || ''}](${node.url})`;
  delete node.children;
  delete node.title;
  delete node.url;
  return node;
}

export function validateUrl(url: string) {
  // A link is valid if it starts with http:, https:, or /
  return /^(https?:|\/)/.test(url);
}
