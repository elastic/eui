import React, { useState, ReactNode, FunctionComponent } from 'react';
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
import {
  StandaloneExample,
  ExitStandaloneButton,
} from '../../components/standalone_example';

export const PageDemo: FunctionComponent<{
  slug: string;
  children?: (
    button: typeof EuiButton,
    Content: ReactNode,
    SideNav: ReactNode,
    showTemplate: boolean
  ) => ReactNode;
  centered?: boolean;
}> = ({ slug, children, centered }) => {
  const isMobileSize = useIsWithinBreakpoints(['xs', 's']);
  const [showTemplate, setShowTemplate] = useState(true);

  const FullscreenButton = () => {
    return (
      <StandaloneExample
        slug={slug}
        example={
          <EuiFocusTrap>
            <div className="guideFullScreenOverlay guideFullScreenOverlay--withHeader">
              {children &&
                children(ExitStandaloneButton, Content, SideNav, showTemplate)}
            </div>
          </EuiFocusTrap>
        }
      />
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

  return (
    <>
      <div className="guideDemo__highlightLayout">
        {children && children(FullscreenButton, Content, SideNav, showTemplate)}
      </div>
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
