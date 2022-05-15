/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, {
  CSSProperties,
  FunctionComponent,
  ReactElement,
  ReactNode,
} from 'react';
import classNames from 'classnames';

import { _EuiPageOuter as EuiPageOuter, _EuiPageOuterProps } from './outer';
import { _EuiPageInner as EuiPageInner, _EuiPageInnerProps } from './inner';
import {
  _EuiPageSidebar as EuiPageSidebar,
  _EuiPageSidebarProps,
} from './sidebar';
import { EuiPageHeader, EuiPageHeaderProps, EuiPageSection } from '../page';
import {
  _EuiPageBottomBar as EuiPageBottomBar,
  _EuiPageBottomBarProps,
} from './page_bottom_bar';
import { _EuiPageTemplate } from './_template';
import { _EuiPaddingSize } from '../../global_styling';
import { _EuiPageRestrictWidth } from '../page/_restrict_width';
import { EuiPageSectionProps, EuiPageSideBarProps } from '..';
import { _EuiPageBottomBorder } from '../page/_bottom_border';

export type EuiPageTemplateProps = _EuiPageOuterProps &
  Omit<_EuiPageInnerProps, 'component'> &
  _EuiPageRestrictWidth &
  _EuiPageBottomBorder & {
    /**
     * Optionally include #EuiPageSideBar content.
     * The inclusion of this will affect the whole layout
     */
    pageSideBar?: ReactNode;
    /**
     * Gets passed along to the #EuiPageSideBar component
     */
    pageSideBarProps?: _EuiPageSidebarProps;
    /**
     * Optionally include an #EuiPageHeader by passing an object of its props
     */
    pageHeader?: EuiPageHeaderProps;
    /**
     *
     */
    alignment?: EuiPageSectionProps['alignment'];
    /**
     * Adds contents inside of an EuiBottomBar.
     * Only works when `template = 'default'`
     */
    bottomBar?: _EuiPageBottomBarProps['children'];
    /**
     * Gets passed along to the #EuiBottomBar component if `bottomBar` has contents
     */
    bottomBarProps?: _EuiPageBottomBarProps;
    /**
     * Minimum height in which to enforce scrolling
     */
    minHeight?: CSSProperties['minHeight'];
  };
export const EuiPageTemplate: FunctionComponent<EuiPageTemplateProps> = ({
  // template = 'default',
  //
  restrictWidth = true,
  paddingSize = 'l',
  alignment = 'top',
  bottomBorder,
  // Outer props
  grow,
  direction,
  responsive,
  // Inner props
  panelled,
  // Sidebar props
  pageSideBar,
  pageSideBarProps,

  children,
  className,
  pageHeader,
  bottomBar,
  bottomBarProps,
  minHeight = 460,
  ...rest
}) => {
  const classes = classNames('euiPageTemplate', className);
  const pageStyle = { minHeight, ...rest.style };

  const getBottomBarProps: _EuiPageBottomBarProps = () => ({
    restrictWidth,
    paddingSize,
  });

  // Only the default template can display a bottom bar
  let bottomBarNode = bottomBar ? (
    <EuiPageBottomBar
      {...getBottomBarProps()}
      // Using uknown here because of the possible conflict with overriding props and position `sticky`
      {...(bottomBarProps as unknown)}
    >
      {bottomBar}
    </EuiPageBottomBar>
  ) : undefined;

  const getSideBarProps: EuiPageSideBarProps = () => ({
    paddingSize,
    sticky: { offset: 0 },
  });

  let sidebar = pageSideBar ? (
    <EuiPageSidebar {...getSideBarProps()}>{pageSideBar}</EuiPageSidebar>
  ) : undefined;

  const getHeaderProps: EuiPageHeaderProps = () => ({
    restrictWidth,
    paddingSize,
    bottomBorder:
      bottomBorder !== undefined ? bottomBorder : sidebar ? true : 'extended',
  });

  const getSectionProps: EuiPageSectionProps = () => ({
    restrictWidth,
    paddingSize,
    color: panelled === false ? false : 'plain',
  });

  let sections = [];

  if (pageHeader) {
    sections.push(<EuiPageHeader {...getHeaderProps()} {...pageHeader} />);
  }

  React.Children.toArray(children).map((child, index) => {
    if (child?.type === EuiPageSidebar) {
      sidebar = React.cloneElement(child, {
        key: 'sidebar',
        ...getSideBarProps(),
        ...child.props, // Allow overriding by placing props at the end
      });
    } else if (child?.type === EuiPageBottomBar) {
      bottomBarNode = React.cloneElement(child, {
        key: 'bottomBar',
        ...getBottomBarProps(),
        ...child.props, // Allow overriding by placing props at the end
      });
    } else if (child?.type === EuiPageHeader) {
      const header = React.cloneElement(child, {
        key: 'header',
        ...getHeaderProps(),
        ...child.props, // Allow overriding by placing props at the end
      });
      sections.push(header);
    } else if (child?.type === EuiPageSection) {
      const section = React.cloneElement(child, {
        key: `section${index}`,
        ...getSectionProps(),
        grow: index + 1 === React.Children.toArray(children).length,
        ...child.props, // Allow overriding by placing props at the end
      });
      sections.push(section);
    } else if (child !== null) {
      const section = (
        <EuiPageSection key={`section${index}`} {...getSectionProps()}>
          {child}
        </EuiPageSection>
      );
      sections.push(section);
    }
  });

  const innerPanelled = panelled === false ? false : Boolean(sidebar);

  return (
    <EuiPageOuter style={pageStyle}>
      {sidebar}

      <EuiPageInner panelled={innerPanelled}>
        {sections}
        {bottomBarNode}
      </EuiPageInner>
    </EuiPageOuter>
  );
};

export const EuiPageT = {
  Outer: EuiPageTemplate,
  Inner: EuiPageInner,
  Sidebar: EuiPageSidebar,
  Header: EuiPageHeader,
  Section: EuiPageSection,
  BottomBar: EuiPageBottomBar,
};
