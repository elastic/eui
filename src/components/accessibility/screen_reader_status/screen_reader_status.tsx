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

import { debounce } from '../../../services';

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
  const [debounced, setDebounced] = useState(false);
  const [active, setActive] = useState(false);

  const debounceStatusUpdate = debounce(() => {
    if (!debounced) {
      setToggle((toggle) => !toggle);
      setDebounced(true);
      setActive(isActive);
    }
  }, 1400);

  useEffect(() => {
    setDebounced(false);
  }, [updatePrecipitate, isActive]);

  useEffect(() => {
    debounceStatusUpdate();
  }, [debounced]); // eslint-disable-line

  return (
    <EuiScreenReaderOnly>
      <div>
        <div
          id={`${listId}__status--A`}
          role="status"
          aria-atomic="true"
          aria-live="polite"
        >
          {active && debounced && toggle ? content : ''}
        </div>
        <div
          id={`${listId}__status--B`}
          role="status"
          aria-atomic="true"
          aria-live="polite"
        >
          {active && debounced && !toggle ? content : ''}
        </div>
      </div>
    </EuiScreenReaderOnly>
  );
};
