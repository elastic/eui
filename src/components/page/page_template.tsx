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
import { EuiPageHeaderProps } from './page_header';
import { EuiPageContentProps, EuiPageContentBodyProps } from './page_content';
import { EuiBottomBarProps } from '../bottom_bar';
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
    /**
     * Wraps the main children inside of a page panel (empty shade)
     */
    panelled?: boolean;
  };

export const EuiPageTemplate: FunctionComponent<EuiPageTemplateProps> = ({
  template = 'default',
  restrictWidth = true,
  grow = true,
  paddingSize = 'l',
  fullHeight,
  children,
  className,
  pageSideBar,
  pageSideBarProps,
  pageHeader,
  pageBodyProps,
  pageContentProps,
  pageContentBodyProps,
  bottomBar,
  bottomBarProps = {},
  minHeight = 460,
  panelled = true,
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
      className: classNames(yScrollClass, pageContentProps?.className),
    };
    pageContentBodyProps = {
      ...pageContentBodyProps,
      className: classNames(fullHeightClass, pageContentBodyProps?.className),
    };
  }

  const classes = classNames('euiPageTemplate', fullHeightClass, className);
  const pageStyle = { minHeight, ...rest.style };

  bottomBarProps.position = canFullHeight && fullHeight ? 'static' : 'sticky';

  /**
   * This seems very repetitious but it's the most readable, scalable, and maintainable
   */
  const sideBarNode = pageSideBar && (
    <EuiPageSideBar sticky paddingSize={paddingSize} {...pageSideBarProps}>
      {pageSideBar}
    </EuiPageSideBar>
  );

  return (
    <EuiPage
      className={classes}
      paddingSize="none"
      grow={grow}
      {...rest}
      style={pageStyle}
    >
      {sideBarNode}

      <EuiPageBody
        {...pageBodyProps}
        template={template}
        panelled={panelled}
        paddingSize={paddingSize}
        restrictWidth={restrictWidth}
        pageHeader={pageHeader}
        pageContentProps={pageContentProps}
        bottomBar={bottomBar}
      >
        {children}
      </EuiPageBody>
    </EuiPage>
  );
};
