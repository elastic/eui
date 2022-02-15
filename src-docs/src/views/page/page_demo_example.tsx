/* eslint-disable import/no-unresolved */
import React, { FunctionComponent, useState } from 'react';
import classNames from 'classnames';
import { useRouteMatch } from 'react-router';

import {
  EuiButton,
  EuiButtonGroup,
  EuiFlexGroup,
  EuiFlexItem,
  EuiFormRow,
  EuiImage,
  EuiPanel,
  EuiSelect,
  EuiSpacer,
  useGeneratedHtmlId,
  useIsWithinBreakpoints,
} from '../../../../src';
import { GuideSection } from '../../components/guide_section/guide_section';
import { GuideSectionTypes } from '../../components/guide_section/guide_section_types';
import { useExitPath } from '../../services/routing/routing';

import contentSvg from '../../images/content.svg';
import contentCenterSvg from '../../images/content_center.svg';
import sideNavSvg from '../../images/side_nav.svg';
import singleSvg from '../../images/single.svg';

const highlightOptions = [
  'none',
  'euiPage',
  'euiPageBody',
  'euiPageSideBar',
  'euiPageHeader',
  'euiPageContent',
  'euiPageContentBody',
];

const ExitFullscreenDemoButton = () => {
  const exitPath = useExitPath();
  return (
    <EuiButton fill href={exitPath} iconType="exit">
      Exit full screen
    </EuiButton>
  );
};

export const PageDemoExample: FunctionComponent<
  GuideSection & {
    slug: string;
    composable: {
      demo: any;
      source: any;
    };
    template: {
      demo: any;
      source: any;
    };
    centered?: boolean;
    highlight?: string;
  }
> = ({ slug, composable, template, centered, highlight, ...rest }) => {
  const isMobileSize = useIsWithinBreakpoints(['xs', 's']);
  const { path } = useRouteMatch();
  const toggleTemplatePrefix = useGeneratedHtmlId({
    prefix: 'pageTemplateToggleButton',
  });

  const toggleTemplateButtons = [
    {
      id: `${toggleTemplatePrefix}__0`,
      label: 'Template',
    },
    {
      id: `${toggleTemplatePrefix}__1`,
      label: 'Composable',
    },
  ];

  const templateOptionsPrefix = useGeneratedHtmlId({
    prefix: 'templateOptionsButton',
  });

  const [showTemplate, setShowTemplate] = useState(true);
  const [toggleIdSelected, setToggleIdSelected] = useState(
    `${toggleTemplatePrefix}__0`
  );

  const templateOptions = [
    {
      id: `${templateOptionsPrefix}__sidebar`,
      label: 'Sidebar',
    },
    {
      id: `${templateOptionsPrefix}__tabs`,
      label: 'Tabs',
    },
  ];

  const [showSideBar, setShowSideBar] = useState(true);
  const [showTabs, setShowTabs] = useState(false);
  const [templateOptionsSelectedMap, setTemplateOptionsSelectedMap] = useState({
    [`${templateOptionsPrefix}__sidebar`]: showSideBar,
  });

  const onChangeIconsMultiIcons = (optionId: string) => {
    const newToggleIconIdToSelectedMapIcon = {
      ...templateOptionsSelectedMap,
      ...{
        [optionId]: !templateOptionsSelectedMap[optionId],
      },
    };

    setTemplateOptionsSelectedMap(newToggleIconIdToSelectedMapIcon);
    setShowSideBar(
      newToggleIconIdToSelectedMapIcon[`${templateOptionsPrefix}__sidebar`]
    );
    setShowTabs(
      newToggleIconIdToSelectedMapIcon[`${templateOptionsPrefix}__tabs`]
    );
  };

  const [highlightValue, setHighlightValue] = useState<string | undefined>(
    highlight
  );
  // const [isFullScreen, setIsFullScreen] = useState(false);

  // Composable or Template demo
  const Demo = showTemplate ? template.demo : composable.demo;
  const DemoSource = showTemplate ? template.source : composable.source;

  const sideBar = showSideBar ? (
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

  return (
    <>
      <EuiPanel color="subdued">
        <EuiFlexGroup alignItems="center">
          <EuiFlexItem>
            <EuiFormRow display="columnCompressed" label="Components:">
              <EuiButtonGroup
                color="primary"
                name="templateOrComposable"
                legend="Type of demo to show"
                options={toggleTemplateButtons}
                idSelected={toggleIdSelected}
                onChange={(id) => {
                  setToggleIdSelected(id);
                  setShowTemplate(!!id.includes('__0'));
                }}
                buttonSize="compressed"
                // isFullWidth
              />
            </EuiFormRow>
          </EuiFlexItem>
          <EuiFlexItem>
            <EuiFormRow display="columnCompressed" label="Content options:">
              <EuiButtonGroup
                legend="Template options to show"
                options={templateOptions}
                idToSelectedMap={templateOptionsSelectedMap}
                onChange={(id) => onChangeIconsMultiIcons(id)}
                type="multi"
                buttonSize="compressed"
              />
            </EuiFormRow>
          </EuiFlexItem>
          {highlight === 'all' && (
            <EuiFlexItem grow={false}>
              <EuiSelect
                compressed
                prepend="Highlight"
                aria-label="Highlight"
                options={highlightOptions.map((option) => {
                  return {
                    value: option,
                    text: option.charAt(0).toUpperCase() + option.slice(1),
                  };
                })}
                onChange={(e) => setHighlightValue(e.target.value)}
                value={highlightValue}
              />
            </EuiFlexItem>
          )}
        </EuiFlexGroup>
      </EuiPanel>

      <GuideSection
        wrapText={false}
        demo={
          <div
            className={classNames('guideDemo__highlightLayout', {
              [`guideDemo__highlightLayout--${highlightValue}`]: highlight,
            })}
          >
            <Demo
              sideBar={sideBar}
              button={
                <EuiButton fill href={`#${path}/${slug}`}>
                  Go full screen
                </EuiButton>
              }
              content={content}
              tabs={showTabs}
            />
          </div>
        }
        demoPanelProps={{
          paddingSize: 'none',
          style: { overflow: 'hidden', borderWidth: '0 0 1px' },
        }}
        fullScreen={{
          slug,
          demo: (
            <Demo
              sideBar={sideBar}
              button={<ExitFullscreenDemoButton />}
              content={content}
              tabs={showTabs}
            />
          ),
        }}
        source={[
          {
            type: GuideSectionTypes.TSX,
            code: DemoSource,
          },
        ]}
        {...rest}
      />
    </>
  );
};
