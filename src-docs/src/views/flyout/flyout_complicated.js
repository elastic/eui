import React, { Component } from 'react';

import {
  EuiButton,
  EuiButtonEmpty,
  EuiCodeBlock,
  EuiFlexGroup,
  EuiFlexItem,
  EuiFlyout,
  EuiFlyoutBody,
  EuiFlyoutFooter,
  EuiFlyoutHeader,
  EuiForm,
  EuiFormRow,
  EuiPopover,
  EuiSpacer,
  EuiTab,
  EuiTabs,
  EuiText,
  EuiTitle,
} from '../../../../src/components';

import SuperSelectComplexExample from '../super_select/super_select_complex';

export class FlyoutComplicated extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isFlyoutVisible: false,
      isSwitchChecked: true,
      selectedTabId: '1',
      isPopoverOpen: false,
    };

    this.tabs = [
      {
        id: '1',
        name: 'Tab 1',
      },
      {
        id: '2',
        name: 'Tab 2',
      },
    ];

    this.closeFlyout = this.closeFlyout.bind(this);
    this.showFlyout = this.showFlyout.bind(this);
  }

  onSwitchChange = () => {
    this.setState({
      isSwitchChecked: !this.state.isSwitchChecked,
    });
  };

  closeFlyout() {
    this.setState({ isFlyoutVisible: false });
  }

  showFlyout() {
    this.setState({ isFlyoutVisible: true });
  }

  closePopover = () => {
    this.setState({ isPopoverOpen: false });
  };

  togglePopover = () => {
    this.setState(({ isPopoverOpen }) => ({ isPopoverOpen: !isPopoverOpen }));
  };

  onSelectedTabChanged = id => {
    this.setState({
      selectedTabId: id,
    });
  };

  renderTabs() {
    return this.tabs.map((tab, index) => (
      <EuiTab
        onClick={() => this.onSelectedTabChanged(tab.id)}
        isSelected={tab.id === this.state.selectedTabId}
        key={index}>
        {tab.name}
      </EuiTab>
    ));
  }

  render() {
    const flyoutContent = (
      <EuiText>
        <p>
          Far out in the uncharted backwaters of the unfashionable end of the
          western spiral arm of the Galaxy lies a small unregarded yellow sun.
        </p>

        <p>
          Orbiting this at a distance of roughly ninety-two million miles is an
          utterly insignificant little blue green planet whose ape- descended
          life forms are so amazingly primitive that they still think digital
          watches are a pretty neat idea.
        </p>

        <ul>
          <li>List item one</li>
          <li>List item two</li>
          <li>Dolphins</li>
        </ul>

        <p>
          This planet has - or rather had - a problem, which was this: most of
          the people living on it were unhappy for pretty much of the time. Many
          solutions were suggested for this problem, but most of these were
          largely concerned with the movements of small green pieces of paper,
          which is odd because on the whole it was not the small green pieces of
          paper that were unhappy.
        </p>

        <h2>This is Heading Two</h2>

        <ol>
          <li>Number one</li>
          <li>Number two</li>
          <li>Dolphins again</li>
        </ol>

        <p>
          But the dog wasn&rsquo;t lazy, it was just practicing mindfulness, so
          it had a greater sense of life-satisfaction than that fox with all its
          silly jumping.
        </p>

        <p>
          And from the fox&rsquo;s perspective, life was full of hoops to jump{' '}
          <em>through</em>, low-hanging fruit to jump <em>for</em>, and dead car
          batteries to jump-<em>start</em>.
        </p>

        <h3>This is Heading Three</h3>

        <p>
          So it thought the dog was making a poor life choice by focusing so
          much on mindfulness. What if its car broke down?
        </p>
      </EuiText>
    );

    const htmlCode = `<!--I'm an example of HTML-->
<div>
  asdf
</div>
`;

    let flyout;

    if (this.state.isFlyoutVisible) {
      flyout = (
        <EuiFlyout
          onClose={this.closeFlyout}
          hideCloseButton
          aria-labelledby="flyoutComplicatedTitle">
          <EuiFlyoutHeader hasBorder>
            <EuiTitle size="m">
              <h2 id="flyoutComplicatedTitle">Flyout header</h2>
            </EuiTitle>
            <EuiSpacer size="s" />
            <EuiText color="subdued">
              <p>
                Put navigation items in the header, and cross tab actions in a
                footer.
              </p>
            </EuiText>
            <EuiTabs style={{ marginBottom: '-25px' }}>
              {this.renderTabs()}
            </EuiTabs>
          </EuiFlyoutHeader>
          <EuiFlyoutBody>
            <EuiPopover
              closePopover={this.closePopover}
              button={
                <EuiButton onClick={this.togglePopover}>
                  Even popovers can be included
                </EuiButton>
              }
              isOpen={this.state.isPopoverOpen}>
              <p>
                This is the popover content, notice how it can overflow the
                flyout!
              </p>
            </EuiPopover>
            <EuiSpacer size="m" />
            <EuiForm>
              <EuiFormRow label="A SuperSelect field">
                <SuperSelectComplexExample />
              </EuiFormRow>
            </EuiForm>
            <EuiSpacer />
            {flyoutContent}
            <EuiCodeBlock language="html">{htmlCode}</EuiCodeBlock>
          </EuiFlyoutBody>
          <EuiFlyoutFooter>
            <EuiFlexGroup justifyContent="spaceBetween">
              <EuiFlexItem grow={false}>
                <EuiButtonEmpty
                  iconType="cross"
                  onClick={this.closeFlyout}
                  flush="left">
                  Close
                </EuiButtonEmpty>
              </EuiFlexItem>
              <EuiFlexItem grow={false}>
                <EuiButton onClick={this.closeFlyout} fill>
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
        <EuiButton onClick={this.showFlyout}>Show flyout</EuiButton>

        {flyout}
      </div>
    );
  }
}
