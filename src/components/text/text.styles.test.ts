/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { renderHook } from '@testing-library/react';
import { useEuiTheme } from '../../services';

import { TEXT_SIZES } from './text';
import { euiTextStyles } from './text.styles';

describe('euiTextStyles sizes', () => {
  TEXT_SIZES.forEach((size) => {
    test(size, () => {
      const emotionReturn = renderHook(() => euiTextStyles(useEuiTheme()))
        .result.current;
      expect(emotionReturn[size].styles).toMatchSnapshot();
    });
  });
});
