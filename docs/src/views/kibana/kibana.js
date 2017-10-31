import React, {
  Component,
} from 'react';

import {
  EuiButton,
  EuiFlexGroup,
  EuiFlexItem,
  EuiPage,
  EuiPageBody,
  EuiPageContent,
  EuiPageContentBody,
  EuiPageContentHeader,
  EuiPageContentHeaderSection,
  EuiPageSideBar,
  EuiPageHeader,
  EuiPageHeaderSection,
  EuiTitle,
} from '../../../../src/components';

import {
  addToast,
  KibanaChrome,
  ManagementSideNav,
  removeAllToasts,
  Table,
  ToastList,
} from '../partials';

export default class extends Component {
  renderPage() {
    return (
      <EuiPage>
        <EuiPageHeader>
          <EuiPageHeaderSection>
            <EuiTitle size="l">
              <h1>Management</h1>
            </EuiTitle>
          </EuiPageHeaderSection>
        </EuiPageHeader>

        <EuiPageBody>
          <EuiPageSideBar>
            <ManagementSideNav />
          </EuiPageSideBar>

          <EuiPageContent>
            <EuiPageContentHeader>
              <EuiPageContentHeaderSection>
                <EuiTitle>
                  <h2>Watches</h2>
                </EuiTitle>
              </EuiPageContentHeaderSection>

              <EuiPageContentHeaderSection>
                <EuiFlexGroup gutterSize="m">
                  <EuiFlexItem>
                    <EuiButton
                      onClick={() => addToast()}
                      size="s"
                    >
                      Add toast
                    </EuiButton>
                  </EuiFlexItem>
                  <EuiFlexItem>
                    <EuiButton
                      color="danger"
                      onClick={() => removeAllToasts()}
                      size="s"
                    >
                      Clear toasts
                    </EuiButton>
                  </EuiFlexItem>
                </EuiFlexGroup>
              </EuiPageContentHeaderSection>
            </EuiPageContentHeader>

            <EuiPageContentBody>
              <Table />
            </EuiPageContentBody>
          </EuiPageContent>
        </EuiPageBody>
      </EuiPage>
    );
  }

  render() {
    return (
      <KibanaChrome>
        {this.renderPage()}
        <ToastList />
      </KibanaChrome>
    );
  }
}
