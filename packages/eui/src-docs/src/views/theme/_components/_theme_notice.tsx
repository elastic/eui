import React, { FunctionComponent } from 'react';
import { EuiCallOut, EuiLink } from '../../../../../src';

type ThemeNotice = {
  type?: 'support' | null;
};

export const ThemeNotice: FunctionComponent<ThemeNotice> = ({
  type = 'support',
}) => {
  const support = (
    <EuiCallOut color="warning" title="Partial component support">
      <p>
        EUI is transitioning to a CSS-in-JS solution for theming and requires
        consuming/customizing global variables in{' '}
        <strong>both the Sass and CSS-in-JS</strong> methods. To track this
        effort, subscribe to the{' '}
        <EuiLink href="https://github.com/elastic/eui/issues/3912">
          Meta ticket
        </EuiLink>
        .
      </p>
    </EuiCallOut>
  );

  switch (type) {
    case 'support':
      return support;
    default:
      return <></>;
  }
};
