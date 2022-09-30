import { v4 as uuidv4 } from 'uuid';
import euiPackage from '../../package.json';
import { ReactNode, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

declare global {
  interface Window {
    dataLayer?: object[];
  }
}

const dataLayer = (window.dataLayer = window.dataLayer || []);

// get existing euid cookie or create a new one
const euid = getElasticUID();

function getElasticUID(): string {
  // regex from https://stackoverflow.com/a/21125098
  // (^| ) - match start of string or a leading space
  // euid= - cookie name followed by an equals
  // ([^;]+) - greedy collection of any character that isn't a semicolon
  const euidCookieValue = document.cookie.match(/(^| )euid=([^;]+)/);
  let euid;
  if (euidCookieValue) {
    euid = euidCookieValue[2];
  } else {
    euid = uuidv4();

    const expdate = new Date();
    expdate.setTime(expdate.getTime() + 10 * 365 * 24 * 60 * 60 * 1000); // ~10 years

    document.cookie = `euid=${euid}; expires=${expdate.toUTCString()}; path=/; Domain=.elastic.co`;
  }
  return euid;
}

function recordPageView() {
  dataLayer.push({
    event: 'page_view',
    PagePath: `${window.location.pathname}${window.location.search}${window.location.hash}`,
    PageURL: window.location.href,
    PageTitle: window.document.title,
    PageTemplate: '',
    Team: 'Elastic EUI',
    PageCategory: '',
    Hostname: window.location.hostname,
    CanonicalTag: window.location.href,
    euid,
    userAgent: navigator.userAgent,
    euiVersion: euiPackage.version,
  });
}

export const RecordPageViews = ({
  children,
}: {
  children: ReactNode;
}): ReactNode => {
  const location = useLocation();

  useEffect(() => {
    recordPageView();
  }, [location]);

  return children;
};
