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

export const MenuDivider: React.FC = () => {
  const styles = useEuiMemoizedStyles(euiFlyoutMenuStyles);

  return (
    <EuiFlexItem
      grow={false}
      css={styles.euiFlyoutMenu__divider}
      aria-hidden="true"
      className="euiFlyoutMenu__divider"
    />
  );
};
