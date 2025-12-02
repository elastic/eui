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
  useMemo,
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
  EuiPageSidebarProps,
} from '../page';
import { _EuiPageRestrictWidth } from '../page/_restrict_width';
import { _EuiPageBottomBorder } from '../page/_bottom_border';
import { useGeneratedHtmlId } from '../../services';
import { logicalStyles } from '../../global_styling';
import { CommonProps } from '../common';

export const TemplateContext = createContext({
  sidebar: {},
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
  offset,
  panelled,
  // Inner props
  contentBorder,
  component,
  mainProps,
  // Outer props
  className,
  minHeight = '460px',
  style,
  ...rest
}) => {
  // Used as a target to insert the bottom bar component
  const pageInnerId = useGeneratedHtmlId({
    prefix: 'EuiPageTemplateInner',
    conditionalId: mainProps?.id,
  });

  // Sections include page header
  const [sidebar, sections] = useMemo(() => {
    const sidebar: React.ReactElement[] = [];
    const sections: React.ReactElement[] = [];

    React.Children.toArray(children).forEach((child) => {
      if (!React.isValidElement(child)) return; // Skip non-components

      if (
        child.type === _EuiPageSidebar ||
        child.props.__EMOTION_TYPE_PLEASE_DO_NOT_USE__ === _EuiPageSidebar
      ) {
        sidebar.push(child);
      } else {
        sections.push(child);
      }
    });

    return [sidebar, sections];
  }, [children]);

  const classes = classNames('euiPageTemplate', className);
  const pageStyle = useMemo(
    () =>
      logicalStyles({
        minHeight: grow ? `max(${minHeight}, 100vh)` : minHeight,
        paddingTop: offset ?? 'var(--euiFixedHeadersOffset, 0)',
        ...style,
      }),
    [minHeight, grow, offset, style]
  );

  const innerPanelled = panelled ?? Boolean(sidebar.length > 0);
  const innerBordered = contentBorder ?? Boolean(sidebar.length > 0);
  const headerBottomBorder =
    bottomBorder ?? (sidebar.length ? true : 'extended');

  const templateContext = useMemo(() => {
    return {
      sidebar: {
        paddingSize,
        responsive,
      },
      header: {
        restrictWidth,
        paddingSize,
        bottomBorder: headerBottomBorder,
        color: panelled === false ? 'transparent' : 'plain',
      },
      section: {
        restrictWidth,
        paddingSize,
        color: panelled === false ? 'transparent' : 'plain',
        grow: true,
      },
      emptyPrompt: {
        panelled: innerPanelled ? true : panelled,
        grow: true,
      },
      bottomBar: {
        restrictWidth,
        paddingSize,
        // pageInnerId may contain colons that are parsed as pseudo-elements if not escaped
        parent: `#${pageInnerId.replaceAll(':', '\\:')}`,
      },
    };
  }, [
    pageInnerId,
    restrictWidth,
    responsive,
    paddingSize,
    panelled,
    innerPanelled,
    headerBottomBorder,
  ]);

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
          border={innerBordered}
          panelled={innerPanelled}
          responsive={responsive}
        >
          {sections}
        </EuiPageInner>
      </EuiPageOuter>
    </TemplateContext.Provider>
  );
};

const _EuiPageSidebar: FunctionComponent<EuiPageSidebarProps> = (props) => {
  const { sidebar } = useContext(TemplateContext);

  return <EuiPageSidebar {...sidebar} {...props} />;
};

const _EuiPageSection: FunctionComponent<EuiPageSectionProps> = (props) => {
  const { section } = useContext(TemplateContext);

  return <EuiPageSection {...section} {...props} />;
};

const _EuiPageHeader: FunctionComponent<EuiPageHeaderProps> = (props) => {
  const { header } = useContext(TemplateContext);

  return <EuiPageHeader {...header} {...props} />;
};

const _EuiPageEmptyPrompt: FunctionComponent<_EuiPageEmptyPromptProps> = (
  props
) => {
  const { emptyPrompt } = useContext(TemplateContext);

  return <EuiPageEmptyPrompt {...emptyPrompt} {...props} />;
};

const _EuiPageBottomBar: FunctionComponent<_EuiPageBottomBarProps> = (
  props
) => {
  const { bottomBar } = useContext(TemplateContext);

  return <EuiPageBottomBar {...bottomBar} {...props} />;
};

export const EuiPageTemplate = Object.assign(_EuiPageTemplate, {
  Sidebar: _EuiPageSidebar,
  Header: _EuiPageHeader,
  Section: _EuiPageSection,
  BottomBar: _EuiPageBottomBar,
  EmptyPrompt: _EuiPageEmptyPrompt,
});
