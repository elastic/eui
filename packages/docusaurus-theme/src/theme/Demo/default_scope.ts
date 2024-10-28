/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

/**
 * A custom client-side require() alternative to inform users it's not available
 * in our demo environment
 */
const clientSideRequire = () => {
  throw new Error('require() is not accessible in the interactive demo environment! All EUI and React exports are available in the global scope for you to use without the need to import them.');
}

export const demoDefaultScope = {
  require: clientSideRequire,
};
