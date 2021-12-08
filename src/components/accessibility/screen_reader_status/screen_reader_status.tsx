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
  listId: string;
  isActive: boolean;
  updatePrecipitate: number | string;
  content?: ReactNode;
}

export const EuiScreenReaderStatus: FunctionComponent<EuiScreenReaderStatusProps> = ({
  listId,
  isActive,
  updatePrecipitate,
  content,
}) => {
  const [toggle, setToggle] = useState(false);
  const [active, setActive] = useState(isActive);

  useEffect(() => {
    setToggle((toggle) => !toggle);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    // we want to update the toggle value only when `updatePrecipitate` changes
  }, [updatePrecipitate]);

  useEffect(() => {
    setActive(isActive);
  }, [isActive]);

  return (
    <EuiScreenReaderOnly>
      <div>
        <div
          id={`${listId}__status--A`}
          role="status"
          aria-atomic="true"
          aria-live="polite"
        >
          {active && toggle ? content : ''}
        </div>
        <div
          id={`${listId}__status--B`}
          role="status"
          aria-atomic="true"
          aria-live="polite"
        >
          {active && !toggle ? content : ''}
        </div>
      </div>
    </EuiScreenReaderOnly>
  );
};
