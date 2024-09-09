/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the "Elastic License
 * 2.0", the "GNU Affero General Public License v3.0 only", and the "Server Side
 * Public License v 1"; you may not use this file except in compliance with, at
 * your election, the "Elastic License 2.0", the "GNU Affero General Public
 * License v3.0 only", or the "Server Side Public License, v 1".
 */

import { StoryContext } from '@storybook/react';
import { API } from '@storybook/manager-api';

import { ADDON_PARAMETER_KEY, PANEL_ID, QUERY_PARAMS } from '../constants';

export const updateQueryParamsOnStoryPrepared = (
  api: API,
  context: StoryContext
) => {
  const selectedPanel = api.getSelectedPanel();
  const isCodeSnippetSkipped =
    context.parameters[ADDON_PARAMETER_KEY]?.skip ?? false;
  const showSnippetEnabled =
    api.getQueryParam(QUERY_PARAMS.SHOW_SNIPPET) === 'true';

  if (showSnippetEnabled && !isCodeSnippetSkipped) {
    if (selectedPanel !== PANEL_ID) {
      _updateSnippetQueryParam(api, 'true');
      api.setSelectedPanel(PANEL_ID);
    }
  } else {
    const resetPanelId =
      selectedPanel !== PANEL_ID ? selectedPanel : 'storybook/controls'; // fallback to intial addon panel

    _updateSnippetQueryParam(api, undefined);
    api.setSelectedPanel(resetPanelId);
  }
};

export const updateQueryParamsOnAddonOpened = (api: API) => {
  const selectedPanel = api.getSelectedPanel();
  const showSnippetEnabled =
    api.getQueryParam(QUERY_PARAMS.SHOW_SNIPPET) === 'true';

  if (selectedPanel === PANEL_ID && !showSnippetEnabled) {
    _updateSnippetQueryParam(api, 'true');
  }
};

export const updateQueryParamsOnAddonClosed = (api: API) => {
  const showSnippetEnabled =
    api.getQueryParam(QUERY_PARAMS.SHOW_SNIPPET) === 'true';

  if (showSnippetEnabled) {
    _updateSnippetQueryParam(api, undefined);
  }
};

/* Helper function to handle updating code snippet storybook query param */
const _updateSnippetQueryParam = (api: API, value: 'true' | undefined) => {
  const params = {
    [QUERY_PARAMS.SHOW_SNIPPET]: value,
  };
  // set internal state
  api.setQueryParams(params);
  // apply state to url
  api.applyQueryParams(params);
};
