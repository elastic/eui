/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent, useContext } from 'react';
import classNames from 'classnames';

import { useEuiTheme } from '../../../../services';
import {
  EuiButtonIcon,
  EuiButtonIconPropsForAnchor,
} from '../../../button/button_icon';
import { EuiToolTip } from '../../../tool_tip';

import { EuiCollapsibleNavContext } from '../../context';
import { EuiCollapsibleNavItemProps } from '../collapsible_nav_item';

import {
  euiCollapsedNavButtonStyles,
  euiCollapsedNavItemTooltipStyles,
} from './collapsed_nav_button.styles';

export const EuiCollapsedNavButton: FunctionComponent<
  EuiCollapsibleNavItemProps & {
    hideToolTip?: boolean;
  }
> = ({
  href, // eslint-disable-line local/href-with-rel
  title,
  icon,
  iconProps,
  isSelected,
  onClick,
  hideToolTip,
  linkProps,
  // Extracted to avoid spreading to ...rest
  accordionProps,
  titleElement,
  items,
  ...rest
}) => {
  const euiTheme = useEuiTheme();
  const { side } = useContext(EuiCollapsibleNavContext);

  const buttonStyles = euiCollapsedNavButtonStyles(euiTheme);
  const buttonCssStyles = [
    buttonStyles.euiCollapsedNavButton,
    isSelected && buttonStyles.isSelected,
    linkProps?.css,
  ];
  const buttonClassName = classNames(
    'euiCollapsedNavButton',
    linkProps?.className
  );

  const tooltipStyles = euiCollapsedNavItemTooltipStyles(euiTheme);
  const tooltipCssStyles = [
    tooltipStyles.euiCollapsedNavItemTooltip,
    tooltipStyles[side],
    hideToolTip && tooltipStyles.hidden,
  ];

  return (
    <EuiToolTip
      content={title}
      css={tooltipCssStyles}
      position={side}
      display="block"
      anchorProps={rest}
    >
      <EuiButtonIcon
        data-test-subj="euiCollapsedNavButton"
        size="s"
        color="text"
        href={href}
        onClick={onClick}
        aria-label={title}
        {...(linkProps as EuiButtonIconPropsForAnchor)} // Exclusive union shenanigans
        className={buttonClassName}
        css={buttonCssStyles}
        iconType={icon || 'link'}
        iconSize={iconProps?.size}
        isSelected={isSelected}
      />
    </EuiToolTip>
  );
};
