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
