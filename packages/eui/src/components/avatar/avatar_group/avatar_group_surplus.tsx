/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent, useMemo } from 'react';
import classNames from 'classnames';

import { useEuiI18n } from '../../i18n';
import { useEuiMemoizedStyles, useEuiTheme } from '../../../services';
import { EuiToolTip } from '../../tool_tip';
import { euiAvatarStyles } from '../avatar.styles';
import type { EuiAvatarSize, EuiAvatarType } from '../avatar';

import { euiAvatarGroupStyles } from './avatar_group.styles';

const MAX_SURPLUS_DISPLAY = 99;

export interface EuiAvatarGroupSurplusProps {
  count: number;
  size: EuiAvatarSize;
  type: EuiAvatarType;
}

export const EuiAvatarGroupSurplus: FunctionComponent<
  EuiAvatarGroupSurplusProps
> = ({ count, size, type }) => {
  const { highContrastMode, euiTheme } = useEuiTheme();
  const avatarStyles = useEuiMemoizedStyles(euiAvatarStyles);
  const groupStyles = useEuiMemoizedStyles(euiAvatarGroupStyles);

  const label = useEuiI18n(
    'euiAvatarGroupSurplus.overflowLabel',
    '{count} more',
    {
      count,
    }
  );
  const displayCount =
    count > MAX_SURPLUS_DISPLAY ? `${MAX_SURPLUS_DISPLAY}+` : `+${count}`;

  const cssStyles = [
    avatarStyles.euiAvatar,
    avatarStyles[type],
    avatarStyles[size],
    avatarStyles.subdued,
    groupStyles.euiAvatarGroup__surplus,
  ];

  const highContrastBorder = useMemo(
    () =>
      highContrastMode === 'forced'
        ? { border: euiTheme.border.thin }
        : undefined,
    [highContrastMode, euiTheme]
  );

  const surplusNode = (
    <div
      className={classNames(
        'euiAvatar',
        `euiAvatar--${size}`,
        `euiAvatar--${type}`,
        'euiAvatarGroup__surplus'
      )}
      css={cssStyles}
      style={highContrastBorder}
      role="img"
      aria-label={label}
      data-test-subj="euiAvatarGroup-surplus"
    >
      <span aria-hidden="true">{displayCount}</span>
    </div>
  );

  // Display-only: the surplus is not a control. `aria-label` covers AT;
  // the tooltip is visual, matching EuiAvatar.
  return (
    <EuiToolTip
      content={label}
      anchorProps={{ css: avatarStyles.tooltip[type] }}
      disableScreenReaderOutput
    >
      {surplusNode}
    </EuiToolTip>
  );
};
