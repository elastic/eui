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

import { toSentenceCase } from './to_case';

describe('toSentenceCase', () => {
  it("should return the same single word with the first letter capitalized for 'single'", () => {
    expect(toSentenceCase('single')).toBe('Single');
  });

  it("should return all the words with ony the first letter of the first word capitalized for 'two words'", () => {
    expect(toSentenceCase('two words')).toBe('Two words');
  });

  it("should return all the words with ony the first letter of the first word capitalized for 'opposite Of Sentence Case'", () => {
    expect(toSentenceCase('opposite Of Sentence Case')).toBe(
      'Opposite of sentence case'
    );
  });
});
