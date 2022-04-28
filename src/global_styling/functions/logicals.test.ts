/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { testCustomHook } from '../../test/internal';
import {
  LOGICAL_PROPERTIES,
  logicalCSS,
  logicalStyle,
  logicalTextAlign,
} from '../functions/logicals';

describe('logicalCSS mixin returns a string property', () => {
  describe('for each directional property:', () => {
    LOGICAL_PROPERTIES.forEach((prop) => {
      it(prop, () => {
        expect(
          testCustomHook(() => logicalCSS(prop, '8px')).return
        ).toMatchSnapshot();
      });
    });
  });
});

describe('logicalStyle mixin returns an object property', () => {
  describe('for each directional property:', () => {
    LOGICAL_PROPERTIES.forEach((prop) => {
      it(prop, () => {
        expect(
          testCustomHook(() => logicalStyle(prop, '8px')).return
        ).toMatchSnapshot();
      });
    });
  });
});

describe('logicalTextAlign mixin returns an string property', () => {
  describe('for each text align value:', () => {
    it('left', () => {
      expect(
        testCustomHook(() => logicalTextAlign('left')).return
      ).toMatchSnapshot();
    });

    it('right', () => {
      expect(
        testCustomHook(() => logicalTextAlign('right')).return
      ).toMatchSnapshot();
    });
  });
});
