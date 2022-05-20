import { useEffect, useState, FunctionComponent } from 'react';
import { useLocation } from 'react-router-dom';

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
    const headerOffset = 72;
    if (element) {
      window.scrollTo({
        top: element.offsetTop - headerOffset,
        behavior: 'smooth',
      });
    } else {
      window.scrollTo({
        behavior: 'auto',
        top: 0,
      });
    }
  }, [location, documentReadyState]);
  return null;
};

export default ScrollToHash;
