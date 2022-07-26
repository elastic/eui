/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

/**
 * NOTE: We can't test this component because Enzyme doesn't support rendering
 * into portals.
 */

import { useState, useEffect, ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { keysOf } from '../common';
import { useUpdateEffect } from '../../services';

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

export const EuiPortal: React.FC<EuiPortalProps> = ({
  insert,
  portalRef,
  children,
}) => {
  const [portalNode, setPortalNode] = useState<HTMLDivElement | null>(null);

  // pull `sibling` and `position` out of insert in case their wrapping object is recreated every render
  const { sibling, position } = insert || {};
  useEffect(() => {
    const portalNode = document.createElement('div');
    portalNode.dataset.euiportal = 'true';
    setPortalNode(portalNode);

    if (sibling == null || position == null) {
      // no insertion defined, append to body
      document.body.appendChild(portalNode);
    } else {
      // inserting before or after an element
      sibling.insertAdjacentElement(insertPositions[position], portalNode);
    }

    return () => {
      if (portalNode && portalNode.parentNode) {
        portalNode.parentNode.removeChild(portalNode);
      }
    };
  }, [sibling, position]);

  useUpdateEffect(() => {
    portalRef?.(portalNode);

    return () => {
      portalRef?.(null);
    };
  }, [portalNode, portalRef]);

  return portalNode == null ? null : createPortal(children, portalNode);
};
