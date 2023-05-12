/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import {
  FunctionComponent,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import { keysOf } from '../common';
import { EuiNestedThemeContext } from '../../services';

interface InsertPositionsMap {
  after: InsertPosition;
  before: InsertPosition;
}

export const insertPositions: InsertPositionsMap = {
  after: 'afterend',
  before: 'beforebegin',
};

type EuiPortalInsertPosition = keyof typeof insertPositions;

export const INSERT_POSITIONS: EuiPortalInsertPosition[] = keysOf(
  insertPositions
);

export interface EuiPortalProps {
  /**
   * ReactNode to render as this component's content
   */
  children: ReactNode;
  insert?: { sibling: HTMLElement; position: 'before' | 'after' };
  portalRef?: (ref: HTMLDivElement | null) => void;
}

export const EuiPortal: FunctionComponent<EuiPortalProps> = ({
  children,
  insert,
  portalRef,
}) => {
  const themeContext = useContext(EuiNestedThemeContext);

  const [container] = useState(() => {
    const element = document.createElement('div');
    element.dataset.euiportal = 'true';
    return element;
  });
  const [portalRefCache] = useState(() => portalRef);

  useEffect(() => {
    if (insert) {
      const { sibling, position } = insert;
      sibling.insertAdjacentElement(insertPositions[position], container);
    } else {
      document.body.appendChild(container);

      if (themeContext?.hasDifferentColorFromGlobalTheme) {
        container.classList.add(themeContext.colorClassName)
      }
    }

    if (portalRefCache) {
      portalRefCache(container);
    }

    return () => {
      container.parentNode?.removeChild(container);

      if (portalRefCache) {
        portalRefCache(null);
      }
    };
  }, [container, insert, portalRefCache]);

  return createPortal(children, container);
};
