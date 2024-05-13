import React, { useState, FunctionComponent } from 'react';
import classNames from 'classnames';

import {
  EuiImage,
  EuiSwitch,
  EuiFlexGroup,
  EuiFlexItem,
  EuiPageSection,
} from '../../../../src';

import contentSvg from '../../images/content.svg';
import contentCenterSvg from '../../images/content_center.svg';

import { GuideSection } from '../../components/guide_section/guide_section';
import { GuideSectionTypes } from '../../components/guide_section/guide_section_types';

import PageSection from './page_section';
const PageSectionSource = require('!!raw-loader!./page_section');
// @ts-ignore Importing from JS
import { pageSectionConfig } from './playground';

export const PageSectionDemo: FunctionComponent = () => {
  const [restrictWidth, setRestrictWidth] = useState(false);
  const [centeredContent, setCenteredContent] = useState(false);
  const [extendedBorder, setExtendedBorder] = useState(true);

  const content = (
    <EuiImage
      alt="Fake paragraph"
      url={centeredContent ? contentCenterSvg : contentSvg}
      size={centeredContent ? 'l' : 'fullWidth'}
    />
  );

  return (
    <>
      <GuideSection
        nested
        demoPanelProps={{
          color: 'subdued',
          paddingSize: 'none',
          style: { overflow: 'hidden' },
        }}
        demo={
          <div className={classNames('guideDemo__highlightLayout')}>
            <PageSection
              content={content}
              restrictWidth={restrictWidth}
              centeredContent={centeredContent}
              extendedBorder={extendedBorder}
            />
          </div>
        }
        source={[
          {
            type: GuideSectionTypes.JS,
            code: PageSectionSource,
          },
        ]}
        props={{
          EuiPageSection,
        }}
        playground={pageSectionConfig}
        exampleToggles={
          <EuiFlexGroup wrap responsive={false}>
            <EuiFlexItem grow={false}>
              <EuiSwitch
                label="Extended border"
                checked={extendedBorder}
                onChange={() => setExtendedBorder((e) => !e)}
                compressed
              />
            </EuiFlexItem>
            <EuiFlexItem grow={false}>
              <EuiSwitch
                label="Centered content"
                checked={centeredContent}
                onChange={() => setCenteredContent((e) => !e)}
                compressed
              />
            </EuiFlexItem>
            <EuiFlexItem grow={false}>
              <EuiSwitch
                label="Restrict width"
                checked={restrictWidth}
                onChange={() => setRestrictWidth((r) => !r)}
                compressed
              />
            </EuiFlexItem>
          </EuiFlexGroup>
        }
      />
    </>
  );
};
