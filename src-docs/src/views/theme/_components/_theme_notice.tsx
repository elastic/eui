import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import { EuiSpacer, EuiCallOut } from '../../../../../src';

type ThemeNotice = {
  type?: 'required' | 'support' | 'both' | null;
};

export const ThemeNotice: FunctionComponent<ThemeNotice> = ({
  type = 'required',
}) => {
  const required = (
    <EuiCallOut title="EuiThemeProvider required" color="warning">
      <p>
        The following page assumes that you have wrapped your entire application
        with the new <Link to="/theming/theme-provider">EuiThemeProvider</Link>.
      </p>
    </EuiCallOut>
  );

  const support = (
    <EuiCallOut color="danger" title="Partial component support">
      <p>
        The <Link to="/theming/theme-provider">EuiThemeProvider</Link> is only
        available for <strong>consuming</strong> the values. Modifying or
        overriding the values will not have any effect on the individual EUI
        components, yet. Instead, you will need to use the{' '}
        <Link to="/theming/sass">Sass method</Link>.
      </p>
    </EuiCallOut>
  );

  switch (type) {
    case 'required':
      return required;
    case 'support':
      return support;
    case 'both':
      return (
        <>
          {required}
          <EuiSpacer />
          {support}
        </>
      );
    default:
      return <></>;
  }
};
