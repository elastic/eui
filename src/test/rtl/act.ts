/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import type { act as actType } from '@testing-library/react-hooks';

/* eslint-disable @typescript-eslint/no-var-requires */

let act: typeof actType;
if (process.env.REACT_VERSION === '18') {
  act = require('@testing-library/react').act;
} else {
  act = require('@testing-library/react-hooks').act;
}

/* eslint-enable @typescript-eslint/no-var-requires */

export { act };
