/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { useEuiTheme } from '../../services';
import { renderHook } from '../../test/rtl';

import { TEXT_SIZES } from '../text/text';
import { COLORS } from '../text/text_color';
import { euiMarkdownFormatStyles } from './markdown_format.styles';

const output = renderHook(() => euiMarkdownFormatStyles(useEuiTheme())).result
  .current;

describe('euiMarkdownFormat text sizes', () => {
  TEXT_SIZES.forEach((size) => {
    test(size, () => {
      expect(output[size].styles).toMatchSnapshot();
    });
  });
});

describe('euiMarkdownFormat text colors', () => {
  const colors = [...COLORS, 'custom'] as const;

  colors.forEach((color) => {
    test(`${color}`, () => {
      expect(output.colors[color].styles).toMatchSnapshot();
    });
  });
});
