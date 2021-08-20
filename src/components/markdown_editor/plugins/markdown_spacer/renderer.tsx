/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent } from 'react';
import { EuiSpacer, EuiSpacerProps } from '../../../spacer';
import { EuiMarkdownAstNodePosition } from '../../markdown_types';

export const SpacerMarkdownRenderer: FunctionComponent<
  EuiSpacerProps & {
    position: EuiMarkdownAstNodePosition;
  }
> = ({ size = 'l' }) => {
  return <EuiSpacer size={size} />;
};
