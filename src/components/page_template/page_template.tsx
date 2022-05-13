/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { _EuiPageOuter } from './outer';
import { _EuiPageInner } from './inner';
import { _EuiPageSidebar } from './sidebar';
import { EuiPageHeader, EuiPageSection } from '../page';

export const EuiPageT = {
  Outer: _EuiPageOuter,
  Inner: _EuiPageInner,
  Sidebar: _EuiPageSidebar,
  Header: EuiPageHeader,
  Section: EuiPageSection,
};
