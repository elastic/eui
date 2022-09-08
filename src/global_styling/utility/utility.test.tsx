/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { testCustomHook } from '../../test/internal';
import { useEuiTheme } from '../../services';
import { globalStyles } from './utility';

describe('global utility styles', () => {
  const useTestHook = () => {
    const euiTheme = useEuiTheme();
    return globalStyles(euiTheme);
  };

  it('generates static global styles', () => {
    const rawStyles = (testCustomHook(useTestHook) as any).return.styles;
    // Make Emotion's minification a little less annoying to read
    const globalStyles = rawStyles.replace(/}\.eui-/g, '}\n.eui-');
    expect(globalStyles).toMatchSnapshot();
  });
});
