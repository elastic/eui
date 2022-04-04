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
  EuiPageHeaderProps,
  EuiEmptyPrompt,
} from '../../../../src';
import {
  EuiPageTemplateProps,
  TEMPLATES,
} from '../../../../src/components/page/page_template';
import { useIsWithinBreakpoints } from '../../../../src/services/hooks';
import { useExitPath } from '../../services/routing/routing';

import contentSvg from '../../images/content.svg';
import contentCenterSvg from '../../images/content_center.svg';
import sideNavSvg from '../../images/side_nav.svg';
import singleSvg from '../../images/single.svg';

// @ts-ignore Importing from JS
import ComposedDemo from './composed/_composed_demo';
// @ts-ignore Importing from JS
import TemplateDemo from './templates/page_template';

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

type TEMPLATE = typeof TEMPLATES[number];

export const PageDemo: FunctionComponent<{
  slug: string;
  fullscreen?: boolean;
  sidebar?: boolean;
  showTemplates?: TEMPLATE[];
  toggleSidebar?: boolean;
  composed: ComponentType<{
    button: ReactElement;
    content: ReactElement;
    sideNav?: ReactElement;
    bottomBar: ReactElement;
    pageHeader?: EuiPageHeaderProps;
    template: string;
  }>;
  template: ComponentType<{
    button: ReactElement;
    content: ReactElement;
    sideNav?: ReactElement;
    bottomBar: ReactElement;
    pageHeader?: EuiPageHeaderProps;
    template: string;
  }>;
}> = ({
  slug,
  fullscreen,
  toggleSidebar = false,
  showTemplates = TEMPLATES,
  sidebar = true,
  composed = ComposedDemo,
  template = TemplateDemo,
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

  const [showSidebar, setShowSidebar] = useState<boolean>(sidebar);

  const [templateValue, setTemplateValue] = useState<TEMPLATE>(
    showTemplates[0]
  );

  const centered = templateValue.includes('center');

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

  let content = (
    <>
      <EuiImage
        size={centered ? 'l' : 'fullWidth'}
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

  let pageHeaderProps: EuiPageTemplateProps['pageHeader'] = {
    iconType: 'logoElastic',
    pageTitle: 'Page title',
    rightSideItems: [button],
    tabs: [
      { label: 'Tab 1', isSelected: true },
      {
        label: 'Tab 2',
      },
    ],
  };

  if (templateValue === 'centeredBody') {
    pageHeaderProps = undefined;
    content = (
      <EuiEmptyPrompt
        title={<span>No spice</span>}
        body={content}
        actions={button}
      />
    );
  } else if (centered) {
    content = (
      <EuiEmptyPrompt
        color="subdued"
        title={<span>No spice</span>}
        body={content}
      />
    );
  }

  const controls = (
    <EuiFlexGroup alignItems="center">
      <EuiFlexItem>
        <EuiSelect
          compressed
          prepend="Template"
          aria-label="Template"
          options={showTemplates.map((option) => {
            return {
              value: option,
              text: option,
            };
          })}
          onChange={(e) => setTemplateValue(e.target.value as TEMPLATE)}
          value={templateValue}
          disabled={showTemplates.length < 2}
        />
      </EuiFlexItem>
      {toggleSidebar && (
        <EuiFlexItem grow={false}>
          <EuiSwitch
            label="Show with sidebar"
            checked={showSidebar}
            onChange={() => setShowSidebar((showing) => !showing)}
          />
        </EuiFlexItem>
      )}
      <EuiFlexItem grow={false}>
        <EuiSwitch
          label="Show with composed components"
          checked={!showTemplate}
          onChange={() => setShowTemplate((showing) => !showing)}
        />
      </EuiFlexItem>
    </EuiFlexGroup>
  );

  const Child = showTemplate ? template : composed;

  return fullscreen ? (
    <>
      <EuiHeader theme="dark" position="fixed" style={{ color: 'white' }}>
        {controls}
      </EuiHeader>
      <Child
        button={button}
        content={content}
        sideNav={showSidebar ? sideNav : undefined}
        bottomBar={bottomBar}
        template={templateValue}
        pageHeader={pageHeaderProps}
      />
    </>
  ) : (
    <>
      <div className={fullscreen ? undefined : 'guideDemo__highlightLayout'}>
        <Child
          button={button}
          content={content}
          sideNav={showSidebar ? sideNav : undefined}
          bottomBar={bottomBar}
          template={templateValue}
          pageHeader={pageHeaderProps}
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
