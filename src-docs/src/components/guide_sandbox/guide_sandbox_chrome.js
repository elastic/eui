import React from 'react';
import PropTypes from 'prop-types';

import {
  Link,
} from 'react-router';

import {
  EuiIcon,
  EuiFlexGroup,
  EuiFlexItem,
} from '../../../../src/components';

import {
  GuideThemeSelector,
} from '../guide_theme_selector';

import {
  GuideSandboxChromeToggle,
} from './guide_sandbox_chrome_toggle';

export const GuideSandboxChrome = ({
  isVisible,
  onToggleTheme,
  onToggleSandboxChrome,
  selectedTheme,
}) => {
  const toggle = <GuideSandboxChromeToggle onClick={onToggleSandboxChrome} />;

  if (!isVisible) {
    return toggle;
  }

  return (
    <div className="guideSandboxChrome">
      <EuiFlexGroup alignItems="center" gutterSize="s">
        <EuiFlexItem grow={false}>
          <Link to="/">
            <EuiIcon type="logoKibana" size="m" />
          </Link>
        </EuiFlexItem>

        <EuiFlexItem grow={false}>
          <GuideThemeSelector
            onToggleTheme={onToggleTheme}
            selectedTheme={selectedTheme}
          />
        </EuiFlexItem>
      </EuiFlexGroup>

      {toggle}
    </div>
  );
};

GuideSandboxChrome.propTypes = {
  routes: PropTypes.array.isRequired,
  onToggleTheme: PropTypes.func.isRequired,
  onToggleSandboxChrome: PropTypes.func.isRequired,
  selectedTheme: PropTypes.string.isRequired,
  isVisible: PropTypes.bool,
};
