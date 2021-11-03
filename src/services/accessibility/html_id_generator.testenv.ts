/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { UseGeneratedHtmlIdOptions } from './html_id_generator';

export function htmlIdGenerator(idPrefix: string = '') {
  const staticUuid = 'generated-id';
  return (idSuffix: string = '') => {
    const prefix = `${idPrefix}${idPrefix !== '' ? '_' : ''}`;
    const suffix = idSuffix ? `_${idSuffix}` : '';
    return `${prefix}${staticUuid}${suffix}`;
  };
}

export const useGeneratedHtmlId = ({
  prefix,
  suffix,
  conditionalId,
}: UseGeneratedHtmlIdOptions = {}) => {
  // Skip useMemo in test environments - it's not necessary since the uuid is static/mocked
  return conditionalId || htmlIdGenerator(prefix)(suffix);
};
