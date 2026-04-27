/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import {
  type Screen,
  type Queries,
  type queries as originalQueries,
  within,
} from '@testing-library/react';

export const withQueries = <TQueries extends Queries>(
  screen: Screen,
  queries: TQueries
): Screen<typeof originalQueries & TQueries> => ({
  ...screen,
  ...within<TQueries>(document.body, queries),
});
