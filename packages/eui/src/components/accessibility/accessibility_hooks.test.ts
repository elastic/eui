/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { useAriaLabelAttributes } from './accessibility_hooks';

describe('useAriaLabelAttributes', () => {
  const defaultLabel = 'Default label';

  it('returns a default aria-label when none is provided', () => {
    expect(useAriaLabelAttributes({}, defaultLabel)).toEqual({
      'aria-label': defaultLabel,
    });
  });

  it('returns provided aria-label when set', () => {
    const props = { 'aria-label': 'Explicit label' };
    expect(useAriaLabelAttributes(props, defaultLabel)).toBe(props);
  });

  it('returns provided aria-labelledby when set', () => {
    const props = { 'aria-labelledby': 'label-id' };
    expect(useAriaLabelAttributes(props, defaultLabel)).toBe(props);
  });

  it('prefers existing aria-label or aria-labelledby over default', () => {
    const props = {
      'aria-label': 'Explicit label',
      'aria-labelledby': 'label-id',
    };
    expect(useAriaLabelAttributes(props, defaultLabel)).toBe(props);
  });
});
