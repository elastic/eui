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
import { useIsWithinBreakpoints } from '../../../services/hooks';
import { EuiScreenReaderOnly } from '../../accessibility';

export const ALIGN_ITEMS = ['top', 'bottom', 'center', 'stretch'] as const;

// Gets all the tab props including the button or link props
type Tab = EuiTabProps & {
  /**
   * Visible text of the tab
   */
  label: ReactNode;
};

export type EuiPageHeaderContentTitle = {
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
};

export type EuiPageHeaderContentTabs = {
  /**
   * In-app navigation presented as large borderless tabs.
   * Accepts an array of `EuiTab` objects;
   */
  tabs?: Tab[];
  /**
   * Any extras to apply to the outer tabs container.
   * Extends `EuiTabs`
   */
  tabsProps?: Omit<EuiTabsProps, 'size' | 'expand' | 'display'>;
};

/**
 * The left side can either be a title with optional description and/or icon;
 * Or a list of tabs,
 * Or a custom node
 */
type EuiPageHeaderContentLeft = EuiPageHeaderContentTitle &
  EuiPageHeaderContentTabs & {
    /**
     * Position is dependent on existing with a `pageTitle` or `tabs`
     * Automatically get wrapped in a single paragraph tag inside an EuiText block
     */
    description?: string | ReactNode;
  };

export type EuiPageHeaderContentProps = CommonProps &
  HTMLAttributes<HTMLDivElement> &
  EuiPageHeaderContentLeft & {
    /**
     * Set to false if you don't want the children to stack at small screen sizes.
     * Set to `reverse` to display the right side content first for the sack of hierarchy (like global time)
     */
    responsive?: boolean | 'reverse';
    /**
     * Vertical alignment of the left and right side content;
     * Default is `middle` for custom content, but `top` for when `pageTitle` or `tabs` are included
     */
    alignItems?: typeof ALIGN_ITEMS[number];
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
  };

export const EuiPageHeaderContent: FunctionComponent<EuiPageHeaderContentProps> = ({
  className,
  pageTitle,
  pageTitleProps,
  iconType,
  iconProps,
  tabs,
  tabsProps,
  description,
  alignItems = 'top',
  responsive = true,
  rightSideItems,
  rightSideGroupProps,
  children,
  ...rest
}) => {
  const isResponsiveBreakpoint = useIsWithinBreakpoints(
    ['xs', 's'],
    !!responsive
  );

  const classes = classNames('euiPageHeaderContent');

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

  let pageTitleNode;
  if (pageTitle) {
    const icon = iconType ? (
      <EuiIcon
        size="xl"
        {...iconProps}
        type={iconType}
        className={classNames(
          'euiPageHeaderContent__titleIcon',
          iconProps?.className
        )}
      />
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
        <EuiTabs
          {...tabsProps}
          display="condensed"
          bottomBorder={false}
          size={tabsSize}
        >
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
    const wrapWithFlex = () => {
      return rightSideItems.map((item, index) => {
        return (
          <EuiFlexItem grow={false} key={index}>
            {item}
          </EuiFlexItem>
        );
      });
    };

    rightSideFlexItem = (
      <EuiFlexItem grow={false}>
        <EuiFlexGroup
          wrap
          responsive={false}
          {...rightSideGroupProps}
          className={classNames(
            'euiPageHeaderContent__rightSideItems',
            rightSideGroupProps?.className
          )}
        >
          {wrapWithFlex()}
        </EuiFlexGroup>
      </EuiFlexItem>
    );
  }

  return alignItems === 'top' || isResponsiveBreakpoint ? (
    <div className={classes} {...rest}>
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
    <div className={classes} {...rest}>
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
