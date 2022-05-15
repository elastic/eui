/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { CSSProperties, FunctionComponent } from 'react';
import classNames from 'classnames';

import { _EuiPageOuter as EuiPageOuter, _EuiPageOuterProps } from './outer';
import { _EuiPageInner as EuiPageInner, _EuiPageInnerProps } from './inner';
import { _EuiPageSidebar as EuiPageSidebar } from './sidebar';
import { _EuiPageBottomBar as EuiPageBottomBar } from './page_bottom_bar';
import { _EuiPageEmptyPrompt as EuiPageEmptyPrompt } from './page_empty_prompt';
import { EuiPageHeader, EuiPageSection } from '../page';
import { _EuiPageRestrictWidth } from '../page/_restrict_width';
import { _EuiPageBottomBorder } from '../page/_bottom_border';

export type EuiPageTemplateProps = _EuiPageOuterProps &
  Omit<_EuiPageInnerProps, 'component'> &
  _EuiPageRestrictWidth &
  _EuiPageBottomBorder & {
    /**
     * Minimum height in which to enforce scrolling
     */
    minHeight?: CSSProperties['minHeight'];
  };
export const EuiPageTemplate: FunctionComponent<EuiPageTemplateProps> = ({
  children,
  // Shared props
  restrictWidth = true,
  paddingSize = 'l',
  bottomBorder,
  // Inner props
  panelled,
  // Outer props
  minHeight = 460,
  className,
  grow,
  direction,
  responsive,
  ...rest
}) => {
  const classes = classNames('euiPageTemplate', className);
  const pageStyle = { minHeight, ...rest.style };

  // Sections include page header
  const sections: React.ReactElement[] = [];
  const sidebar: React.ReactElement[] = [];
  let bottomBar;

  const getBottomBorder = () => {
    if (bottomBorder !== undefined) {
      return bottomBorder;
    } else {
      return sidebar.length ? true : 'extended';
    }
  };

  const getHeaderProps = () => ({
    restrictWidth,
    paddingSize,
    bottomBorder: getBottomBorder(),
  });

  const getSectionProps = () => ({
    restrictWidth,
    paddingSize,
    color: panelled === false ? 'transparent' : 'plain',
  });

  const getSideBarProps = () => ({
    paddingSize,
    sticky: { offset: 0 },
  });

  const getBottomBarProps = () => ({
    restrictWidth,
    paddingSize,
  });

  const innerPanelled = () =>
    panelled === false ? false : Boolean(sidebar.length);

  React.Children.map(children, (child, index) => {
    // All content types can have their props overridden by appending the child props spread at the end
    if (React.isValidElement(child) && child.type === EuiPageSidebar) {
      sidebar.push(
        React.cloneElement(child, {
          key: `sidebar${index}`,
          ...getSideBarProps(),
          ...child.props,
        })
      );
    } else if (
      React.isValidElement(child) &&
      child?.type === EuiPageBottomBar
    ) {
      bottomBar = React.cloneElement(child, {
        key: `bottomBar${index}`,
        ...getBottomBarProps(),
        ...child.props,
      });
    } else if (React.isValidElement(child) && child?.type === EuiPageHeader) {
      const header = React.cloneElement(child, {
        key: `header${index}`,
        ...getHeaderProps(),
        ...child.props,
      });
      sections.push(header);
    } else if (
      React.isValidElement(child) &&
      child?.type === EuiPageEmptyPrompt
    ) {
      const section = React.cloneElement(child, {
        key: `emptyPrompt${index}`,
        panelled: innerPanelled() ? false : panelled,
        grow: true,
        ...child.props,
      });
      sections.push(section);
    } else if (React.isValidElement(child) && child?.type === EuiPageSection) {
      const section = React.cloneElement(child, {
        key: `section${index}`,
        ...getSectionProps(),
        grow: index + 1 === React.Children.toArray(children).length,
        ...child.props,
      });
      sections.push(section);
    } else if (React.isValidElement(child)) {
      const section = (
        // @ts-expect-error TODO
        <EuiPageSection key={`section${index}`} {...getSectionProps()}>
          {child}
        </EuiPageSection>
      );
      sections.push(section);
    }
  });

  return (
    <EuiPageOuter style={pageStyle} className={classes} {...rest}>
      {sidebar}

      <EuiPageInner panelled={innerPanelled()}>
        {sections}
        {bottomBar}
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
  EmptyPrompt: EuiPageEmptyPrompt,
};
