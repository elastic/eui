/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */
import React, { FunctionComponent } from 'react';
import { useEuiTheme } from '../../services';
import { useEuiI18n } from '../i18n';
import { EuiButtonIcon } from '../button';
import { euiCodeFullScreenButtonStyles } from './code_block_full_screen_button.styles';

export const EuiCodeFullScreenButton: FunctionComponent<{
  isFullScreen: boolean;
  toggleFullScreen: () => void;
}> = ({ isFullScreen, toggleFullScreen }) => {
  const euiTheme = useEuiTheme();
  const styles = euiCodeFullScreenButtonStyles(euiTheme);
  const cssStyles = [styles.euiCodeFullScreenButton];

  const [fullscreenCollapse, fullscreenExpand] = useEuiI18n(
    [
      'euiCodeBlockFullScreenButton.fullscreenCollapse',
      'euiCodeBlockFullScreenButton.fullscreenExpand',
    ],
    ['Collapse', 'Expand']
  );

  return (
    <EuiButtonIcon
      className="euiCodeBlock__fullScreenButton"
      css={cssStyles}
      onClick={toggleFullScreen}
      iconType={isFullScreen ? 'fullScreenExit' : 'fullScreen'}
      color="text"
      aria-label={isFullScreen ? fullscreenCollapse : fullscreenExpand}
    />
  );
};
