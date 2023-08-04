/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { forwardRef, useContext } from 'react';

import { useEuiTheme } from '../../../services';
import { CommonProps } from '../../common';
import { EuiButtonIcon, EuiButtonIconPropsForButton } from '../../button';
import { useEuiI18n } from '../../i18n';

import { EuiCollapsibleNavContext } from '../context';
import { euiCollapsibleNavButtonWrapperStyles } from './collapsible_nav_button.styles';
import classNames from 'classnames';

export type EuiCollapsibleNavButtonProps = CommonProps &
  Partial<EuiButtonIconPropsForButton>;

export const EuiCollapsibleNavButton = forwardRef<
  HTMLDivElement,
  EuiCollapsibleNavButtonProps
>(({ className, css, ...rest }, ref) => {
  const { side, isPush, isCollapsed } = useContext(EuiCollapsibleNavContext);

  const euiTheme = useEuiTheme();
  const styles = euiCollapsibleNavButtonWrapperStyles(euiTheme);
  const cssStyles = [styles.euiCollapsibleNavButtonWrapper, styles[side]];

  const buttonStyles = [styles.euiCollapsibleNavButton, css];
  const classes = classNames('euiCollapsibleNavButton', className);

  let iconType: string;
  if (isPush) {
    if (side === 'left') {
      iconType = isCollapsed ? 'menuRight' : 'menuLeft';
    } else {
      iconType = isCollapsed ? 'menuLeft' : 'menuRight';
    }
  } else {
    iconType = isCollapsed ? 'menu' : 'cross';
  }

  const toggleOpenLabel = useEuiI18n(
    'euiCollapsibleNavButton.ariaLabelOpen',
    'Toggle navigation open'
  );
  const toggleCloselLabel = useEuiI18n(
    'euiCollapsibleNavButton.ariaLabelClose',
    'Toggle navigation closed'
  );
  const ariaLabel = isCollapsed ? toggleOpenLabel : toggleCloselLabel;

  return (
    <div className="euiCollapsibleNavButtonWrapper" css={cssStyles} ref={ref}>
      <EuiButtonIcon
        data-test-subj="euiCollapsibleNavButton"
        className={classes}
        css={buttonStyles}
        size="s"
        color="text"
        iconType={iconType}
        aria-label={ariaLabel}
        aria-pressed={!isCollapsed}
        aria-expanded={!isCollapsed}
        {...rest}
      />
    </div>
  );
});

EuiCollapsibleNavButton.displayName = 'EuiCollapsibleNavButton';
