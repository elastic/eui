/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
export const EuiCodeBlock = ({
  children,
  'data-test-subj': dataTestSubj,
  language,
}: any) => {
  return (
    <div>
      <pre>
        <code data-test-subj={dataTestSubj} data-code-language={language}>
          {children}
        </code>
      </pre>
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
