import React from 'react';

import { EuiSeriesChart, EuiLineSeries } from '../../../../src/experimental';
import {
  EuiButton,
  EuiPage,
  EuiPageBody,
  EuiPageContent,
  EuiPageContentBody,
  EuiPageContentHeader,
  EuiPageContentHeaderSection,
  EuiPageHeader,
  EuiPageHeaderSection,
  EuiPageSideBar,
  EuiTitle,
} from '../../../../src/components';

const DATA_A = [
  { x: 0, y: 1 },
  { x: 1, y: 1 },
  { x: 2, y: 2 },
  { x: 3, y: -1 },
  { x: 4, y: 3 },
  { x: 5, y: 2 },
];

export default class Example extends React.Component {
  state = {
    sideBarVisible: true,
  };
  onClick = () => {
    this.setState(prevState => ({ sideBarVisible: !prevState.sideBarVisible }));
  };
  render() {
    const { sideBarVisible } = this.state;
    return (
      <EuiPage>
        {sideBarVisible && <EuiPageSideBar>Side bar</EuiPageSideBar>}
        <EuiPageBody>
          <EuiPageHeader>
            <EuiPageHeaderSection>
              <EuiTitle size="l">
                <h1>Page title</h1>
              </EuiTitle>
            </EuiPageHeaderSection>
            <EuiPageHeaderSection>
              <EuiButton onClick={this.onClick}>Toggle Sidebar</EuiButton>
            </EuiPageHeaderSection>
          </EuiPageHeader>
          <EuiPageContent>
            <EuiPageContentHeader>
              <EuiPageContentHeaderSection>
                <EuiTitle>
                  <h2>Chart title</h2>
                </EuiTitle>
              </EuiPageContentHeaderSection>
              <EuiPageContentHeaderSection>
                Chart abilities
              </EuiPageContentHeaderSection>
            </EuiPageContentHeader>
            <EuiPageContentBody style={{ height: '300px' }}>
              <EuiSeriesChart showDefaultAxis={false} margins={0}>
                <EuiLineSeries name="Total Bytes" data={DATA_A} />
              </EuiSeriesChart>
            </EuiPageContentBody>
          </EuiPageContent>
        </EuiPageBody>
      </EuiPage>
    );
  }
}
