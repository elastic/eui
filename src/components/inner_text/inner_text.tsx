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
      setInnerText(ref.current.innerText);
    }
  }, [ref.current]);

  return [ref, innerText];
}

export const EuiInnerText: FunctionComponent<{
  children: (ref?: Ref<HTMLElement>, innerText?: string) => ReactElement;
}> = ({ children }) => {
  const [ref, innerText] = useInnerText();
  return children(ref, innerText);
};
