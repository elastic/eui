import React, {
  useState,
  Fragment,
  FunctionComponent,
  ReactElement,
  ReactNode,
  useEffect,
} from 'react';

import { EuiFocusTrap } from '../../../../src/components/focus_trap';
import { EuiButton } from '../../../../src/components/button';

export const GuideFullScreen: FunctionComponent<{
  children: (setFullScreen: (isFullScreen: boolean) => void) => ReactElement;
  buttonText?: ReactNode;
  isFullScreen?: boolean;
}> = ({
  children,
  isFullScreen = false,
  buttonText = 'Show fullscreen demo',
}) => {
  const [fullScreen, setFullScreen] = useState(isFullScreen);

  // Watch for fullScreen status and appropriately add/remove body classes for hiding scroll
  useEffect(() => {
    if (fullScreen) {
      document.body.classList.add('guideBody--overflowHidden');
    }
    return () => {
      document.body.classList.remove('guideBody--overflowHidden');
    };
  }, [fullScreen]);

  return (
    <Fragment>
      <EuiButton onClick={() => setFullScreen(true)} iconType="fullScreen">
        {buttonText}
      </EuiButton>

      {fullScreen && <EuiFocusTrap>{children(setFullScreen)}</EuiFocusTrap>}
    </Fragment>
  );
};
