import PropTypes from 'prop-types';
import React, { useContext, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleLocale as _toggleLocale } from '../actions';
import { GuidePageChrome, ThemeContext, GuidePageHeader } from '../components';
import { getLocale, getRoutes } from '../store';

import {
  EuiPageTemplate,
  EuiSkipLink,
  EuiScreenReaderLive,
} from '../../../src/components';

import { keys } from '../../../src/services';

import { LinkWrapper } from './link_wrapper';

export const AppView = ({ children, currentRoute }) => {
  const dispatch = useDispatch();
  const toggleLocale = (locale) => dispatch(_toggleLocale(locale));
  const locale = useSelector((state) => getLocale(state));
  const routes = useSelector((state) => getRoutes(state));
  const { theme } = useContext(ThemeContext);

  const prevPath = useRef(currentRoute.path);

  useEffect(() => {
    const onKeydown = (event) => {
      if (event.target !== document.body) {
        return;
      }

      if (event.metaKey) {
        return;
      }

      if (event.key === keys.ARROW_LEFT) {
        pushRoute(routes.getPreviousRoute);
        return;
      }

      if (event.key === keys.ARROW_RIGHT) {
        pushRoute(routes.getNextRoute);
      }

      function pushRoute(getRoute) {
        const route = getRoute(currentRoute.name);

        if (route) {
          routes.history.push(`/${route.path}`);
        }
      }
    };

    document.addEventListener('keydown', onKeydown);

    return () => {
      document.removeEventListener('keydown', onKeydown);
    };
  }, []); // eslint-disable-line

  useEffect(() => {
    if (prevPath.current !== currentRoute.path) {
      window.scrollTo(0, 0);
      prevPath.current = currentRoute.path;
    }
  }, [currentRoute.path]);

  return (
    <LinkWrapper>
      <EuiScreenReaderLive focusRegionOnTextChange>
        {`${currentRoute.name} - Elastic UI Framework`}
      </EuiScreenReaderLive>
      <EuiSkipLink
        color="ghost"
        destinationId="start-of-content"
        position="fixed"
        overrideLinkBehavior
      >
        Skip to content
      </EuiSkipLink>
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
