/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { validateUrl, mutateLinkToText } from './markdown_link_validator';
import { validateHref } from '../../../services/security/href_validator';

describe('validateURL', () => {
  it('approves of https:', () => {
    expect(validateUrl('https:')).toBeTruthy();
  });
  it('approves of http:', () => {
    expect(validateUrl('http:')).toBeTruthy();
  });
  it('approves of absolute relative links', () => {
    expect(validateUrl('/')).toBeTruthy();
  });
  it('approves of relative protocols', () => {
    expect(validateUrl('//')).toBeTruthy();
  });
  it('rejects a url starting with http with not an s following', () => {
    expect(validateUrl('httpm:')).toBeFalsy();
  });
  it('rejects a directory relative link', () => {
    expect(validateUrl('./')).toBeFalsy();
    expect(validateUrl('../')).toBeFalsy();
  });
  it('rejects a word', () => {
    expect(validateUrl('word')).toBeFalsy();
  });
  it('rejects gopher', () => {
    expect(validateUrl('gopher:')).toBeFalsy();
  });
  it('rejects javascript', () => {
    // eslint-disable-next-line no-script-url
    expect(validateUrl('javascript:')).toBeFalsy();
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
});
