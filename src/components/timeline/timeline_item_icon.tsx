/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent, isValidElement, ReactNode } from 'react';
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
  /**
   * Specify an `aria-label` for the icon when passed as an `IconType`.
   * If no `aria-label` is passed we assume the icon is purely decorative.
   */
  iconAriaLabel?: string;
}

export const EuiTimelineItemIcon: FunctionComponent<
  EuiTimelineItemIconProps
> = ({ icon, verticalAlign = 'center', iconAriaLabel }) => {
  const euiTheme = useEuiTheme();
  const styles = euiTimelineItemIconStyles(euiTheme);

  const cssStyles = [styles.euiTimelineItemIcon, styles[verticalAlign]];
  const cssContentStyles = styles.euiTimelineItemIcon__content;

  const ariaLabel = iconAriaLabel ? iconAriaLabel : '';

  const iconRender = isValidElement(icon) ? (
    icon
  ) : (
    <EuiAvatar color="subdued" name={ariaLabel} iconType={icon as IconType} />
  );

  return (
    <div css={cssStyles}>
      <div css={cssContentStyles}>{iconRender}</div>
    </div>
  );
};
