/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import visit from 'unist-util-visit';

interface LinkOrTextNode {
  type: string;
  url?: string;
  title?: string | null;
  value?: string;
  children?: Array<{ value: string }>;
}

export interface EuiMarkdownLinkValidatorOptions {
  allowRelative: boolean;
  allowProtocols: string[];
}

export function euiMarkdownLinkValidator(
  options: EuiMarkdownLinkValidatorOptions
) {
  return (ast: any) => {
    visit(ast, 'link', (_node: unknown) => {
      const node = _node as LinkOrTextNode;

      if (!validateUrl(node.url!, options)) {
        mutateLinkToText(node);
      }
    });
  };
}

export function mutateLinkToText(node: LinkOrTextNode) {
  node.type = 'text';

  // https://github.com/elastic/eui/issues/5770
  // if this is a `mailto:` link only keep the link text
  const linkText = node.children?.[0]?.value || '';
  if (node.url?.startsWith('mailto:')) {
    node.value = linkText;
  } else {
    node.value = `[${linkText || ''}](${node.url})`;
  }

  delete node.children;
  delete node.title;
  delete node.url;
  return node;
}

export function validateUrl(
  url: string,
  { allowRelative, allowProtocols }: EuiMarkdownLinkValidatorOptions
) {
  // relative captures both relative paths `/` and protocols `//`
  const isRelative = url.startsWith('/');
  if (isRelative) {
    return allowRelative;
  }

  try {
    const parsedUrl = new URL(url);
    return allowProtocols.indexOf(parsedUrl.protocol) !== -1;
  } catch (e) {
    // failed to parse input as url
    return false;
  }
}
