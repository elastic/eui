/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { renderHook } from '../../test/rtl';
import { useEuiFocusRing } from './_states';

describe('useEuiFocusRing hook returns a string', () => {
  describe('for each offset:', () => {
    it('inset', () => {
      expect(
        renderHook(() => useEuiFocusRing('inset')).result.current
      ).toMatchSnapshot();
    });

    it('outset', () => {
      expect(
        renderHook(() => useEuiFocusRing('outset')).result.current
      ).toMatchSnapshot();
    });

    it('center', () => {
      expect(
        renderHook(() => useEuiFocusRing('center')).result.current
      ).toMatchSnapshot();
    });

    it('16px', () => {
      expect(
        renderHook(() => useEuiFocusRing('16px')).result.current
      ).toMatchSnapshot();
    });
  });

  describe('for any color:', () => {
    it('blue', () => {
      expect(
        renderHook(() => useEuiFocusRing('outset', 'blue')).result.current
      ).toMatchSnapshot();
    });
  });
});
