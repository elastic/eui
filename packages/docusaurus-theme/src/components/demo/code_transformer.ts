/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

const IMPORT_REGEX = /^import [^'"]* from ['"]([^.'"\n ][^'"\n ]*)['"];?/gm;
const DEFAULT_EXPORT_REGEX = /export default /;
const COMPONENT_ONLY_REGEX = /^\(?</;

/**
 * Transforms input JS/TS source code to a react-live compatible syntax.
 * react-live uses the surcase library to transform input source code into
 * browser-readable JavaScript.
 *
 * While surcase does support CommonJS and ESM import/export statements,
 * it's not trivial to expose our internal React and EUI exports through it
 * and because we already control the execution scope of the interactive demos
 * it isn't really necessary to implement a smart `require()` replacement.
 *
 * Returning an IIFE is necessary when the source code is more than just
 * a JSX component definition (e.g. it contains a variable definition
 * or `export default` statement).
 *
 * @see https://github.com/alangpierce/sucrase
 * @see https://github.com/FormidableLabs/react-live/blob/master/packages/react-live/src/utils/transpile/index.ts
 */
export const demoCodeTransformer = (code: string) => {
  // Remove ESM imports
  code = code.replace(IMPORT_REGEX, '');

  // Handle ESM default exports
  code = code.replace(DEFAULT_EXPORT_REGEX, 'return ');

  // If the demo is JSX only return as-is
  if (COMPONENT_ONLY_REGEX.test(code)) {
    return code;
  }

  // If the demo is more than just JSX wrap in an immediately invoked function expression
  return `(() => { ${code} })()`;
}
