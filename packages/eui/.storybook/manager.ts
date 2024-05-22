/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { addons } from '@storybook/manager-api';

import { STORY_TAGS } from './constants';

// filter out stories based on tags that should not
// be shown in the Storybook sidebar menu
addons.setConfig({
  sidebar: {
    filters: {
      patterns: (item) => {
        return !item.tags?.includes(STORY_TAGS.VRT_ONLY);
      },
    },
  },
});
