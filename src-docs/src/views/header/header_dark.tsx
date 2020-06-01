import React from 'react';

/**
 * Docs note: Consuming apps should import the theme via the export json file
 * import theme from '@elastic/eui/dist/eui_theme_light.json';
 */

import {
  EuiHeader,
  EuiHeaderLogo,
  EuiHeaderLinks,
  EuiHeaderLink,
  EuiHeaderSectionItemButton,
} from '../../../../src/components/header';
import { EuiBadge } from '../../../../src/components/badge';
import { EuiIcon } from '../../../../src/components/icon';
import { EuiAvatar } from '../../../../src/components/avatar';

export default ({ theme }: { theme: any }) => (
  <EuiHeader
    theme="dark"
    sections={[
      {
        items: [
          <EuiHeaderLogo
            iconType="logoElastic"
            href="/"
            aria-label="Goes to home">
            Elastic
          </EuiHeaderLogo>,
          <EuiHeaderLinks>
            <EuiHeaderLink href="#" isActive>
              Docs
            </EuiHeaderLink>

            <EuiHeaderLink href="#">Code</EuiHeaderLink>

            <EuiHeaderLink iconType="help" href="#">
              Help
            </EuiHeaderLink>
          </EuiHeaderLinks>,
        ],
        borders: 'right',
      },
      {
        items: [
          <EuiBadge
            color={theme.euiColorDarkestShade.rgba}
            iconType="arrowDown"
            iconSide="right">
            Production logs
          </EuiBadge>,
          <EuiHeaderSectionItemButton
            aria-label="Notifications"
            notification={'•'}>
            <EuiIcon type="cheer" size="m" />
          </EuiHeaderSectionItemButton>,
          <EuiHeaderSectionItemButton aria-label="Account menu">
            <EuiAvatar name="John Username" size="s" />
          </EuiHeaderSectionItemButton>,
        ],
        borders: 'none',
      },
    ]}
  />
);
