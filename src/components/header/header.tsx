/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, {
  FunctionComponent,
  HTMLAttributes,
  useEffect,
  useState,
  useRef,
} from 'react';
import classNames from 'classnames';

import { useEuiTheme, useEuiThemeCSSVariables } from '../../services';
import { mathWithUnits, logicalStyles } from '../../global_styling';
import { CommonProps } from '../common';
import { EuiBreadcrumb, EuiBreadcrumbsProps } from '../breadcrumbs';

import { EuiHeaderBreadcrumbs } from './header_breadcrumbs';
import {
  EuiHeaderSectionItem,
  EuiHeaderSectionItemProps,
  EuiHeaderSection,
} from './header_section';
import { euiHeaderStyles, euiHeaderVariables } from './header.styles';

type EuiHeaderSectionItemType = EuiHeaderSectionItemProps['children'];

export interface EuiHeaderSections {
  /**
   * An arry of items that will be wrapped in a #EuiHeaderSectionItem
   */
  items?: EuiHeaderSectionItemType[];
  /**
   * Breadcrumbs in the header cannot be wrapped in a #EuiHeaderSection in order for truncation to work.
   * Simply pass the array of EuiBreadcrumb objects
   */
  breadcrumbs?: EuiBreadcrumb[];
  /**
   * Other props to pass to #EuiHeaderBreadcrumbs
   */
  breadcrumbProps?: Omit<EuiBreadcrumbsProps, 'breadcrumbs'>;
}

const createHeaderSection = (sections: EuiHeaderSectionItemType[]) => {
  return sections.map((section, index) => {
    return <EuiHeaderSectionItem key={index}>{section}</EuiHeaderSectionItem>;
  });
};

export type EuiHeaderProps = CommonProps &
  HTMLAttributes<HTMLDivElement> & {
    /**
     * An array of objects to wrap in a #EuiHeaderSection.
     * Each section is spaced using `space-between`.
     * See #EuiHeaderSectionsProp for object details.
     * This prop disregards the prop `children` if both are passed.
     */
    sections?: EuiHeaderSections[];
    /**
     * Helper that positions the header against the window body and
     * adds the correct amount of top padding to the window when in `fixed` mode
     */
    position?: 'static' | 'fixed';
    /**
     * The `default` will inherit its coloring from the light or dark theme.
     * Or, force the header into pseudo `dark` theme for all themes.
     */
    theme?: 'default' | 'dark';
  };

export const EuiHeader: FunctionComponent<EuiHeaderProps> = ({
  children,
  className,
  sections,
  position = 'static',
  theme = 'default',
  ...rest
}) => {
  const classes = classNames('euiHeader', className);

  const euiTheme = useEuiTheme();
  const styles = euiHeaderStyles(euiTheme);
  const cssStyles = [styles.euiHeader, styles[position], styles[theme]];

  let contents;
  if (sections) {
    if (children) {
      // In case both children and sections are passed, warn in the console that the children will be disregarded
      console.warn(
        'EuiHeader cannot accept both `children` and `sections`. It will disregard the `children`.'
      );
    }

    contents = sections.map((section, index) => {
      const content = [];
      if (section.items) {
        // Items get wrapped in EuiHeaderSection and each item in a EuiHeaderSectionItem
        content.push(
          <EuiHeaderSection key={`items-${index}`}>
            {createHeaderSection(section.items)}
          </EuiHeaderSection>
        );
      }
      if (section.breadcrumbs) {
        content.push(
          // Breadcrumbs are separate and cannot be contained in a EuiHeaderSection
          // in order for truncation to work
          <EuiHeaderBreadcrumbs
            key={`breadcrumbs-${index}`}
            breadcrumbs={section.breadcrumbs}
            {...section.breadcrumbProps}
          />
        );
      }
      return content;
    });
  } else {
    contents = children;
  }

  return position === 'fixed' ? (
    <EuiFixedHeader css={cssStyles} className={classes} {...rest}>
      {contents}
    </EuiFixedHeader>
  ) : (
    <div css={cssStyles} className={classes} {...rest}>
      {contents}
    </div>
  );
};

/**
 * Fixed headers - logic around dynamically calculating the total
 * page offset and setting the `top` position of subsequent headers
 */

// Utility for tracking fixed headers and their heights so we can calculate the height offset
// Exported for unit testing only
export const fixedHeaderHeights = {
  map: new Map<HTMLElement, string>(), // string is a CSS height value, e.g. '48px'
  get headerElements() {
    return [...this.map.keys()];
  },
  get heightsArray() {
    return [...this.map.values()];
  },
  get totalHeight() {
    return this.sumHeightsWithUnits(this.heightsArray);
  },
  getIndexOf(headerEl: HTMLElement) {
    // Note: this takes advantage of the fact that Map key order is order of insertion
    return this.headerElements.indexOf(headerEl);
  },
  getTopPositionAt(headerIndex: number) {
    return this.sumHeightsWithUnits(this.heightsArray.slice(0, headerIndex));
  },
  sumHeightsWithUnits: (array: string[]) => {
    if (!array.length) return '0';

    // Slicing the array because mathWithUnits always needs a valid unit
    return array.slice(1).reduce((aString, bString) => {
      return mathWithUnits([aString, bString], (aNum, bNum) => aNum + bNum);
    }, array[0]);
  },
};

// Exported for unit testing only
export const EuiFixedHeader: FunctionComponent<EuiHeaderProps> = ({
  children,
  style,
  ...rest
}) => {
  const headerRef = useRef<HTMLDivElement | null>(null);

  const { setGlobalCSSVariables, globalCSSVariables } =
    useEuiThemeCSSVariables();
  const euiTheme = useEuiTheme();
  const headerHeight = euiHeaderVariables(euiTheme).height;
  const baseHeaderZIndex = Number(euiTheme.euiTheme.levels.header);

  useEffect(() => {
    const headerEl = headerRef.current!;

    fixedHeaderHeights.map.set(headerEl, headerHeight);
    setGlobalCSSVariables({
      '--euiFixedHeadersOffset': fixedHeaderHeights.totalHeight,
    });
    document.body.classList.add('euiBody--headerIsFixed'); // TODO: Consider deleting this legacy className

    return () => {
      fixedHeaderHeights.map.delete(headerEl);
      setGlobalCSSVariables({
        '--euiFixedHeadersOffset': fixedHeaderHeights.totalHeight,
      });
      if (fixedHeaderHeights.map.size === 0) {
        document.body.classList.remove('euiBody--headerIsFixed'); // TODO: Consider deleting this legacy className
      }
    };
  }, [headerHeight, setGlobalCSSVariables]);

  // Top position and z-index are calculated dynamically based on the order
  // fixed headers are rendered (or inserted/removed) in the DOM
  const [inlineStyles, setInlineStyles] = useState(style);

  // We're essentially only using this variable to trigger a re-position
  // on all other headers anywhere on the page
  const onGlobalVarChange = globalCSSVariables?.['--euiFixedHeadersOffset'];

  // This useEffect is called separately from the previous one so that if a header
  // (that's not the last) is removed, the following headers update their top
  // positions and z-indexes correctly
  useEffect(() => {
    const headerEl = headerRef.current!;
    const headerIndex = fixedHeaderHeights.getIndexOf(headerEl);
    const topPosition = fixedHeaderHeights.getTopPositionAt(headerIndex);
    const zIndex = baseHeaderZIndex + headerIndex;

    const styles = logicalStyles({ top: topPosition, zIndex, ...style });
    setInlineStyles(styles);
  }, [onGlobalVarChange, style, baseHeaderZIndex]);

  return (
    <div
      ref={headerRef}
      data-fixed-header={true} // Used by EuiFlyouts as a query selector
      style={inlineStyles}
      {...rest}
    >
      {children}
    </div>
  );
};
