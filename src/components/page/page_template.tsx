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

import React, { FunctionComponent, ReactNode } from 'react';
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
   *
   * Padding size will not get applie to the over-arching #EuiPage,
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
};

export const EuiPageTemplate: FunctionComponent<EuiPageTemplateProps> = ({
  template = 'default',
  restrictWidth = true,
  grow = true,
  paddingSize = 'l',
  children,
  className,
  pageSideBar,
  pageSideBarProps,
  pageHeader,
  pageBodyProps,
  pageContentProps,
  pageContentBodyProps,
  ...rest
}) => {
  const classes = classNames('euiPageTemplate', className);

  // This seems very repitious but it's the most readable, scalable, and maintainable

  switch (template) {
    /**
     * CENTERED BODY
     * The panelled content is centered
     */
    case 'centeredBody':
      return pageSideBar ? (
        <EuiPage className={classes} paddingSize="none" grow={grow} {...rest}>
          <EuiPageSideBar sticky {...pageSideBarProps}>
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
        <EuiPage className={classes} paddingSize="none" grow={grow} {...rest}>
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
        <EuiPage className={classes} paddingSize="none" grow={grow} {...rest}>
          <EuiPageSideBar sticky {...pageSideBarProps}>
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
        <EuiPage className={classes} paddingSize="none" grow={grow} {...rest}>
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
        <EuiPage className={classes} paddingSize="none" grow={grow} {...rest}>
          <EuiPageSideBar sticky {...pageSideBarProps}>
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
        <EuiPage className={classes} paddingSize="none" grow={grow} {...rest}>
          <EuiPageBody {...pageBodyProps}>
            {pageHeader && (
              <EuiPageHeader
                restrictWidth={restrictWidth}
                paddingSize={paddingSize}
                {...pageHeader}
                style={{ marginBottom: 0, ...pageHeader?.style }}
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
      return pageSideBar ? (
        <EuiPage className={classes} paddingSize="none" grow={grow} {...rest}>
          <EuiPageSideBar sticky {...pageSideBarProps}>
            {pageSideBar}
          </EuiPageSideBar>

          <EuiPageBody panelled paddingSize={paddingSize} {...pageBodyProps}>
            {pageHeader && (
              <EuiPageHeader restrictWidth={restrictWidth} {...pageHeader} />
            )}
            <EuiPageContent
              hasShadow={false}
              hasBorder={false}
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
        <EuiPage className={classes} paddingSize="none" grow={grow} {...rest}>
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
          </EuiPageBody>
        </EuiPage>
      );
  }
};
