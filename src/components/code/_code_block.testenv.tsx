/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
export const EuiCodeBlockImpl = ({
  children,
  inline,
  'data-test-subj': dataTestSubj,
}: any) => {
  const snippet = <code data-test-subj={dataTestSubj}>{children}</code>;
  return inline ? (
    <span>{snippet}</span>
  ) : (
    <div>
      <pre>{snippet}</pre>
    </div>
  );
};

export const FONT_SIZES: Array<'s' | 'm' | 'l'> = ['s', 'm', 'l'];
export const PADDING_SIZES: Array<'s' | 'm' | 'l' | 'none'> = [
  'none',
  's',
  'm',
  'l',
];
