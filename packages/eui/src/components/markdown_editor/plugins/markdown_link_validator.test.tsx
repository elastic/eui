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
  isBareRelativeUrl,
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

describe('isBareRelativeUrl', () => {
  it('identifies bare relative URLs', () => {
    expect(isBareRelativeUrl('discover')).toBe(true);
    expect(isBareRelativeUrl('dashboards#/view/123')).toBe(true);
    expect(isBareRelativeUrl('app/home')).toBe(true);
  });

  it('rejects slash-prefixed URLs', () => {
    expect(isBareRelativeUrl('/app/discover')).toBe(false);
    expect(isBareRelativeUrl('//example.com')).toBe(false);
  });

  it('rejects anchor-only and query-only URLs', () => {
    expect(isBareRelativeUrl('#section')).toBe(false);
    expect(isBareRelativeUrl('?foo=bar')).toBe(false);
  });

  it('rejects URLs with protocols', () => {
    expect(isBareRelativeUrl('https://example.com')).toBe(false);
    expect(isBareRelativeUrl('mailto:test@example.com')).toBe(false);
    // eslint-disable-next-line no-script-url
    expect(isBareRelativeUrl('javascript:alert()')).toBe(false);
  });
});

describe('euiMarkdownLinkValidator with allowBareRelative', () => {
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

  it('resolves bare relative links when allowBareRelative is true', () => {
    const ast = createLinkAst('discover');
    euiMarkdownLinkValidator({ allowBareRelative: true, baseUrl })(ast);

    expect(getLinkNode(ast).type).toBe('link');
    expect(getLinkNode(ast).url).toBe('/s/my-space/app/discover');
  });

  it('still strips bare relative links when allowBareRelative is false', () => {
    const ast = createLinkAst('discover');
    euiMarkdownLinkValidator({ allowBareRelative: false, baseUrl })(ast);

    expect(getLinkNode(ast).type).toBe('text');
  });

  it('does not resolve absolute URLs even when allowBareRelative is true', () => {
    const ast = createLinkAst('https://elastic.co');
    euiMarkdownLinkValidator({
      allowBareRelative: true,
      allowProtocols: ['https:'],
      baseUrl,
    })(ast);

    expect(getLinkNode(ast).type).toBe('link');
    expect(getLinkNode(ast).url).toBe('https://elastic.co');
  });

  it('does not resolve slash-prefixed URLs via bare relative logic', () => {
    const ast = createLinkAst('/app/discover');
    euiMarkdownLinkValidator({
      allowBareRelative: true,
      allowRelative: true,
      baseUrl,
    })(ast);

    expect(getLinkNode(ast).type).toBe('link');
    expect(getLinkNode(ast).url).toBe('/app/discover');
  });

  it('preserves hash fragments during resolution', () => {
    const ast = createLinkAst('discover#/view/saved-search');
    euiMarkdownLinkValidator({ allowBareRelative: true, baseUrl })(ast);

    expect(getLinkNode(ast).url).toBe(
      '/s/my-space/app/discover#/view/saved-search'
    );
  });

  it('resolves against a non-/app/ base path', () => {
    const ast = createLinkAst('sibling');
    euiMarkdownLinkValidator({
      allowBareRelative: true,
      baseUrl: 'http://localhost:5601/some/other/path',
    })(ast);

    expect(getLinkNode(ast).url).toBe('/some/other/sibling');
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
