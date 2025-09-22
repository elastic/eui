/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

/**
 * Page-related component configurations
 */
export interface _EuiThemePage {
  pageHeader: {
    tabsSize: string;
  };
  // Future page-related configurations can go here:
  // pageSection: { ... };
  // pageTemplate: { ... };
}

export const page: _EuiThemePage = {
  pageHeader: {
    tabsSize: 'm', // Reduced from default 'l'
  },
};
