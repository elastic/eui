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
import { HTMLAttributes } from 'enzyme';
import { _EuiPageTemplate } from '../_template';
import { _EuiPageRestrictWidth } from '../_restrict_width';
import {
  EuiPageContentBody,
  EuiPageContentBodyProps,
} from './page_content_body';

export type EuiPageContentVerticalPositions = 'center';
export type EuiPageContentHorizontalPositions = 'center';

export type EuiPageContentProps = CommonProps &
  // Use only the div properties of EuiPanel (not button)
  _EuiPanelProps &
  Omit<_EuiPanelDivlike, 'onClick' | 'role'> &
  _EuiPageTemplate &
  _EuiPageRestrictWidth & {
    /**
     * There should only be one EuiPageContent per page and should contain the main contents.
     * If this is untrue, set role = `null`, or change it to match your needed aria role
     */
    role?: HTMLAttributes['role'] | null;
    border?: 'bottom' | 'bottomExtended' | 'top' | 'topExtended';
    /**
     * Usually used to turn off the bottom padding when tabs exist
     */
    paddingBottom?: boolean;
  };

export const EuiPageContent: FunctionComponent<EuiPageContentProps> = ({
  children,
  className,
  paddingSize = 'l',
  paddingBottom = true,
  template,
  role: _role = 'main',
  restrictWidth = false,
  border,
  style = {},
  ...rest
}) => {
  const role = _role === null ? undefined : _role;

  const classes = classNames(
    'euiPageContent',
    {
      'euiPageContent--flex': template === 'centeredContent',
    },
    className
  );

  if (paddingBottom === false) {
    style.paddingBottom = 0;
  }

  // If the new template specific props are not provided, just return a basic panel
  if (!template && !restrictWidth) {
    return (
      <EuiPanel
        className={classes}
        paddingSize={paddingSize}
        role={role}
        style={style}
        {...rest}
      >
        {children}
      </EuiPanel>
    );
  }

  const contentProps: Partial<_EuiPanelProps> = {
    paddingSize,
    borderRadius: rest.borderRadius || 'none',
    // All content should have white background unless empty
    color: template === 'empty' ? 'transparent' : rest.color,
    // If a template is decalared, ensure the whole the grows to stretch
    grow: rest.grow ?? true,
    hasShadow: false,
  };

  if (border?.includes('bottom')) {
    contentProps.hasBorder = '0 0 1px 0';
  } else if (border?.includes('top')) {
    contentProps.hasBorder = '1px 0 0 0';
  }

  const contentBodyProps: Partial<EuiPageContentBodyProps> = {
    paddingSize: 'none',
  };

  if (restrictWidth) {
    style.paddingTop = 0;
    style.paddingBottom = 0;
    contentBodyProps.paddingSize = paddingSize;
    contentBodyProps.style = { paddingLeft: 0, paddingRight: 0 };

    if (paddingBottom === false) {
      contentBodyProps.style.paddingBottom = 0;
    }

    // If border is not extended, add it to the body instead
    if (border === 'bottom') {
      contentProps.hasBorder = false;
      contentBodyProps.hasBorder = '0 0 1px 0';
    } else if (border === 'top') {
      contentProps.hasBorder = false;
      contentBodyProps.hasBorder = '1px 0 0 0';
    }
  }

  if (template === 'centeredContent') {
    contentBodyProps.verticalPosition = 'center';
    contentBodyProps.horizontalPosition = 'center';
  }

  return (
    <EuiPanel
      className={classes}
      role={role}
      style={style}
      {...contentProps}
      {...rest}
    >
      <EuiPageContentBody {...contentBodyProps} restrictWidth={restrictWidth}>
        {children}
      </EuiPageContentBody>
    </EuiPanel>
  );
};
