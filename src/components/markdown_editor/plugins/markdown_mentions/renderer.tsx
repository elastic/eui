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
import { euiMarkdownMentionsStyles } from './markdown_mentions.styles';
import { useEuiTheme } from '../../../../services';

export const mentionsMarkdownRenderer: FunctionComponent<
  MentionsNodeDetails & {
    position: EuiMarkdownAstNodePosition;
  }
> = ({ config, mention }) => {
  const euiTheme = useEuiTheme();
  const styles = euiMarkdownMentionsStyles(euiTheme);

  const cssRendererStyles = styles.euiMarkdownMentions__renderer;
  const cssRendererTooltipStyles = styles.euiMarkdownMentions__rendererTooltip;
  const cssRendererTooltipAvatarStyles =
    styles.euiMarkdownMentions__rendererTooltipAvatar;
  const cssRendererTooltipMainContentStyles =
    styles.euiMarkdownMentions__rendererTooltipMainContent;
  const cssRendererTooltipUsernameStyles =
    styles.euiMarkdownMentions__rendererTooltipUsername;
  const cssRendererTooltipFullnameStyles =
    styles.euiMarkdownMentions__rendererTooltipFullname;

  const match = config.options.find(({ label }) => label === mention);

  if (!match) {
    return <span>@{mention}</span>;
  }

  const { firstName, lastName } = match.data;
  const { label } = match;

  const content = (
    <div css={cssRendererTooltipStyles}>
      <div css={cssRendererTooltipAvatarStyles}>
        <EuiAvatar name={label} size="m" />
      </div>

      <div css={cssRendererTooltipMainContentStyles}>
        <p css={cssRendererTooltipUsernameStyles}>@{label}</p>
        <p css={cssRendererTooltipFullnameStyles}>
          {firstName} {lastName}
        </p>
      </div>
    </div>
  );
  return (
    <EuiToolTip content={content}>
      <span css={cssRendererStyles}>@{mention}</span>
    </EuiToolTip>
  );
};
