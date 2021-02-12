import React, {
  useState,
  useEffect,
  ReactNode,
  FunctionComponent,
} from 'react';
import { EuiImage } from '../../../../src/components/image';
import { EuiButton } from '../../../../src/components/button';
import { EuiFocusTrap } from '../../../../src/components/focus_trap';

import content from '../../images/content.svg';
import contentCenter from '../../images/content_center.svg';
import sideNav from '../../images/side_nav.svg';

export const PageDemo: FunctionComponent<{
  children?: (
    button: typeof EuiButton,
    Content: ReactNode,
    SideNav: ReactNode
  ) => ReactNode;
  centered?: boolean;
}> = ({ children, centered }) => {
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

  const Button = () => {
    return fullScreen ? (
      <EuiButton onClick={() => setFullScreen(false)} fill iconType="minimize">
        Exit fullscreen
      </EuiButton>
    ) : (
      <EuiButton onClick={() => setFullScreen(true)} fill iconType="fullScreen">
        Go fullscreen
      </EuiButton>
    );
  };

  const SideNav = () => <EuiImage alt="Fake side nav list" url={sideNav} />;
  const Content = () => (
    <EuiImage alt="Fake paragraph" url={centered ? contentCenter : content} />
  );

  return (
    <EuiFocusTrap disabled={!fullScreen}>
      <div
        className={
          fullScreen ? 'guideFullScreenOverlay' : 'guideDemo__highlightLayout'
        }>
        {children && children(Button, Content, SideNav)}
      </div>
    </EuiFocusTrap>
  );
};
