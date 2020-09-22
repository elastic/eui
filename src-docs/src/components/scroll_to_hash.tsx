import { useEffect, FunctionComponent } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToHash: FunctionComponent = () => {
  const location = useLocation();
  useEffect(() => {
    setTimeout(() => {
      const element = document.getElementById(location.hash.replace('#', ''));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({
          behavior: 'auto',
          top: 0,
        });
      }
    }, 500);
  }, [location]);
  return null;
};

export default ScrollToHash;
