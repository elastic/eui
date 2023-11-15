/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent } from 'react';

import { EuiCollapsibleNavItemProps } from '../collapsible_nav_item';

import { EuiCollapsedNavButton } from './collapsed_nav_button';
import { EuiCollapsedNavPopover } from './collapsed_nav_popover';
import classNames from 'classnames';

/**
 * The collapsed nav item state only shows on larger/non-mobile screens
 * and collapses top-level link/accordion items to only rendering icons.
 *
 * Accordions turn into popovers, links turn into icon buttons
 */

export const EuiCollapsedNavItem: FunctionComponent<
  EuiCollapsibleNavItemProps
> = ({
  className,
  href, // eslint-disable-line local/href-with-rel
  linkProps,
  items,
  // Extracted to avoid spreading to DOM node
  accordionProps,
  isCollapsible,
  ...props
}) => {
  const classes = classNames('euiCollapsedNavItem', className);

  return items ? (
    <EuiCollapsedNavPopover items={items} className={classes} {...props} />
  ) : (
    <EuiCollapsedNavButton
      href={href}
      linkProps={linkProps}
      className={classes}
      {...props}
    />
  );
};
