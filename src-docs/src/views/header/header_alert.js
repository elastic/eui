import React, { useState } from 'react';

import {
  EuiHeader,
  EuiHeaderSection,
  EuiHeaderSectionItem,
  EuiHeaderLogo,
  EuiHeaderLink,
  EuiHeaderLinks,
  EuiSpacer,
  EuiSwitch,
} from '../../../../src/components';

import HeaderUserMenu from './header_user_menu';
import HeaderSpacesMenu from './header_spaces_menu';
import HeaderUpdates from './header_updates';

export default () => {
  const [position, setPosition] = useState('static');

  const renderLogo = () => {
    return (
      <EuiHeaderLogo
        iconType="logoKibana"
        href="#/layout/nav-drawer"
        aria-label="Goes to home"
      />
    );
  };

  return (
    <>
      <EuiSwitch
        label={'Make header fixed position and put alerts in flyout'}
        checked={position === 'fixed'}
        onChange={e => setPosition(e.target.checked ? 'fixed' : 'static')}
      />
      <EuiSpacer />
      <EuiHeader position={position}>
        <EuiHeaderSection grow={false}>
          <EuiHeaderSectionItem border="right">
            {renderLogo()}
          </EuiHeaderSectionItem>
          <EuiHeaderSectionItem border="right">
            <HeaderSpacesMenu />
          </EuiHeaderSectionItem>
          <EuiHeaderLinks>
            <EuiHeaderLink href="#">Home</EuiHeaderLink>
          </EuiHeaderLinks>
        </EuiHeaderSection>

        <EuiHeaderSection side="right">
          <EuiHeaderSectionItem>
            <HeaderUpdates
              flyoutOrPopover={position === 'fixed' ? 'flyout' : 'popover'}
            />
          </EuiHeaderSectionItem>
          <EuiHeaderSectionItem>
            <HeaderUserMenu />
          </EuiHeaderSectionItem>
        </EuiHeaderSection>
      </EuiHeader>
    </>
  );
};
