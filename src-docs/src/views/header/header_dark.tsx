import React from 'react';

import {
  EuiHeader,
  EuiHeaderLogo,
  EuiHeaderLinks,
  EuiHeaderLink,
  EuiHeaderSectionItemButton,
  EuiBadge,
  EuiIcon,
  EuiAvatar,
  useEuiTheme,
} from '../../../../src';

export default () => {
  const { euiTheme } = useEuiTheme();

  return (
    <EuiHeader
      theme="dark"
      sections={[
        {
          items: [
            <EuiHeaderLogo>Elastic</EuiHeaderLogo>,
            <EuiHeaderLinks aria-label="App navigation dark theme example">
              <EuiHeaderLink isActive>Docs</EuiHeaderLink>
              <EuiHeaderLink>Code</EuiHeaderLink>
              <EuiHeaderLink iconType="help"> Help</EuiHeaderLink>
            </EuiHeaderLinks>,
          ],
        },
        {
          items: [
            <EuiBadge
              color={euiTheme.colors.darkestShade}
              iconType="arrowDown"
              iconSide="right"
            >
              Production logs
            </EuiBadge>,
            <EuiHeaderSectionItemButton
              aria-label="2 Notifications"
              notification={'2'}
            >
              <EuiIcon type="cheer" size="m" />
            </EuiHeaderSectionItemButton>,
            <EuiHeaderSectionItemButton aria-label="Account menu">
              <EuiAvatar name="John Username" size="s" />
            </EuiHeaderSectionItemButton>,
          ],
        },
      ]}
    />
  );
};
