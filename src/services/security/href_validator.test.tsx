/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { validateHref } from './href_validator';

describe('validateHref', () => {
  it('approves of https:', () => {
    expect(validateHref('https:')).toBeTruthy();
  });
  it('approves of http:', () => {
    expect(validateHref('http:')).toBeTruthy();
  });
  it('approves of absolute relative hrefs', () => {
    expect(validateHref('/')).toBeTruthy();
  });
  it('approves of relative protocols', () => {
    expect(validateHref('//')).toBeTruthy();
  });
  it('approves of url starting with http with not an s following', () => {
    expect(validateHref('httpm:')).toBeTruthy();
  });
  it('approves of directory relative href', () => {
    expect(validateHref('./')).toBeTruthy();
    expect(validateHref('../')).toBeTruthy();
  });
  it('approves of word', () => {
    expect(validateHref('word')).toBeTruthy();
  });
  it('approves of gopher', () => {
    expect(validateHref('gopher:')).toBeTruthy();
  });
  it('approves of authenticated hrefs', () => {
    expect(validateHref('http://username:password@example.com/')).toBeTruthy();
  });
  it('rejects javascript', () => {
    // eslint-disable-next-line no-script-url
    expect(validateHref('javascript:')).toBeFalsy();
    // eslint-disable-next-line no-script-url
    expect(validateHref('javascript:alert()')).toBeFalsy();
  });
});
