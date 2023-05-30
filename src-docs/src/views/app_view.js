import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { toggleLocale as _toggleLocale } from '../actions';
import { GuidePageChrome, ThemeContext, GuidePageHeader } from '../components';
import { getLocale, getRoutes } from '../store';
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

export const AppView = ({ children, currentRoute }) => {
  const dispatch = useDispatch();
  const toggleLocale = (locale) => dispatch(_toggleLocale(locale));
  const locale = useSelector((state) => getLocale(state));
  const routes = useSelector((state) => getRoutes(state));
  const { theme } = useContext(ThemeContext);

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
      <GuidePageHeader onToggleLocale={toggleLocale} selectedLocale={locale} />
      <EuiPageTemplate
        paddingSize="none"
        restrictWidth={false}
        mainProps={{ id: 'start-of-content' }}
      >
        <EuiPageTemplate.Sidebar className="guideSideNav" sticky>
          <GuidePageChrome
            currentRoute={currentRoute}
            navigation={routes.navigation}
            onToggleLocale={toggleLocale}
            selectedLocale={locale}
          />
        </EuiPageTemplate.Sidebar>

        {children({ theme })}
      </EuiPageTemplate>
    </LinkWrapper>
  );
};

AppView.propTypes = {
  children: PropTypes.any,
  currentRoute: PropTypes.object.isRequired,
};

AppView.defaultProps = {
  currentRoute: {},
};
