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
  useRef,
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

const isClient = typeof window !== 'undefined';

function createContainerElement(): HTMLDivElement {
  const element = document.createElement('div');
  element.dataset.euiportal = 'true';
  return element;
}

export const EuiPortal: FunctionComponent<EuiPortalProps> = ({
  children,
  insert,
  portalRef,
}) => {
  const themeContext = useContext(EuiNestedThemeContext);

  const [container] = useState<HTMLDivElement>(() => createContainerElement());
  const portalRefCached = useRef(portalRef);

  useEffect(() => {
    if (!isClient) {
      return;
    }

    // TODO: set container to a new element only when insert actually changes
    // /\ I don't think it's necessary anymore
    // setContainer(createContainerElement());
  }, [insert]);

  useEffect(() => {
    const portalRefFunc = portalRefCached.current;

    if (container) {
      if (insert) {
        const { sibling, position } = insert;
        sibling.insertAdjacentElement(insertPositions[position], container);
      } else {
        document.body.appendChild(container);

        if (themeContext?.hasDifferentColorFromGlobalTheme) {
          container.classList.add(themeContext.colorClassName)
        }
      }
    }

    if (portalRefFunc) {
      portalRefFunc(container);
    }

    return () => {
      container?.parentNode?.removeChild(container);

      if (portalRefFunc) {
        portalRefFunc(null);
      }
    };
  }, [container, insert]);

  return createPortal(children, container);
};
