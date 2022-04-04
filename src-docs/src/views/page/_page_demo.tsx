import React, {
  ComponentType,
  ReactElement,
  useState,
  FunctionComponent,
} from 'react';
import { useRouteMatch } from 'react-router';
import {
  EuiImage,
  EuiButton,
  EuiSpacer,
  EuiSelect,
  EuiSwitch,
  EuiPanel,
  EuiFlexGroup,
  EuiFlexItem,
  EuiHeader,
} from '../../../../src';
import { useIsWithinBreakpoints } from '../../../../src/services/hooks';
import { useExitPath } from '../../services/routing/routing';

import contentSvg from '../../images/content.svg';
import contentCenterSvg from '../../images/content_center.svg';
import sideNavSvg from '../../images/side_nav.svg';
import singleSvg from '../../images/single.svg';

const templates = ['default', 'centeredBody', 'centeredContent', 'empty'];
// @ts-ignore Importing from JS
import ComposedDemo from './composed/_composed_demo';

const ExitFullscreenDemoButton = () => {
  const exitPath = useExitPath();
  return (
    <EuiButton fill href={exitPath} iconType="exit">
      Exit fullscreen
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
  showTemplates?: boolean;
  pattern: ComponentType<{
    button: ReactElement;
    content: ReactElement;
    sideNav: ReactElement;
    bottomBar: ReactElement;
    template: string;
  }>;
  template: ComponentType<{
    button: ReactElement;
    content: ReactElement;
    sideNav: ReactElement;
    bottomBar: ReactElement;
    template: string;
  }>;
  centered?: boolean;
}> = ({
  slug,
  fullscreen,
  showTemplates = false,
  pattern,
  template,
  centered,
}) => {
  const { path } = useRouteMatch();
  const isMobileSize = useIsWithinBreakpoints(['xs', 's']);
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

  const [templateValue, setTemplateValue] = useState<string>('default');

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

  const controls = (
    <EuiFlexGroup alignItems="center">
      <EuiFlexItem>
        {showTemplates && (
          <EuiSelect
            compressed
            prepend="Template"
            aria-label="Template"
            options={templates.map((option) => {
              return {
                value: option,
                text: option,
              };
            })}
            onChange={(e) => setTemplateValue(e.target.value)}
            value={templateValue}
            // Temporarily disable this control when showing the component breakdown
            disabled={!showTemplate}
          />
        )}
      </EuiFlexItem>
      <EuiFlexItem grow={false}>
        <EuiSwitch
          label="Show with individual components"
          checked={!showTemplate}
          onChange={() => setShowTemplate((showing) => !showing)}
        />
      </EuiFlexItem>
    </EuiFlexGroup>
  );

  let Child = showTemplate ? template : pattern;
  if (!showTemplate && showTemplates) Child = ComposedDemo;

  return fullscreen ? (
    <>
      <EuiHeader theme="dark" position="fixed" style={{ color: 'white' }}>
        {controls}
      </EuiHeader>
      <Child
        button={button}
        content={content}
        sideNav={sideNav}
        bottomBar={bottomBar}
        template={templateValue}
      />
    </>
  ) : (
    <>
      <div className={fullscreen ? undefined : 'guideDemo__highlightLayout'}>
        <Child
          button={button}
          content={content}
          sideNav={sideNav}
          bottomBar={bottomBar}
          template={templateValue}
        />
      </div>
      <EuiPanel
        grow={false}
        style={{ borderWidth: '1px 0' }}
        hasBorder
        borderRadius="none"
      >
        {controls}
      </EuiPanel>
    </>
  );
};
