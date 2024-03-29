/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent, HTMLAttributes } from 'react';
import classNames from 'classnames';

import { CommonProps } from '../common';

import { useEuiMemoizedStyles } from '../../services';
import { euiFacetGroupStyles } from './facet_group.styles';

export const LAYOUTS = ['vertical', 'horizontal'] as const;
export type EuiFacetGroupLayout = (typeof LAYOUTS)[number];

export const GUTTER_SIZES = ['none', 's', 'm', 'l'] as const;
export type EuiFacetGroupGutterSizes = (typeof GUTTER_SIZES)[number];

export type EuiFacetGroupProps = CommonProps &
  HTMLAttributes<HTMLDivElement> & {
    /**
     * Vertically in a column, or horizontally in one wrapping line
     */
    layout?: EuiFacetGroupLayout;
    /**
     * Distance between facet buttons.
     * Horizontal layout always adds more distance horizontally between buttons.
     */
    gutterSize?: EuiFacetGroupGutterSizes;
  };

export const EuiFacetGroup: FunctionComponent<EuiFacetGroupProps> = ({
  children,
  className,
  layout = 'vertical',
  gutterSize = 'm',
  ...rest
}) => {
  const styles = useEuiMemoizedStyles(euiFacetGroupStyles);
  const cssStyles = [
    styles.euiFacetGroup,
    styles.gutterSizes[layout][gutterSize],
    styles[layout],
  ];

  const classes = classNames('euiFacetGroup', className);

  return (
    <div className={classes} css={cssStyles} {...rest}>
      {children}
    </div>
  );
};
