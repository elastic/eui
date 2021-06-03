/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import React, { FunctionComponent, HTMLAttributes } from 'react';
import classNames from 'classnames';
import { CommonProps, keysOf } from '../../common';
import {
  EuiPageHeaderContent,
  EuiPageHeaderContentProps,
} from './page_header_content';
import {
  _EuiPageRestrictWidth,
  setPropsForRestrictedPageWidth,
} from '../_restrict_width';

const paddingSizeToClassNameMap = {
  none: null,
  s: 'euiPageHeader--paddingSmall',
  m: 'euiPageHeader--paddingMedium',
  l: 'euiPageHeader--paddingLarge',
};

export const PADDING_SIZES = keysOf(paddingSizeToClassNameMap);

export type EuiPageHeaderProps = CommonProps &
  HTMLAttributes<HTMLElement> &
  EuiPageHeaderContentProps &
  _EuiPageRestrictWidth & {
    /**
     * Adjust the padding.
     * When using this setting it's best to be consistent throughout all similar usages
     */
    paddingSize?: typeof PADDING_SIZES[number];
    /**
     * Adds a bottom border to separate it from the content after
     */
    bottomBorder?: boolean;
  };

export const EuiPageHeader: FunctionComponent<EuiPageHeaderProps> = ({
  className,
  restrictWidth = false,
  paddingSize = 'none',
  bottomBorder,
  style,

  // Page header content shared props:
  alignItems,
  responsive = true,
  children,

  // Page header content only props:
  pageTitle,
  iconType,
  iconProps,
  tabs,
  tabsProps,
  description,
  rightSideItems,
  rightSideGroupProps,
  ...rest
}) => {
  const { widthClassName, newStyle } = setPropsForRestrictedPageWidth(
    restrictWidth,
    style
  );

  const classes = classNames(
    'euiPageHeader',
    paddingSizeToClassNameMap[paddingSize],
    {
      'euiPageHeader--bottomBorder': bottomBorder,
      'euiPageHeader--responsive': responsive === true,
      'euiPageHeader--responsiveReverse': responsive === 'reverse',
      'euiPageHeader--tabsAtBottom': pageTitle && tabs,
      [`euiPage--${widthClassName}`]: widthClassName,
    },
    `euiPageHeader--${alignItems ?? 'center'}`,
    className
  );

  if (!pageTitle && !tabs && !description && !rightSideItems) {
    return (
      <header className={classes} style={newStyle || style} {...rest}>
        {children}
      </header>
    );
  }

  return (
    <header className={classes} style={newStyle || style} {...rest}>
      <EuiPageHeaderContent
        alignItems={alignItems}
        responsive={responsive}
        pageTitle={pageTitle}
        iconType={iconType}
        iconProps={iconProps}
        tabs={tabs}
        tabsProps={tabsProps}
        description={description}
        rightSideItems={rightSideItems}
        rightSideGroupProps={rightSideGroupProps}>
        {children}
      </EuiPageHeaderContent>
    </header>
  );
};
