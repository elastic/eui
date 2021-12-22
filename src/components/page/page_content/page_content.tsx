/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent } from 'react';
import classNames from 'classnames';
import { CommonProps } from '../../common';

import { EuiPanel, _EuiPanelProps, _EuiPanelDivlike } from '../../panel/panel';
import { _EuiPageRestrictWidth } from '../_restrict_width';
import { _EuiPageBottomBorder } from '../_bottom_border';

import {
  EuiPageContentBody,
  EuiPageContentBodyProps,
} from './page_content_body';

export type EuiPageContentPositions = 'top' | 'center' | 'horizontalCenter';

export type EuiPageContentProps = CommonProps &
  // Use only the div properties of EuiPanel (not button)
  _EuiPageRestrictWidth &
  _EuiPageBottomBorder & {
    alignment?: EuiPageContentPositions;
    /**
     * Quickly turn on/off the background color (and other panel attributes)
     */
    panelled?: boolean;
    bodyProps?: EuiPageContentBodyProps;
  } & _EuiPanelProps &
  Omit<_EuiPanelDivlike, 'onClick' | 'role'>;

export const EuiPageContent: FunctionComponent<EuiPageContentProps> = ({
  children,
  className,
  paddingSize = 'l',
  alignment,
  restrictWidth = false,
  bottomBorder,
  panelled = true,
  grow = true,
  bodyProps,
  style = {},
  ...rest
}) => {
  const isTemplate = restrictWidth || bottomBorder || alignment;
  const color = panelled ? 'plain' : 'transparent';

  const classes = classNames(
    'euiPageContent',
    {
      'euiPageContent--flex': isTemplate,
      'euiPageContent--bottomBorder': bottomBorder === 'extended',
      [`euiPageContent--${alignment}`]: alignment,
    },
    className
  );

  // If the new template specific props are not provided, just return a basic panel
  if (!isTemplate) {
    return (
      <EuiPanel
        className={classes}
        paddingSize={paddingSize}
        color={color}
        style={style}
        grow={grow}
        {...rest}
      >
        {children}
      </EuiPanel>
    );
  }

  const contentProps: Partial<_EuiPanelProps> = {
    paddingSize,
    borderRadius: 'none',
    hasShadow: false,
  };

  style.paddingTop = 0;
  style.paddingBottom = 0;

  const contentBodyProps: Partial<EuiPageContentBodyProps> = {
    paddingSize,
    style: { paddingLeft: 0, paddingRight: 0 },
  };

  if (alignment?.toLowerCase().includes('center')) {
    contentBodyProps.style!.width = 'auto';
  }

  return (
    <EuiPanel
      className={classes}
      {...contentProps}
      style={style}
      color={color}
      grow={grow}
      {...rest}
    >
      <EuiPageContentBody
        {...contentBodyProps}
        bottomBorder={bottomBorder === true}
        restrictWidth={restrictWidth}
        {...bodyProps}
      >
        {children}
      </EuiPageContentBody>
    </EuiPanel>
  );
};
