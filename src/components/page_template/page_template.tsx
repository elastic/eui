/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent, useEffect, useState } from 'react';
import classNames from 'classnames';

import { _EuiPageOuter as EuiPageOuter, _EuiPageOuterProps } from './outer';
import { _EuiPageInner as EuiPageInner, _EuiPageInnerProps } from './inner';
import { _EuiPageSidebar as EuiPageSidebar } from './sidebar';
import { _EuiPageBottomBar as EuiPageBottomBar } from './bottom_bar/page_bottom_bar';
import { _EuiPageEmptyPrompt as EuiPageEmptyPrompt } from './empty_prompt/page_empty_prompt';
import { EuiPageHeader, EuiPageSection } from '../page';
import { _EuiPageRestrictWidth } from '../page/_restrict_width';
import { _EuiPageBottomBorder } from '../page/_bottom_border';
import { useEuiTheme } from '../../services';
import { logicalStyle } from '../../global_styling';

export type EuiPageTemplateProps = _EuiPageOuterProps &
  // We re-define the `border` prop below to be named more appropriately
  Omit<_EuiPageInnerProps, 'border'> &
  _EuiPageRestrictWidth &
  _EuiPageBottomBorder & {
    /**
     * Applies a top or left border to the inner contents
     * to add separation between content and sidebar when a sidebar exists.
     */
    contentBorder?: _EuiPageInnerProps['border'];
    /**
     * Minimum height in which to enforce scrolling
     */
    minHeight?: string;
    /**
     * To account for any fixed elements like headers,
     * pass in the value of the total height of those fixed elements.
     * Otherwise they will be calculated based on the data attributes on the body element.
     */
    offset?: number;
  };

/**
 * Consumed via `EuiPageTemplate`,
 * it controls and propogates most of the shared props per direct child
 */
export const _EuiPageTemplate: FunctionComponent<EuiPageTemplateProps> = ({
  children,
  // Shared props
  restrictWidth = true,
  paddingSize = 'l',
  grow = true,
  bottomBorder,
  offset: _offset,
  panelled,
  // Inner props
  contentBorder,
  // Outer props
  className,
  minHeight = '460px',
  responsive = ['xs', 's'],
  ...rest
}) => {
  const { euiTheme } = useEuiTheme();

  const [offset, setOffset] = useState(_offset);

  useEffect(() => {
    if (_offset === undefined) {
      const euiHeaderFixedCounter = document.body.getAttribute(
        'data-fixed-headers'
      );

      setOffset(euiTheme.base * 3 * Number(euiHeaderFixedCounter));
    }
  }, [_offset, euiTheme.base]);

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
    responsive,
    sticky: { offset: _offset },
  });

  const getBottomBarProps = () => ({
    restrictWidth,
    paddingSize,
  });

  const innerPanelled = () =>
    panelled === false ? false : Boolean(sidebar.length > 0);

  const innerBordered = () =>
    contentBorder !== undefined ? contentBorder : Boolean(sidebar.length > 0);

  React.Children.toArray(children).map((child, index) => {
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
        panelled: innerPanelled() ? true : panelled,
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

  const _minHeight = grow ? `max(${minHeight}, 100vh` : minHeight;

  const classes = classNames('euiPageTemplate', className);
  const pageStyle = {
    ...logicalStyle('min-height', _minHeight),
    ...logicalStyle('padding-top', offset),
    ...rest.style,
  };

  return (
    <EuiPageOuter
      {...rest}
      responsive={responsive}
      style={pageStyle}
      className={classes}
    >
      {sidebar}

      <EuiPageInner
        border={innerBordered()}
        panelled={innerPanelled()}
        responsive={responsive}
      >
        {sections}
        {bottomBar}
      </EuiPageInner>
    </EuiPageOuter>
  );
};

export const EuiPageTemplate = Object.assign(_EuiPageTemplate, {
  Sidebar: EuiPageSidebar,
  Header: EuiPageHeader,
  Section: EuiPageSection,
  BottomBar: EuiPageBottomBar,
  EmptyPrompt: EuiPageEmptyPrompt,
});
