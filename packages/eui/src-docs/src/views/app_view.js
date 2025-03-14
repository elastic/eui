import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { GuidePageChrome, GuidePageHeader } from '../components';
import { getRoutes } from '../store';
import {
  useScrollToHash,
  useHeadingAnchorLinks,
  LinkWrapper,
} from '../services';

import {
  EuiPageTemplate,
  EuiSkipLink,
  EuiScreenReaderLive,
} from '../../../src/components';

export const AppView = ({ children, currentRoute = {} }) => {
  const routes = useSelector((state) => getRoutes(state));

  const portalledHeadingAnchorLinks = useHeadingAnchorLinks();

  useScrollToHash();
  const { hash } = useLocation();

  return (
    <LinkWrapper>
      {/* Do not focus the screen reader region or announce a page change
      if navigating to directly to a hash - our scroll to hash logic takes
      care of focusing the correct region and announcing the page */}
      <EuiScreenReaderLive focusRegionOnTextChange={!hash}>
        {`${hash ? '— ' : ''}${currentRoute.name} — Elastic UI Framework`}
      </EuiScreenReaderLive>
      <EuiSkipLink
        destinationId="start-of-content"
        position="fixed"
        overrideLinkBehavior
      >
        Skip to content
      </EuiSkipLink>
      {portalledHeadingAnchorLinks}
      <GuidePageHeader />
      <EuiPageTemplate
        paddingSize="none"
        restrictWidth={false}
        mainProps={{ id: 'start-of-content' }}
      >
        <EuiPageTemplate.Sidebar className="guideSideNav" sticky hasEmbellish>
          <GuidePageChrome
            currentRoute={currentRoute}
            navigation={routes.navigation}
          />
        </EuiPageTemplate.Sidebar>

        {children}
      </EuiPageTemplate>
    </LinkWrapper>
  );
};
