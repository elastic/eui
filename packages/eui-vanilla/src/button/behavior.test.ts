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
import { buttonClassName } from './mount';

describe('isButtonDisabled', () => {
  it('is false by default', () => {
    assert.equal(isButtonDisabled({}), false);
  });

  it('follows EuiButtonDisplay: loading, disabled, or javascript href', () => {
    assert.equal(isButtonDisabled({ isLoading: true }), true);
    assert.equal(isButtonDisabled({ isDisabled: true }), true);
    assert.equal(isButtonDisabled({ disabled: true }), true);
    assert.equal(isButtonDisabled({ href: 'javascript:alert(1)' }), true);
    assert.equal(isButtonDisabled({ href: 'java\nscript:alert(1)' }), true);
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

describe('buttonClassName', () => {
  it('matches EuiButtonDisplay class names', () => {
    assert.equal(
      buttonClassName({ label: 'Go' }),
      'euiButton euiButton--primary euiButton--m'
    );
    assert.equal(
      buttonClassName({ label: 'Go', fill: true }),
      'euiButton euiButton--primary euiButton--m euiButton--fill'
    );
    assert.equal(
      buttonClassName({ label: 'Go', disabled: true, fill: true }),
      'euiButton euiButton--disabled euiButton--m euiButton--fill'
    );
    assert.equal(
      buttonClassName({ label: 'Go', size: 's', fullWidth: true }),
      'euiButton euiButton--primary euiButton--s euiButton--fullWidth'
    );
  });
});

describe('generated CSS', () => {
  const generated = join(
    dirname(fileURLToPath(import.meta.url)),
    '../../generated'
  );
  const buttonCss = readFileSync(join(generated, 'button.css'), 'utf8');
  const baseCss = readFileSync(join(generated, 'base.css'), 'utf8');

  it('serializes EUI button styles into stable class names', () => {
    assert.match(buttonCss, /data-theme.light/);
    assert.match(buttonCss, /data-theme.dark/);
    assert.match(buttonCss, /\.euiButton--primary/);
    assert.match(buttonCss, /\.euiButton--fill/);
    assert.match(buttonCss, /\.euiButton__content/);
    assert.match(buttonCss, /\.euiLoadingSpinner/);
    assert.match(buttonCss, /#0B64DD/i);
  });

  it('does not ship Emotion hashes, React, or unresolved tokens', () => {
    assert.doesNotMatch(buttonCss, /\.css-[a-z0-9]+/);
    assert.doesNotMatch(buttonCss, /react/i);
    assert.doesNotMatch(buttonCss, /undefined/);
  });

  it('includes EUI reset so native buttons lose the UA border and inherit Inter', () => {
    assert.match(baseCss, /button\{[^}]*border:none/);
    assert.match(baseCss, /Inter/);
  });
});
