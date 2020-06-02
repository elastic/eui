import React from 'react';
import { GuideFullScreen } from '../../services/full_screen/full_screen';

import {
  EuiButton,
  EuiHeader,
  EuiHeaderSection,
  EuiHeaderSectionItem,
  EuiHeaderLogo,
  EuiHeaderLink,
  EuiHeaderLinks,
  EuiIcon,
  EuiPage,
  EuiPageBody,
  EuiPageHeader,
  EuiPageHeaderSection,
  EuiPageContent,
  EuiPageContentHeader,
  EuiPageContentHeaderSection,
  EuiPageContentBody,
  EuiTitle,
} from '../../../../src/components';

import HeaderUserMenu from './header_user_menu';
import HeaderSpacesMenu from './header_spaces_menu';
import HeaderUpdates from './header_updates';

export default () => {
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
    <GuideFullScreen>
      {setIsFullScreen => (
        <div className="guideFullScreenOverlay" style={{ zIndex: 9000 }}>
          <EuiHeader>
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
                <HeaderUpdates />
              </EuiHeaderSectionItem>
              <EuiHeaderSectionItem>
                <HeaderUserMenu />
              </EuiHeaderSectionItem>
            </EuiHeaderSection>
          </EuiHeader>

          <EuiPage style={{ height: '100%' }}>
            <EuiPageBody>
              <EuiPageHeader>
                <EuiPageHeaderSection>
                  <EuiTitle size="m">
                    <h2>Kibana news feed demo</h2>
                  </EuiTitle>
                </EuiPageHeaderSection>
              </EuiPageHeader>
              <EuiPageContent>
                <EuiPageContentHeader>
                  <EuiPageContentHeaderSection>
                    <p>
                      Click the <EuiIcon type="cheer" size="m" /> button to see
                      ‘What’s new?’
                    </p>
                  </EuiPageContentHeaderSection>
                </EuiPageContentHeader>
                <EuiPageContentBody>
                  <EuiButton
                    fill
                    onClick={() => setIsFullScreen(false)}
                    iconType="exit"
                    aria-label="Exit fullscreen demo">
                    Exit fullscreen demo
                  </EuiButton>
                </EuiPageContentBody>
              </EuiPageContent>
            </EuiPageBody>
          </EuiPage>
        </div>
      )}
    </GuideFullScreen>
  );
};
