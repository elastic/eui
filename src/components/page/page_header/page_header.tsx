/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent, HTMLAttributes } from 'react';
import classNames from 'classnames';
import { CommonProps, keysOf } from '../../common';
import {
  EuiPageHeaderContent,
  _EuiPageHeaderContentProps,
} from './page_header_content';

import { _EuiPageBottomBorder } from '../_bottom_border';

export const paddingSizeToClassNameMap = {
  none: null,
  s: 'euiPageHeader--paddingSmall',
  m: 'euiPageHeader--paddingMedium',
  l: 'euiPageHeader--paddingLarge',
};

export const PADDING_SIZES = keysOf(paddingSizeToClassNameMap);

export type EuiPageHeaderProps = CommonProps &
  HTMLAttributes<HTMLElement> &
  _EuiPageBottomBorder &
  Omit<_EuiPageHeaderContentProps, 'bottomBorder'>;

export const EuiPageHeader: FunctionComponent<EuiPageHeaderProps> = ({
  className,
  restrictWidth,
  paddingSize = 'l',
  bottomBorder,

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
  const classes = classNames(
    'euiPageHeader',
    paddingSizeToClassNameMap[paddingSize],
    {
      'euiPageHeader--bottomBorder': bottomBorder === 'extended',
      'euiPageHeader--responsive': responsive === true,
      'euiPageHeader--responsiveReverse': responsive === 'reverse',
      'euiPageHeader--tabsAtBottom': pageTitle && tabs,
    },
    `euiPageHeader--${alignItems ?? 'center'}`,
    className
  );

  if (
    !pageTitle &&
    !tabs &&
    !description &&
    !rightSideItems &&
    !restrictWidth
  ) {
    return (
      <header
        className={classNames(classes, 'euiPageHeader--noContent')}
        {...rest}
      >
        {children}
      </header>
    );
  }

  let contentBorder =
    typeof bottomBorder === 'boolean' ? bottomBorder : undefined;
  if (bottomBorder === 'extended') contentBorder = false;

  return (
    <header className={classes} {...rest}>
      <EuiPageHeaderContent
        restrictWidth={restrictWidth}
        paddingSize={paddingSize}
        alignItems={alignItems}
        responsive={responsive}
        pageTitle={pageTitle}
        pageTitleProps={pageTitleProps}
        iconType={iconType}
        iconProps={iconProps}
        tabs={tabs}
        tabsProps={tabsProps}
        description={description}
        rightSideItems={rightSideItems}
        rightSideGroupProps={rightSideGroupProps}
        breadcrumbs={breadcrumbs}
        breadcrumbProps={breadcrumbProps}
        bottomBorder={contentBorder}
      >
        {children}
      </EuiPageHeaderContent>
    </header>
  );
};
