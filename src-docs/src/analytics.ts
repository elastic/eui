import { v4 as uuidv4 } from 'uuid';
import euiPackage from '../../package.json';
import { ReactNode, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

declare global {
  interface Window {
    dataLayer?: Array<Record<string, string>>;
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

function recordPageView({
  pathname,
  search,
}: {
  pathname: string;
  search: string;
}) {
  const [, pageCategory, pageSubCategory] = pathname.split('/');

  // `search` from react router, but since we're still on hash routing
  // any utm params are almost definitely on the landing page's pre-hash
  // part of the URL, so we fall back to looking for values there
  const foundSearchValues = search || window.location.search;
  const searchParams = new URLSearchParams(foundSearchValues);

  const pageView: Record<string, string> = {
    event: 'page_view',
    pagePath: `${window.location.pathname}${window.location.search}${window.location.hash}`,
    pageURL: window.location.href,
    pageTitle: window.document.title,
    pageTemplate: '',
    team: 'Elastic EUI',
    pageCategory,
    pageSubCategory,
    hostname: window.location.hostname,
    canonicalTag: window.location.href,
    euid,
    userAgent: navigator.userAgent,
    euiVersion: euiPackage.version,

    hashedIp: '',
  };

  // UTM/campaign data
  const utmSource = searchParams.get('utm_source');
  const utmMedium = searchParams.get('utm_medium');
  const utmCampaign = searchParams.get('utm_campaign');
  const utmTerm = searchParams.get('utm_term');
  const utmContent = searchParams.get('utm_content');
  if (utmSource) pageView.utm_source = utmSource;
  if (utmMedium) pageView.utm_medium = utmMedium;
  if (utmCampaign) pageView.utm_campaign = utmCampaign;
  if (utmTerm) pageView.utm_term = utmTerm;
  if (utmContent) pageView.utm_content = utmContent;

  dataLayer.push(pageView);
}

export const RecordPageViews = ({
  children,
}: {
  children: ReactNode;
}): ReactNode => {
  const location = useLocation();

  useEffect(() => {
    recordPageView(location);
  }, [location]);

  return children;
};
