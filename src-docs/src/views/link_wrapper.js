import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function getParentAnchor(element) {
  while (element.nodeName !== 'A' && element.parentElement != null) {
    element = element.parentElement;
  }
  return element;
}

export const LinkWrapper = ({ children }) => {
  const history = useHistory();

  useEffect(() => {
    const onClick = (e) => {
      // don't prevent open-in-new-tab actions
      if (e.metaKey === true || e.ctrlKey === true) return;

      // look for an anchor ancestor
      const anchor = getParentAnchor(e.target);
      if (anchor && anchor.nodeName === 'A') {
        const href = anchor.getAttribute('href');
        // check if this is an internal link
        if (href.startsWith('#')) {
          if (href !== '#') {
            // a lone # character is used in the docs as a placeholder/demo value and should be ignored
            history.push(href.replace('#', ''));
          }
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
