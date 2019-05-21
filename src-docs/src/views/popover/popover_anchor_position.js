import React, { Component } from 'react';

import {
  EuiPopover,
  EuiButton,
  EuiFlexGroup,
  EuiFlexItem,
  EuiSpacer,
  EuiText,
} from '../../../../src/components';

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isPopoverOpen1: false,
      isPopoverOpen2: false,
      isPopoverOpen3: false,
      isPopoverOpen4: false,
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

  onButtonClick5() {
    this.setState({
      isPopoverOpen5: !this.state.isPopoverOpen5,
    });
  }

  closePopover5() {
    this.setState({
      isPopoverOpen5: false,
    });
  }

  onButtonClick6() {
    this.setState({
      isPopoverOpen6: !this.state.isPopoverOpen6,
    });
  }

  closePopover6() {
    this.setState({
      isPopoverOpen6: false,
    });
  }

  onButtonClick7() {
    this.setState({
      isPopoverOpen7: !this.state.isPopoverOpen7,
    });
  }

  closePopover7() {
    this.setState({
      isPopoverOpen7: false,
    });
  }

  onButtonClick8() {
    this.setState({
      isPopoverOpen8: !this.state.isPopoverOpen8,
    });
  }

  closePopover8() {
    this.setState({
      isPopoverOpen8: false,
    });
  }

  onButtonClick9() {
    this.setState({
      isPopoverOpen9: !this.state.isPopoverOpen9,
    });
  }

  closePopover9() {
    this.setState({
      isPopoverOpen9: false,
    });
  }

  onButtonClick10() {
    this.setState({
      isPopoverOpen10: !this.state.isPopoverOpen10,
    });
  }

  closePopover10() {
    this.setState({
      isPopoverOpen10: false,
    });
  }

  onButtonClick11() {
    this.setState({
      isPopoverOpen11: !this.state.isPopoverOpen11,
    });
  }

  closePopover11() {
    this.setState({
      isPopoverOpen11: false,
    });
  }

  onButtonClick12() {
    this.setState({
      isPopoverOpen12: !this.state.isPopoverOpen12,
    });
  }

  closePopover12() {
    this.setState({
      isPopoverOpen12: false,
    });
  }

  render() {
    return (
      <div>
        <EuiFlexGroup>
          <EuiFlexItem grow={false}>
            <EuiPopover
              id="downLeft"
              ownFocus
              button={
                <EuiButton
                  iconType="arrowDown"
                  iconSide="right"
                  onClick={this.onButtonClick1.bind(this)}>
                  downLeft
                </EuiButton>
              }
              isOpen={this.state.isPopoverOpen1}
              closePopover={this.closePopover1.bind(this)}
              anchorPosition="downLeft">
              Popover content
            </EuiPopover>
          </EuiFlexItem>

          <EuiFlexItem grow={false}>
            <EuiPopover
              id="downCenter"
              ownFocus
              button={
                <EuiButton
                  iconType="arrowDown"
                  iconSide="right"
                  onClick={this.onButtonClick2.bind(this)}>
                  downCenter
                </EuiButton>
              }
              isOpen={this.state.isPopoverOpen2}
              closePopover={this.closePopover2.bind(this)}
              anchorPosition="downCenter">
              Popover content
            </EuiPopover>
          </EuiFlexItem>

          <EuiFlexItem grow={false}>
            <EuiPopover
              id="downRight"
              ownFocus
              button={
                <EuiButton
                  iconType="arrowDown"
                  iconSide="right"
                  onClick={this.onButtonClick3.bind(this)}>
                  downRight
                </EuiButton>
              }
              isOpen={this.state.isPopoverOpen3}
              closePopover={this.closePopover3.bind(this)}
              anchorPosition="downRight">
              Popover content
            </EuiPopover>
          </EuiFlexItem>
        </EuiFlexGroup>

        <EuiSpacer size="l" />

        <EuiFlexGroup>
          <EuiFlexItem grow={false}>
            <EuiPopover
              id="upLeft"
              ownFocus
              button={
                <EuiButton
                  iconType="arrowDown"
                  iconSide="right"
                  onClick={this.onButtonClick4.bind(this)}>
                  upLeft
                </EuiButton>
              }
              isOpen={this.state.isPopoverOpen4}
              closePopover={this.closePopover4.bind(this)}
              anchorPosition="upLeft">
              Popover content
            </EuiPopover>
          </EuiFlexItem>

          <EuiFlexItem grow={false}>
            <EuiPopover
              id="upCenter"
              ownFocus
              button={
                <EuiButton
                  iconType="arrowDown"
                  iconSide="right"
                  onClick={this.onButtonClick5.bind(this)}>
                  upCenter
                </EuiButton>
              }
              isOpen={this.state.isPopoverOpen5}
              closePopover={this.closePopover5.bind(this)}
              anchorPosition="upCenter">
              Popover content
            </EuiPopover>
          </EuiFlexItem>

          <EuiFlexItem grow={false}>
            <EuiPopover
              id="upRight"
              ownFocus
              button={
                <EuiButton
                  iconType="arrowDown"
                  iconSide="right"
                  onClick={this.onButtonClick6.bind(this)}>
                  upRight
                </EuiButton>
              }
              isOpen={this.state.isPopoverOpen6}
              closePopover={this.closePopover6.bind(this)}
              anchorPosition="upRight">
              Popover content
            </EuiPopover>
          </EuiFlexItem>
        </EuiFlexGroup>

        <EuiSpacer size="l" />

        <EuiFlexGroup>
          <EuiFlexItem grow={false}>
            <EuiPopover
              id="leftUp"
              ownFocus
              button={
                <EuiButton
                  iconType="arrowDown"
                  iconSide="right"
                  onClick={this.onButtonClick7.bind(this)}>
                  leftUp
                </EuiButton>
              }
              isOpen={this.state.isPopoverOpen7}
              closePopover={this.closePopover7.bind(this)}
              anchorPosition="leftUp">
              <EuiText>
                <p style={{ width: 150 }}>
                  Be careful with content within left or right aligned popovers.
                  There needs to be enough content to make make enough height
                  for the arrow positioning.
                </p>
              </EuiText>
            </EuiPopover>
          </EuiFlexItem>

          <EuiFlexItem grow={false}>
            <EuiPopover
              id="leftCenter"
              ownFocus
              button={
                <EuiButton
                  iconType="arrowDown"
                  iconSide="right"
                  onClick={this.onButtonClick8.bind(this)}>
                  leftCenter
                </EuiButton>
              }
              isOpen={this.state.isPopoverOpen8}
              closePopover={this.closePopover8.bind(this)}
              anchorPosition="leftCenter">
              Popover content
            </EuiPopover>
          </EuiFlexItem>

          <EuiFlexItem grow={false}>
            <EuiPopover
              id="leftDown"
              ownFocus
              button={
                <EuiButton
                  iconType="arrowDown"
                  iconSide="right"
                  onClick={this.onButtonClick9.bind(this)}>
                  leftDown
                </EuiButton>
              }
              isOpen={this.state.isPopoverOpen9}
              closePopover={this.closePopover9.bind(this)}
              anchorPosition="leftDown">
              <EuiText>
                <p style={{ width: 150 }}>
                  Be careful with content within left or right aligned popovers.
                  There needs to be enough content to make make enough height
                  for the arrow positioning.
                </p>
              </EuiText>
            </EuiPopover>
          </EuiFlexItem>
        </EuiFlexGroup>

        <EuiSpacer size="l" />

        <EuiFlexGroup>
          <EuiFlexItem grow={false}>
            <EuiPopover
              id="rightUp"
              ownFocus
              button={
                <EuiButton
                  iconType="arrowDown"
                  iconSide="right"
                  onClick={this.onButtonClick10.bind(this)}>
                  rightUp
                </EuiButton>
              }
              isOpen={this.state.isPopoverOpen10}
              closePopover={this.closePopover10.bind(this)}
              anchorPosition="rightUp">
              <EuiText>
                <p style={{ width: 150 }}>
                  Be careful with content within left or right aligned popovers.
                  There needs to be enough content to make make enough height
                  for the arrow positioning.
                </p>
              </EuiText>
            </EuiPopover>
          </EuiFlexItem>

          <EuiFlexItem grow={false}>
            <EuiPopover
              id="rightCenter"
              ownFocus
              button={
                <EuiButton
                  iconType="arrowDown"
                  iconSide="right"
                  onClick={this.onButtonClick11.bind(this)}>
                  rightCenter
                </EuiButton>
              }
              isOpen={this.state.isPopoverOpen11}
              closePopover={this.closePopover11.bind(this)}
              anchorPosition="rightCenter">
              Popover content
            </EuiPopover>
          </EuiFlexItem>

          <EuiFlexItem grow={false}>
            <EuiPopover
              id="rightDown"
              ownFocus
              button={
                <EuiButton
                  iconType="arrowDown"
                  iconSide="right"
                  onClick={this.onButtonClick12.bind(this)}>
                  rightDown
                </EuiButton>
              }
              isOpen={this.state.isPopoverOpen12}
              closePopover={this.closePopover12.bind(this)}
              anchorPosition="rightDown">
              <EuiText>
                <p style={{ width: 150 }}>
                  Be careful with content within left or right aligned popovers.
                  There needs to be enough content to make make enough height
                  for the arrow positioning.
                </p>
              </EuiText>
            </EuiPopover>
          </EuiFlexItem>
        </EuiFlexGroup>
      </div>
    );
  }
}
