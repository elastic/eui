/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { highlightByLine } from './utils';

const jsonCode = `{
  "id": "1",
}`;

describe('highlightByLine', () => {
  it('without line numbers', () => {
    const highlight = highlightByLine(jsonCode, 'json', {
      show: false,
      start: 1,
    });
    expect(highlight).toMatchSnapshot();
  });

  it('with line numbers', () => {
    const highlight = highlightByLine(jsonCode, 'json', {
      show: true,
      start: 1,
    });
    expect(highlight).toMatchSnapshot();
  });

  it('with line numbers and custom starting number', () => {
    const highlight = highlightByLine(jsonCode, 'json', {
      show: true,
      start: 10,
    });
    expect(highlight).toMatchSnapshot();
  });
});
