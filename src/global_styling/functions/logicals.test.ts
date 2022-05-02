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
  LOGICAL_TEXT_ALIGNMENT,
  logicalStyle,
  logicalTextAlign,
} from '../functions/logicals';

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

describe('logicalTextAlign mixin returns a string property', () => {
  describe('for each text align value:', () => {
    LOGICAL_TEXT_ALIGNMENT.forEach((align) => {
      it(align, () => {
        expect(
          testCustomHook(() => logicalTextAlign(align)).return
        ).toMatchSnapshot();
      });
    });
  });
});
