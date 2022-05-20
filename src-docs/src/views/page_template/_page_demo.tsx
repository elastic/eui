/* eslint-disable no-nested-ternary */
import React, { useState, FunctionComponent, ReactElement } from 'react';
import { useRouteMatch } from 'react-router';
import {
  EuiImage,
  EuiButton,
  EuiSpacer,
  EuiSwitch,
  EuiFlexGroup,
  EuiFlexItem,
  EuiHeader,
  EuiButtonGroup,
  EuiPageHeaderProps,
} from '../../../../src';
import { EuiPageTemplateProps } from '../../../../src/components/page_template';
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

import CustomTemplateExample from './page_template';
const CustomTemplateExampleSource = require('!!raw-loader!./page_template');

import { GuideSectionTypes } from '../../components/guide_section/guide_section_types';

const ExitFullscreenDemoButton = () => {
  const exitPath = useExitPath();
  return (
    <EuiButton fill href={exitPath} iconType="exit">
      Exit fullscreen
    </EuiButton>
  );
};

type toggles = {
  pageHeader?: boolean;
  panelled?: boolean;
  restrictedWidth?: boolean;
  sidebar?: boolean;
  sidebarSticky?: boolean;
  border?: boolean;
};

type showing = {
  bottomBar?: boolean;
  emptyPrompt?: boolean;
  tabs?: boolean;
  sidebar?: boolean;
};

export const PageDemo: FunctionComponent<
  Pick<GuideSectionProps, 'props'> & {
    fullscreen?: boolean;
    slug: string;
    show?: showing;
    toggle?: toggles;
    template?: ReactElement;
    source?: string;
  }
> = ({
  fullscreen,
  props,
  slug,
  show = {
    sidebar: false,
  },
  toggle = {
    pageHeader: false,
    panelled: false,
    restrictedWidth: false,
    sidebar: false,
    sidebarSticky: false,
    border: false,
  },
  template: Template = CustomTemplateExample,
  source = CustomTemplateExampleSource,
}) => {
  const { path } = useRouteMatch();
  const isMobileSize = useIsWithinBreakpoints(['xs', 's']);

  const [showHeader, setShowHeader] = useState<boolean>(true);
  const [showPanelled, setShowPanelled] = useState<boolean>(true);
  const [showSidebar, setShowSidebar] = useState<boolean>(
    Boolean(show.sidebar)
  );
  const [showSidebarSticky, setShowSidebarSticky] = useState<boolean>(
    fullscreen || false
  );

  // Restrict width combos
  const [restrictWidth, setRestrictWidth] = useState<
    EuiPageTemplateProps['restrictWidth']
  >(true);
  const [bottomBorder, setBottomBorder] = useState<
    EuiPageTemplateProps['bottomBorder']
  >(undefined);

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
      <EuiImage size={'fullWidth'} alt="Fake paragraph" url={contentSvg} />
      <EuiSpacer />
      <EuiImage size="fullWidth" alt="Fake paragraph" url={contentSvg} />
    </>
  );

  const _emptyPrompt = show.emptyPrompt ? (
    <EuiImage size={'l'} alt="Fake paragraph" url={contentCenterSvg} />
  ) : undefined;

  const _bottomBar = show.bottomBar ? (
    <EuiButton size="s" color="ghost">
      Save
    </EuiButton>
  ) : undefined;

  const pageHeaderProps: EuiPageHeaderProps | undefined = showHeader
    ? {
        iconType: 'logoElastic',
        pageTitle: 'Page title',
        rightSideItems: [button],
        description: toggle.restrictedWidth ? (
          <>{`Restricting the width to ${restrictWidth}.`}</>
        ) : undefined,
        tabs: show.tabs
          ? [
              { label: 'Tab 1', isSelected: true },
              {
                label: 'Tab 2',
              },
            ]
          : undefined,
      }
    : undefined;

  const controls = (
    <EuiFlexGroup alignItems="center">
      {toggle.restrictedWidth && (
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
      )}
      {toggle.border && (
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
      )}
      {toggle.pageHeader && (
        <EuiFlexItem grow={false}>
          <EuiSwitch
            label="Page header"
            checked={showHeader}
            onChange={() => setShowHeader((showing) => !showing)}
            compressed
          />
        </EuiFlexItem>
      )}
      {toggle.sidebar && (
        <EuiFlexItem grow={false}>
          <EuiSwitch
            label="Sidebar"
            checked={showSidebar}
            onChange={() => setShowSidebar((showing) => !showing)}
            compressed
          />
        </EuiFlexItem>
      )}
      {toggle.sidebarSticky && (
        <EuiFlexItem grow={false}>
          <EuiSwitch
            label="Sticky sidebar"
            checked={showSidebarSticky}
            onChange={() => setShowSidebarSticky((showing) => !showing)}
            compressed
          />
        </EuiFlexItem>
      )}
      {toggle.panelled && (
        <EuiFlexItem grow={false}>
          <EuiSwitch
            label="Panelled"
            checked={showPanelled}
            onChange={() => setShowPanelled((showing) => !showing)}
            compressed
          />
        </EuiFlexItem>
      )}
      <EuiFlexItem grow={true} />
    </EuiFlexGroup>
  );

  const render = (
    // @ts-expect-error Meh
    <Template
      button={button}
      content={content}
      sidebar={showSidebar ? sideNav : undefined}
      bottomBar={_bottomBar}
      header={pageHeaderProps}
      panelled={showPanelled}
      restrictWidth={restrictWidth}
      bottomBorder={bottomBorder}
      emptyPrompt={_emptyPrompt}
      sidebarSticky={showSidebarSticky}
      grow={fullscreen ? true : false}
      offset={fullscreen ? undefined : 0}
    />
  );

  return fullscreen ? (
    <>
      <EuiHeader theme="dark" position="fixed" style={{ color: 'white' }}>
        {controls}
      </EuiHeader>
      {render}
    </>
  ) : (
    <GuideSection
      nested
      demoPanelProps={{
        paddingSize: 'none',
        style: { overflow: 'hidden' },
      }}
      demo={<div className={'guideDemo__highlightLayout'}>{render}</div>}
      source={[
        {
          type: GuideSectionTypes.TSX,
          code: source,
        },
      ]}
      props={props}
      exampleToggles={controls}
    />
  );
};
