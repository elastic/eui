/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { strict as assert } from 'node:assert';
import { describe, it } from 'node:test';

import { rule } from './emotion_to_css';

describe('rule', () => {
  it('scopes nested styles and emits linked keyframes globally', () => {
    const css = rule('.example', {
      styles: `
        color: red;
        &:hover { color: blue; }
        @media (min-width: 600px) { color: green; }
      `,
      next: {
        styles: '@keyframes fade{from{opacity:0}to{opacity:1}}',
      },
    });

    assert.equal(
      css,
      '.example{color:red;}.example:hover{color:blue;}@media (min-width: 600px){.example{color:green;}}@keyframes fade{from{opacity:0;}to{opacity:1;}}'
    );
  });
});
