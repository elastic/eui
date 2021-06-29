/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

// We expect all React components to be able to support these props,
// which will be rendered as HTML attributes.
export const requiredProps = {
  'aria-label': 'aria-label',
  className: 'testClass1 testClass2',
  'data-test-subj': 'test subject string',
};
