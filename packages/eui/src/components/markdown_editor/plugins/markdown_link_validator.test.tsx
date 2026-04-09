/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import {
  validateUrl,
  mutateLinkToText,
  isDocumentRelativeUrl,
  euiMarkdownLinkValidator,
  EuiMarkdownLinkValidatorOptions,
} from './markdown_link_validator';
import { validateHref } from '../../../services/security/href_validator';

const defaultValidationOptions: EuiMarkdownLinkValidatorOptions = {
  allowRelative: true,
  allowProtocols: ['http:', 'https:', 'mailto:'],
};

describe('validateURL', () => {
  it('approves of https:', () => {
    expect(
      validateUrl('https://domain', defaultValidationOptions)
    ).toBeTruthy();
  });
  it('approves of http:', () => {
    expect(validateUrl('http://domain', defaultValidationOptions)).toBeTruthy();
  });
  it('approves of mailto:', () => {
    expect(
      validateUrl('mailto:someone@elastic.co', defaultValidationOptions)
    ).toBeTruthy();
  });
  it('approves of absolute relative links', () => {
    expect(validateUrl('/', defaultValidationOptions)).toBeTruthy();
  });
  it('approves of relative protocols', () => {
    expect(validateUrl('//', defaultValidationOptions)).toBeTruthy();
  });
  it('rejects a url starting with http with not an s following', () => {
    expect(validateUrl('httpm:', defaultValidationOptions)).toBeFalsy();
  });
  it('rejects a directory relative link', () => {
    expect(validateUrl('./', defaultValidationOptions)).toBeFalsy();
    expect(validateUrl('../', defaultValidationOptions)).toBeFalsy();
  });
  it('rejects a word', () => {
    expect(validateUrl('word', defaultValidationOptions)).toBeFalsy();
  });
  it('rejects gopher', () => {
    expect(
      validateUrl('gopher://domain', defaultValidationOptions)
    ).toBeFalsy();
  });
  it('rejects javascript', () => {
    // eslint-disable-next-line no-script-url
    expect(validateUrl('javascript:', defaultValidationOptions)).toBeFalsy();
    // eslint-disable-next-line no-script-url
    expect(validateHref('javascript:alert()')).toBeFalsy();
  });
});

describe('isDocumentRelativeUrl', () => {
  it('identifies document relative URLs', () => {
    expect(isDocumentRelativeUrl('app')).toBe(true);
    expect(isDocumentRelativeUrl('page#/view/123')).toBe(true);
    expect(isDocumentRelativeUrl('app/home')).toBe(true);
    expect(isDocumentRelativeUrl('../settings/account')).toBe(true);
    expect(isDocumentRelativeUrl('../../other-path')).toBe(true);
    expect(isDocumentRelativeUrl('./app')).toBe(true);
  });

  it('rejects slash-prefixed URLs', () => {
    expect(isDocumentRelativeUrl('/app/discover')).toBe(false);
    expect(isDocumentRelativeUrl('//example.com')).toBe(false);
  });

  it('rejects anchor-only and query-only URLs', () => {
    expect(isDocumentRelativeUrl('#section')).toBe(false);
    expect(isDocumentRelativeUrl('?foo=bar')).toBe(false);
  });

  it('rejects URLs with protocols', () => {
    expect(isDocumentRelativeUrl('https://example.com')).toBe(false);
    expect(isDocumentRelativeUrl('mailto:test@example.com')).toBe(false);
    // eslint-disable-next-line no-script-url
    expect(isDocumentRelativeUrl('javascript:alert()')).toBe(false);
  });
});

describe('euiMarkdownLinkValidator with allowDocumentRelative', () => {
  const baseUrl = 'http://localhost:5601/s/my-space/app/dashboards';

  const createLinkAst = (url: string) => ({
    type: 'root',
    children: [
      {
        type: 'paragraph',
        children: [
          {
            type: 'link',
            url,
            children: [{ type: 'text', value: 'link text' }],
          },
        ],
      },
    ],
  });

  const getLinkNode = (ast: ReturnType<typeof createLinkAst>) =>
    ast.children[0].children[0];

  it('resolves document relative links when allowDocumentRelative is true', () => {
    const ast = createLinkAst('discover');
    euiMarkdownLinkValidator({ allowDocumentRelative: true, baseUrl })(ast);

    expect(getLinkNode(ast).type).toBe('link');
    expect(getLinkNode(ast).url).toBe('/s/my-space/app/discover');
  });

  it('still strips document relative links when allowDocumentRelative is false', () => {
    const ast = createLinkAst('discover');
    euiMarkdownLinkValidator({ allowDocumentRelative: false, baseUrl })(ast);

    expect(getLinkNode(ast).type).toBe('text');
  });

  it('does not resolve absolute URLs even when allowDocumentRelative is true', () => {
    const ast = createLinkAst('https://elastic.co');
    euiMarkdownLinkValidator({
      allowDocumentRelative: true,
      allowProtocols: ['https:'],
      baseUrl,
    })(ast);

    expect(getLinkNode(ast).type).toBe('link');
    expect(getLinkNode(ast).url).toBe('https://elastic.co');
  });

  it('does not resolve slash-prefixed URLs via document relative logic', () => {
    const ast = createLinkAst('/app/discover');
    euiMarkdownLinkValidator({
      allowDocumentRelative: true,
      allowRelative: true,
      baseUrl,
    })(ast);

    expect(getLinkNode(ast).type).toBe('link');
    expect(getLinkNode(ast).url).toBe('/app/discover');
  });

  it('preserves hash fragments during resolution', () => {
    const ast = createLinkAst('discover#/view/saved-search');
    euiMarkdownLinkValidator({ allowDocumentRelative: true, baseUrl })(ast);

    expect(getLinkNode(ast).url).toBe(
      '/s/my-space/app/discover#/view/saved-search'
    );
  });

  it('resolves the same way with or without a trailing slash on the base URL', () => {
    const withoutSlash = createLinkAst('editor');
    euiMarkdownLinkValidator({
      allowDocumentRelative: true,
      baseUrl: 'http://localhost:3000/docs/markdown/plugins',
    })(withoutSlash);

    const withSlash = createLinkAst('editor');
    euiMarkdownLinkValidator({
      allowDocumentRelative: true,
      baseUrl: 'http://localhost:3000/docs/markdown/plugins/',
    })(withSlash);

    expect(getLinkNode(withoutSlash).url).toBe('/docs/markdown/editor');
    expect(getLinkNode(withSlash).url).toBe('/docs/markdown/editor');
  });

  it('resolves ../ parent traversal links', () => {
    const ast = createLinkAst('../security/account');
    euiMarkdownLinkValidator({ allowDocumentRelative: true, baseUrl })(ast);

    expect(getLinkNode(ast).type).toBe('link');
    expect(getLinkNode(ast).url).toBe('/s/my-space/security/account');
  });

  it('resolves multiple levels of ../ traversal', () => {
    const ast = createLinkAst('../../other-path');
    euiMarkdownLinkValidator({ allowDocumentRelative: true, baseUrl })(ast);

    expect(getLinkNode(ast).type).toBe('link');
    expect(getLinkNode(ast).url).toBe('/s/other-path');
  });

  it('resolves ./ current directory links', () => {
    const ast = createLinkAst('./discover');
    euiMarkdownLinkValidator({ allowDocumentRelative: true, baseUrl })(ast);

    expect(getLinkNode(ast).type).toBe('link');
    expect(getLinkNode(ast).url).toBe('/s/my-space/app/discover');
  });

  it('does not allow document-relative links when allowRelative is false', () => {
    const ast = createLinkAst('discover');
    euiMarkdownLinkValidator({
      allowDocumentRelative: true,
      allowRelative: false,
      baseUrl,
    })(ast);

    expect(getLinkNode(ast).type).toBe('text');
  });

  it('preserves query strings during resolution', () => {
    const ast = createLinkAst('discover?_g=(filters:!())');
    euiMarkdownLinkValidator({ allowDocumentRelative: true, baseUrl })(ast);

    expect(getLinkNode(ast).type).toBe('link');
    expect(getLinkNode(ast).url).toBe(
      '/s/my-space/app/discover?_g=(filters:!())'
    );
  });
});

describe('mutateLinkToText', () => {
  it('mutates', () => {
    expect(
      mutateLinkToText({
        type: 'link',
        url: 'https://cats.com',
        title: null,
        children: [{ value: 'Cats' }],
      })
    ).toMatchInlineSnapshot(`
      {
        "type": "text",
        "value": "[Cats](https://cats.com)",
      }
    `);
    expect(
      mutateLinkToText({
        type: 'link',
        url: 'https://cats.com',
        title: null,
        children: [],
      })
    ).toMatchInlineSnapshot(`
      {
        "type": "text",
        "value": "[](https://cats.com)",
      }
    `);
  });
  it('keeps only the link text when both text & url are the same value', () => {
    expect(
      mutateLinkToText({
        type: 'link',
        url: 'ftp://www.example.com',
        title: null,
        children: [{ value: 'ftp://www.example.com' }],
      })
    ).toMatchInlineSnapshot(`
      {
        "type": "text",
        "value": "ftp://www.example.com",
      }
    `);
  });
  it('renders with the markdown link syntax when link and url are not the same value', () => {
    expect(
      mutateLinkToText({
        type: 'link',
        url: 'mailto:someone@elastic.co',
        title: null,
        children: [{ value: 'someone@elastic.co' }],
      })
    ).toMatchInlineSnapshot(`
      {
        "type": "text",
        "value": "[someone@elastic.co](mailto:someone@elastic.co)",
      }
    `);
  });
});
