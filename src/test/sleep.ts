/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

// async timeout function for awaiting state or DOM updates
export function sleep(ms: number = 50) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
