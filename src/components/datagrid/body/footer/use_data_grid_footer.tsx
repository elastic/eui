/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { useState, useMemo } from 'react';

import { useResizeObserver } from '../../../observer/resize_observer';

import { EuiDataGridFooterRowProps } from '../../data_grid_types';
import { EuiDataGridFooterRow } from './data_grid_footer_row';

type Props = Omit<EuiDataGridFooterRowProps, 'renderCellValue'> & {
  renderFooterCellValue?: EuiDataGridFooterRowProps['renderCellValue'];
};

/**
 * DRY out setting up the grid footer and its refs & observers
 */
export const useDataGridFooter = (props: Props) => {
  const [footerRowRef, setFooterRowRef] = useState<HTMLDivElement | null>(null);
  const { height: footerRowHeight } = useResizeObserver(footerRowRef, 'height');

  const footerRow = useMemo(() => {
    const { renderFooterCellValue, ...footerProps } = props;
    if (renderFooterCellValue == null) return null;

    return (
      <EuiDataGridFooterRow
        ref={setFooterRowRef}
        renderCellValue={renderFooterCellValue}
        {...footerProps}
      />
    );
  }, Object.values(props)); // eslint-disable-line react-hooks/exhaustive-deps

  return { footerRow, footerRowHeight };
};
