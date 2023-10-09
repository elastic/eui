/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { renderHook } from '@testing-library/react';
import { useEuiTheme } from '../../services';
import { globalStyles } from './utility';

describe('global utility styles', () => {
  it('generates static global styles', () => {
    const { result } = renderHook(() => {
      const euiTheme = useEuiTheme();
      return globalStyles(euiTheme);
    });
    // Make Emotion's minification a little less annoying to read
    const styles = result.current.styles.replace(/}\.eui-/g, '}\n.eui-');
    expect(styles).toMatchSnapshot();
  });
});
