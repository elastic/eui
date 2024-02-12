/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent, ReactNode, HTMLAttributes } from 'react';
import classNames from 'classnames';
import { CommonProps } from '../../common';
import { EuiIcon, EuiIconProps, IconType } from '../../icon';
import { EuiTab, EuiTabs, EuiTabsProps } from '../../tabs';
import { Props as EuiTabProps } from '../../tabs/tab';
import { EuiFlexGroup, EuiFlexItem, EuiFlexGroupProps } from '../../flex';
import { EuiSpacer } from '../../spacer';
import { EuiTitle, EuiTitleProps } from '../../title';
import { EuiText } from '../../text';
import { useIsWithinBreakpoints, useEuiTheme } from '../../../services';
import { EuiScreenReaderOnly } from '../../accessibility';
import { EuiBreadcrumbs, EuiBreadcrumbsProps } from '../../breadcrumbs';
import {
  PADDING_SIZES,
  useEuiPaddingCSS,
  LogicalSides,
} from '../../../global_styling';
import {
  setStyleForRestrictedPageWidth,
  _EuiPageRestrictWidth,
} from '../_restrict_width';

import { euiPageHeaderStyles } from './page_header.styles';
import { euiPageHeaderContentStyles } from './page_header_content.styles';

export const ALIGN_ITEMS = ['top', 'bottom', 'center', 'stretch'] as const;

// Gets all the tab props including the button or link props
type Tab = EuiTabProps & {
  /**
   * Visible text of the tab
   */
  label: ReactNode;
};

export interface EuiPageHeaderContentTitle {
  /**
   * Wrapped in an `H1` so choose appropriately.
   * A simple string is best
   */
  pageTitle?: ReactNode;
  /**
   * Additional props to pass to the EuiTitle
   */
  pageTitleProps?: Omit<EuiTitleProps, 'children' | 'size'>;
  /**
   * Optional icon to place to the left of the title
   */
  iconType?: IconType;
  /**
   * Additional EuiIcon props to apply to the optional icon
   */
  iconProps?: Partial<Omit<EuiIconProps, 'type'>>;
  /**
   * Optional array breadcrumbs that render before the `pageTitle`
   */
  breadcrumbs?: EuiBreadcrumbsProps['breadcrumbs'];
  /**
   * Adjust the props of [EuiBreadcrumbs](#/navigation/breadcrumbs)
   */
  breadcrumbProps?: Partial<Omit<EuiBreadcrumbsProps, 'breadcrumbs'>>;
}

export interface EuiPageHeaderContentTabs {
  /**
   * In-app navigation presented as large borderless tabs.
   * Accepts an array of `EuiTab` objects;
   */
  tabs?: Tab[];
  /**
   * Any extras to apply to the outer tabs container.
   * Extends `EuiTabs`
   */
  tabsProps?: Omit<EuiTabsProps, 'size' | 'expand'>;
}

/**
 * The left side can either be a title with optional description and/or icon;
 * Or a list of tabs,
 * Or a custom node
 */
interface EuiPageHeaderContentLeft
  extends EuiPageHeaderContentTitle,
    EuiPageHeaderContentTabs {
  /**
   * Position is dependent on existing with a `pageTitle` or `tabs`
   * Automatically get wrapped in a single paragraph tag inside an EuiText block
   */
  description?: string | ReactNode;
}

export interface _EuiPageHeaderContentProps
  extends EuiPageHeaderContentLeft,
    _EuiPageRestrictWidth {
  /**
   * The only option is on/off
   */
  bottomBorder?: boolean;
  /**
   * Adjust the padding.
   * When using this setting it's best to be consistent throughout all similar usages
   */
  paddingSize?: (typeof PADDING_SIZES)[number];
  /**
   * Set to false if you don't want the children to stack at small screen sizes.
   * Set to `reverse` to display the right side content first for the sake of hierarchy (like global time)
   */
  responsive?: boolean | 'reverse';
  /**
   * Vertical alignment of the left and right side content;
   * Default is `center` for custom content, but `top` for when `pageTitle` or `tabs` are included
   */
  alignItems?: (typeof ALIGN_ITEMS)[number];
  /**
   * Pass custom an array of content to this side usually up to 3 buttons.
   * The first button should be primary, usually with `fill` and will be visually displayed as the last item,
   * but first in the tab order
   */
  rightSideItems?: ReactNode[];
  /**
   * Additional EuiFlexGroup props to pass to the container of the `rightSideItems`
   */
  rightSideGroupProps?: Partial<EuiFlexGroupProps>;
  /**
   * Custom children will be rendered before the `tabs` unless no `pageTitle` is present, then it will be the last item
   */
  children?: ReactNode;
}

export interface EuiPageHeaderContentProps
  extends CommonProps,
    HTMLAttributes<HTMLDivElement>,
    _EuiPageHeaderContentProps {}

export const EuiPageHeaderContent: FunctionComponent<
  EuiPageHeaderContentProps
> = ({
  className,
  pageTitle,
  pageTitleProps,
  iconType,
  iconProps,
  tabs,
  tabsProps,
  description,
  breadcrumbs,
  breadcrumbProps,
  alignItems,
  responsive = true,
  rightSideItems,
  rightSideGroupProps,
  children,
  restrictWidth,
  paddingSize: _paddingSize = 'none',
  bottomBorder: _bottom_border,
  style,
  ...rest
}) => {
  const isResponsiveBreakpoint = useIsWithinBreakpoints(
    ['xs', 's'],
    !!responsive
  );

  const useTheme = useEuiTheme();
  const classes = classNames('euiPageHeaderContent', className);
  const pageHeaderStyles = euiPageHeaderStyles(useTheme);
  const contentStyles = euiPageHeaderContentStyles(useTheme);
  const styles = setStyleForRestrictedPageWidth(restrictWidth, style);

  let paddingSides: LogicalSides = 'vertical';
  let paddingSize = _paddingSize;
  let bottomBorder = _bottom_border;

  const onlyChildren =
    !tabs && !pageTitle && !rightSideItems && !description && children;
  const onlyTabs =
    tabs && !pageTitle && !rightSideItems && !description && !children;
  const tabsAsTitle = tabs && !pageTitle;
  const tabsAtTheBottom = pageTitle && tabs;
  const borderWithoutPadding =
    (!paddingSize || paddingSize === 'none') && bottomBorder;

  if (onlyTabs) {
    paddingSize = 'none';
  } else if (tabsAsTitle) {
    paddingSides = 'bottom';
  } else if (tabsAtTheBottom) {
    paddingSides = 'top';
    bottomBorder = bottomBorder === false ? false : true;
  } else if (borderWithoutPadding) {
    paddingSides = 'bottom';
    paddingSize = 'l';
  }

  const blockPadding = useEuiPaddingCSS(paddingSides);

  const cssStyles = [
    contentStyles.euiPageHeaderContent,
    bottomBorder && pageHeaderStyles.border,
    blockPadding[paddingSize],
  ];

  const childrenOnlyStyles = [
    contentStyles.flex,
    contentStyles[alignItems || 'center'],
    responsive === true && isResponsiveBreakpoint && contentStyles.responsive,
    responsive === 'reverse' &&
      isResponsiveBreakpoint &&
      contentStyles.responsiveReverse,
  ];

  // Don't go any further if there's no other content than children
  if (onlyChildren) {
    return (
      <div css={cssStyles} {...rest}>
        <div css={childrenOnlyStyles}>{children}</div>
      </div>
    );
  }

  let descriptionNode;
  if (description) {
    descriptionNode = (
      <>
        {(pageTitle || tabs) && <EuiSpacer />}
        <EuiText grow={false}>
          <p>{description}</p>
        </EuiText>
      </>
    );
  }

  const optionalBreadcrumbs = breadcrumbs ? (
    <>
      <EuiBreadcrumbs breadcrumbs={breadcrumbs} {...breadcrumbProps} />
      <EuiSpacer size="s" />
    </>
  ) : undefined;

  let pageTitleNode;
  if (pageTitle) {
    const iconCssStyles = [
      contentStyles.euiPageHeaderContent__titleIcon,
      iconProps?.css,
    ];
    const icon = iconType ? (
      <EuiIcon size="xl" {...iconProps} css={iconCssStyles} type={iconType} />
    ) : undefined;

    pageTitleNode = (
      <EuiTitle {...pageTitleProps} size="l">
        <h1>
          {icon}
          {pageTitle}
        </h1>
      </EuiTitle>
    );
  }

  let tabsNode;
  if (tabs) {
    const tabsSize: EuiTabsProps['size'] = pageTitle ? 'l' : 'xl';

    const renderTabs = () => {
      return tabs.map((tab, index) => {
        const { label, ...tabRest } = tab;
        return (
          <EuiTab key={index} {...tabRest}>
            {label}
          </EuiTab>
        );
      });
    };

    // When tabs exist without a pageTitle, we need to recreate an h1 based on the currently selected tab and visually hide it
    const screenReaderPageTitle = !pageTitle && (
      <EuiScreenReaderOnly>
        <h1>
          {
            tabs.find((obj) => {
              return obj.isSelected === true;
            })?.label
          }
        </h1>
      </EuiScreenReaderOnly>
    );

    tabsNode = (
      <>
        {pageTitleNode && <EuiSpacer />}
        {screenReaderPageTitle}
        <EuiTabs {...tabsProps} bottomBorder={false} size={tabsSize}>
          {renderTabs()}
        </EuiTabs>
      </>
    );
  }

  const childrenNode = children && (
    <>
      <EuiSpacer />
      {children}
    </>
  );

  let bottomContentNode;
  if (childrenNode || (tabsNode && pageTitleNode)) {
    bottomContentNode = (
      <div className="euiPageHeaderContent__bottom">
        {childrenNode}
        {pageTitleNode && tabsNode}
      </div>
    );
  }

  /**
   * The left side order depends on if a `pageTitle` was supplied.
   * If not, but there are `tabs`, then the tabs become the page title
   */
  let leftSideOrder;
  if (tabsNode && !pageTitleNode) {
    leftSideOrder = (
      <>
        {tabsNode}
        {descriptionNode}
      </>
    );
  } else {
    leftSideOrder = (
      <>
        {pageTitleNode}
        {descriptionNode}
      </>
    );
  }

  let rightSideFlexItem;
  if (rightSideItems && rightSideItems.length) {
    const itemsToRender = isResponsiveBreakpoint
      ? rightSideItems
      : [...rightSideItems].reverse();

    const rightSideFlexItems = itemsToRender.map((item, index) => (
      <EuiFlexItem grow={false} key={index}>
        {item}
      </EuiFlexItem>
    ));

    rightSideFlexItem = (
      <EuiFlexItem grow={false}>
        <EuiFlexGroup wrap responsive={false} {...rightSideGroupProps}>
          {rightSideFlexItems}
        </EuiFlexGroup>
      </EuiFlexItem>
    );
  }

  return alignItems === 'top' || isResponsiveBreakpoint ? (
    <div className={classes} css={cssStyles} style={styles} {...rest}>
      {optionalBreadcrumbs}
      <EuiFlexGroup
        responsive={!!responsive}
        className="euiPageHeaderContent__top"
        alignItems={pageTitle ? 'flexStart' : 'baseline'}
        gutterSize="l"
      >
        {isResponsiveBreakpoint && responsive === 'reverse' ? (
          <>
            {rightSideFlexItem}
            <EuiFlexItem>{leftSideOrder}</EuiFlexItem>
          </>
        ) : (
          <>
            <EuiFlexItem>{leftSideOrder}</EuiFlexItem>
            {rightSideFlexItem}
          </>
        )}
      </EuiFlexGroup>
      {bottomContentNode}
    </div>
  ) : (
    <div className={classes} css={cssStyles} style={styles} {...rest}>
      {optionalBreadcrumbs}
      <EuiFlexGroup
        responsive={!!responsive}
        className="euiPageHeaderContent__top"
        alignItems={alignItems === 'bottom' ? 'flexEnd' : alignItems}
        gutterSize="l"
      >
        <EuiFlexItem>
          {leftSideOrder}
          {bottomContentNode}
        </EuiFlexItem>
        {rightSideFlexItem}
      </EuiFlexGroup>
    </div>
  );
};
