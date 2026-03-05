/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

/**
 * Ensures a default aria-label is applied when neither aria-label nor
 * aria-labelledby is provided.
 */
export const useAriaLabelAttributes = (
  props: Partial<{
    'aria-label': string;
    'aria-labelledby': string;
  }>,
  defaultAriaLabel: string
) => {
  const hasAriaLabel = Boolean(props['aria-label'] || props['aria-labelledby']);

  if (hasAriaLabel) {
    return props;
  }

  return {
    'aria-label': defaultAriaLabel,
  };
};
