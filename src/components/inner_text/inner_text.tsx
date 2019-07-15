import { FunctionComponent, ReactElement, useEffect, useState } from 'react';

type RefT = HTMLElement | Element | undefined | null;

export function useInnerText(
  innerTextFallback?: string
): [((node: RefT) => void), string | undefined] {
  const [ref, setRef] = useState<RefT>(null);
  const [innerText, setInnerText] = useState(innerTextFallback);
  const updateInnerText = (node: typeof ref) => {
    if (!node) return;
    setInnerText(
      // Check for `innerText` implementation rather than a simple OR check
      // because in real cases the result of `innerText` could correctly be `null`
      // while the result of `textContent` could correctly be non-`null` due to
      // differing reliance on browser layout calculations.
      // We prefer the result of `innerText`, if available.
      'innerText' in node ? node.innerText : node.textContent || undefined
    );
  };
  const observer = new MutationObserver(mutationsList => {
    if (mutationsList.length) updateInnerText(ref);
  });
  useEffect(() => {
    if (ref) {
      observer.disconnect();
      updateInnerText(ref);
      observer.observe(ref, {
        characterData: true,
        subtree: true,
      });
    }
    return () => {
      observer.disconnect();
    };
  }, [ref]);

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
