/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { Global, css } from '@emotion/react';

import { euiScreenReaderOnly } from '../../components/accessibility/screen_reader_only/screen_reader_only.styles';

const globalStyles = css`
  .euiScreenReaderOnly {
    ${euiScreenReaderOnly()}
  }
`;
export const EuiUtilityClasses = () => <Global styles={globalStyles} />;
