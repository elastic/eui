import React, {
  Component,
} from 'react';

import {
  EuiButton,
  EuiContextMenuItem,
  EuiContextMenuPanel,
  EuiFlexGroup,
  EuiFlexItem,
  EuiPage,
  EuiPageBody,
  EuiPageContent,
  EuiPageHeader,
  EuiPageHeaderSection,
  EuiPageContentBody,
  EuiPageContentHeader,
  EuiPageContentHeaderSection,
  EuiPageSideBar,
  EuiPopover,
  EuiSpacer,
  EuiText,
  EuiTitle,
} from '../../../../src/components';

import {
  KibanaChrome,
  ManagementSideNav,
  Table,
} from '../partials';

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isPopoverOpen: false,
    };
  }

  onButtonClick = () => {
    this.setState(prevState => ({
      isPopoverOpen: !prevState.isPopoverOpen,
    }));
  };

  closePopover = () => {
    this.setState({
      isPopoverOpen: false,
    });
  };

  renderAddWatchPopover() {
    const button = (
      <EuiButton
        fill
        size="s"
        iconType="arrowDown"
        iconSide="right"
        onClick={this.onButtonClick}
      >
        Create Watch
      </EuiButton>
    );

    const items = [
      (
        <EuiContextMenuItem
          key={0}
          onClick={this.closePopover}
        >
          <EuiText>
            Threshold alert
          </EuiText>
          <EuiText size="xs">
            Send out an alert on a specific condition.
          </EuiText>
        </EuiContextMenuItem>
      ), (
        <EuiContextMenuItem
          key={1}
          onClick={this.closePopover}
        >
          <EuiText>
            Change-based alert
          </EuiText>
          <EuiText size="xs">
            Send out an alert on a specific change.
          </EuiText>
        </EuiContextMenuItem>
      ), (
        <EuiContextMenuItem
          key={2}
          onClick={this.closePopover}
        >
          <EuiText>
            Advanced watch
          </EuiText>
          <EuiText size="xs">
            Set up a custom watch in raw JSON.
          </EuiText>
        </EuiContextMenuItem>
      ),
    ];

    return (
      <EuiPopover
        id="watches"
        button={button}
        isOpen={this.state.isPopoverOpen}
        closePopover={this.closePopover}
        panelPaddingSize="none"
        anchorPosition="downRight"
      >
        <EuiContextMenuPanel
          style={{ width: '270px' }}
          items={items}
        />
      </EuiPopover>
    );
  }

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
                <EuiText>
                  <h2>Watches</h2>
                  <p>
                    Far out in the uncharted backwaters of the unfashionable end of
                    the western spiral arm of the Galaxy lies a small unregarded
                    yellow sun.
                  </p>
                </EuiText>
              </EuiPageContentHeaderSection>

              <EuiPageContentHeaderSection>
                <EuiFlexGroup gutterSize="m">
                  <EuiFlexItem>
                    {this.renderAddWatchPopover()}
                  </EuiFlexItem>
                </EuiFlexGroup>
              </EuiPageContentHeaderSection>
            </EuiPageContentHeader>

            <EuiPageContentBody>
              <Table />

              <EuiSpacer size="m" />
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
      </KibanaChrome>
    );
  }
}
