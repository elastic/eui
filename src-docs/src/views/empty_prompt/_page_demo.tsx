import React, { ComponentType, ReactElement, FunctionComponent } from 'react';
import { useRouteMatch } from 'react-router';
import { EuiImage } from '../../../../src/components/image';
import { EuiButton } from '../../../../src/components/button';
import { useIsWithinBreakpoints } from '../../../../src/services/hooks';
import { useExitPath } from '../../services/routing/routing';
import sideNavSvg from '../../images/side_nav.svg';
import singleSvg from '../../images/single.svg';

const ExitFullscreenDemoButton = () => {
  const exitPath = useExitPath();
  return (
    <EuiButton fill href={exitPath} iconType="exit">
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
}> = ({ slug, fullscreen, template }) => {
  const { path } = useRouteMatch();
  const isMobileSize = useIsWithinBreakpoints(['xs', 's']);

  const button = fullscreen ? (
    <ExitFullscreenDemoButton />
  ) : (
    <EuiButton fill href={`#${path}/${slug}`}>
      Go full screen
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
      <p>
        Navigators use massive amounts of spice to gain a limited form of
        prescience. This allows them to safely navigate interstellar space,
        enabling trade and travel throughout the galaxy.
      </p>
      <p>You&rsquo;ll need spice to rule Arrakis, young Atreides.</p>
    </>
  );

  const bottomBar = (
    <EuiButton size="s" color="ghost">
      Save
    </EuiButton>
  );

  const Child = template;

  return fullscreen ? (
    <Child
      button={button}
      content={content}
      sideNav={sideNav}
      bottomBar={bottomBar}
    />
  ) : (
    <div className={'guideDemo__highlightLayout'}>
      <Child
        button={button}
        content={content}
        sideNav={sideNav}
        bottomBar={bottomBar}
      />
    </div>
  );
};
