/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { useMemo } from 'react';
import { useComponentDefaults } from '../../provider/component_defaults';

import { EuiTablePaginationProps } from './table_pagination';

/**
 * Table pagination prop defaults live in a separate file because
 * they'll be reused by basic tables and datagrids as fallbacks
 */

export const euiTablePaginationDefaults: Required<
  Pick<
    EuiTablePaginationProps,
    'itemsPerPage' | 'itemsPerPageOptions' | 'showPerPageOptions'
  >
> = {
  itemsPerPage: 10,
  itemsPerPageOptions: [10, 25, 50],
  showPerPageOptions: true,
};

export const useEuiTablePaginationDefaults = () => {
  const consumerDefaults = useComponentDefaults().EuiTablePagination;

  return useMemo(
    () => ({
      ...euiTablePaginationDefaults,
      ...consumerDefaults,
    }),
    [consumerDefaults]
  );
};
