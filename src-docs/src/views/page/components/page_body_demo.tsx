import React, { useState, FunctionComponent } from 'react';
import classNames from 'classnames';

import {
  EuiImage,
  EuiSwitch,
  EuiPanel,
  EuiFlexGroup,
  EuiFlexItem,
} from '../../../../../src';

import contentSvg from '../../../images/content.svg';
import sideNavSvg from '../../../images/side_nav.svg';

import PageBody from './page_body';

export const PageBodyDemo: FunctionComponent = () => {
  const [showSideBar, setShowSideBar] = useState(true);

  const content = (
    <EuiImage alt="Fake paragraph" url={contentSvg} size={'fullWidth'} />
  );

  const sideBar = showSideBar ? (
    <EuiImage alt="Fake paragraph" url={sideNavSvg} size={'original'} />
  ) : undefined;

  return (
    <>
      <div className={classNames('guideDemo__highlightLayout')}>
        <PageBody content={content} sideBar={sideBar} />
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
        </EuiFlexGroup>
      </EuiPanel>
    </>
  );
};
