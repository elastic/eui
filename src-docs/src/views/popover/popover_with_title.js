import React, {
  Component,
} from 'react';

import {
  EuiPopover,
  EuiPopoverTitle,
  EuiButton,
  EuiFlexGroup,
  EuiFlexItem,
  EuiText
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

  render() {
    return (
      <EuiFlexGroup>
        <EuiFlexItem grow={false}>
          <EuiPopover
            id="downCenterWithTitle"
            ownFocus
            button={(
              <EuiButton iconType="arrowDown" iconSide="right" onClick={this.onButtonClick1.bind(this)}>
                downCenter with title
              </EuiButton>
            )}
            isOpen={this.state.isPopoverOpen1}
            closePopover={this.closePopover1.bind(this)}
            anchorPosition="downCenter"
            withTitle
          >
            <EuiPopoverTitle>Hello, I&rsquo;m a popover title</EuiPopoverTitle>
            <div style={{ width: '300px' }}>
              <EuiText>
                <p>
                  Popover content with default padding
                </p>
              </EuiText>
            </div>
          </EuiPopover>
        </EuiFlexItem>

        <EuiFlexItem grow={false}>
          <EuiPopover
            id="upCenterWithTitle"
            ownFocus
            button={(
              <EuiButton iconType="arrowDown" iconSide="right" onClick={this.onButtonClick2.bind(this)}>
                upCenter with title
              </EuiButton>
            )}
            isOpen={this.state.isPopoverOpen2}
            closePopover={this.closePopover2.bind(this)}
            anchorPosition="upCenter"
            withTitle
          >
            <EuiPopoverTitle>Hello, I&rsquo;m a popover title</EuiPopoverTitle>
            <div style={{ width: '300px' }}>
              <EuiText>
                <p>
                  Popover content with large padding
                </p>
              </EuiText>
            </div>
          </EuiPopover>
        </EuiFlexItem>

        <EuiFlexItem grow={false}>
          <EuiPopover
            id="rightUpWithTitle"
            ownFocus
            button={(
              <EuiButton iconType="arrowDown" iconSide="right" onClick={this.onButtonClick3.bind(this)}>
                rightUp with title
              </EuiButton>
            )}
            isOpen={this.state.isPopoverOpen3}
            closePopover={this.closePopover3.bind(this)}
            anchorPosition="rightUp"
            withTitle
          >
            <EuiPopoverTitle>Hello, I&rsquo;m a popover title</EuiPopoverTitle>
            <div style={{ width: '300px' }}>
              <EuiText>
                <p>
                  Popover content with no padding
                </p>
              </EuiText>
            </div>
          </EuiPopover>
        </EuiFlexItem>
      </EuiFlexGroup>
    );
  }
}
