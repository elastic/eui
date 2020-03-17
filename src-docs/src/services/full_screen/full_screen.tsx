import React, {
  useState,
  Fragment,
  FunctionComponent,
  ReactNode,
  useEffect,
} from 'react';

import { EuiFocusTrap } from '../../../../src/components/focus_trap';
import { EuiButton } from '../../../../src/components/button';

export const GuideFullScreen: FunctionComponent<{
  buttonText?: ReactNode;
  isFullScreen?: boolean;
}> = ({
  children,
  isFullScreen = false,
  buttonText = 'Show fullscreen demo',
}) => {
  const [fullScreen, setFullScreen] = useState(isFullScreen);

  useEffect(() => {
    setFullScreen(isFullScreen);
  }, [isFullScreen]);

  return (
    <Fragment>
      <EuiButton onClick={() => setFullScreen(true)} iconType="fullScreen">
        {buttonText}
      </EuiButton>

      {fullScreen && <EuiFocusTrap>{children}</EuiFocusTrap>}
    </Fragment>
  );
};
