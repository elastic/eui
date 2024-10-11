/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { FunctionComponent, ReactElement } from 'react';
import { EuiThemeColorModeStandard } from '../../../services';

import { useWindowMediaMatcher } from './match_media_hook';

export const COLOR_MODE_MEDIA_QUERY = '(prefers-color-scheme: dark)';

export const EuiSystemDefaultsProvider: FunctionComponent<{
  children: (
    systemColorMode: EuiThemeColorModeStandard,
    systemHighContrastMode: boolean
  ) => ReactElement;
}> = ({ children }) => {
  // @see https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme
  const colorMode = useWindowMediaMatcher('(prefers-color-scheme: dark)')
    ? 'DARK'
    : 'LIGHT';

  // This is a little more spicy. We don't need to get granular with *our* high contrast
  // mode(?), so we should match multiple contrast modes. @see:
  // - https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-contrast
  // - https://developer.mozilla.org/en-US/docs/Web/CSS/@media/forced-colors
  // - https://kilianvalkhof.com/2023/css-html/i-no-longer-understand-prefers-contrast/
  const highContrastMode = useWindowMediaMatcher(
    '(prefers-contrast: more), (prefers-contrast: custom), (forced-colors: active)'
  );

  return children(colorMode, highContrastMode);
};
