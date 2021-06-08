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

export const TEMPLATES = [
  'default',
  'centeredBody',
  'centeredContent',
  'empty',
] as const;

export type EuiPageTemplateProps = Omit<EuiPageProps, 'paddingSize'> & {
  /**
   * Choose between 3 types of templates.
   * `default`: Typical layout with nothing centered
   * `centeredBody`: The panelled content is centered
   * `centeredContent`: The content inside the panel is centered
   * `empty`: Removes the panneling of the page content
   */
  template?: typeof TEMPLATES[number];
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
        responsive={false}>
        <EuiFlexItem
          className={classNames({
            'eui-yScroll': fullHeight === true,
            'eui-fullHeight': fullHeight === 'noscroll',
          })}
          grow={true}>
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

  /**
   * This seems very repetitious but it's the most readable, scalable, and maintainable
   */

  switch (template) {
    /**
     * CENTERED BODY
     * The panelled content is centered
     */
    case 'centeredBody':
      return pageSideBar ? (
        <EuiPage
          className={classes}
          paddingSize="none"
          grow={grow}
          {...rest}
          style={pageStyle}>
          <EuiPageSideBar
            sticky
            paddingSize={paddingSize}
            {...pageSideBarProps}>
            {pageSideBar}
          </EuiPageSideBar>

          <EuiPageBody paddingSize={paddingSize} {...pageBodyProps}>
            {pageHeader && (
              <EuiPageHeader restrictWidth={restrictWidth} {...pageHeader} />
            )}
            <EuiPageContent
              verticalPosition="center"
              horizontalPosition="center"
              paddingSize={paddingSize}
              {...pageContentProps}>
              <EuiPageContentBody
                restrictWidth={restrictWidth}
                {...pageContentBodyProps}>
                {children}
              </EuiPageContentBody>
            </EuiPageContent>
          </EuiPageBody>
        </EuiPage>
      ) : (
        <EuiPage
          className={classes}
          paddingSize="none"
          grow={grow}
          {...rest}
          style={pageStyle}>
          <EuiPageBody paddingSize="none" {...pageBodyProps}>
            {pageHeader && (
              <EuiPageHeader
                paddingSize={paddingSize}
                restrictWidth={restrictWidth}
                {...pageHeader}
              />
            )}
            {/* Extra page body to get the correct alignment and padding of the centered EuiPageContent */}
            <EuiPageBody paddingSize={paddingSize}>
              <EuiPageContent
                verticalPosition="center"
                horizontalPosition="center"
                paddingSize={paddingSize}
                {...pageContentProps}>
                <EuiPageContentBody
                  restrictWidth={restrictWidth}
                  {...pageContentBodyProps}>
                  {children}
                </EuiPageContentBody>
              </EuiPageContent>
            </EuiPageBody>
          </EuiPageBody>
        </EuiPage>
      );

    /**
     * CENTERED CONTENT
     * The content inside the panel is centered
     */
    case 'centeredContent':
      return pageSideBar ? (
        <EuiPage
          className={classes}
          paddingSize="none"
          grow={grow}
          {...rest}
          style={pageStyle}>
          <EuiPageSideBar
            sticky
            paddingSize={paddingSize}
            {...pageSideBarProps}>
            {pageSideBar}
          </EuiPageSideBar>

          <EuiPageBody panelled paddingSize={paddingSize} {...pageBodyProps}>
            {pageHeader && (
              <EuiPageHeader restrictWidth={restrictWidth} {...pageHeader} />
            )}
            <EuiPageContent
              verticalPosition="center"
              horizontalPosition="center"
              hasShadow={false}
              color="subdued"
              paddingSize={paddingSize}
              {...pageContentProps}>
              <EuiPageContentBody
                restrictWidth={restrictWidth}
                {...pageContentBodyProps}>
                {children}
              </EuiPageContentBody>
            </EuiPageContent>
          </EuiPageBody>
        </EuiPage>
      ) : (
        <EuiPage
          className={classes}
          paddingSize="none"
          grow={grow}
          {...rest}
          style={pageStyle}>
          <EuiPageBody {...pageBodyProps}>
            {pageHeader && (
              <EuiPageHeader
                paddingSize={paddingSize}
                restrictWidth={restrictWidth}
                {...pageHeader}
              />
            )}
            {/* Extra page content to get the correct alignment and padding of the centered EuiPageContent */}
            <EuiPageContent
              role={null}
              borderRadius="none"
              hasShadow={false}
              paddingSize={paddingSize}
              style={{ display: 'flex' }}>
              <EuiPageContent
                verticalPosition="center"
                horizontalPosition="center"
                hasShadow={false}
                color="subdued"
                paddingSize={paddingSize}
                {...pageContentProps}>
                <EuiPageContentBody
                  restrictWidth={restrictWidth}
                  {...pageContentBodyProps}>
                  {children}
                </EuiPageContentBody>
              </EuiPageContent>
            </EuiPageContent>
          </EuiPageBody>
        </EuiPage>
      );

    /**
     * DEFAULT
     * Typical layout with nothing "centered"
     */
    case 'empty':
      return pageSideBar ? (
        <EuiPage
          className={classes}
          paddingSize="none"
          grow={grow}
          {...rest}
          style={pageStyle}>
          <EuiPageSideBar
            sticky
            paddingSize={paddingSize}
            {...pageSideBarProps}>
            {pageSideBar}
          </EuiPageSideBar>

          <EuiPageBody paddingSize={paddingSize} {...pageBodyProps}>
            {pageHeader && (
              <EuiPageHeader restrictWidth={restrictWidth} {...pageHeader} />
            )}
            <EuiPageContent
              hasBorder={false}
              hasShadow={false}
              paddingSize={'none'}
              color={'transparent'}
              borderRadius={'none'}
              {...pageContentProps}>
              <EuiPageContentBody
                restrictWidth={restrictWidth}
                {...pageContentBodyProps}>
                {children}
              </EuiPageContentBody>
            </EuiPageContent>
          </EuiPageBody>
        </EuiPage>
      ) : (
        <EuiPage
          className={classes}
          paddingSize="none"
          grow={grow}
          {...rest}
          style={pageStyle}>
          <EuiPageBody {...pageBodyProps}>
            {pageHeader && (
              <EuiPageHeader
                restrictWidth={restrictWidth}
                paddingSize={paddingSize}
                {...pageHeader}
                style={{ paddingBottom: 0, ...pageHeader?.style }}
              />
            )}
            <EuiPageContent
              hasBorder={false}
              hasShadow={false}
              paddingSize={'none'}
              color={'transparent'}
              borderRadius={'none'}
              {...pageContentProps}>
              <EuiPageContentBody
                restrictWidth={restrictWidth}
                paddingSize={paddingSize}
                {...pageContentBodyProps}>
                {children}
              </EuiPageContentBody>
            </EuiPageContent>
          </EuiPageBody>
        </EuiPage>
      );

    /**
     * DEFAULT
     * Typical layout with nothing "centered"
     */
    default:
      // Only the default template can display a bottom bar
      const bottomBarNode = bottomBar ? (
        <EuiBottomBar
          paddingSize={paddingSize}
          position={canFullHeight && fullHeight ? 'static' : 'sticky'}
          // Using uknown here because of the possible conflict with overriding props and position `sticky`
          {...(bottomBarProps as unknown)}>
          {/* Wrapping the contents with EuiPageContentBody allows us to match the restrictWidth to keep the contents aligned */}
          <EuiPageContentBody
            paddingSize={'none'}
            restrictWidth={restrictWidth}>
            {bottomBar}
          </EuiPageContentBody>
        </EuiBottomBar>
      ) : undefined;

      return pageSideBar ? (
        <EuiPage
          className={classes}
          paddingSize="none"
          grow={grow}
          {...rest}
          style={pageStyle}>
          <EuiPageSideBar
            sticky
            paddingSize={paddingSize}
            {...pageSideBarProps}>
            {pageSideBar}
          </EuiPageSideBar>

          {/* The extra PageBody is to accommodate the bottom bar stretching to both sides */}
          <EuiPageBody panelled paddingSize="none" {...pageBodyProps}>
            <EuiPageBody
              component="div"
              paddingSize={paddingSize}
              className={pageBodyProps?.className}>
              {pageHeader && (
                <EuiPageHeader
                  bottomBorder
                  restrictWidth={restrictWidth}
                  {...pageHeader}
                />
              )}
              <EuiPageContent
                hasShadow={false}
                hasBorder={false}
                color={'transparent'}
                borderRadius={'none'}
                paddingSize="none"
                {...pageContentProps}>
                <EuiPageContentBody
                  restrictWidth={restrictWidth}
                  {...pageContentBodyProps}>
                  {children}
                </EuiPageContentBody>
              </EuiPageContent>
            </EuiPageBody>
            {bottomBarNode}
          </EuiPageBody>
        </EuiPage>
      ) : (
        <EuiPage
          className={classes}
          paddingSize="none"
          grow={grow}
          {...rest}
          style={pageStyle}>
          <EuiPageBody {...pageBodyProps}>
            {pageHeader && (
              <EuiPageHeader
                restrictWidth={restrictWidth}
                paddingSize={paddingSize}
                {...pageHeader}
              />
            )}
            <EuiPageContent
              hasBorder={pageHeader === undefined ? false : undefined}
              hasShadow={false}
              paddingSize={'none'}
              color={'plain'}
              borderRadius={'none'}
              {...pageContentProps}>
              <EuiPageContentBody
                restrictWidth={restrictWidth}
                paddingSize={paddingSize}
                {...pageContentBodyProps}>
                {children}
              </EuiPageContentBody>
            </EuiPageContent>
            {bottomBarNode}
          </EuiPageBody>
        </EuiPage>
      );
  }
};
