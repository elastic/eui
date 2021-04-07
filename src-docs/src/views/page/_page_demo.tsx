import React, {
  ComponentType,
  ReactElement,
  useState,
  FunctionComponent,
} from 'react';
import { useRouteMatch } from 'react-router';
import { EuiImage } from '../../../../src/components/image';
import { EuiButton } from '../../../../src/components/button';
import { EuiFocusTrap } from '../../../../src/components/focus_trap';
import { EuiSpacer } from '../../../../src/components/spacer';
import { EuiSwitch } from '../../../../src/components/form';
import { EuiTextAlign } from '../../../../src/components/text';
import { useIsWithinBreakpoints } from '../../../../src/services/hooks';

import contentSvg from '../../images/content.svg';
import contentCenterSvg from '../../images/content_center.svg';
import sideNavSvg from '../../images/side_nav.svg';
import singleSvg from '../../images/single.svg';

const ExitFullscreenDemoButton = () => {
  const { path } = useRouteMatch();
  return (
    <EuiButton
      fill
      href={`#${path.match(/^(?<parent>.*)\/.+$/)?.groups?.parent}`}
      iconType="minimize">
      Exit full screen
    </EuiButton>
  );
};

export const PageDemo: FunctionComponent<{
  slug: string;
  fullscreen?: boolean;
  pattern: ComponentType<{
    button: ReactElement;
    content: ReactElement;
    sideNav: ReactElement;
    bottomBar: ReactElement;
  }>;
  template: ComponentType<{
    button: ReactElement;
    content: ReactElement;
    sideNav: ReactElement;
    bottomBar: ReactElement;
  }>;
  centered?: boolean;
}> = ({ slug, fullscreen, pattern, template, centered }) => {
  const { path } = useRouteMatch();
  const isMobileSize = useIsWithinBreakpoints(['xs', 's']);
  const [showTemplate, setShowTemplate] = useState(true);

  const button = fullscreen ? (
    <ExitFullscreenDemoButton />
  ) : (
    <EuiButton fill href={`#${path}/${slug}`}>
      Go fullscreen
    </EuiButton>
  );

  const sideNav = (
    <EuiImage
      size={isMobileSize ? 'original' : 'fullWidth'}
      alt="Fake side nav list"
      url={isMobileSize ? singleSvg : sideNavSvg}
    />
  );

  const content = (
    <>
      <EuiImage
        size="fullWidth"
        alt="Fake paragraph"
        url={centered ? contentCenterSvg : contentSvg}
      />
      {!centered && (
        <>
          <EuiSpacer />
          <EuiImage
            size="fullWidth"
            alt="Fake paragraph"
            url={centered ? contentCenterSvg : contentSvg}
          />
        </>
      )}
    </>
  );

  const bottomBar = (
    <EuiButton size="s" color="ghost">
      Save
    </EuiButton>
  );

  const Child = showTemplate ? template : pattern;
  return (
    <>
      <EuiFocusTrap disabled={!fullscreen}>
        <div
          className={
            fullscreen
              ? 'guideFullScreenOverlay guideFullScreenOverlay--withHeader'
              : 'guideDemo__highlightLayout'
          }>
          <Child
            button={button}
            content={content}
            sideNav={sideNav}
            bottomBar={bottomBar}
          />
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
