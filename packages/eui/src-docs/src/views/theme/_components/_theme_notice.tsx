import React from 'react';
import { Link } from 'react-router-dom';
import { EuiCallOut, EuiLink } from '../../../../../src';

export const ThemeNotice = () => (
  <EuiCallOut
    color="danger"
    iconType="errorFilled"
    title="EUI's Sass utilities are slated for deprecation"
  >
    <p>
      EUI is transitioning to a CSS-in-JS solution for theming, and will
      eventually deprecate all exported Sass variables and mixins. We strongly
      recommend moving your usages of Sass to{' '}
      <Link to="/theming/theme-provider#consuming-with-emotions-theming">
        Emotion
      </Link>{' '}
      or other CSS-in-JS solutions. To track this migration, subscribe to the{' '}
      <EuiLink href="https://github.com/elastic/eui/issues/3912">
        Meta ticket
      </EuiLink>
      .
    </p>
  </EuiCallOut>
);
