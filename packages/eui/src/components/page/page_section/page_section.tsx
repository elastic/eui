/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, {
  FunctionComponent,
  ComponentType,
  HTMLAttributes,
  JSX,
} from 'react';
import { CommonProps } from '../../common';

import {
  setStyleForRestrictedPageWidth,
  _EuiPageRestrictWidth,
} from '../_restrict_width';
import { _EuiPageBottomBorder } from '../_bottom_border';

import { useEuiTheme } from '../../../services';
import {
  ALIGNMENTS,
  euiPageSectionContentStyles,
  euiPageSectionStyles,
} from './page_section.styles';

import {
  useEuiPaddingCSS,
  useEuiBackgroundColorCSS,
  EuiPaddingSize,
  _EuiBackgroundColor,
} from '../../../global_styling';

export type EuiPageSectionProps = CommonProps &
  _EuiPageRestrictWidth &
  _EuiPageBottomBorder & {
    /**
     * Background color of the section;
     * Usually a lightened form of the brand colors
     */
    color?: _EuiBackgroundColor;
    /**
     * Padding for all four sides
     */
    paddingSize?: EuiPaddingSize;
    /**
     * Horizontal and/or vertical alignment of the section contents
     */
    alignment?: (typeof ALIGNMENTS)[number];
    /**
     * When true the panel will grow in height to fill container if parent is a flex group
     */
    grow?: boolean;
    /**
     * Passed down to the div wrapper of the section contents
     */
    contentProps?: CommonProps & HTMLAttributes<HTMLDivElement>;
    /**
     * Sets which HTML element to render.
     */
    component?: keyof JSX.IntrinsicElements | ComponentType;
  } & Omit<HTMLAttributes<Element>, 'color'>;

export const EuiPageSection: FunctionComponent<EuiPageSectionProps> = ({
  children,
  alignment = 'top',
  restrictWidth = false,
  bottomBorder,
  paddingSize = 'l',
  color = 'transparent',
  grow = false,
  contentProps,
  component: Component = 'section',
  ...rest
}) => {
  // Set max-width as a style prop
  const widthStyles = setStyleForRestrictedPageWidth(
    restrictWidth,
    contentProps?.style
  );

  const useTheme = useEuiTheme();
  const styles = euiPageSectionStyles(useTheme);
  const inlinePadding = useEuiPaddingCSS('horizontal');
  const blockPadding = useEuiPaddingCSS('vertical');
  const colors = useEuiBackgroundColorCSS();

  const cssStyles = [
    styles.euiPageSection,
    grow && styles.grow,
    inlinePadding[paddingSize],
    bottomBorder === 'extended' && styles.border,
    alignment && styles[alignment],
    colors[color],
  ];

  const contentStyles = euiPageSectionContentStyles();

  const cssContentStyles = [
    contentStyles.euiPageSection__content,
    blockPadding[paddingSize],
    bottomBorder === true && styles.border,
    alignment.toLowerCase().includes('center') && contentStyles.center,
    restrictWidth && contentStyles.restrictWidth,
    contentProps?.css,
  ];

  return (
    <Component css={cssStyles} {...rest}>
      <div {...contentProps} css={cssContentStyles} style={widthStyles}>
        {children}
      </div>
    </Component>
  );
};
