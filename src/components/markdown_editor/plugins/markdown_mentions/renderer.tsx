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
import { EuiToolTip, EuiAvatar } from '../../../../components';

export const mentionsMarkdownRenderer: FunctionComponent<
  MentionsNodeDetails & {
    position: EuiMarkdownAstNodePosition;
  }
> = ({ config, mention }) => {
  const match = config.options.find(({ label }) => label === mention);

  const { firstName, lastName } = match?.data;
  const { label } = match;

  const content = (
    <div className="euiMarkdownMentions__rendererTooltip">
      <div className="euiMarkdownMentions__rendererTooltipMain">
        <EuiAvatar name={label} size="s" /> {label}
      </div>

      <div className="euiMarkdownMentions__rendererTooltipSecondary">
        {firstName} {lastName}
      </div>
    </div>
  );
  return (
    <EuiToolTip content={content}>
      <span className="euiMarkdownMentions__renderer">@{mention}</span>
    </EuiToolTip>
  );
};
