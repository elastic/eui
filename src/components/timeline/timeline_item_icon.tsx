/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent, ReactNode } from 'react';
import { IconType } from '../icon';
import { EuiAvatar } from '../avatar';
import { useEuiTheme } from '../../services';
import { euiTimelineItemIconStyles } from './timeline_item_icon.styles';
import { EuiTimelineItemVerticalAlign } from './timeline_item';

export interface EuiTimelineItemIconProps {
  /**
   * Any `ReactNode`, but preferably `EuiAvatar`, or a `string` as an `EuiIcon['type']`.
   */
  icon: ReactNode | IconType;
  verticalAlign?: EuiTimelineItemVerticalAlign;
}

export const EuiTimelineItemIcon: FunctionComponent<EuiTimelineItemIconProps> = ({
  icon,
  verticalAlign = 'top',
}) => {
  const euiTheme = useEuiTheme();
  const styles = euiTimelineItemIconStyles(euiTheme);

  const cssStyles = [styles.euiTimelineItemIcon, styles[verticalAlign]];

  const cssContentStyles = styles.euiTimelineItemIcon__content;

  const iconRender =
    typeof icon === 'string' ? (
      <EuiAvatar color="subdued" name={icon} iconType={icon} />
    ) : (
      icon
    );

  return (
    <div css={cssStyles}>
      <div css={cssContentStyles}>{iconRender}</div>
    </div>
  );
};
