/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import {
  FunctionComponent,
  ReactElement,
  useCallback,
  useEffect,
  useState,
} from 'react';

type RefT = HTMLElement | Element | undefined | null;

export function useInnerText(
  innerTextFallback?: string
): [(node: RefT) => void, string | undefined] {
  const [ref, setRef] = useState<RefT>(null);
  const [innerText, setInnerText] = useState(innerTextFallback);

  const updateInnerText = useCallback(
    (node: RefT) => {
      if (!node) return;
      setInnerText(
        // Check for `innerText` implementation rather than a simple OR check
        // because in real cases the result of `innerText` could correctly be `null`
        // while the result of `textContent` could correctly be non-`null` due to
        // differing reliance on browser layout calculations.
        // We prefer the result of `innerText`, if available.
        'innerText' in node
          ? node.innerText
          : node.textContent || innerTextFallback
      );
    },
    [innerTextFallback]
  );

  useEffect(() => {
    const observer = new MutationObserver((mutationsList) => {
      if (mutationsList.length) updateInnerText(ref);
    });

    if (ref) {
      updateInnerText(ref);
      observer.observe(ref, {
        characterData: true,
        subtree: true,
        childList: true,
      });
    }
    return () => {
      observer.disconnect();
    };
  }, [ref, updateInnerText]);

  return [setRef, innerText];
}

export interface EuiInnerTextProps {
  /**
   * ReactNode to render as this component's content
   */
  children: (ref?: (node: RefT) => void, innerText?: string) => ReactElement;
  fallback?: string;
}
export const EuiInnerText: FunctionComponent<EuiInnerTextProps> = ({
  children,
  fallback,
}) => {
  const [ref, innerText] = useInnerText(fallback);
  return children(ref, innerText);
};
