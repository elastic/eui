import React, { Component } from 'react';

import {
  EuiPopover,
  EuiPopoverTitle,
  EuiPopoverFooter,
  EuiButton,
  EuiFlexGroup,
  EuiFlexItem,
  EuiText,
  EuiTextColor,
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
            id="withTitle"
            ownFocus
            button={
              <EuiButton
                iconType="arrowDown"
                iconSide="right"
                onClick={this.onButtonClick1.bind(this)}>
                With title
              </EuiButton>
            }
            isOpen={this.state.isPopoverOpen1}
            closePopover={this.closePopover1.bind(this)}
            anchorPosition="downCenter">
            <EuiPopoverTitle>Hello, I&rsquo;m a popover title</EuiPopoverTitle>
            <div style={{ width: '300px' }}>
              <EuiText>
                <p>
                  Selfies migas stumptown hot chicken quinoa wolf green juice,
                  mumblecore tattooed trust fund hammock truffaut taxidermy
                  kogi.
                </p>
              </EuiText>
            </div>
          </EuiPopover>
        </EuiFlexItem>

        <EuiFlexItem grow={false}>
          <EuiPopover
            id="withFooter"
            ownFocus
            button={
              <EuiButton
                iconType="arrowDown"
                iconSide="right"
                onClick={this.onButtonClick2.bind(this)}>
                With footer
              </EuiButton>
            }
            isOpen={this.state.isPopoverOpen2}
            closePopover={this.closePopover2.bind(this)}
            anchorPosition="upCenter">
            <div style={{ width: '300px' }}>
              <EuiText>
                <p>
                  Selfies migas stumptown hot chicken quinoa wolf green juice,
                  mumblecore tattooed trust fund hammock truffaut taxidermy
                  kogi.
                </p>
              </EuiText>
            </div>
            <EuiPopoverFooter>
              <EuiTextColor color="subdued">
                Hello, I&rsquo;m a small popover footer caption
              </EuiTextColor>
            </EuiPopoverFooter>
          </EuiPopover>
        </EuiFlexItem>

        <EuiFlexItem grow={false}>
          <EuiPopover
            id="withTitleAndFooter"
            ownFocus
            button={
              <EuiButton
                iconType="arrowDown"
                iconSide="right"
                onClick={this.onButtonClick3.bind(this)}>
                With title and footer button
              </EuiButton>
            }
            isOpen={this.state.isPopoverOpen3}
            closePopover={this.closePopover3.bind(this)}
            anchorPosition="upCenter">
            <EuiPopoverTitle>Hello, I&rsquo;m a popover title</EuiPopoverTitle>
            <div style={{ width: '300px' }}>
              <EuiText>
                <p>
                  Selfies migas stumptown hot chicken quinoa wolf green juice,
                  mumblecore tattooed trust fund hammock truffaut taxidermy
                  kogi.
                </p>
              </EuiText>
            </div>
            <EuiPopoverFooter>
              <EuiButton fullWidth size="s">
                Manage this thing
              </EuiButton>
            </EuiPopoverFooter>
          </EuiPopover>
        </EuiFlexItem>
      </EuiFlexGroup>
    );
  }
}
