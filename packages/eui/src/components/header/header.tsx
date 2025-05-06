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
  useMemo,
  useCallback,
} from 'react';
import classNames from 'classnames';

import { useEuiMemoizedStyles, useEuiThemeCSSVariables } from '../../services';
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
   * An array of items that will be wrapped in a {@link EuiHeaderSectionItem}
   */
  items?: EuiHeaderSectionItemType[];
  /**
   * Breadcrumbs in the header cannot be wrapped in a {@link EuiHeaderSection} in order for truncation to work.
   * Simply pass the array of EuiBreadcrumb objects
   */
  breadcrumbs?: EuiBreadcrumb[];
  /**
   * Other props to pass to {@link EuiHeaderBreadcrumbs}
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
     * An array of objects to wrap in a {@link EuiHeaderSection}.
     * Each section is spaced using `space-between`.
     * See {@link EuiHeaderSections} for object details.
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

  const styles = useEuiMemoizedStyles(euiHeaderStyles);
  const cssStyles = [styles.euiHeader, styles[position], styles[theme]];

  if (sections && children) {
    // In case both children and sections are passed, warn in the console that the children will be disregarded
    console.warn(
      'EuiHeader cannot accept both `children` and `sections`. It will disregard the `children`.'
    );
  }

  const contents =
    useMemo(() => {
      if (!sections || !sections.length) return null;

      return sections.map((section, index) => {
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
    }, [sections]) || children;

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

// Start a counter to manage the total number of fixed headers
// Exported for unit testing only
export let euiFixedHeadersCount = 0;

// Exported for unit testing only
export const EuiFixedHeader: FunctionComponent<EuiHeaderProps> = ({
  children,
  style,
  ...rest
}) => {
  const { setGlobalCSSVariables } = useEuiThemeCSSVariables();
  const headerHeight = useEuiMemoizedStyles(euiHeaderVariables).height;
  const getHeaderOffset = useCallback(
    () => mathWithUnits(headerHeight, (x) => x * euiFixedHeadersCount),
    [headerHeight]
  );
  const [topPosition, setTopPosition] = useState<string | undefined>();

  useEffect(() => {
    // Get the top position from the offset of previous header(s)
    setTopPosition(getHeaderOffset());

    // Increment fixed header counter for each fixed header
    euiFixedHeadersCount++;
    setGlobalCSSVariables({
      '--euiFixedHeadersOffset': getHeaderOffset(),
    });
    document.body.classList.add('euiBody--headerIsFixed'); // TODO: Consider deleting this legacy className

    return () => {
      euiFixedHeadersCount--;
      setGlobalCSSVariables({
        '--euiFixedHeadersOffset': getHeaderOffset(),
      });
      if (euiFixedHeadersCount === 0) {
        document.body.classList.remove('euiBody--headerIsFixed'); // TODO: Consider deleting this legacy className
      }
    };
  }, [getHeaderOffset, setGlobalCSSVariables]);

  const inlineStyles = useMemo(
    () => logicalStyles({ top: topPosition, ...style }),
    [topPosition, style]
  );

  return (
    <div
      data-fixed-header={true} // Used by EuiFlyouts as a query selector
      style={inlineStyles}
      {...rest}
    >
      {children}
    </div>
  );
};
