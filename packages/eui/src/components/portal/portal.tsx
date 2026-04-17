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
  memo,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';

import { EuiNestedThemeContext } from '../../services';
import { usePropsWithComponentDefaults } from '../provider/component_defaults';

const usePortalEffect =
  typeof document === 'undefined' ? useEffect : useLayoutEffect;

const INSERT_POSITIONS = ['after', 'before'] as const;
type EuiPortalInsertPosition = (typeof INSERT_POSITIONS)[number];
const insertPositions: Record<EuiPortalInsertPosition, InsertPosition> = {
  after: 'afterend',
  before: 'beforebegin',
};

export interface EuiPortalProps {
  /**
   * ReactNode to render as this component's content
   */
  children: ReactNode;
  /**
   * If not specified, `EuiPortal` will insert itself
   * into the end of the `document.body` by default
   */
  insert?: { sibling: HTMLElement; position: EuiPortalInsertPosition };
  /**
   * Optional ref callback
   */
  portalRef?: (ref: HTMLDivElement | null) => void;
}

export const EuiPortal: FunctionComponent<EuiPortalProps> = memo((_props) => {
  const props = usePropsWithComponentDefaults('EuiPortal', _props);
  const { children, insert, portalRef: setPortalRef } = props;

  const portalRef = useRef(setPortalRef);

  const { hasDifferentColorFromGlobalTheme, colorClassName } = useContext(
    EuiNestedThemeContext
  );

  const [portalNode, setPortalNode] = useState<HTMLDivElement | null>(null);

  // Set the inherited color of the portal based on the wrapping EuiThemeProvider
  const setThemeColor = (portalNode: HTMLDivElement) => {
    if (hasDifferentColorFromGlobalTheme && insert == null) {
      portalNode.classList.add(colorClassName);
    }
  };

  const updatePortalRef = (ref: HTMLDivElement | null) => {
    portalRef.current?.(ref);
  };

  useEffect(() => {
    portalRef.current = setPortalRef;
  }, [setPortalRef]);

  /* Uses `useLayoutEffect` on client-side instead of `useEffect` to ensure the portal
  node is created and inserted into the DOM synchronously. This matches the same timing
  as the previous class component `componentDidMount` behavior.
  Using `useEffect` would add an additional render cycle that would break expected
  behavior of e.g. `@hello-pangea/dnd` which handles keyboard focus and doesn't expect
  a rerender. This falls back to `useEffect` for SSR to avoid console errors. `useEffect` will
  be a no-op, same as `componentDidMount` */
  usePortalEffect(() => {
    const node = document.createElement('div');
    node.dataset.euiportal = 'true';

    if (insert == null) {
      // no insertion defined, append to body
      document.body.appendChild(node);
    } else {
      // inserting before or after an element
      const { sibling, position } = insert;
      sibling.insertAdjacentElement(insertPositions[position], node);
    }

    setThemeColor(node);
    updatePortalRef(node);

    // Update state with portalNode to intentionally trigger component rerender
    // and call createPortal with the correct root element
    setPortalNode(node);

    return () => {
      if (node?.parentNode) {
        node.parentNode.removeChild(node);
      }

      updatePortalRef(null);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- on mount only
  }, []);

  if (!portalNode) {
    return null;
  }

  return createPortal(children, portalNode);
});

EuiPortal.displayName = 'EuiPortal';
