import { useEffect, useState, FunctionComponent } from 'react';
import { useLocation } from 'react-router-dom';
import { isTabbable } from 'tabbable';

const ScrollToHash: FunctionComponent = () => {
  const location = useLocation();

  const [documentReadyState, setReadyState] = useState(document.readyState);
  useEffect(() => {
    const readyStateListener = () => setReadyState(document.readyState);
    document.addEventListener('readystatechange', readyStateListener);
    return () =>
      document.removeEventListener('readystatechange', readyStateListener);
  }, []);

  useEffect(() => {
    if (documentReadyState !== 'complete') return; // Wait for page to finish loading before scrolling
    const hash = location.hash.split('?')[0].replace('#', ''); // Remove any query params and the leading hash
    const element = document.getElementById(hash);
    const headerOffset = 48;
    if (element) {
      // Focus element for keyboard and screen reader users
      if (!isTabbable(element)) {
        element.tabIndex = -1;
        element.addEventListener(
          'blur',
          () => element.removeAttribute('tabindex'),
          { once: true }
        );
        element.focus();
      }
      // Scroll to element
      window.scrollTo({
        top: element.offsetTop - headerOffset,
        behavior: 'smooth',
      });
    } else {
      // Scroll back to top of page
      window.scrollTo({
        behavior: 'auto',
        top: 0,
      });
    }
  }, [location, documentReadyState]);
  return null;
};

export default ScrollToHash;
