import React, { Component } from 'react';

import {
  EuiPopover,
  EuiPopoverTitle,
  EuiButton,
  EuiFlexGroup,
  EuiFlexItem,
  EuiText,
} from '../../../../src/components';

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isPopoverOpen: false,
    };
  }

  onButtonClick1() {
    this.setState({
      isPopoverOpen1: !this.state.isPopoverOpen1,
    });
  }

  closePopover1() {
    this.setState({
      isPopoverOpen1: false,
    });
  }

  onButtonClick2() {
    this.setState({
      isPopoverOpen2: !this.state.isPopoverOpen2,
    });
  }

  closePopover2() {
    this.setState({
      isPopoverOpen2: false,
    });
  }

  onButtonClick3() {
    this.setState({
      isPopoverOpen3: !this.state.isPopoverOpen3,
    });
  }

  closePopover3() {
    this.setState({
      isPopoverOpen3: false,
    });
  }

  onButtonClick4() {
    this.setState({
      isPopoverOpen4: !this.state.isPopoverOpen4,
    });
  }

  closePopover4() {
    this.setState({
      isPopoverOpen4: false,
    });
  }

  render() {
    return (
      <EuiFlexGroup wrap={true}>
        <EuiFlexItem grow={false}>
          <EuiPopover
            id="titleWithSmallPadding"
            ownFocus
            button={
              <EuiButton
                iconType="arrowDown"
                iconSide="right"
                onClick={this.onButtonClick2.bind(this)}>
                Title and small padding
              </EuiButton>
            }
            isOpen={this.state.isPopoverOpen2}
            closePopover={this.closePopover2.bind(this)}
            anchorPosition="upCenter"
            withTitle
            panelPaddingSize="s">
            <EuiPopoverTitle>Hello, I&rsquo;m a popover title</EuiPopoverTitle>
            <div style={{ width: '300px' }}>
              <EuiText>
                <p>Popover content</p>
              </EuiText>
            </div>
          </EuiPopover>
        </EuiFlexItem>

        <EuiFlexItem grow={false}>
          <EuiPopover
            id="titleWithDefaultPadding"
            ownFocus
            button={
              <EuiButton
                iconType="arrowDown"
                iconSide="right"
                onClick={this.onButtonClick1.bind(this)}>
                Title and default padding (m)
              </EuiButton>
            }
            isOpen={this.state.isPopoverOpen1}
            closePopover={this.closePopover1.bind(this)}
            anchorPosition="upCenter"
            withTitle>
            <EuiPopoverTitle>Hello, I&rsquo;m a popover title</EuiPopoverTitle>
            <div style={{ width: '300px' }}>
              <EuiText>
                <p>Popover content</p>
              </EuiText>
            </div>
          </EuiPopover>
        </EuiFlexItem>

        <EuiFlexItem grow={false}>
          <EuiPopover
            id="titleWithLargePadding"
            ownFocus
            button={
              <EuiButton
                iconType="arrowDown"
                iconSide="right"
                onClick={this.onButtonClick4.bind(this)}>
                Title and large padding
              </EuiButton>
            }
            isOpen={this.state.isPopoverOpen4}
            closePopover={this.closePopover4.bind(this)}
            anchorPosition="upCenter"
            withTitle
            panelPaddingSize="l">
            <EuiPopoverTitle>Hello, I&rsquo;m a popover title</EuiPopoverTitle>
            <div style={{ width: '300px' }}>
              <EuiText>
                <p>Popover content</p>
              </EuiText>
            </div>
          </EuiPopover>
        </EuiFlexItem>

        <EuiFlexItem grow={false}>
          <EuiPopover
            id="titleWithNoPadding"
            ownFocus
            button={
              <EuiButton
                iconType="arrowDown"
                iconSide="right"
                onClick={this.onButtonClick3.bind(this)}>
                Title and no padding
              </EuiButton>
            }
            isOpen={this.state.isPopoverOpen3}
            closePopover={this.closePopover3.bind(this)}
            anchorPosition="upCenter"
            withTitle
            panelPaddingSize="none">
            <EuiPopoverTitle>As the title, I keep my padding</EuiPopoverTitle>
            <div style={{ width: '300px' }}>
              <EuiText>
                <p>Popover content</p>
              </EuiText>
            </div>
          </EuiPopover>
        </EuiFlexItem>
      </EuiFlexGroup>
    );
  }
}
