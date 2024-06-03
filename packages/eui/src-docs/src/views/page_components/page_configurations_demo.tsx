import React, { useState, FunctionComponent } from 'react';
import classNames from 'classnames';

import {
  EuiImage,
  EuiSwitch,
  EuiFlexGroup,
  EuiFlexItem,
  EuiPageSidebar,
  EuiEmptyPrompt,
  EuiPageBody,
  EuiPageHeader,
  EuiPageSection,
} from '../../../../src';

import contentSvg from '../../images/content.svg';
import sideNavSvg from '../../images/side_nav.svg';
import contentCenterSvg from '../../images/content_center.svg';

import PageConfigurations from './page_configurations';
import { GuideSection } from '../../components/guide_section/guide_section';
import { GuideSectionTypes } from '../../components/guide_section/guide_section_types';

const PageConfigurationsSource = require('!!raw-loader!./page_configurations');

export const PageConfigurationsDemo: FunctionComponent = () => {
  const [showSideBar, setShowSideBar] = useState(true);
  const [showPageHeader, setShowPageHeader] = useState(true);
  const [centeredContent, setCenteredContent] = useState(false);

  const content = (
    <EuiImage
      alt="Fake paragraph"
      url={centeredContent ? contentCenterSvg : contentSvg}
      size={centeredContent ? 'l' : 'fullWidth'}
    />
  );

  const sideBar = showSideBar ? (
    <EuiImage alt="Fake side nav" url={sideNavSvg} size={'original'} />
  ) : undefined;

  return (
    <GuideSection
      nested
      demoPanelProps={{
        paddingSize: 'none',
        style: { overflow: 'hidden' },
      }}
      demo={
        <div className={classNames('guideDemo__highlightLayout')}>
          <PageConfigurations
            content={content}
            sideBar={sideBar}
            emptyPrompt={centeredContent}
            pageHeader={showPageHeader}
          />
        </div>
      }
      source={[
        {
          type: GuideSectionTypes.JS,
          code: PageConfigurationsSource,
        },
      ]}
      props={{
        EuiPageSidebar,
        EuiPageHeader,
        EuiPageBody,
        EuiPageSection,
        EuiEmptyPrompt,
      }}
      exampleToggles={
        <EuiFlexGroup wrap responsive={false}>
          <EuiFlexItem grow={false}>
            <EuiSwitch
              label="Sidebar"
              checked={showSideBar}
              onChange={() => setShowSideBar((s) => !s)}
              compressed
            />
          </EuiFlexItem>
          <EuiFlexItem grow={false}>
            <EuiSwitch
              label="Page header"
              checked={showPageHeader}
              onChange={() => setShowPageHeader((c) => !c)}
              compressed
            />
          </EuiFlexItem>
          <EuiFlexItem grow={false}>
            <EuiSwitch
              label="Empty prompt"
              checked={centeredContent}
              onChange={() => setCenteredContent((c) => !c)}
              compressed
            />
          </EuiFlexItem>
        </EuiFlexGroup>
      }
    />
  );
};
