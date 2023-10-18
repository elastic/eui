/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { renderHook } from '@testing-library/react';

import { TITLE_SIZES } from './title';
import { useEuiTitle } from './title.styles';

describe('euiTitle mixin', () => {
  describe('returns a static object of title font properties for each title size', () => {
    TITLE_SIZES.forEach((size) => {
      it(size, () => {
        expect(
          renderHook(() => useEuiTitle(size)).result.current
        ).toMatchSnapshot();
      });
    });
  });
});
