import React, {
  ComponentType,
  ReactElement,
  useState,
  FunctionComponent,
} from 'react';
import { useRouteMatch } from 'react-router';
import classNames from 'classnames';

import {
  EuiImage,
  EuiButton,
  EuiSpacer,
  EuiSwitch,
  useIsWithinBreakpoints,
} from '../../../../src';

import { useExitPath } from '../../services/routing/routing';

import contentSvg from '../../images/content.svg';
import contentCenterSvg from '../../images/content_center.svg';
import sideNavSvg from '../../images/side_nav.svg';
import singleSvg from '../../images/single.svg';
import {
  EuiFlexGroup,
  EuiFlexItem,
  EuiPanel,
  EuiSelect,
} from '../../../../src/components';

const ExitFullscreenDemoButton = () => {
  const exitPath = useExitPath();
  return (
    <EuiButton fill href={exitPath} iconType="exit">
      Exit full screen
    </EuiButton>
  );
};

/**
 * Because the discrete[by slug] usages of <PageDemo> are not rendered at the same time,
 * it is safe to cache their showTemplate status in a set rather than an approach triggering
 * React re-rendering. If that changes, moving this to a redux store, recoiljs atom(s), or similar
 * would resolve any introduced issue.
 */
const demosAsIndividualComponents = new Set<string>();

export const PageDemo: FunctionComponent<{
  slug: string;
  fullscreen?: boolean;
  pattern: ComponentType<{
    button: ReactElement;
    content: ReactElement;
    sideNav?: ReactElement;
    bottomBar: ReactElement;
  }>;
  template?: ComponentType<{
    button: ReactElement;
    content: ReactElement;
    sideNav?: ReactElement;
    bottomBar: ReactElement;
  }>;
  centered?: boolean;
  highlight?: string;
  showSideNav?: boolean;
}> = ({
  slug,
  fullscreen,
  pattern,
  template,
  centered,
  highlight,
  showSideNav: _showSideNav = true,
}) => {
  const { path } = useRouteMatch();
  const isMobileSize = useIsWithinBreakpoints(['xs', 's']);
  const [showSideNav, setShowSideNav] = useState(_showSideNav);
  const [showTemplate, _setShowTemplate] = useState(
    !demosAsIndividualComponents.has(slug)
  );
  const setShowTemplate = (cb: (showTemplate: boolean) => boolean) => {
    _setShowTemplate((showing) => {
      const nextValue = cb(showing);
      demosAsIndividualComponents[nextValue ? 'delete' : 'add'](slug);
      return nextValue;
    });
  };

  const button = fullscreen ? (
    <ExitFullscreenDemoButton />
  ) : (
    <EuiButton
      isDisabled={Boolean(_showSideNav && !showSideNav)}
      fill
      href={`#${path}/${slug}`}
    >
      Go full screen
    </EuiButton>
  );

  const sideNav = showSideNav ? (
    <EuiImage
      size={isMobileSize ? 'original' : 'fullWidth'}
      alt="Fake side nav list"
      url={isMobileSize ? singleSvg : sideNavSvg}
    />
  ) : undefined;

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

  const options = [
    'none',
    'euiPage',
    'euiPageBody',
    'euiPageSideBar',
    'euiPageHeader',
    'euiPageContent',
    'euiPageContentBody',
  ];

  const [highlightValue, setHighlightValue] = useState<string | undefined>(
    highlight
  );

  const Child = showTemplate && template ? template : pattern;
  return fullscreen ? (
    <Child
      button={button}
      content={content}
      sideNav={sideNav}
      bottomBar={bottomBar}
    />
  ) : (
    <>
      <div
        className={classNames('guideDemo__highlightLayout', {
          [`guideDemo__highlightLayout--${highlightValue}`]: highlight,
        })}
      >
        <Child
          button={button}
          content={content}
          sideNav={sideNav}
          bottomBar={bottomBar}
        />
      </div>
      {template && pattern && (
        <EuiPanel hasBorder="1px 0" borderRadius="none">
          <EuiFlexGroup alignItems="center">
            {_showSideNav && (
              <EuiFlexItem grow={false}>
                <EuiSwitch
                  label="Sidebar"
                  checked={showSideNav}
                  onChange={() => setShowSideNav((showing) => !showing)}
                />
              </EuiFlexItem>
            )}
            <EuiFlexItem>
              <EuiSwitch
                label="Show using EuiPageTemplate"
                checked={showTemplate}
                onChange={() => setShowTemplate((showing) => !showing)}
              />
            </EuiFlexItem>
            {highlight === 'all' && (
              <EuiFlexItem>
                <EuiSelect
                  compressed
                  prepend="Highlight"
                  options={options.map((option) => {
                    return {
                      value: option,
                      text: option.charAt(0).toUpperCase() + option.slice(1),
                    };
                  })}
                  onChange={(e) => setHighlightValue(e.target.value)}
                  value={highlightValue}
                  aria-label="Use aria labels when no actual label is in use"
                />
              </EuiFlexItem>
            )}
          </EuiFlexGroup>
        </EuiPanel>
      )}
    </>
  );
};
