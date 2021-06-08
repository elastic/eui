/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
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
