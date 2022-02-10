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
import contentCenterSvg from '../../../images/content_center.svg';

import PageContent from './page_content';

export const PageContentDemo: FunctionComponent = () => {
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
      <div className={classNames('guideDemo__highlightLayout')}>
        <PageContent
          content={content}
          restrictWidth={restrictWidth}
          centeredContent={centeredContent}
          extendedBorder={extendedBorder}
        />
      </div>
      <EuiPanel style={{ borderWidth: '1px 0' }} hasBorder borderRadius="none">
        <EuiFlexGroup>
          <EuiFlexItem grow={false}>
            <EuiSwitch
              label="Extended border"
              checked={extendedBorder}
              onChange={() => setExtendedBorder((e) => !e)}
            />
          </EuiFlexItem>
          <EuiFlexItem grow={false}>
            <EuiSwitch
              label="Restrict width"
              checked={restrictWidth}
              onChange={() => setRestrictWidth((r) => !r)}
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
