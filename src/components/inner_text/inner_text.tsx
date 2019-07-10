import {
  FunctionComponent,
  ReactElement,
  Ref,
  RefObject,
  useEffect,
  useRef,
  useState,
} from 'react';

export function useInnerText(
  innerTextFallback?: string
): [RefObject<HTMLElement>, string | undefined] {
  const ref = useRef<HTMLElement>(null);
  const [innerText, setInnerText] = useState(innerTextFallback);
  useEffect(() => {
    if (ref && ref.current) {
      setInnerText(
        // Check for `innerText` implementation rather than a simple OR check
        // because in real cases the result of `innerText` could correctly be `null`
        // while the result of `textContent` could correctly be non-`null` due to
        // differing reliance on browser layout calculations.
        // We prefer the result of `innerText`, if available.
        'innerText' in ref.current
          ? ref.current.innerText
          : ref.current!.textContent || undefined
      );
    }
  }, [ref.current]);

  return [ref, innerText];
}

export interface EuiInnerTextProps {
  children: (ref?: Ref<HTMLElement>, innerText?: string) => ReactElement;
  fallback?: string;
}
export const EuiInnerText: FunctionComponent<EuiInnerTextProps> = ({
  children,
  fallback,
}) => {
  const [ref, innerText] = useInnerText(fallback);
  return children(ref, innerText);
};
