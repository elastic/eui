/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';

// Using a variable name instead of inline causes Emotion to use `euiTestCss`
// instead of the component name, which is easier to find in snapshots
const euiTestCss = css`
  color: red;
`;

// We expect all React components to be able to support these props,
// which will be rendered as HTML attributes.
export const requiredProps = {
  'aria-label': 'aria-label',
  className: 'testClass1 testClass2',
  'data-test-subj': 'test subject string',
  css: euiTestCss,
};
