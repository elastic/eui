/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
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
): [((node: RefT) => void), string | undefined] {
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
    const observer = new MutationObserver(mutationsList => {
      if (mutationsList.length) updateInnerText(ref);
    });

    if (ref) {
      updateInnerText(ref);
      observer.observe(ref, {
        characterData: true,
        subtree: true,
      });
    }
    return () => {
      observer.disconnect();
    };
  }, [ref, updateInnerText]);

  return [setRef, innerText];
}

export interface EuiInnerTextProps {
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
