import React, {
  useState,
  useEffect,
  ReactNode,
  FunctionComponent,
} from 'react';
import { EuiImage } from '../../../../src/components/image';
import { EuiButton } from '../../../../src/components/button';
import { EuiFocusTrap } from '../../../../src/components/focus_trap';
import { EuiSpacer } from '../../../../src/components/spacer';
import { EuiSwitch } from '../../../../src/components/form';
import { EuiTextAlign } from '../../../../src/components/text';
import { useIsWithinBreakpoints } from '../../../../src/services/hooks';

import content from '../../images/content.svg';
import contentCenter from '../../images/content_center.svg';
import sideNav from '../../images/side_nav.svg';
import single from '../../images/single.svg';

export const PageDemo: FunctionComponent<{
  children?: (
    button: typeof EuiButton,
    Content: ReactNode,
    SideNav: ReactNode,
    showTemplate: boolean,
    BottomBar: ReactNode
  ) => ReactNode;
  centered?: boolean;
}> = ({ children, centered }) => {
  const isMobileSize = useIsWithinBreakpoints(['xs', 's']);
  const [showTemplate, setShowTemplate] = useState(true);
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

  const SideNav = () => (
    <EuiImage
      size={isMobileSize ? 'original' : 'fullWidth'}
      alt="Fake side nav list"
      url={isMobileSize ? single : sideNav}
    />
  );

  const Content = () => (
    <>
      <EuiImage
        size="fullWidth"
        alt="Fake paragraph"
        url={centered ? contentCenter : content}
      />
      {!centered && (
        <>
          <EuiSpacer />
          <EuiImage
            size="fullWidth"
            alt="Fake paragraph"
            url={centered ? contentCenter : content}
          />
        </>
      )}
    </>
  );

  const BottomBar = () => (
    <EuiButton size="s" color="ghost">
      Save
    </EuiButton>
  );

  return (
    <>
      <EuiFocusTrap disabled={!fullScreen}>
        <div
          className={
            fullScreen
              ? 'guideFullScreenOverlay guideFullScreenOverlay--withHeader'
              : 'guideDemo__highlightLayout'
          }>
          {children &&
            children(Button, Content, SideNav, showTemplate, BottomBar)}
        </div>
      </EuiFocusTrap>
      <EuiTextAlign textAlign="right">
        <EuiSpacer />
        <EuiSwitch
          label="Show with individual components"
          checked={!showTemplate}
          onChange={() => setShowTemplate((showing) => !showing)}
        />
      </EuiTextAlign>
    </>
  );
};
