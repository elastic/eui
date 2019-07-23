import React, { Component, Fragment } from 'react';

import {
  EuiColorPicker,
  EuiButton,
  EuiPopover,
  EuiFormRow,
  EuiModal,
  EuiModalBody,
  EuiModalHeader,
  EuiModalHeaderTitle,
  EuiOverlayMask,
  EuiSpacer,
} from '../../../../src/components';

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      color: '#FFF',
      isModalVisible: false,
      isPopoverOpen: false,
    };
  }

  closeModal = () => {
    this.setState({ isModalVisible: false });
  };

  showModal = () => {
    this.setState({ isModalVisible: true });
  };

  togglePopover = () => {
    this.setState(prevState => ({
      isPopoverOpen: !prevState.isPopoverOpen,
    }));
  };

  closePopover = () => {
    this.setState({
      isPopoverOpen: false,
    });
  };

  onChange = color => {
    this.setState({
      color,
    });
  };

  render() {
    const { color, isModalVisible, isPopoverOpen } = this.state;

    const colorPicker = (
      <EuiColorPicker color={color} onChange={this.onChange} />
    );

    const button = (
      <EuiButton
        iconType="arrowDown"
        iconSide="right"
        onClick={this.togglePopover}>
        Open popover
      </EuiButton>
    );

    let modal;

    if (isModalVisible) {
      modal = (
        <EuiOverlayMask>
          <EuiModal onClose={this.closeModal} style={{ width: '800px' }}>
            <EuiModalHeader>
              <EuiModalHeaderTitle>Color picker in a modal</EuiModalHeaderTitle>
            </EuiModalHeader>

            <EuiModalBody>
              <EuiFormRow label="Color picker">{colorPicker}</EuiFormRow>
            </EuiModalBody>
          </EuiModal>
        </EuiOverlayMask>
      );
    }

    return (
      <Fragment>
        <EuiFormRow
          label="Color picker"
          helpText="This color picker is inside of a form row">
          {colorPicker}
        </EuiFormRow>

        <EuiFormRow label="Unruly focus management">
          <EuiPopover
            id="popover"
            ownFocus={true}
            button={button}
            isOpen={isPopoverOpen}
            closePopover={this.closePopover}>
            <div style={{ width: '300px' }}>
              <EuiFormRow label="Color picker">{colorPicker}</EuiFormRow>
            </div>
          </EuiPopover>
        </EuiFormRow>

        <EuiSpacer size="m" />

        <EuiButton onClick={this.showModal}>Show modal</EuiButton>

        {modal}
      </Fragment>
    );
  }
}
