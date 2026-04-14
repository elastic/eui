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
   * Only used if `allowRelative` is true.
   * Allow or disallow document relative links (e.g. `discover` instead of `/app/discover`).
   * When enabled, document relative URLs are resolved against `baseUrl`
   * (defaults to `window.location.href`) using the browser's native URL
   * resolution, the same way an `<a href="discover">` would behave in
   * plain HTML. (Unlike native URL resolution, trailing slashes
   * e.g. `discover/` are ignored)
   * @default false
   */
  allowDocumentRelative?: boolean;
  /**
   * The base URL to resolve document relative links against.
   * Only used when `allowDocumentRelative` is true.
   * Useful for EUI's testing environment which cannot mock window.location, unlikely to be changed from default in actual end use.
   * @default window.location.href
   */
  baseUrl?: string;
  /**
   * Allow or disallow specific [URL protocols or schemes](https://developer.mozilla.org/en-US/docs/Web/URI/Schemes)
   * @default ['https:', 'http:', 'mailto:']
   */
  allowProtocols?: string[];
};

export const DEFAULT_OPTIONS = {
  allowRelative: true,
  allowDocumentRelative: false,
  allowProtocols: ['https:', 'http:', 'mailto:'],
};

export function euiMarkdownLinkValidator({
  allowRelative = DEFAULT_OPTIONS.allowRelative,
  allowDocumentRelative = DEFAULT_OPTIONS.allowDocumentRelative,
  allowProtocols = DEFAULT_OPTIONS.allowProtocols,
  baseUrl,
}: EuiMarkdownLinkValidatorOptions) {
  return (ast: any) => {
    visit(ast, 'link', (_node: unknown) => {
      const node = _node as LinkOrTextNode;

      if (
        allowRelative &&
        allowDocumentRelative &&
        // Prevent throwing in non-browser environments if baseUrl isn't configured
        (typeof window !== 'undefined' || baseUrl) &&
        node.url &&
        isDocumentRelativeUrl(node.url)
      ) {
        const newUrl = resolveDocumentRelativeUrl(
          node.url,
          baseUrl ?? window.location.href
        );
        if (newUrl) {
          node.url = newUrl;
        } else {
          mutateLinkToText(node);
        }
      } else if (!validateUrl(node.url!, { allowRelative, allowProtocols })) {
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

/**
 * Tests whether a URL is a document relative URL (e.g. "discover", "dashboards#/view/123")
 * that has no scheme, no leading slash, and is not an anchor or query-only link.
 */
export function isDocumentRelativeUrl(url: string): boolean {
  if (url.startsWith('/') || url.startsWith('#') || url.startsWith('?')) {
    return false;
  }
  // Return false if the url starts with a protocol/scheme. Catches http:, https:, mailto:, etc.
  if (/^[a-z][a-z0-9+.-]*:/i.test(url)) {
    return false;
  }
  return true;
}

/**
 * Resolves a document relative URL against a base URL. This mostly replicates
 * native browser resolution of e.g. `<a href="discover">`, except that
 * trailing slashes are always removed to ensure consistent resolution,
 * regardless of whether the current page URL ends with a trailing slash or not.
 * Without this, "baz" on "/foo/bar/" resolves to "/foo/bar/baz" instead of the
 * expected "/foo/baz".
 */
function resolveDocumentRelativeUrl(
  url: string,
  baseUrl: string
): string | null {
  const normalizedBase = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
  try {
    const resolved = new URL(url, normalizedBase);
    return `${resolved.pathname}${resolved.search}${resolved.hash}`;
  } catch (e) {
    // failed to parse URL
    return null;
  }
}
