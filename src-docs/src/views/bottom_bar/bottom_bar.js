import React, { Component, Fragment } from 'react';

import {
  EuiBottomBar,
  EuiFlexGroup,
  EuiFlexItem,
  EuiButton,
  EuiButtonEmpty,
  EuiSpacer,
  EuiTabbedContent,
  EuiText,
  EuiTitle,
} from '../../../../src/components';

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showBar: false,
      showBarWithTabs: false,
      barIsExpanded: false,
    };

    this.tabs = [
      {
        id: 'flight815',
        name: 'Flight 815',
        content: (
          <Fragment>
            <div style={{ padding: '1rem' }}>
              <EuiTitle>
                <h3>Flight 815</h3>
              </EuiTitle>
              <EuiText>
                Oceanic Airlines Flight 815 was a scheduled flight from Sydney,
                Australia to Los Angeles, California, United States, on a Boeing
                777-200ER. On September 22, 2004 at 4:16 P.M., the airliner,
                carrying 324 passengers, deviated from its original course and
                disappeared over the Pacific Ocean. This is the central moment
                in the series that kicked off its plotline, and marked the
                chronological beginning of the main characters`&apos;` adventures on
                the Island.
              </EuiText>
              <EuiSpacer />
              <EuiButton
                onClick={() => {
                  this.setState({ barIsExpanded: false });
                }}>
                Shrink Bar
              </EuiButton>
            </div>
          </Fragment>
        ),
      },
      {
        id: 'theothers',
        name: 'The Others',
        content: (
          <Fragment>
            <div style={{ padding: '1rem' }}>
              <EuiTitle>
                <h3>The Others</h3>
              </EuiTitle>
              <EuiText>
                The Others, referred to by the DHARMA Initiative as the Hostiles
                or the Natives, and also by the tail section survivors of
                Oceanic Flight 815 as Them, are a group of people living on the
                Island who were followers of Jacob, intermediated by Richard
                Alpert. Jacob never showed himself to his people, and they took
                orders from a succession of leaders including Eloise Hawking,
                Charles Widmore, Benjamin Linus, and briefly, John Locke.
              </EuiText>
              <EuiSpacer />
              <EuiButton onClick={this.toggleBarWithTabs.bind(this)}>
                Close Bar
              </EuiButton>
            </div>
          </Fragment>
        ),
      },
    ];
  }

  toggleDefaultBar() {
    this.setState({
      showBar: !this.state.showBar,
      showBarWithTabs: false,
    });
  }

  toggleBarWithTabs() {
    this.setState({
      showBarWithTabs: !this.state.showBarWithTabs,
      showBar: false,
      barIsExpanded: false,
    });
  }

  toggleBarExpansion() {
    this.setState({
      barIsExpanded: true,
    });
  }

  render() {
    const button = (
      <EuiButton color="primary" onClick={this.toggleDefaultBar.bind(this)}>
        Toggle appearance of the bottom bar
      </EuiButton>
    );

    const barWithTabsButton = (
      <EuiButton color="primary" onClick={this.toggleBarWithTabs.bind(this)}>
        Toggle bar with tabs
      </EuiButton>
    );

    let bottomBar;
    if (this.state.showBar) {
      bottomBar = (
        <EuiBottomBar paddingSize="s">
          <EuiFlexGroup justifyContent="spaceBetween">
            <EuiFlexItem grow={false}>
              <EuiFlexGroup gutterSize="s">
                <EuiFlexItem grow={false}>
                  <EuiButton color="ghost" size="s" iconType="help">
                    Help
                  </EuiButton>
                </EuiFlexItem>
                <EuiFlexItem grow={false}>
                  <EuiButton color="ghost" size="s" iconType="user">
                    Add user
                  </EuiButton>
                </EuiFlexItem>
              </EuiFlexGroup>
            </EuiFlexItem>
            <EuiFlexItem grow={false}>
              <EuiFlexGroup gutterSize="s">
                <EuiFlexItem grow={false}>
                  <EuiButtonEmpty color="ghost" size="s" iconType="cross">
                    Discard
                  </EuiButtonEmpty>
                </EuiFlexItem>
                <EuiFlexItem grow={false}>
                  <EuiButton color="primary" fill size="s" iconType="check">
                    Save
                  </EuiButton>
                </EuiFlexItem>
              </EuiFlexGroup>
            </EuiFlexItem>
          </EuiFlexGroup>
        </EuiBottomBar>
      );
    }

    let bottomBarWithTabs;
    if (this.state.showBarWithTabs) {
      bottomBarWithTabs = (
        <EuiBottomBar
          paddingSize="none"
          initialHeight={36}
          isExpanded={this.state.barIsExpanded}>
          <EuiFlexGroup justifyContent="spaceBetween">
            <EuiFlexItem>
              <EuiTabbedContent
                tabs={this.tabs}
                onTabClick={this.toggleBarExpansion.bind(this)}
                size="s"
              />
            </EuiFlexItem>
          </EuiFlexGroup>
        </EuiBottomBar>
      );
    }

    return (
      <div>
        {button}
        {barWithTabsButton}
        {bottomBar}
        {bottomBarWithTabs}
      </div>
    );
  }
}
