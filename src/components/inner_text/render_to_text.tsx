import React, { ReactNode, useEffect } from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { useInnerText } from './inner_text';

export function useRenderToText(node: ReactNode, placeholder = ''): string {
  const [ref, text] = useInnerText(placeholder);

  useEffect(() => {
    const hostNode = (document.createDocumentFragment() as unknown) as Element;
    render(<div ref={ref}>{node}</div>, hostNode);
    return () => {
      // since we're in React's lifecycle via `useEffect`, wait a
      // tick to escape otherwise React performs multiple unmounts 🤷
      requestAnimationFrame(() => {
        unmountComponentAtNode(hostNode);
      });
    };
  }, [node]);

  return text || placeholder;
}
