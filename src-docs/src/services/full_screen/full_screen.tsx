import React, {
  useState,
  Fragment,
  FunctionComponent,
  ReactElement,
  ReactNode,
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

  return (
    <Fragment>
      <EuiButton onClick={() => setFullScreen(true)} iconType="fullScreen">
        {buttonText}
      </EuiButton>

      {fullScreen && (
        <EuiFocusTrap>
          <Fragment>{children(setFullScreen)}</Fragment>
        </EuiFocusTrap>
      )}
    </Fragment>
  );
};
