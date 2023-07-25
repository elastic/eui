/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, {
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  version as reactVersion,
} from 'react';
import { useInnerText } from './inner_text';
import type { Root } from 'react-dom/client';

// TODO: This hook should be refactored instead of fixed like this
function createRenderer(container: Element | DocumentFragment) {
  if (reactVersion.startsWith('18')) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { createRoot } = require('react-dom/client');

    let root: Root;
    return {
      render(node: ReactNode) {
        root = createRoot(container);
        root.render(node);
      },
      unmount() {
        root.unmount();
      },
    };
  } else {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { render, unmountComponentAtNode } = require('react-dom');

    return {
      render(node: ReactNode) {
        render(node, container);
      },
      unmount() {
        unmountComponentAtNode(container);
      },
    };
  }
}

export function useRenderToText(node: ReactNode, placeholder = ''): string {
  const [ref, text] = useInnerText(placeholder);
  const hostNode = useRef<Element | null>(null);

  const setRef = useCallback(
    (node: Element | null) => {
      if (hostNode.current) {
        ref(node);
      }
    },
    [ref]
  );

  useEffect(() => {
    hostNode.current = document.createDocumentFragment() as unknown as Element;
    const renderer = createRenderer(hostNode.current);
    renderer.render(<div ref={setRef}>{node}</div>);
    return () => {
      setTimeout(() => {
        if (hostNode.current) {
          renderer.unmount();
        }
      }, 0);
    };
  }, [node, setRef]);

  return text || placeholder;
}
