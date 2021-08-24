/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { PropsWithChildren, ComponentType, ComponentProps } from 'react';
import classNames from 'classnames';
import { CommonProps, keysOf } from '../../common';
import {
  setPropsForRestrictedPageWidth,
  _EuiPageRestrictWidth,
} from '../_restrict_width';
import { EuiPanel, EuiPanelProps } from '../../panel';
import { TEMPLATES } from '../_template';
import {
  EuiPageContent,
  EuiPageContentBody,
  EuiPageContentBodyProps,
  EuiPageContentProps,
} from '../page_content';
import { EuiPageHeader, EuiPageHeaderProps } from '../page_header';
import { EuiBottomBarProps, EuiBottomBar } from '../../bottom_bar';
import { EuiSpacer } from '../../spacer';

const paddingSizeToClassNameMap = {
  none: null,
  s: 'euiPageBody--paddingSmall',
  m: 'euiPageBody--paddingMedium',
  l: 'euiPageBody--paddingLarge',
};

export const PADDING_SIZES = keysOf(paddingSizeToClassNameMap);

type ComponentTypes = keyof JSX.IntrinsicElements | ComponentType<any>;

export type EuiPageBodyProps<T extends ComponentTypes = 'main'> = CommonProps &
  ComponentProps<T> &
  _EuiPageRestrictWidth & {
    /**
     * Choose between 3 types of templates.
     * `default`: Typical layout with nothing centered
     * `centeredBody`: The panelled content is centered
     * `centeredContent`: The content inside the panel is centered
     * `empty`: Removes the panneling of the page content
     */
    template?: typeof TEMPLATES[number];
    /**
     * Sets the HTML element for `EuiPageBody`.
     */
    component?: T;
    /**
     * Uses an EuiPanel as the main component instead of a plain div
     */
    panelled?: boolean;
    /**
     * Extends any extra EuiPanel props if `panelled=true`
     */
    panelProps?: Omit<EuiPanelProps, 'paddingSize'>;
    /**
     * Adjusts the padding
     */
    paddingSize?: typeof PADDING_SIZES[number];
    /**
     * Optionally include an #EuiPageHeader by passing an object of its props
     */
    pageHeader?: EuiPageHeaderProps;
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
     * Only works when `template = 'default' | 'empty'`
     */
    bottomBar?: EuiBottomBarProps['children'];
    /**
     * Gets passed along to the #EuiBottomBar component if `bottomBar` has contents
     */
    bottomBarProps?: EuiBottomBarProps;
  };

export const EuiPageBody = <T extends ComponentTypes>({
  template,
  restrictWidth = false,
  paddingSize,
  panelled = false,
  panelProps,
  pageHeader,
  pageContentBodyProps,
  pageContentProps,
  children,
  className,
  component: Component = 'div' as T,
  bottomBar,
  bottomBarProps,
  style,
  ...rest
}: PropsWithChildren<EuiPageBodyProps<T>>) => {
  const { widthClassName, newStyle } = setPropsForRestrictedPageWidth(
    !template && restrictWidth,
    style
  );

  const paddingClass =
    panelled &&
    paddingSizeToClassNameMap[paddingSize as typeof PADDING_SIZES[number]];

  const classes = classNames(
    'euiPageBody',
    paddingClass,
    {
      [`euiPageBody--${widthClassName}`]: widthClassName,
    },
    className
  );

  const nonBreakingDefaultPadding = panelled ? 'l' : paddingSize;
  paddingSize = template ? paddingSize : nonBreakingDefaultPadding;

  /**
   * Logic for when to use a horizontal border separator and if full width or only under header
   */
  const contentHasBorder = !panelled && pageHeader ? '1px 0 0 0' : false;
  const contentPaddingSize = panelled ? 'none' : paddingSize;
  const contentSeparator = panelled && <EuiSpacer size={paddingSize} />;

  /**
   * The EuiPageHeader is always the same
   */
  const pageHeaderNode = pageHeader && (
    <>
      <EuiPageHeader
        paddingSize={contentPaddingSize}
        restrictWidth={restrictWidth}
        // Non-panelled content applies the border to the EuiPageContent
        bottomBorder={panelled}
        {...pageHeader}
      />
      {contentSeparator}
    </>
  );

  // Only the default template can display a bottom bar
  const bottomBarNode = bottomBar ? (
    <EuiBottomBar paddingSize="none" position="sticky" {...bottomBarProps}>
      {/* Wrapping the contents with EuiPageContentBody allows us to match the restrictWidth to keep the contents aligned */}
      <EuiPageContentBody
        paddingSize={paddingSize}
        restrictWidth={restrictWidth}
      >
        {bottomBar}
      </EuiPageContentBody>
    </EuiBottomBar>
  ) : undefined;

  /**
   * Don't add any wrappers if template is undefined
   */
  let pageContent = (
    <Component className={classes} style={newStyle || style} {...rest}>
      {pageHeaderNode}
      {children}
      {bottomBarNode}
    </Component>
  );

  if (template === 'centeredBody') {
    /**
     * CENTERED BODY
     * Wraps ALL the content inside of centered panel.
     * Color of panel depends on `panelled` prop
     */
    pageContent = (
      <Component className={classes} style={newStyle || style} {...rest}>
        <EuiPageContent
          template={template}
          color={panelled ? 'subdued' : 'plain'}
          {...pageContentProps}
        >
          {pageHeaderNode}
          <EuiPageContentBody
            template={template}
            paddingSize={contentPaddingSize}
            restrictWidth={restrictWidth}
            hasBorder={contentHasBorder}
            {...pageContentBodyProps}
          >
            {children}
          </EuiPageContentBody>
        </EuiPageContent>
      </Component>
    );
  } else if (template) {
    /**
     * The rest: CENTERED CONTENT or DEFAULT or EMPTY.
     * BottomBar location is based on `panelled` prop
     */
    pageContent = (
      <>
        <Component className={classes} style={newStyle || style} {...rest}>
          {pageHeaderNode}
          <EuiPageContent
            template={template}
            hasBorder={contentHasBorder}
            {...pageContentProps}
          >
            <EuiPageContentBody
              template={template}
              paddingSize={contentPaddingSize}
              restrictWidth={restrictWidth}
              {...pageContentBodyProps}
            >
              {children}
            </EuiPageContentBody>
          </EuiPageContent>
          {!panelled && bottomBarNode}
        </Component>
        {panelled && bottomBarNode}
      </>
    );
  }

  return panelled ? (
    <EuiPanel
      paddingSize="none"
      borderRadius="none"
      {...panelProps}
      // Needs the same top class name for flex layout
      className={classNames('euiPageBody', panelProps?.className)}
    >
      {pageContent}
    </EuiPanel>
  ) : (
    pageContent
  );
};
