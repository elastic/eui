/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent, HTMLAttributes } from 'react';
import classNames from 'classnames';
import { CommonProps } from '../../common';
import { useEuiTheme } from '../../../services';
import {
  useEuiPaddingCSS,
  EuiPaddingSize,
  useEuiBackgroundColorCSS,
} from '../../../global_styling';

import {
  EuiPageHeaderContent,
  _EuiPageHeaderContentProps,
} from './page_header_content';

import { _EuiPageRestrictWidth } from '../_restrict_width';
import { _EuiPageBottomBorder } from '../_bottom_border';

import { euiPageHeaderStyles } from './page_header.styles';

export interface EuiPageHeaderProps
  extends CommonProps,
    HTMLAttributes<HTMLElement>,
    Omit<_EuiPageHeaderContentProps, 'bottomBorder'>,
    // The following are also inherited by page header content,
    // but we should explicitely set here too because we do things with the values
    _EuiPageRestrictWidth,
    _EuiPageBottomBorder {
  /**
   * Adjust the overall padding.
   */
  paddingSize?: EuiPaddingSize;
  /**
   * Define the header background color
   * @default 'transparent'
   */
  color?: 'plain' | 'transparent';
}

export const EuiPageHeader: FunctionComponent<EuiPageHeaderProps> = ({
  className,
  restrictWidth = false,
  paddingSize = 'none',
  bottomBorder,
  color = 'transparent',

  // Page header content shared props:
  alignItems,
  responsive = true,
  children,

  // Page header content only props:
  pageTitle,
  pageTitleProps,
  iconType,
  iconProps,
  tabs,
  tabsProps,
  breadcrumbs,
  breadcrumbProps,
  description,
  rightSideItems,
  rightSideGroupProps,
  ...rest
}) => {
  const useTheme = useEuiTheme();
  const styles = euiPageHeaderStyles(useTheme);
  const inlinePadding = useEuiPaddingCSS('horizontal');
  const backgroundColor = useEuiBackgroundColorCSS()[color];
  const cssStyles = [
    styles.euiPageHeader,
    inlinePadding[paddingSize],
    bottomBorder === 'extended' && styles.border,
    backgroundColor,
  ];

  const classes = classNames('euiPageHeader', className);

  const contentProps = {
    restrictWidth,
    paddingSize,
    // Set the bottom to false to ensure the forced one doesn't render
    // when we'll be rendering it at this parent
    bottomBorder: bottomBorder === 'extended' ? false : bottomBorder,
    alignItems,
    responsive,
    pageTitle,
    pageTitleProps,
    iconType,
    iconProps,
    tabs,
    tabsProps,
    description,
    rightSideItems,
    rightSideGroupProps,
    breadcrumbs,
    breadcrumbProps,
  };

  return (
    <header className={classes} css={cssStyles} {...rest}>
      <EuiPageHeaderContent {...contentProps}>{children}</EuiPageHeaderContent>
    </header>
  );
};
