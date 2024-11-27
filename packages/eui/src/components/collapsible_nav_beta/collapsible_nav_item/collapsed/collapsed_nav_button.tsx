/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent, useContext } from 'react';
import classNames from 'classnames';

import { useEuiMemoizedStyles } from '../../../../services';
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
import { useEuiI18n } from '../../../i18n';

export const EuiCollapsedNavButton: FunctionComponent<
  Omit<
    EuiCollapsibleNavItemProps,
    'items' | 'isCollapsible' | 'accordionProps'
  > & {
    hideToolTip?: boolean; // Used by EuiCollapsedNavPopover to prevent tooltip/popover overlap
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
  titleElement, // Extracted to avoid spreading to ...rest
  ...rest
}) => {
  const { side } = useContext(EuiCollapsibleNavContext);

  const buttonStyles = useEuiMemoizedStyles(euiCollapsedNavButtonStyles);
  const buttonCssStyles = [
    buttonStyles.euiCollapsedNavButton,
    isSelected && buttonStyles.isSelected,
    linkProps?.css,
  ];
  const buttonClassName = classNames(
    'euiCollapsedNavButton',
    linkProps?.className
  );

  const tooltipStyles = useEuiMemoizedStyles(euiCollapsedNavItemTooltipStyles);
  const tooltipCssStyles = [
    tooltipStyles.euiCollapsedNavItemTooltip,
    tooltipStyles[side],
    hideToolTip && tooltipStyles.hidden,
  ];

  const buttonIconAriaLabel = useEuiI18n(
    'euiCollapsedNavButton.ariaLabelButtonIcon',
    '{title}, quick navigation menu',
    { title }
  );

  return (
    <EuiToolTip
      content={title}
      css={tooltipCssStyles}
      position={side}
      display="block"
      anchorProps={rest}
      repositionOnScroll={true}
    >
      <EuiButtonIcon
        data-test-subj="euiCollapsedNavButton"
        size="s"
        color="text"
        href={href}
        onClick={onClick}
        aria-label={buttonIconAriaLabel}
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
