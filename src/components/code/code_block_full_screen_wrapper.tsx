/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */
import React, { FunctionComponent } from 'react';
import { EuiFocusTrap } from '../focus_trap';
import { EuiOverlayMask } from '../overlay_mask';
import { useEuiTheme } from '../../services';
import { euiCodeBlockFullScreenWrapperStyles } from './code_block_full_screen_wrapper.styles';

export const EuiCodeBlockFullScreenWrapper: FunctionComponent = ({
  children,
}) => {
  // Force fullscreen to use large font and padding.
  // const fullScreenClasses = classNames(
  //   className,
  //   'euiCodeBlock--fontLarge',
  //   'euiCodeBlock--paddingLarge',
  //   'euiCodeBlock-isFullScreen'
  // );
  const euiTheme = useEuiTheme();
  const styles = euiCodeBlockFullScreenWrapperStyles(euiTheme);
  const fullScreenCssStyles = [styles.euiCodeBlockFullScreenWrapper];

  return (
    <EuiOverlayMask>
      <EuiFocusTrap clickOutsideDisables={true}>
        <div
          className="euiCodeBlockFullScreenWrapper"
          css={fullScreenCssStyles}
        >
          {children}
        </div>
      </EuiFocusTrap>
    </EuiOverlayMask>
  );
};
