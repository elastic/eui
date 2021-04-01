import { useEffect, FunctionComponent } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToHash: FunctionComponent = () => {
  const location = useLocation();
  useEffect(() => {
    const element = document.getElementById(location.hash.replace('#', ''));
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
  }, [location]);
  return null;
};

export default ScrollToHash;
