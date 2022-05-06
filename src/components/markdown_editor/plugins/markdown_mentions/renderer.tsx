/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent } from 'react';
import { EuiMarkdownAstNodePosition } from '../../markdown_types';
import { MentionsNodeDetails } from './types';
import { EuiToolTip } from '../../../tool_tip';

export const mentionsMarkdownRenderer: FunctionComponent<
  MentionsNodeDetails & {
    position: EuiMarkdownAstNodePosition;
  }
> = ({ config, mention }) => {
  const match = config.options.find(({ label }) => label === mention);
  return (
    <EuiToolTip content={match?.data?.first}>
      <span>@{mention}</span>
    </EuiToolTip>
  );
};
