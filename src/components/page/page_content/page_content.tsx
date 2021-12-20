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
import { TEMPLATES } from '../_template';
import { _EuiPageRestrictWidth } from '../_restrict_width';
import {
  EuiPageContentBody,
  EuiPageContentBodyProps,
} from './page_content_body';

export type EuiPageContentProps = CommonProps &
  // Use only the div properties of EuiPanel (not button)
  _EuiPageRestrictWidth & {
    /**
     * Choose between 4 types of templates.
     * `default`: Typical layout with panelled content;
     * `centeredBody`: The panelled content is centered;
     * `centeredContent`: The content inside the panel is centered;
     * `empty`: Removes the panneling of the page content
     */
    template?: typeof TEMPLATES[number] | 'pageHeader';
    border?: 'bottom' | 'bottomExtended' | 'top' | 'topExtended';
    /**
     * Quickly turn on/off the background color (and other panel attributes)
     */
    panelled?: boolean;
    /**
     * Usually used to turn off the bottom padding when tabs exist
     */
    paddingBottom?: boolean;
  } & _EuiPanelProps &
  Omit<_EuiPanelDivlike, 'onClick' | 'role'>;

export const EuiPageContent: FunctionComponent<EuiPageContentProps> = ({
  children,
  className,
  paddingSize = 'l',
  paddingBottom = true,
  template,
  restrictWidth = false,
  border,
  panelled = true,
  style = {},
  ...rest
}) => {
  const color = panelled ? 'plain' : 'transparent';

  const classes = classNames(
    'euiPageContent',
    {
      'euiPageContent--flex': template === 'empty',
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
        color={color}
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

  if (template === 'empty') {
    contentBodyProps.verticalPosition = 'center';
    contentBodyProps.horizontalPosition = 'center';
  } else if (template === 'pageHeader') {
    contentProps.grow = rest.grow ?? false;
    contentProps.color = rest.color ?? 'transparent';
  }

  return (
    <EuiPanel
      className={classes}
      style={style}
      color={color}
      {...contentProps}
      {...rest}
    >
      <EuiPageContentBody {...contentBodyProps} restrictWidth={restrictWidth}>
        {children}
      </EuiPageContentBody>
    </EuiPanel>
  );
};
