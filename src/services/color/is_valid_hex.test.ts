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

import { isValidHex } from './is_valid_hex';

describe('isValidHex', () => {
  test('hex3', () => {
    expect(isValidHex('FFF')).toEqual(false);
    expect(isValidHex('#FFF')).toEqual(true);

    expect(isValidHex('#0c8')).toEqual(true);
    expect(isValidHex('#0C8')).toEqual(true);
    expect(isValidHex('0c8')).toEqual(false);

    expect(isValidHex('#MMM')).toEqual(false);
  });

  test('hex4', () => {
    expect(isValidHex('FFFF')).toEqual(false);
    expect(isValidHex('#FFFF')).toEqual(false);

    expect(isValidHex('#0c8f')).toEqual(false);
    expect(isValidHex('#0C8f')).toEqual(false);
    expect(isValidHex('0c8f')).toEqual(false);

    expect(isValidHex('#0000')).toEqual(false);
  });

  test('hex6', () => {
    expect(isValidHex('FFFFFF')).toEqual(false);
    expect(isValidHex('#FFFFFF')).toEqual(true);

    expect(isValidHex('#00cc88')).toEqual(true);
    expect(isValidHex('#00CC88')).toEqual(true);
    expect(isValidHex('00cc88')).toEqual(false);

    expect(isValidHex('#MMMMMM')).toEqual(false);
  });

  test('hex8', () => {
    expect(isValidHex('FFFFFFFF')).toEqual(false);
    expect(isValidHex('#FFFFFFFF')).toEqual(false);

    expect(isValidHex('#000000ff')).toEqual(false);
  });

  test('misc', () => {
    expect(isValidHex('test')).toEqual(false);
    expect(isValidHex('#test')).toEqual(false);

    expect(isValidHex('red')).toEqual(false);

    expect(isValidHex('whitesmoke')).toEqual(false);
  });
});
