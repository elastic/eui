/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';

import { useEuiMemoizedStyles } from '../../../services';
import { EuiFlexItem } from '../../flex';
import { euiFlyoutMenuStyles } from './flyout_menu.styles';

/**
 * Spacer that gives trailing actions room around the absolutely-positioned
 * close button. When `showDivider` is true, it doubles as the visual divider
 * between trailing actions and the close button.
 */
export const CloseButtonSpacer: React.FC<{ showDivider: boolean }> = ({
  showDivider,
}) => {
  const styles = useEuiMemoizedStyles(euiFlyoutMenuStyles);

  return (
    <EuiFlexItem
      grow={false}
      css={[
        styles.euiFlyoutMenu__spacer,
        showDivider && styles.euiFlyoutMenu__divider,
      ]}
      className={showDivider ? 'euiFlyoutMenu__divider' : undefined}
      aria-hidden={showDivider ? 'true' : undefined}
    />
  );
};
