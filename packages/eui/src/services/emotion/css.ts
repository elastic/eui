/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import createEmotion from '@emotion/css/create-instance';

import { euiStylisPrefixer } from './prefixer';

/**
 * This custom instance is needed for internal EUI components to call
 * `@emotion/css` with EUI's custom prefixer plugin
 * @see https://emotion.sh/docs/@emotion/css#custom-instances
 *
 * NOTE: Usage is currently being beta tested internally,
 * and is not yet intended to be a public export
 */
export const { css, cx, cache } = createEmotion({
  key: 'css',
  stylisPlugins: [euiStylisPrefixer],
  speedy: false,
});
