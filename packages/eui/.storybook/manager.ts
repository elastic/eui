/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { addons, API, types } from '@storybook/manager-api';
import { STORY_PREPARED } from '@storybook/core-events';

import { ADDON_ID, EVENTS, PANEL_ID } from './addons/code-snippet/constants';
import { Panel } from './addons/code-snippet/components/panel';
import { StoryContext } from '@storybook/react';
import {
  updateQueryParamsOnAddonClosed,
  updateQueryParamsOnAddonOpened,
  updateQueryParamsOnStoryPrepared,
} from './addons/code-snippet/event-handlers/query_params';

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
addons.register(ADDON_ID, (api: API) => {
  // set up channel event listeners
  api.on(STORY_PREPARED, (context: StoryContext) => {
    updateQueryParamsOnStoryPrepared(api, context);
  });

  api.on(EVENTS.SNIPPET_PANEL_OPENED, () => {
    updateQueryParamsOnAddonOpened(api);
  });

  api.on(EVENTS.SNIPPET_PANEL_CLOSED, () => {
    updateQueryParamsOnAddonClosed(api);
  });

  // Register a panel
  addons.add(PANEL_ID, {
    type: types.PANEL,
    title: 'Code Snippet',
    match: ({ viewMode }) => viewMode === 'story',
    render: Panel,
  });
});
