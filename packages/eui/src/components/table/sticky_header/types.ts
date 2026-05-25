/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { ReactNode } from 'react';
import type { EuiTableHeaderCellProps } from '../table_header_cell';

/**
 * Registration data for a single header cell to be duplicated in the sticky header
 */
export interface HeaderCellRegistration {
  /**
   * Unique identifier for this header cell
   */
  id: string;
  /**
   * Order/position of this cell in the header row
   */
  order: number;
  /**
   * All props needed to reconstruct the header cell.
   * Includes children (which can be ReactNode for dynamic components like FormattedMessage)
   */
  props: Omit<EuiTableHeaderCellProps, 'key' | 'ref'>;
  /**
   * Children content - supports dynamic React components
   */
  children?: ReactNode;
}

/**
 * Registry API for header cells to register/deregister themselves
 */
export interface HeaderCellRegistry {
  /**
   * Ordered list of registered header cells
   */
  headerCells: HeaderCellRegistration[];
  /**
   * Register a header cell
   */
  register: (id: string, order: number, props: Omit<EuiTableHeaderCellProps, 'key' | 'ref'>, children?: ReactNode) => void;
  /**
   * Deregister a header cell
   */
  deregister: (id: string) => void;
}
