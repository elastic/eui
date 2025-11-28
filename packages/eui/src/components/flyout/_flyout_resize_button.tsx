/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { useEuiMemoizedStyles } from '../../services';
import {
  EuiResizableButton,
  EuiResizableButtonProps,
} from '../resizable_container';
import type { _EuiFlyoutType, _EuiFlyoutSide } from './const';
import type { EuiFlyoutComponentProps } from './flyout.component';
import { euiFlyoutResizeButtonStyles } from './_flyout_resize_button.styles';

type EuiFlyoutResizeButtonProps = Pick<
  EuiResizableButtonProps,
  'onMouseDown' | 'onKeyDown' | 'onTouchStart'
> & {
  type: _EuiFlyoutType;
  side: _EuiFlyoutSide;
  ownFocus: EuiFlyoutComponentProps['ownFocus'];
  isPushed: boolean;
};

export const EuiFlyoutResizeButton = ({
  type,
  side,
  ownFocus,
  isPushed,
  ...resizableButtonProps
}: EuiFlyoutResizeButtonProps) => {
  const hasOverlay = ownFocus && type === 'overlay';
  const styles = useEuiMemoizedStyles(euiFlyoutResizeButtonStyles);

  const cssStyles = [
    styles.root,
    styles[type][side],
    !hasOverlay && styles.noOverlay.root,
    !hasOverlay && styles.noOverlay[side],
  ];

  return (
    <EuiResizableButton
      isHorizontal
      indicator="border"
      css={cssStyles}
      {...resizableButtonProps}
    />
  );
};
