import { useEffect, ReactElement } from 'react';
import { useHistory } from 'react-router-dom';

function getParentAnchor(element: HTMLElement) {
  while (element.nodeName !== 'A' && element.parentElement != null) {
    element = element.parentElement;
  }
  return element;
}

export const LinkWrapper = ({ children }: { children: ReactElement }) => {
  const history = useHistory();

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      // don't prevent open-in-new-tab actions
      if (e.metaKey === true || e.ctrlKey === true) return;

      // look for an anchor ancestor
      const anchor = getParentAnchor(e.target as HTMLElement);
      if (anchor && anchor.nodeName === 'A') {
        const href = anchor.getAttribute('href');
        // check if this is an internal link
        if (href?.startsWith('#/')) {
          history.push(href.replace('#', ''));
          e.preventDefault();
        }
      }
    };

    document.addEventListener('click', onClick);
    return () => {
      document.removeEventListener('click', onClick);
    };
  }, [history]);

  return children;
};
