/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

const log: { [id: string]: boolean } = {};

export const warnOnce = (id: string, message: string) => {
  if (!log[id] && console && console.warn) {
    log[id] = true;
    console.warn(message);
  }
};
