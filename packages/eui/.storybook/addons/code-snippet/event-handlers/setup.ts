/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the "Elastic License
 * 2.0", the "GNU Affero General Public License v3.0 only", and the "Server Side
 * Public License v 1"; you may not use this file except in compliance with, at
 * your election, the "Elastic License 2.0", the "GNU Affero General Public
 * License v3.0 only", or the "Server Side Public License, v 1".
 */

import { StoryContext } from '@storybook/react';
import type { API } from '@storybook/manager-api';
import { STORY_PREPARED } from '@storybook/core-events';

import { EVENTS } from '../constants';
import {
  updateQueryParamsOnAddonClosed,
  updateQueryParamsOnAddonOpened,
  updateQueryParamsOnStoryPrepared,
} from './query_params';

export const setupCodeSnippetEvents = (api: API) => {
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
};
