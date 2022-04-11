/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent, HTMLAttributes } from 'react';
import classNames from 'classnames';
import { CommonProps } from '../../common';

import { _EuiPageRestrictWidth } from '../_restrict_width';
import { _EuiPageBottomBorder } from '../_bottom_border';

import { useEuiTheme } from '../../../services';
import {
  ALIGNMENTS,
  euiPageSectionStyles,
  euiPageSectionWidth,
} from './page_section.styles';

import {
  euiPaddingStyles,
  PADDING_SIZES,
  BACKGROUND_COLORS,
  euiBackgroundColorStyles,
} from '../../../global_styling';

export type EuiPageSectionProps = CommonProps &
  _EuiPageRestrictWidth &
  _EuiPageBottomBorder & {
    /**
     * Background color of the section;
     * Usually a lightened form of the brand colors
     */
    color?: typeof BACKGROUND_COLORS[number];
    /**
     * Padding for all four sides
     */
    paddingSize?: typeof PADDING_SIZES[number];
    /**
     * Horizontal and/or vertical alignment of the section contents
     */
    alignment?: typeof ALIGNMENTS[number];
    /**
     * When true the panel will grow in height to fill container if parent is a flex group
     */
    grow?: boolean;
    /**
     * Passed down to the div wrapper of the section contents
     */
    contentProps?: HTMLAttributes<HTMLDivElement>;
  } & Omit<HTMLAttributes<HTMLDivElement>, 'color'>;

export const EuiPageSection: FunctionComponent<EuiPageSectionProps> = ({
  children,
  className,
  alignment = 'top',
  restrictWidth = false,
  bottomBorder,
  paddingSize = 'l',
  color = 'transparent',
  grow = false,
  contentProps,
  ...rest
}) => {
  const useTheme = useEuiTheme();
  const styles = euiPageSectionStyles(useTheme);
  const inlinePadding = euiPaddingStyles(useTheme, 'inline');
  const blockPadding = euiPaddingStyles(useTheme, 'block');
  const colors = euiBackgroundColorStyles(useTheme);
  const width = euiPageSectionWidth(
    restrictWidth as _EuiPageRestrictWidth,
    alignment
  );

  const classes = classNames('euiPageSection', className);

  return (
    <div
      className={classes}
      css={[
        styles.base,
        grow && styles.grow,
        inlinePadding[paddingSize],
        bottomBorder === 'extended' && styles.border,
        // @ts-ignore HELP
        alignment && styles[alignment],
        // @ts-ignore HELP
        colors[color],
      ]}
      {...rest}
    >
      <div
        css={[
          blockPadding[paddingSize],
          bottomBorder === true && styles.border,
          width,
        ]}
        {...contentProps}
      >
        {children}
      </div>
    </div>
  );
};
