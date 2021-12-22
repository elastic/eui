import React, { useState, FunctionComponent } from 'react';
import classNames from 'classnames';

import {
  EuiImage,
  EuiSwitch,
  EuiPanel,
  EuiFlexGroup,
  EuiFlexItem,
  EuiPageProps,
} from '../../../../../src';

import contentSvg from '../../../images/content.svg';
import sideNavSvg from '../../../images/side_nav.svg';
import contentCenterSvg from '../../../images/content_center.svg';

import PageSideBar from './page_side_bar';

export const PageSideBarDemo: FunctionComponent = () => {
  const [restrictWidth, setRestrictWidth] = useState<
    EuiPageProps['restrictWidth']
  >(false);
  const [showSideBar, setShowSideBar] = useState(true);
  const [centeredContent, setCenteredContent] = useState(false);

  const content = (
    <EuiImage
      alt="Fake paragraph"
      url={centeredContent ? contentCenterSvg : contentSvg}
      size={centeredContent ? 'l' : 'fullWidth'}
    />
  );

  const sideBar = showSideBar ? (
    <EuiImage alt="Fake paragraph" url={sideNavSvg} size={'fullWidth'} />
  ) : undefined;

  return (
    <>
      <div className={classNames('guideDemo__highlightLayout')}>
        <PageSideBar
          content={content}
          sideBar={sideBar}
          restrictWidth={restrictWidth}
          centeredContent={centeredContent}
        />
      </div>
      <EuiPanel hasBorder="1px 0" borderRadius="none">
        <EuiFlexGroup>
          <EuiFlexItem grow={false}>
            <EuiSwitch
              label="Sidebar"
              checked={showSideBar}
              onChange={() => setShowSideBar((s) => !s)}
            />
          </EuiFlexItem>
          <EuiFlexItem grow={false}>
            <EuiSwitch
              label="Restrict width"
              checked={!!restrictWidth}
              onChange={(e) =>
                setRestrictWidth(e.target.checked ? '75%' : false)
              }
            />
          </EuiFlexItem>
          <EuiFlexItem>
            <EuiSwitch
              label="Centered content"
              checked={centeredContent}
              onChange={() => setCenteredContent((c) => !c)}
            />
          </EuiFlexItem>
        </EuiFlexGroup>
      </EuiPanel>
    </>
  );
};
