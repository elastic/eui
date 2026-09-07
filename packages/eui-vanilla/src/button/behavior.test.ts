/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { describe, it } from 'node:test';
import { fileURLToPath } from 'node:url';

import { isButtonDisabled, resolveDisplay } from './behavior';

describe('isButtonDisabled', () => {
  it('is false by default', () => {
    assert.equal(isButtonDisabled({}), false);
  });

  it('follows EuiButtonDisplay: loading, disabled, or javascript href', () => {
    assert.equal(isButtonDisabled({ isLoading: true }), true);
    assert.equal(isButtonDisabled({ isDisabled: true }), true);
    assert.equal(isButtonDisabled({ disabled: true }), true);
    assert.equal(isButtonDisabled({ href: 'javascript:alert(1)' }), true);
    assert.equal(isButtonDisabled({ href: '/deploy' }), false);
  });
});

describe('resolveDisplay', () => {
  it('maps fill prop to the fill display, like EuiButton', () => {
    assert.equal(resolveDisplay({}), 'base');
    assert.equal(resolveDisplay({ fill: true }), 'fill');
    assert.equal(resolveDisplay({ display: 'empty', fill: true }), 'empty');
  });
});

describe('generated button.css', () => {
  const css = readFileSync(
    join(dirname(fileURLToPath(import.meta.url)), '../../generated/button.css'),
    'utf8'
  );

  it('serializes EUI button styles into stable class names', () => {
    assert.match(css, /data-color-mode.LIGHT/);
    assert.match(css, /data-color-mode.DARK/);
    assert.match(css, /\.euiButton--primary/);
    assert.match(css, /\.euiButton--fill/);
    assert.match(css, /\.euiButton__content/);
    assert.match(css, /#0B64DD/i);
  });

  it('does not ship Emotion hashes, React, or unresolved tokens', () => {
    assert.doesNotMatch(css, /\.css-[a-z0-9]+/);
    assert.doesNotMatch(css, /react/i);
    assert.doesNotMatch(css, /undefined/);
  });
});
