/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, {
  FunctionComponent,
  ReactNode,
  useEffect,
  useState,
} from 'react';

import { EuiScreenReaderOnly } from '../screen_reader_only';

export interface EuiScreenReaderStatusProps {
  /**
   * Use the `id` of the target element when possible
   */
  id: string;
  /**
   * Whether the make screen readers aware of the content
   */
  isActive: boolean;
  /**
   * A value to watch to trigger an update so that screen readers pick up changes
   */
  updatePrecipitate: number | string;
  /**
   * Content for screen readers to announce
   */
  children?: ReactNode;
}

export const EuiScreenReaderStatus: FunctionComponent<EuiScreenReaderStatusProps> = ({
  id,
  isActive,
  updatePrecipitate,
  children,
}) => {
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    setToggle((toggle) => !toggle);
  }, [updatePrecipitate]);

  return (
    <EuiScreenReaderOnly>
      <div>
        <div
          id={`${id}__status--A`}
          role="status"
          aria-atomic="true"
          aria-live="polite"
        >
          {isActive && toggle ? children : ''}
        </div>
        <div
          id={`${id}__status--B`}
          role="status"
          aria-atomic="true"
          aria-live="polite"
        >
          {isActive && !toggle ? children : ''}
        </div>
      </div>
    </EuiScreenReaderOnly>
  );
};
