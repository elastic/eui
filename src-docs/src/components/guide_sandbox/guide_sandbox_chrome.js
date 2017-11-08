import React from 'react';
import PropTypes from 'prop-types';

import {
  Link,
} from 'react-router';

import {
  GuideSandboxChromeToggle,
} from './guide_sandbox_chrome_toggle';

import {
  EuiIcon,
  EuiFlexGroup,
  EuiFlexItem,
} from '../../../../src/components';

export const GuideSandboxChrome = ({
  isVisible,
  onToggleTheme,
  onToggleSandboxChrome,
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
          <button
            onClick={onToggleTheme}
            className="guideSandboxChrome__link"
          >
            Theme
          </button>
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
  isVisible: PropTypes.bool,
};
