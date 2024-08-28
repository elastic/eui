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

export type EuiMarkdownLinkValidatorOptions = {
  /**
   * Allow or disallow relative links (links that begin with a `/`)
   * @default true
   */
  allowRelative?: boolean;
  /**
   * Allow or disallow specific [URL protocols or schemes](https://developer.mozilla.org/en-US/docs/Web/URI/Schemes)
   * @default ['https:', 'http:', 'mailto:']
   */
  allowProtocols?: string[];
};

export const DEFAULT_OPTIONS = {
  allowRelative: true,
  allowProtocols: ['https:', 'http:', 'mailto:'],
};

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
  // this is an upsupported url, convert to a text node
  node.type = 'text';

  // and, if the link text matches the url there's only one value to show
  // otherwise render as the markdown syntax so both text & url remain, unlinked
  const linkText = node.children?.[0]?.value || '';
  const linkUrl = node.url ?? '';
  if (linkText === linkUrl) {
    node.value = linkText;
  } else {
    node.value = `[${linkText}](${node.url})`;
  }

  delete node.children;
  delete node.title;
  delete node.url;
  return node;
}

export function validateUrl(
  url: string,
  {
    allowRelative = DEFAULT_OPTIONS.allowRelative,
    allowProtocols = DEFAULT_OPTIONS.allowProtocols,
  }: EuiMarkdownLinkValidatorOptions
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
