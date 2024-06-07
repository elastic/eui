/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

type LEVELS = 'log' | 'warn' | 'error';
type ProviderCallback = (message: string | Error) => void;

let providerWarning: LEVELS | undefined = undefined;
let providerCallback: ProviderCallback | undefined;

export const setEuiDevProviderWarning = (
  level: LEVELS | undefined,
  cb?: ProviderCallback
) => {
  providerWarning = level;
  providerCallback = cb;
};

export const getEuiDevProviderWarning = () => providerWarning;

// Not a public top-level EUI export, currently for internal use
export const emitEuiProviderWarning = (providerMessage: string) => {
  switch (providerWarning) {
    case 'log':
      console.log(providerMessage);
      providerCallback?.(providerMessage);
      break;
    case 'warn':
      console.warn(providerMessage);
      providerCallback?.(providerMessage);
      break;
    case 'error':
      const providerError = new Error(providerMessage);
      providerCallback?.(providerError);
      throw providerError;
    case undefined:
    default:
      break;
  }
};
