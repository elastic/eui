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

// import { computed } from '../../services/theme/utils';

// Z-Index

// Remember that z-index is relative to parent and based on the stacking context.
// z-indexes only compete against other z-indexes when they exist as children of
// that shared parent.

// That means a popover with a settings of 2, will still show above a modal
// with a setting of 100, if it is within that modal and not besides it.

// Generally that means it's a good idea to consider things added to this file
// as competitive only as siblings.

// https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Positioning/Understanding_z_index/The_stacking_context

export interface EuiThemeZIndex {
  level0: number;
  level1: number;
  level2: number;
  level3: number;
  level4: number;
  level5: number;
  level6: number;
  level7: number;
  level8: number;
  level9: number;
}

export const zIndex: EuiThemeZIndex = {
  level0: 0,
  level1: 1000,
  level2: 2000,
  level3: 3000,
  level4: 4000,
  level5: 5000,
  level6: 6000,
  level7: 7000,
  level8: 8000,
  level9: 9000,

  // --> These should be declared at the component level
  // content: computed(({ zIndex }) => zIndex.level0),
  // header: computed(({ zIndex }) => zIndex.level1),
  // contentMenu: computed(({ zIndex }) => zIndex.level2),
  // flyout: computed(({ zIndex }) => zIndex.level3),
  // navigation: computed(({ zIndex }) => zIndex.level4),
  // mask: computed(({ zIndex }) => zIndex.level6),
  // modal: computed(({ zIndex }) => zIndex.level8),
  // toastList: computed(({ zIndex }) => zIndex.level9),
};
