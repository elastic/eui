/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, {
  AriaAttributes,
  HTMLAttributes,
  FunctionComponent,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react';

import { EuiScreenReaderOnly } from '../screen_reader_only';

export interface EuiScreenReaderLiveProps {
  /**
   * Whether to make screen readers aware of the content
   */
  isActive?: boolean;
  /**
   * Content for screen readers to announce
   */
  children?: ReactNode;
  /**
   * `role` attribute for both live regions.
   *
   * https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Live_Regions#roles_with_implicit_live_region_attributes
   */
  role?: HTMLAttributes<HTMLDivElement>['role'];
  /**
   * `aria-live` attribute for both live regions
   */
  'aria-live'?: AriaAttributes['aria-live'];
  /**
   * On `children`/text change, the region will auto-focus itself, causing screen readers
   * to automatically read out the text content. This prop should primarily be used for
   * navigation or page changes, where programmatically resetting focus location back to
   * a certain part of the page is desired.
   */
  focusRegionOnTextChange?: boolean;
}

export const EuiScreenReaderLive: FunctionComponent<
  EuiScreenReaderLiveProps
> = ({
  children,
  isActive = true,
  role = 'status',
  'aria-live': ariaLive = 'polite',
  focusRegionOnTextChange = false,
}) => {
  const [toggle, setToggle] = useState(false);
  const focusRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setToggle((toggle) => !toggle);
  }, [children]);

  useEffect(() => {
    if (focusRef.current !== null && focusRegionOnTextChange) {
      focusRef.current.focus();
    }
  }, [toggle, focusRegionOnTextChange]);

  return (
    /**
     * Intentionally uses two persistent live regions with oscillating content updates.
     * This resolves the problem of duplicate screen reader announcements in rapid succession
     * caused by React's virtual DOM behaviour (https://github.com/nvaccess/nvda/issues/7996#issuecomment-413641709)
     *
     * Adapted from https://github.com/alphagov/accessible-autocomplete/blob/a7106f03150941fc15e6c1ceb0a90e8872fa86ef/src/status.js
     * Debouncing was not needed for this case, but could prove to be useful for future use cases.
     * See also https://github.com/AlmeroSteyn/react-aria-live and https://github.com/dequelabs/ngA11y
     * for more examples of the double region approach.
     */
    <EuiScreenReaderOnly>
      <div ref={focusRef} tabIndex={focusRegionOnTextChange ? -1 : undefined}>
        <div
          role={role}
          aria-atomic="true"
          // Setting `aria-hidden` and setting `aria-live` to "off" prevents
          // double announcements from VO when `focusRegionOnTextChange` is true
          aria-hidden={toggle ? undefined : 'true'}
          aria-live={!toggle || focusRegionOnTextChange ? 'off' : ariaLive}
        >
          {isActive && toggle ? children : ''}
        </div>
        <div
          role={role}
          aria-atomic="true"
          aria-hidden={!toggle ? undefined : 'true'}
          aria-live={toggle || focusRegionOnTextChange ? 'off' : ariaLive}
        >
          {isActive && !toggle ? children : ''}
        </div>
      </div>
    </EuiScreenReaderOnly>
  );
};
