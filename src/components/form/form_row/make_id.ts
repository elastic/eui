/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

// Generate statistically almost-certainly-unique `id`s for associating form
// inputs with their labels and other descriptive text elements.
function makeId(): string {
  console.log(
    'WARNING: makeId is deprecated. Use htmlIdGenerator from @elastic/eui instead.'
  );
  return Math.random().toString(36).slice(-8);
}

export default makeId;
