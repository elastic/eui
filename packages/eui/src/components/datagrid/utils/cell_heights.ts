/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { useEffect, useRef, useState } from 'react';

import { EuiDataGridBodyProps } from '../data_grid_types';

export const useShouldUpdateCellLineHeight = (
  gridStyles: EuiDataGridBodyProps['gridStyles']
) => {
  const _gridStyles = useRef(gridStyles);
  const [shouldUpdateLineHeight, setShouldUpdateLineHeight] = useState(false);

  useEffect(() => {
    if (
      gridStyles &&
      (_gridStyles.current?.fontSize || _gridStyles.current?.cellPadding)
    ) {
      const hasNewFontSize = _gridStyles.current?.fontSize
        ? _gridStyles.current?.fontSize !== gridStyles?.fontSize
        : false;
      const hasNewCellPadding = _gridStyles.current?.cellPadding
        ? _gridStyles.current?.cellPadding !== gridStyles?.cellPadding
        : false;

      setShouldUpdateLineHeight(hasNewFontSize || hasNewCellPadding);

      _gridStyles.current = gridStyles;
    }
  }, [gridStyles]);

  return shouldUpdateLineHeight;
};
