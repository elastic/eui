/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { useState, useMemo } from 'react';

import { useMutationObserver } from '../../../observer/mutation_observer';
import { useResizeObserver } from '../../../observer/resize_observer';

import { useHeaderFocusWorkaround } from '../../utils/focus';
import { EuiDataGridHeaderRowProps } from '../../data_grid_types';
import { EuiDataGridHeaderRow } from './data_grid_header_row';

type Props = EuiDataGridHeaderRowProps & {
  handleHeaderMutation: MutationCallback;
};

/**
 * DRY out setting up the grid header and its refs & observers
 */
export const useDataGridHeader = ({
  handleHeaderMutation,
  ...props
}: Props) => {
  const [headerRowRef, setHeaderRowRef] = useState<HTMLDivElement | null>(null);
  useMutationObserver(headerRowRef, handleHeaderMutation, {
    subtree: true,
    childList: true,
  });
  const { height: headerRowHeight } = useResizeObserver(headerRowRef, 'height');

  const headerRow = useMemo(() => {
    return <EuiDataGridHeaderRow ref={setHeaderRowRef} {...props} />;
  }, Object.values(props)); // eslint-disable-line react-hooks/exhaustive-deps

  useHeaderFocusWorkaround(props.headerIsInteractive);

  return { headerRow, headerRowHeight };
};
