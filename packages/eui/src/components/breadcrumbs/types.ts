/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import type {
  ReactNode,
  HTMLAttributes,
  AriaAttributes,
  MouseEventHandler,
} from 'react';
import type { EuiBreakpointSize } from '../../services';
import type { CommonProps } from '../common';
import type { EuiLinkColor } from '../link';
import type { EuiPopoverProps } from '../popover';

/**
 * Consumer facing type exports
 */

export type EuiBreadcrumbResponsiveMaxCount = {
  /**
   * Any of the following keys are allowed: `'xs' | 's' | 'm' | 'l' | 'xl'`
   * Omitting a key will display all breadcrumbs at that breakpoint
   */
  [key in EuiBreakpointSize]?: number;
};

export type EuiBreadcrumbsProps = CommonProps & {
  /**
   * Hides extra (above the max) breadcrumbs under a collapsed item as the window gets smaller.
   * Pass a custom {@link EuiBreadcrumbResponsiveMaxCount} object to change the number of breadcrumbs to show at the particular breakpoints.
   *
   * Pass `false` to turn this behavior off.
   *
   * Default: `{ xs: 1, s: 2, m: 4 }`
   */
  responsive?: boolean | EuiBreadcrumbResponsiveMaxCount;

  /**
   * Forces all breadcrumbs to single line and
   * truncates each breadcrumb to a particular width,
   * except for the last item
   */
  truncate?: boolean;

  /**
   * Collapses the inner items past the maximum set here
   * into a single ellipses item.
   * Omitting or passing a `0` value will show all breadcrumbs.
   */
  max?: number | null;

  /**
   * The array of individual {@link EuiBreadcrumb} items
   */
  breadcrumbs: EuiBreadcrumbProps[];

  /**
   * Determines breadcrumbs appearance, with `page` being the default styling.
   * Application breadcrumbs should only be once per page, in (e.g.) EuiHeader
   */
  type?: 'page' | 'application';

  /**
   * Whether the last breadcrumb should be semantically highlighted as the
   * current page. (improves accessibility for screen readers users)
   * Defaults to true.
   */
  lastBreadcrumbIsCurrentPage?: boolean;
};

export type EuiBreadcrumbProps = Omit<
  HTMLAttributes<HTMLElement>,
  'color' | 'aria-current'
> &
  CommonProps & {
    href?: string;
    rel?: string;
    onClick?: MouseEventHandler<HTMLAnchorElement>;
    /**
     * Visible label of the breadcrumb
     */
    text: ReactNode;
    /**
     * Force a max-width on the breadcrumb text
     */
    truncate?: boolean;
    /**
     * @deprecated - if a custom color is wanted, use the `css` prop to pass custom css
     */
    color?: EuiLinkColor;
    /**
     * Override the existing `aria-current` which defaults to `page` for the last breadcrumb
     */
    'aria-current'?: AriaAttributes['aria-current'];
    /**
     * Creates a breadcrumb that toggles a popover dialog. Takes any rendered node(s),
     * or a render function that will pass callback allowing you to close the
     * breadcrumb popover from within your popover content.
     *
     * If passed, both `href` and `onClick` will be ignored - the breadcrumb's
     * click behavior should only trigger a popover.
     */
    popoverContent?: ReactNode | ((closePopover: () => void) => ReactNode);
    /**
     * Allows customizing the popover if necessary. Accepts any props that
     * [EuiPopover](/#/layout/popover) accepts, except for props that control state.
     */
    popoverProps?: Omit<EuiPopoverProps, 'button' | 'closePopover' | 'isOpen'>;
  };

/**
 * Internal props set by parent EuiBreadcrumbs only
 */

export type _EuiBreadcrumbProps = {
  type: NonNullable<EuiBreadcrumbsProps['type']>;
  isFirstBreadcrumb?: boolean;
  isLastBreadcrumb?: boolean;
  isOnlyBreadcrumb?: boolean;
  highlightLastBreadcrumb?: boolean;
  truncateLastBreadcrumb?: boolean;
};
