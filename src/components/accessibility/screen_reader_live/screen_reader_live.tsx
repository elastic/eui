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
  useState,
} from 'react';

import { EuiScreenReaderOnly } from '../screen_reader_only';

export type EuiScreenReaderLiveProps = Pick<AriaAttributes, 'aria-live'> &
  Pick<HTMLAttributes<HTMLDivElement>, 'role'> & {
    /**
     * Whether the make screen readers aware of the content
     */
    isActive: boolean;
    /**
     * Content for screen readers to announce
     */
    children?: ReactNode;
    /**
     * `role` attribute for both live regions
     */
    role?: HTMLAttributes<HTMLDivElement>['role'];
    /**
     * `aria-live` attribute for both live regions
     */
    'aria-live'?: AriaAttributes['aria-live'];
  };

export const EuiScreenReaderLive: FunctionComponent<EuiScreenReaderLiveProps> = ({
  isActive,
  children,
  role = 'status',
  'aria-live': ariaLive = 'polite',
}) => {
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    setToggle((toggle) => !toggle);
  }, [children]);

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
      <div>
        <div role={role} aria-atomic="true" aria-live={ariaLive}>
          {isActive && toggle ? children : ''}
        </div>
        <div role={role} aria-atomic="true" aria-live={ariaLive}>
          {isActive && !toggle ? children : ''}
        </div>
      </div>
    </EuiScreenReaderOnly>
  );
};
