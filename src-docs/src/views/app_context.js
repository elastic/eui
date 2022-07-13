import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { Helmet } from 'react-helmet';
import { useSelector } from 'react-redux';
import createCache from '@emotion/cache';
import { ThemeContext } from '../components';
import { translateUsingPseudoLocale } from '../services';
import { getLocale } from '../store';

import { EuiContext, EuiProvider } from '../../../src/components';
import { EUI_THEMES } from '../../../src/themes';

import favicon16Prod from '../images/favicon/prod/favicon-16x16.png';
import favicon32Prod from '../images/favicon/prod/favicon-32x32.png';
import favicon96Prod from '../images/favicon/prod/favicon-96x96.png';
import favicon16Dev from '../images/favicon/dev/favicon-16x16.png';
import favicon32Dev from '../images/favicon/dev/favicon-32x32.png';
import favicon96Dev from '../images/favicon/dev/favicon-96x96.png';

const generalEmotionCache = createCache({
  key: 'css',
  container: document.querySelector('meta[name="emotion-styles"]'),
});
generalEmotionCache.compat = true;
const utilityCache = createCache({
  key: 'util',
  container: document.querySelector('meta[name="emotion-styles-utility"]'),
});

export const AppContext = ({ children }) => {
  const { theme } = useContext(ThemeContext);
  const locale = useSelector((state) => getLocale(state));

  const mappingFuncs = {
    'en-xa': translateUsingPseudoLocale,
  };

  const i18n = {
    mappingFunc: mappingFuncs[locale],
    formatNumber: (value) => new Intl.NumberFormat(locale).format(value),
    locale,
  };

  const isLocalDev = window.location.host.includes('803');

  return (
    <EuiProvider
      cache={{
        default: generalEmotionCache,
        utility: utilityCache,
      }}
      theme={EUI_THEMES.find((t) => t.value === theme)?.provider}
      colorMode={theme.includes('light') ? 'light' : 'dark'}
    >
      <Helmet>
        <link
          rel="icon"
          type="image/png"
          href={isLocalDev ? favicon16Dev : favicon16Prod}
          sizes="16x16"
        />
        <link
          rel="icon"
          type="image/png"
          href={isLocalDev ? favicon32Dev : favicon32Prod}
          sizes="32x32"
        />
        <link
          rel="icon"
          type="image/png"
          href={isLocalDev ? favicon96Dev : favicon96Prod}
          sizes="96x96"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:slnt,wght@-10,300..700;0,300..700&family=Roboto+Mono:ital,wght@0,400..700;1,400..700&display=swap"
          rel="stylesheet"
        />
      </Helmet>
      <EuiContext i18n={i18n}>{children}</EuiContext>
    </EuiProvider>
  );
};

AppContext.propTypes = {
  children: PropTypes.any,
  currentRoute: PropTypes.object.isRequired,
};

AppContext.defaultProps = {
  currentRoute: {},
};
