import React, { useState, FunctionComponent } from 'react';
import classNames from 'classnames';

import {
  EuiImage,
  EuiSwitch,
  EuiFlexGroup,
  EuiFlexItem,
  EuiPageProps,
  EuiPage,
  EuiPageBody,
  EuiPageSidebar,
} from '../../../../src';

import contentSvg from '../../images/content.svg';
import sideNavSvg from '../../images/side_nav.svg';

import Page from './page';
import { GuideSection } from '../../components/guide_section/guide_section';
import { GuideSectionTypes } from '../../components/guide_section/guide_section_types';

const PageSource = require('!!raw-loader!./page');
// @ts-ignore Importing from JS
import { pageConfig } from './playground';

export const PageComponentDemo: FunctionComponent = () => {
  const [showSideBar, setShowSideBar] = useState(true);
  const [horizontal, setHorizontal] = useState(true);
  const [restrictWidth, setRestrictWidth] =
    useState<EuiPageProps['restrictWidth']>(false);
  const [grow, setGrow] = useState(true);

  const content = (
    <EuiImage alt="Fake paragraph" url={contentSvg} size={'fullWidth'} />
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
          <Page
            content={content}
            sideBar={sideBar}
            restrictWidth={restrictWidth}
            grow={grow}
            direction={horizontal ? 'row' : 'column'}
          />
        </div>
      }
      source={[
        {
          type: GuideSectionTypes.JS,
          code: PageSource,
        },
      ]}
      props={{
        EuiPage,
        EuiPageBody,
        EuiPageSidebar,
      }}
      playground={pageConfig}
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
              label="Grow"
              checked={grow}
              onChange={() => setGrow((g) => !g)}
              compressed
            />
          </EuiFlexItem>
          <EuiFlexItem grow={false}>
            <EuiSwitch
              label="Column"
              checked={!horizontal}
              onChange={() => setHorizontal((s) => !s)}
              compressed
            />
          </EuiFlexItem>
          <EuiFlexItem grow={false}>
            <EuiSwitch
              label="Restrict width"
              checked={!!restrictWidth}
              onChange={(e) =>
                setRestrictWidth(e.target.checked ? '75%' : false)
              }
              compressed
            />
          </EuiFlexItem>
        </EuiFlexGroup>
      }
    />
  );
};
