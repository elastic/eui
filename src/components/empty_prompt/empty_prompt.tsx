/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent, ReactElement, ReactNode } from 'react';
import classNames from 'classnames';

import { useEuiTheme } from '../../services';
import { CommonProps, keysOf } from '../common';
import { EuiTitle, EuiTitleSize } from '../title';
import { EuiFlexGroup, EuiFlexItem } from '../flex';
import { EuiSpacer } from '../spacer';
import { EuiIcon, IconColor, IconType } from '../icon';
import { isNamedColor } from '../icon/named_colors';
import { EuiText } from '../text';
import { EuiPanel, _EuiPanelDivlike } from '../panel/panel';

import { euiEmptyPromptStyles } from './empty_prompt.styles';

const paddingSizeToClassNameMap = {
  none: null,
  s: 'euiEmptyPrompt--paddingSmall',
  m: 'euiEmptyPrompt--paddingMedium',
  l: 'euiEmptyPrompt--paddingLarge',
};

export const PADDING_SIZES = keysOf(paddingSizeToClassNameMap);

export type PaddingSize = (typeof PADDING_SIZES)[number];

export type EuiEmptyPromptProps = CommonProps &
  Omit<
    _EuiPanelDivlike,
    'borderRadius' | 'grow' | 'panelRef' | 'paddingSize' | 'title' | 'element'
  > & {
    /*
     * Accepts any [EuiIcon.type](#/display/icons)
     */
    iconType?: IconType;
    /**
     * Color for `iconType` when passed as an `IconType`
     */
    iconColor?: IconColor;
    /**
     * Custom icon replacing the one generated by `iconType`
     */
    icon?: ReactNode;
    /**
     * Requires passing a single element that gets wrapped in an EuiTitle.
     * Recommendation is a heading, preferrably an `<h2>` if in its own section
     */
    title?: ReactElement<any>;
    /**
     * Choose from one of the `EuiTitle.size` options
     */
    titleSize?: EuiTitleSize;
    /**
     * Gets wrapped in a subdued EuiText block.
     * Recommendation is to pass typical text elements like `<p>`
     */
    body?: ReactNode;
    /**
     * Pass a single or an array of actions (buttons) that get stacked at the bottom.
     * Recommendation is to pass the primary action first and secondary actions as empty buttons
     */
    actions?: ReactNode;
    /**
     * Optionally provide a footer. Accepts any combination of elements.
     */
    footer?: ReactNode;
    /**
     * Sets the layout. When `horizontal` the icon goes to the right column.
     */
    layout?: 'vertical' | 'horizontal';

    /**
     * Padding applied around the content and footer.
     */
    paddingSize?: PaddingSize;
  };

export const EuiEmptyPrompt: FunctionComponent<EuiEmptyPromptProps> = ({
  icon,
  iconType,
  iconColor: _iconColor,
  title,
  titleSize = 'm',
  paddingSize = 'l',
  body,
  actions,
  className,
  layout = 'vertical',
  hasBorder,
  color = 'transparent',
  footer,
  ...rest
}) => {
  const euiTheme = useEuiTheme();
  const styles = euiEmptyPromptStyles(euiTheme);
  const cssStyles = [styles.euiEmptyPrompt, styles[layout]];

  const isVerticalLayout = layout === 'vertical';
  // Default the iconColor to `subdued`,
  // otherwise try to match the iconColor with the panel color unless iconColor is specified
  const iconColor = _iconColor ?? (isNamedColor(color) ? color : 'subdued');

  const iconNode = iconType ? (
    <EuiIcon type={iconType} size="xxl" color={iconColor} />
  ) : (
    icon
  );

  let titleNode;
  let bodyNode;
  if (body || title) {
    if (title) {
      titleNode = <EuiTitle size={titleSize}>{title}</EuiTitle>;
    }

    if (body) {
      bodyNode = (
        <>
          {title && <EuiSpacer size="m" />}
          <EuiText color="subdued">{body}</EuiText>
        </>
      );
    }
  }

  let actionsNode;
  if (actions) {
    let actionsRow;

    if (Array.isArray(actions)) {
      actionsRow = (
        <EuiFlexGroup
          className="euiEmptyPrompt__actions"
          gutterSize="m"
          alignItems="center"
          justifyContent="center"
          direction={isVerticalLayout ? 'column' : 'row'}
        >
          {actions.map((action, index) => (
            <EuiFlexItem key={index} grow={false}>
              {action}
            </EuiFlexItem>
          ))}
        </EuiFlexGroup>
      );
    } else {
      actionsRow = actions;
    }

    actionsNode = (
      <>
        <EuiSpacer size="l" />
        {actionsRow}
      </>
    );
  }

  const contentNodes = (
    <>
      {titleNode}
      {bodyNode}
      {actionsNode}
    </>
  );

  const classes = classNames(
    'euiEmptyPrompt',
    [`euiEmptyPrompt--${layout}`],
    paddingSizeToClassNameMap[paddingSize],
    className
  );

  return (
    <EuiPanel
      css={cssStyles}
      className={classes}
      color={color}
      paddingSize="none"
      grow={false}
      hasBorder={hasBorder}
      {...rest}
    >
      <div className="euiEmptyPrompt__main">
        {iconNode && <div className="euiEmptyPrompt__icon">{iconNode}</div>}
        <div className="euiEmptyPrompt__content">
          <div className="euiEmptyPrompt__contentInner">{contentNodes}</div>
        </div>
      </div>
      {footer && <div className="euiEmptyPrompt__footer">{footer}</div>}
    </EuiPanel>
  );
};
