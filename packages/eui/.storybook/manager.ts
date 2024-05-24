/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { addons, types } from '@storybook/manager-api';

import { ADDON_ID, PANEL_ID } from './addons/code-snippet/constants';
import { Panel } from './addons/code-snippet/components/panel';

// filter out stories based on tags that should not
// be shown in the Storybook sidebar menu
addons.setConfig({
  sidebar: {
    filters: {
      patterns: (item) => {
        // Storybook only accepts string literals in the tags
        // handling this centrally via a map doesn't work :(
        return !item.tags?.includes('vrt-only');
      },
    },
  },
});

// Register a addon
addons.register(ADDON_ID, () => {
  // Register a panel
  addons.add(PANEL_ID, {
    type: types.PANEL,
    title: 'Code Snippet',
    match: ({ viewMode }) => viewMode === 'story',
    render: Panel,
  });
});
