/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import * as EUI from '@elastic/eui';
import * as EmotionReact from '@emotion/react';
import moment from 'moment'
import { faker } from '@faker-js/faker';
import { DisplayToggles } from '@site/src/components';

export const demoDefaultScope: Record<string, unknown> = {
  // EUI exports
  ...EUI,

  // Emotion
  ...EmotionReact,

  // Helper libraries
  moment,
  faker,

  // Utilities
  DisplayToggles,
}
