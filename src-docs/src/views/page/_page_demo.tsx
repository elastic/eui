/* eslint-disable no-nested-ternary */
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
  EuiFlexGroup,
  EuiFlexItem,
  EuiHeader,
  EuiButtonGroup,
} from '../../../../src';
import { EuiPageTemplateProps } from '../../../../src/components/page_template';
import { ALIGNMENTS } from '../../../../src/components/page/page_section/page_section.styles';
import { useIsWithinBreakpoints } from '../../../../src/services/hooks';
import { useExitPath } from '../../services/routing/routing';
import {
  GuideSectionProps,
  GuideSection,
} from '../../components/guide_section/guide_section';

import contentSvg from '../../images/content.svg';
import contentCenterSvg from '../../images/content_center.svg';
import sideNavSvg from '../../images/side_nav.svg';
import singleSvg from '../../images/single.svg';

import CustomTemplateExample from './templates/page_template_custom';
const CustomTemplateExampleSource = require('!!raw-loader!./templates/page_template_custom');

import { GuideSectionTypes } from '../../components/guide_section/guide_section_types';

const ExitFullscreenDemoButton = () => {
  const exitPath = useExitPath();
  return (
    <EuiButton fill href={exitPath} iconType="exit">
      Exit fullscreen
    </EuiButton>
  );
};

type TEMPLATE = typeof ALIGNMENTS[number];

export const PageDemo: FunctionComponent<
  Pick<GuideSectionProps, 'props'> & {
    slug: string;
    fullscreen?: boolean;
    sidebar?: boolean;
    bottomBar?: boolean;
    showTemplates?: TEMPLATE[];
    toggleSidebar?: boolean;
    togglePageHeader?: boolean;
    togglePanelled?: boolean;
    toggleCentered?: boolean;
    toggleRestrictedWidth?: boolean;
    pageHeaderTabs?: boolean;
    template: ComponentType<{
      template?: string;
      button: ReactElement;
      content: ReactElement;
      sidebar?: EuiPageTemplateProps['pageSideBar'];
      bottomBar?: EuiPageTemplateProps['bottomBar'];
      header?: EuiPageTemplateProps['pageHeader'];
      alignment?: EuiPageTemplateProps['alignment'];
      restrictWidth?: EuiPageTemplateProps['restrictWidth'];
    }>;
    source?: {
      template: string;
    };
  }
> = ({
  slug,
  fullscreen,
  toggleSidebar = false,
  togglePageHeader = true,
  togglePanelled = true,
  toggleCentered = false,
  toggleRestrictedWidth = false,
  showTemplates = [],
  pageHeaderTabs = true,
  sidebar = true,
  bottomBar = false,
  template = CustomTemplateExample,
  props,
  source,
}) => {
  const { path } = useRouteMatch();
  const isMobileSize = useIsWithinBreakpoints(['xs', 's']);

  const [showSidebar, setShowSidebar] = useState<boolean>(sidebar);
  const [showHeader, setShowHeader] = useState<boolean>(true);
  const [showPanelled, setShowPanelled] = useState<boolean>(true);
  const [showCentered, setShowCentered] = useState<boolean>(false);

  // Restrict width combos
  const [restrictWidth, setRestrictWidth] = useState<
    EuiPageTemplateProps['restrictWidth']
  >(true);
  const [bottomBorder, setBottomBorder] = useState<
    EuiPageTemplateProps['bottomBorder']
  >(undefined);

  const [templateValue, setTemplateValue] = useState<TEMPLATE>(
    showTemplates.length ? showTemplates[0] : 'top'
  );

  const centered = templateValue.includes('center') || showCentered;

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

  const _bottomBar = bottomBar ? (
    <EuiButton size="s" color="ghost">
      Save
    </EuiButton>
  ) : undefined;

  const pageHeaderProps: EuiPageTemplateProps['pageHeader'] = showHeader
    ? {
        iconType: 'logoElastic',
        pageTitle: 'Page title',
        rightSideItems: [button],
        description: toggleRestrictedWidth ? (
          <>{`Restricting the width to ${restrictWidth}.`}</>
        ) : undefined,
        tabs: pageHeaderTabs
          ? [
              { label: 'Tab 1', isSelected: true },
              {
                label: 'Tab 2',
              },
            ]
          : undefined,
      }
    : undefined;

  // if (templateValue === 'center' && !showHeader) {
  //   content = (
  //     <EuiEmptyPrompt
  //       color={!showSidebar && showPanelled ? 'plain' : 'subdued'}
  //       hasShadow={!showSidebar}
  //       title={<span>No spice</span>}
  //       body={content}
  //       actions={button}
  //     />
  //   );
  // } else if (centered) {
  //   content = (
  //     <EuiEmptyPrompt
  //       color="subdued"
  //       title={<span>No spice</span>}
  //       body={content}
  //     />
  //   );
  // }

  const controls = (
    <EuiFlexGroup alignItems="center">
      {showTemplates.length ? (
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
      ) : undefined}
      {toggleRestrictedWidth && (
        <>
          <EuiFlexItem grow={false}>
            <div>
              Restrict width:&emsp;
              <EuiButtonGroup
                options={[
                  {
                    id: 'radioTrue',
                    label: 'true',
                  },
                  {
                    id: 'radioFalse',
                    label: 'false',
                  },
                  {
                    id: 'radioPercent',
                    label: '75%',
                  },
                ]}
                idSelected={
                  restrictWidth === true
                    ? 'radioTrue'
                    : restrictWidth === false
                    ? 'radioFalse'
                    : 'radioPercent'
                }
                onChange={(id) =>
                  setRestrictWidth(
                    id === 'radioTrue'
                      ? true
                      : id === 'radioFalse'
                      ? false
                      : '75%'
                  )
                }
                name="restrictedWidthGroup"
                legend={'Restriced width'}
                buttonSize="compressed"
                color="primary"
              />
            </div>
          </EuiFlexItem>
          <EuiFlexItem grow={false}>
            <div>
              Bottom border:&emsp;
              <EuiButtonGroup
                options={[
                  {
                    id: 'borderTrue',
                    label: 'true',
                  },
                  {
                    id: 'borderFalse',
                    label: 'false',
                  },
                  {
                    id: 'borderExtended',
                    label: 'extended',
                  },
                ]}
                idSelected={
                  bottomBorder === true || bottomBorder === undefined
                    ? 'borderTrue'
                    : bottomBorder === false
                    ? 'borderFalse'
                    : 'borderExtended'
                }
                onChange={(id) => {
                  switch (id) {
                    case 'borderExtended':
                      setBottomBorder('extended');
                      break;
                    case 'borderFalse':
                      setBottomBorder(false);
                      break;
                    default:
                      setBottomBorder(true);
                      break;
                  }
                }}
                name="restrictedWidthGroup"
                legend={'Restriced width'}
                buttonSize="compressed"
                color="primary"
              />
            </div>
          </EuiFlexItem>
        </>
      )}
      {togglePageHeader && (
        <EuiFlexItem grow={false}>
          <EuiSwitch
            label="Page header"
            checked={showHeader}
            onChange={() => setShowHeader((showing) => !showing)}
            compressed
          />
        </EuiFlexItem>
      )}
      {toggleSidebar && (
        <EuiFlexItem grow={false}>
          <EuiSwitch
            label="Sidebar"
            checked={showSidebar}
            onChange={() => setShowSidebar((showing) => !showing)}
            compressed
          />
        </EuiFlexItem>
      )}
      {togglePanelled && (
        <EuiFlexItem grow={false}>
          <EuiSwitch
            label="Panelled"
            checked={showPanelled}
            onChange={() => setShowPanelled((showing) => !showing)}
            compressed
          />
        </EuiFlexItem>
      )}

      {toggleCentered && (
        <EuiFlexItem grow={false}>
          <EuiSwitch
            label="Centered"
            checked={showCentered}
            onChange={() => setShowCentered((showing) => !showing)}
            compressed
          />
        </EuiFlexItem>
      )}
      <EuiFlexItem grow={true} />
    </EuiFlexGroup>
  );

  const Child = template;
  const templateSource = source?.template || CustomTemplateExampleSource;

  return fullscreen ? (
    <>
      <EuiHeader theme="dark" position="fixed" style={{ color: 'white' }}>
        {controls}
      </EuiHeader>
      <Child
        button={button}
        content={content}
        sidebar={showSidebar ? sideNav : undefined}
        bottomBar={_bottomBar}
        // template={templateValue}
        header={pageHeaderProps}
        panelled={showPanelled}
        alignment={showCentered ? 'center' : undefined}
        restrictWidth={restrictWidth}
      />
    </>
  ) : (
    <GuideSection
      nested
      demoPanelProps={{
        paddingSize: 'none',
        style: { overflow: 'hidden' },
      }}
      demo={
        <div className={'guideDemo__highlightLayout'}>
          <Child
            button={button}
            content={content}
            sidebar={showSidebar ? sideNav : undefined}
            bottomBar={_bottomBar}
            // template={templateValue}
            header={pageHeaderProps}
            panelled={showPanelled}
            alignment={showCentered ? 'center' : undefined}
            restrictWidth={restrictWidth}
            bottomBorder={bottomBorder}
          />
        </div>
      }
      source={[
        {
          type: GuideSectionTypes.TSX,
          code: templateSource,
        },
      ]}
      props={props}
      exampleToggles={controls}
    />
  );
};
