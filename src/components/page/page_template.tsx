/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { CSSProperties, FunctionComponent, ReactNode } from 'react';
import classNames from 'classnames';
import { EuiPage, EuiPageProps, SIZES } from './page';
import { EuiPageSideBar, EuiPageSideBarProps } from './page_side_bar';
import { EuiPageBody, EuiPageBodyProps } from './page_body';
import { EuiPageHeader, EuiPageHeaderProps } from './page_header';
import {
  EuiPageContent,
  EuiPageContentBody,
  EuiPageContentProps,
  EuiPageContentBodyProps,
} from './page_content';
import { EuiBottomBarProps, EuiBottomBar } from '../bottom_bar';
import { useIsWithinBreakpoints } from '../../services';
import { EuiFlexGroup, EuiFlexItem } from '../flex';
import { _EuiPageTemplate } from './_template';

export type EuiPageTemplateProps = Omit<EuiPageProps, 'paddingSize'> &
  _EuiPageTemplate & {
    /**
     * Padding size will not get applied to the over-arching #EuiPage,
     * but will propogate through all the components to keep them in sync
     */
    paddingSize?: typeof SIZES[number];
    /**
     * Optionally include #EuiPageSideBar content.
     * The inclusion of this will affect the whole layout
     */
    pageSideBar?: ReactNode;
    /**
     * Gets passed along to the #EuiPageSideBar component
     */
    pageSideBarProps?: EuiPageSideBarProps;
    /**
     * Optionally include an #EuiPageHeader by passing an object of its props
     */
    pageHeader?: EuiPageHeaderProps;
    /**
     * Gets passed along to the #EuiPageBody component
     */
    pageBodyProps?: EuiPageBodyProps;
    /**
     * Gets passed along to the #EuiPageContent component
     */
    pageContentProps?: EuiPageContentProps;
    /**
     * Gets passed along to the #EuiPageContentBody component
     */
    pageContentBodyProps?: EuiPageContentBodyProps;
    /**
     * Adds contents inside of an EuiBottomBar.
     * Only works when `template = 'default'`
     */
    bottomBar?: EuiBottomBarProps['children'];
    /**
     * Gets passed along to the #EuiBottomBar component if `bottomBar` has contents
     */
    bottomBarProps?: EuiBottomBarProps;
    /**
     * Stretches or restricts the height to 100% of the parent;
     * `true`: scrolls the EuiPageContentBody;
     * `noscroll`: removes all scroll ability;
     * Only works when `template = 'default | empty'` and breakpoint is `m` and above
     */
    fullHeight?: boolean | 'noscroll';
    /**
     * Minimum height in which to enforce scrolling
     */
    minHeight?: CSSProperties['minHeight'];
  };

export const EuiPageTemplate: FunctionComponent<EuiPageTemplateProps> = ({
  template = 'default',
  restrictWidth = true,
  paddingSize = 'l',
  fullHeight,
  children,
  className,
  pageSideBar,
  pageSideBarProps,
  pageHeader,
  pageBodyProps,
  pageContentProps,
  bottomBar,
  bottomBarProps,
  minHeight = 460,
  ...rest
}) => {
  /**
   * Full height ~madness~ logic
   */
  const canFullHeight =
    useIsWithinBreakpoints(['m', 'l', 'xl']) &&
    (template === 'default' || template === 'empty');
  const fullHeightClass = { 'eui-fullHeight': fullHeight && canFullHeight };
  const yScrollClass = { 'eui-yScroll': fullHeight && canFullHeight };

  if (canFullHeight && fullHeight) {
    // By using flex group it will also fix the negative margin issues for nested flex groups
    children = (
      <EuiFlexGroup
        className="eui-fullHeight"
        gutterSize="none"
        direction="column"
        responsive={false}
      >
        <EuiFlexItem
          className={classNames({
            'eui-yScroll': fullHeight === true,
            'eui-fullHeight': fullHeight === 'noscroll',
          })}
          grow={true}
        >
          {children}
        </EuiFlexItem>
      </EuiFlexGroup>
    );

    pageBodyProps = {
      ...pageBodyProps,
      className: classNames(fullHeightClass, pageBodyProps?.className),
    };
    pageContentProps = {
      ...pageContentProps,
      grow: true,
      className: classNames(yScrollClass, pageContentProps?.className),
      bodyProps: {
        className: classNames(
          fullHeightClass,
          pageContentProps?.bodyProps?.className
        ),
      },
    };
  }

  const classes = classNames('euiPageTemplate', fullHeightClass, className);
  const pageStyle = { minHeight, ...rest.style };
  const bottomBorder = pageSideBar ? true : 'extended';
  const alignment =
    template === 'emptyPage' || template === 'emptyContent' ? 'center' : 'top';
  const bodyPanelled = template === 'empty' ? false : Boolean(pageSideBar);
  const contentPanelled = !Boolean(
    template === 'emptyPage' || template === 'empty'
  );
  const showPageHeader = pageHeader && template !== 'emptyPage';

  // Only the default template can display a bottom bar
  const bottomBarNode = bottomBar ? (
    <EuiBottomBar
      paddingSize={paddingSize}
      position={canFullHeight && fullHeight ? 'static' : 'sticky'}
      // Using uknown here because of the possible conflict with overriding props and position `sticky`
      {...(bottomBarProps as unknown)}
    >
      {/* Wrapping the contents with EuiPageContentBody allows us to match the restrictWidth to keep the contents aligned */}
      <EuiPageContentBody paddingSize={'none'} restrictWidth={restrictWidth}>
        {bottomBar}
      </EuiPageContentBody>
    </EuiBottomBar>
  ) : undefined;

  // Only wrap the children if not customContent
  const content =
    template === 'customContent' ? (
      children
    ) : (
      <EuiPageContent
        paddingSize={paddingSize}
        restrictWidth={restrictWidth}
        alignment={alignment}
        panelled={contentPanelled}
        {...pageContentProps}
      >
        {children}
      </EuiPageContent>
    );

  return (
    <EuiPage className={classes} {...rest} style={pageStyle}>
      {pageSideBar && (
        <EuiPageSideBar sticky paddingSize={paddingSize} {...pageSideBarProps}>
          {pageSideBar}
        </EuiPageSideBar>
      )}

      <EuiPageBody panelled={bodyPanelled} {...pageBodyProps}>
        {showPageHeader && (
          <EuiPageHeader
            bottomBorder={bottomBorder}
            restrictWidth={restrictWidth}
            paddingSize={paddingSize}
            {...pageHeader}
          />
        )}
        {content}
        {bottomBarNode}
      </EuiPageBody>
    </EuiPage>
  );
};
