/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
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
