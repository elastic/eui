/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { useEuiMemoizedStyles } from '../../services';
import { euiBasicTablePanelStyles } from './panel.styles';

/**
 * @internal
 */
export const EUI_BASIC_TABLE_PANEL_CLASS_NAME = 'euiBasicTablePanel' as const;

/**
 * A utility hook that returns props needed to be passed to element(s) being
 * a part of the paneled table look and feel (e.g., a toolbar above the table).
 * @beta
 */
export const useEuiBasicTablePanelProps = () => {
  const css = useEuiMemoizedStyles(euiBasicTablePanelStyles);

  return {
    css,
    className: EUI_BASIC_TABLE_PANEL_CLASS_NAME,
  };
};
