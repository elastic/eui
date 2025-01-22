/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { _EuiVisColorStore, EuiVisColorStore } from '@elastic/eui-theme-common';
import { colorVis } from '@elastic/eui-theme-borealis';

// initialsetup of Vis color storage with default colors
export const EUI_VIS_COLOR_STORE: _EuiVisColorStore =
  EuiVisColorStore.getInstance(colorVis, true);
