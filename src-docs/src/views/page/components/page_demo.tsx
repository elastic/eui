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

import Page from './page';

export const PageComponentDemo: FunctionComponent = () => {
  const [horizontal, setHorizontal] = useState(true);
  const [restrictWidth, setRestrictWidth] = useState<
    EuiPageProps['restrictWidth']
  >(false);
  const [grow, setGrow] = useState(true);

  const content = (
    <EuiImage alt="Fake paragraph" url={contentSvg} size={'fullWidth'} />
  );

  const sideBar = (
    <EuiImage alt="Fake paragraph" url={sideNavSvg} size={'original'} />
  );

  return (
    <>
      <div className={classNames('guideDemo__highlightLayout')}>
        <Page
          content={content}
          sideBar={sideBar}
          restrictWidth={restrictWidth}
          grow={grow}
          direction={horizontal ? 'row' : 'column'}
        />
      </div>
      <EuiPanel hasBorder="1px 0" borderRadius="none">
        <EuiFlexGroup>
          <EuiFlexItem grow={false}>
            <EuiSwitch
              label="Grow"
              checked={grow}
              onChange={() => setGrow((g) => !g)}
            />
          </EuiFlexItem>
          <EuiFlexItem grow={false}>
            <EuiSwitch
              label="Horizontal"
              checked={horizontal}
              onChange={() => setHorizontal((s) => !s)}
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
        </EuiFlexGroup>
      </EuiPanel>
    </>
  );
};
