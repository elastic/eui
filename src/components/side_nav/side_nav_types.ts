/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { ReactNode } from 'react';

import {
  RenderItem,
  _EuiSideNavItemButtonProps,
  _EuiSideNavItemProps,
} from './side_nav_item';

export interface EuiSideNavItemType<T>
  extends Omit<_EuiSideNavItemButtonProps, 'children'>,
    Omit<
      _EuiSideNavItemProps,
      'isParent' | 'depth' | 'isOpen' | 'childrenOnly'
    > {
  /**
   * A value that is passed to React as the `key` for this item
   */
  id: string | number;
  /**
   * If set to true it will force the item to display in an "open" state at all times.
   */
  forceOpen?: boolean;
  /**
   * Array containing additional item objects, representing nested children of this navigation item.
   */
  items?: Array<EuiSideNavItemType<T>>;
  /**
   * React node representing the text to render for this item (usually a string will suffice).
   */
  name: ReactNode;
  /**
   * Function overriding default rendering for this navigation item — when called, it should return a React node representing a replacement navigation item.
   */
  renderItem?: RenderItem<T>;
}
