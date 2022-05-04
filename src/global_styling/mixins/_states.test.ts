/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { testCustomHook } from '../../test/internal';
import { useEuiFocusRing } from './_states';

describe('useEuiFocusRing hook returns a string', () => {
  describe('for each offset:', () => {
    it('inset', () => {
      expect(
        testCustomHook(() => useEuiFocusRing('inset')).return
      ).toMatchSnapshot();
    });

    it('outset', () => {
      expect(
        testCustomHook(() => useEuiFocusRing('outset')).return
      ).toMatchSnapshot();
    });

    it('16px', () => {
      expect(
        testCustomHook(() => useEuiFocusRing('16px')).return
      ).toMatchSnapshot();
    });
  });

  describe('for any color:', () => {
    it('blue', () => {
      expect(
        testCustomHook(() => useEuiFocusRing('outset', 'blue')).return
      ).toMatchSnapshot();
    });
  });
});
