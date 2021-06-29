/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import React from 'react';

export const EuiFocusTrap = ({
  children,
  'data-test-subj': dataTestSubj,
}: any) => {
  return (
    <div data-eui="EuiFocusTrap" data-test-subj={dataTestSubj}>
      {children}
    </div>
  );
};
