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
      Object {
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
      Object {
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
      Object {
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
      Object {
        "type": "text",
        "value": "[someone@elastic.co](mailto:someone@elastic.co)",
      }
    `);
  });
});
