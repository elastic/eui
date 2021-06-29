/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

export function htmlIdGenerator(idPrefix: string = '') {
  const staticUuid = 'generated-id';
  return (idSuffix: string = '') => {
    const prefix = `${idPrefix}${idPrefix !== '' ? '_' : ''}`;
    const suffix = idSuffix ? `_${idSuffix}` : '';
    return `${prefix}${staticUuid}${suffix}`;
  };
}
