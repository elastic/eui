/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, {
  createContext,
  CSSProperties,
  FunctionComponent,
  HTMLAttributes,
  useContext,
  useEffect,
  useState,
} from 'react';
import classNames from 'classnames';

import { _EuiPageOuter as EuiPageOuter, _EuiPageOuterProps } from './outer';
import { _EuiPageInner as EuiPageInner, _EuiPageInnerProps } from './inner';
import { ComponentTypes } from './inner/page_inner';
import {
  _EuiPageBottomBar as EuiPageBottomBar,
  _EuiPageBottomBarProps,
} from './bottom_bar/page_bottom_bar';
import {
  _EuiPageEmptyPrompt as EuiPageEmptyPrompt,
  _EuiPageEmptyPromptProps,
} from './empty_prompt/page_empty_prompt';
import {
  EuiPageHeader,
  EuiPageHeaderProps,
  EuiPageSection,
  EuiPageSectionProps,
  EuiPageSidebar,
} from '../page';
import { _EuiPageRestrictWidth } from '../page/_restrict_width';
import { _EuiPageBottomBorder } from '../page/_bottom_border';
import { useEuiTheme, useGeneratedHtmlId } from '../../services';
import { logicalStyle } from '../../global_styling';
import { CommonProps } from '../common';

export const TemplateContext = createContext({
  section: {},
  header: {},
  emptyPrompt: {},
  bottomBar: {},
});

export type EuiPageTemplateProps = _EuiPageOuterProps &
  // We re-define the `border` prop below to be named more appropriately
  Omit<_EuiPageInnerProps, 'border' | 'component'> &
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
    minHeight?: CSSProperties['minHeight'];
    /**
     * To account for any fixed elements like headers,
     * pass in the value of the total height of those fixed elements.
     * Otherwise they will be calculated based on the data attributes on the body element.
     */
    offset?: number;
    /**
     * Passes through some common HTML attributes to the `main` content wrapper
     */
    mainProps?: CommonProps & HTMLAttributes<HTMLElement>;
    /**
     * Sets which HTML element to render for the `main` content wrapper
     * @default main
     */
    component?: ComponentTypes;
  };

const calculateOffset = (base: number): number => {
  if (typeof document === 'undefined') return 0; // SSR catch

  const euiHeaderFixedCounter = Number(document.body.dataset.fixedHeaders ?? 0);
  return base * 3 * euiHeaderFixedCounter;
};

/**
 * Consumed via `EuiPageTemplate`,
 * it controls and propogates most of the shared props per direct child
 */
export const _EuiPageTemplate: FunctionComponent<EuiPageTemplateProps> = ({
  children,
  // Shared props
  responsive = ['xs', 's'],
  restrictWidth = true,
  paddingSize = 'l',
  grow = true,
  bottomBorder,
  offset: _offset,
  panelled,
  // Inner props
  contentBorder,
  component,
  mainProps,
  // Outer props
  className,
  minHeight = '460px',
  ...rest
}) => {
  const { euiTheme } = useEuiTheme();

  const [offset, setOffset] = useState(
    () => _offset ?? calculateOffset(euiTheme.base)
  );
  const templateContext = useContext(TemplateContext);

  // Used as a target to insert the bottom bar component
  const pageInnerId = useGeneratedHtmlId({
    prefix: 'EuiPageTemplateInner',
    conditionalId: mainProps?.id,
  });

  useEffect(() => {
    if (_offset === undefined) {
      setOffset(calculateOffset(euiTheme.base));
    }
  }, [_offset, euiTheme.base]);

  // Sections include page header
  const sections: React.ReactElement[] = [];
  const sidebar: React.ReactElement[] = [];

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

  const getSectionProps = (): EuiPageSectionProps => ({
    restrictWidth,
    paddingSize,
    color: panelled === false ? 'transparent' : 'plain',
  });

  const getSideBarProps = () => ({
    paddingSize,
    responsive,
  });

  const getBottomBarProps = () => ({
    restrictWidth,
    paddingSize,
    // pageInnerId may contain colons that are parsed as pseudo-elements if not escaped
    parent: `#${CSS.escape(pageInnerId)}`,
  });

  const innerPanelled = () => panelled ?? Boolean(sidebar.length > 0);

  const innerBordered = () =>
    contentBorder !== undefined ? contentBorder : Boolean(sidebar.length > 0);

  React.Children.toArray(children).forEach((child, index) => {
    if (!React.isValidElement(child)) return; // Skip non-components

    if (
      child.type === EuiPageSidebar ||
      child.props.__EMOTION_TYPE_PLEASE_DO_NOT_USE__ === EuiPageSidebar
    ) {
      sidebar.push(
        React.cloneElement(child, {
          key: `sidebar${index}`,
          ...getSideBarProps(),
          // Allow their props overridden by appending the child props spread at the end
          ...child.props,
        })
      );
    } else {
      sections.push(child);
    }
  });

  const _minHeight = grow ? `max(${minHeight}, 100vh)` : minHeight;

  const classes = classNames('euiPageTemplate', className);
  const pageStyle = {
    ...logicalStyle('min-height', _minHeight),
    ...logicalStyle('padding-top', offset),
    ...rest.style,
  };

  templateContext.header = getHeaderProps();
  templateContext.section = getSectionProps();
  templateContext.emptyPrompt = {
    panelled: innerPanelled() ? true : panelled,
    grow: true,
  };
  templateContext.bottomBar = getBottomBarProps();

  return (
    <TemplateContext.Provider value={templateContext}>
      <EuiPageOuter
        {...rest}
        responsive={responsive}
        style={pageStyle}
        className={classes}
      >
        {sidebar}

        <EuiPageInner
          {...mainProps}
          component={component}
          id={pageInnerId}
          border={innerBordered()}
          panelled={innerPanelled()}
          responsive={responsive}
        >
          {sections}
        </EuiPageInner>
      </EuiPageOuter>
    </TemplateContext.Provider>
  );
};

const _EuiPageSection: FunctionComponent<EuiPageSectionProps> = (props) => {
  const templateContext = useContext(TemplateContext);

  return <EuiPageSection {...templateContext.section} grow {...props} />;
};

const _EuiPageHeader: FunctionComponent<EuiPageHeaderProps> = (props) => {
  const templateContext = useContext(TemplateContext);

  return <EuiPageHeader {...templateContext.header} {...props} />;
};

const _EuiPageEmptyPrompt: FunctionComponent<_EuiPageEmptyPromptProps> = (
  props
) => {
  const templateContext = useContext(TemplateContext);

  return <EuiPageEmptyPrompt {...templateContext.emptyPrompt} {...props} />;
};

const _EuiPageBottomBar: FunctionComponent<_EuiPageBottomBarProps> = (
  props
) => {
  const { bottomBar } = useContext(TemplateContext);

  return <EuiPageBottomBar {...bottomBar} {...props} />;
};

export const EuiPageTemplate = Object.assign(_EuiPageTemplate, {
  Sidebar: EuiPageSidebar,
  Header: _EuiPageHeader,
  Section: _EuiPageSection,
  BottomBar: _EuiPageBottomBar,
  EmptyPrompt: _EuiPageEmptyPrompt,
});
