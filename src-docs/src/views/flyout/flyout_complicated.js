import React, {
  Component,
} from 'react';

import {
  EuiButton,
  EuiButtonEmpty,
  EuiFlyout,
  EuiFlyoutBody,
  EuiFlyoutFooter,
  EuiFlyoutHeader,
  EuiTitle,
  EuiFlexGroup,
  EuiFlexItem,
  EuiSpacer,
  EuiTabs,
  EuiTab,
  EuiText,
  EuiTextColor,
} from '../../../../src/components';

export class FlyoutComplicated extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isFlyoutVisible: false,
      isSwitchChecked: true,
      selectedTabId: '1',
    };

    this.tabs = [{
      id: '1',
      name: 'Tab 1',
    }, {
      id: '2',
      name: 'Tab 2',
    }];

    this.closeFlyout = this.closeFlyout.bind(this);
    this.showFlyout = this.showFlyout.bind(this);
  }

  onSwitchChange = () => {
    this.setState({
      isSwitchChecked: !this.state.isSwitchChecked,
    });
  }

  closeFlyout() {
    this.setState({ isFlyoutVisible: false });
  }

  showFlyout() {
    this.setState({ isFlyoutVisible: true });
  }

  onSelectedTabChanged = id => {
    this.setState({
      selectedTabId: id,
    });
  }

  renderTabs() {
    return this.tabs.map((tab, index) => (
      <EuiTab
        onClick={() => this.onSelectedTabChanged(tab.id)}
        isSelected={tab.id === this.state.selectedTabId}
        key={index}
      >
        {tab.name}
      </EuiTab>
    ));
  }

  render() {
    const flyoutContent = (
      <EuiText>
        <p>
          Far out in the uncharted backwaters of the unfashionable end of
          the western spiral arm of the Galaxy lies a small unregarded
          yellow sun.
        </p>

        <p>
          Orbiting this at a distance of roughly ninety-two million miles
          is an utterly insignificant little blue green planet whose ape-
          descended life forms are so amazingly primitive that they still
          think digital watches are a pretty neat idea.
        </p>

        <ul>
          <li>List item one</li>
          <li>List item two</li>
          <li>Dolphins</li>
        </ul>

        <p>
          This planet has - or rather had - a problem, which was this: most
          of the people living on it were unhappy for pretty much of the time.
          Many solutions were suggested for this problem, but most of these
          were largely concerned with the movements of small green pieces
          of paper, which is odd because on the whole it was not the small
          green pieces of paper that were unhappy.
        </p>

        <h2>This is Heading Two</h2>

        <ol>
          <li>Number one</li>
          <li>Number two</li>
          <li>Dolphins again</li>
        </ol>

        <p>
          But the dog wasn&rsquo;t lazy, it was just
          practicing mindfulness, so it had a greater sense of
          life-satisfaction than that fox with all its silly jumping.
        </p>

        <p>
          And from the fox&rsquo;s perspective, life was full of hoops to jump <em>through</em>, low-hanging
          fruit to jump <em>for</em>, and dead car batteries to jump-<em>start</em>.
        </p>

        <h3>This is Heading Three</h3>

        <p>
          So it thought the dog was making a poor life choice by focusing so much on mindfulness.
          What if its car broke down?
        </p>
      </EuiText>
    );


    let flyout;

    if (this.state.isFlyoutVisible) {
      flyout = (
        <EuiFlyout
          onClose={this.closeFlyout}
        >
          <EuiFlyoutHeader>
            <EuiTitle>
              <h2>
                Flyout header
              </h2>
            </EuiTitle>
            <EuiTextColor color="subdued">
              <EuiText>
                <p>Put navigation items in the header, and cross tab actions in a footer.</p>
              </EuiText>
            </EuiTextColor>
            <EuiSpacer size="s" />
            <EuiTabs>
              {this.renderTabs()}
            </EuiTabs>
          </EuiFlyoutHeader>
          <EuiFlyoutBody>
            {flyoutContent}
          </EuiFlyoutBody>
          <EuiFlyoutFooter>
            <EuiFlexGroup justifyContent="spaceBetween">
              <EuiFlexItem grow={false}>
                <EuiButtonEmpty
                  iconType="cross"
                  onClick={this.closeFlyout}
                  flush="left"
                >
                  Close
                </EuiButtonEmpty>
              </EuiFlexItem>
              <EuiFlexItem grow={false}>
                <EuiButton
                  onClick={this.closeFlyout}
                  fill
                >
                  Save
                </EuiButton>
              </EuiFlexItem>
            </EuiFlexGroup>
          </EuiFlyoutFooter>
        </EuiFlyout>
      );
    }
    return (
      <div>
        <EuiButton onClick={this.showFlyout}>
          Show Flyout
        </EuiButton>

        {flyout}
      </div>
    );
  }
}
