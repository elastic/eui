/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { patchCacheForDynamicStyles } from './emotion_dynamic_patch';

describe('patchCacheForDynamicStyles', () => {
  function createMockCache() {
    const inserted: any[] = [];
    return {
      insert: jest.fn(function (selector, serialized, sheet, shouldCache) {
        inserted.push({ selector, serialized, sheet, shouldCache });
        return undefined;
      }),
      inserted,
    };
  }

  it('should not warn for static styles', () => {
    const cache: any = createMockCache();
    const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
    patchCacheForDynamicStyles(cache);

    // Simulate two static style insertions with the same base class and hash
    cache.insert('.css-aaaaaa-euiPanel', {
      name: 'aaaaaa-euiPanel',
      styles: 'color:red;',
    });
    cache.insert('.css-aaaaaa-euiPanel', {
      name: 'aaaaaa-euiPanel',
      styles: 'color:red;',
    });

    expect(warnSpy).not.toHaveBeenCalled();
    warnSpy.mockRestore();
  });

  it('should warn for dynamic styles (different hashes for same base)', () => {
    const cache: any = createMockCache();
    const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
    patchCacheForDynamicStyles(cache);

    // Simulate two dynamic style insertions with different hashes but same base class
    cache.insert('.css-aaaaaa-euiPanel', {
      name: 'aaaaaa-euiPanel',
      styles: 'color:red;',
    });
    cache.insert('.css-bbbbbb-euiPanel', {
      name: 'bbbbbb-euiPanel',
      styles: 'color:blue;',
    });

    expect(warnSpy).toHaveBeenCalledWith(
      expect.stringContaining(
        'Dynamic style detected for base selector: euiPanel'
      )
    );
    warnSpy.mockRestore();
  });

  it('should handle selectors that do not match the pattern', () => {
    const cache: any = createMockCache();
    const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
    patchCacheForDynamicStyles(cache);

    // Insert a selector that doesn't match the .css-xxxxxx-base pattern
    cache.insert('.not-css-selector', {
      name: 'notcssselector',
      styles: 'color:green;',
    });

    expect(warnSpy).not.toHaveBeenCalled();
    warnSpy.mockRestore();
  });
});
