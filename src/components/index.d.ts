/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

declare module '@elastic/eui' {
  // @ts-ignore path only exists at build time
  export * from '@elastic/eui/src/components/common'; // eslint-disable-line import/no-unresolved
  // @ts-ignore path only exists at build time
  export * from '@elastic/eui/src/components/date_picker/react-datepicker'; // eslint-disable-line import/no-unresolved
}
