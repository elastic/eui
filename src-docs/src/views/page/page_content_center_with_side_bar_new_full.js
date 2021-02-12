import React, { useState, useEffect } from 'react';

import {
  EuiPage,
  EuiPageContent,
  EuiEmptyPrompt,
  EuiPageHeader,
  EuiPageSideBar,
  EuiButton,
  EuiFocusTrap,
} from '../../../../src/components';

export default () => {
  /**
   * FullScreen for docs only
   */
  const [fullScreen, setFullScreen] = useState(false);
  useEffect(() => {
    if (fullScreen) {
      document.body.classList.add('guideBody--overflowHidden');
    }
    return () => {
      document.body.classList.remove('guideBody--overflowHidden');
    };
  }, [fullScreen]);

  const actionButton = fullScreen ? (
    <EuiButton
      iconType="minimize"
      color="primary"
      onClick={() => {
        setFullScreen(false);
      }}>
      Exit full screen
    </EuiButton>
  ) : (
    <EuiButton onClick={() => setFullScreen(true)} fill iconType="fullScreen">
      Show fullscreen demo
    </EuiButton>
  );

  return (
    <EuiFocusTrap disabled={!fullScreen}>
      <EuiPage
        className={fullScreen && 'guideFullScreenOverlay'}
        paddingSize="none">
        <EuiPageSideBar>SideBar nav</EuiPageSideBar>

        <EuiPageContent
          borderRadius="none"
          style={{ display: 'flex', flexDirection: 'column' }}>
          <EuiPageHeader
            iconType="logoElastic"
            pageTitle="Page title"
            rightSideItems={[actionButton]}
          />

          <EuiPageContent
            verticalPosition="center"
            horizontalPosition="center"
            paddingSize="none"
            color="subdued"
            hasShadow={false}>
            <EuiEmptyPrompt
              title={<span>No spice</span>}
              body={
                <p>
                  Navigators use massive amounts of spice to gain a limited form
                  of prescience.{' '}
                </p>
              }
            />
          </EuiPageContent>
        </EuiPageContent>
      </EuiPage>
    </EuiFocusTrap>
  );
};
