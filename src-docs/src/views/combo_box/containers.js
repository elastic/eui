import React, { Component, Fragment } from 'react';

import {
  EuiComboBox,
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

    this.options = [
      {
        label: 'Titan',
        'data-test-subj': 'titanOption',
      },
      {
        label: 'Enceladus',
      },
      {
        label: 'Mimas',
      },
      {
        label: 'Dione',
      },
      {
        label: 'Iapetus',
      },
      {
        label: 'Phoebe',
      },
      {
        label: 'Rhea',
      },
      {
        label:
          "Pandora is one of Saturn's moons, named for a Titaness of Greek mythology",
      },
      {
        label: 'Tethys',
      },
      {
        label: 'Hyperion',
      },
    ];

    this.state = {
      selectedOptions: [this.options[2], this.options[4]],
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

  onChange = selectedOptions => {
    this.setState({
      selectedOptions,
    });
  };

  onCreateOption = (searchValue, flattenedOptions = []) => {
    if (!searchValue) {
      return;
    }

    const normalizedSearchValue = searchValue.trim().toLowerCase();

    if (!normalizedSearchValue) {
      return;
    }

    const newOption = {
      label: searchValue,
    };

    // Create the option if it doesn't exist.
    if (
      flattenedOptions.findIndex(
        option => option.label.trim().toLowerCase() === normalizedSearchValue
      ) === -1
    ) {
      this.options.push(newOption);
    }

    // Select the option.
    this.setState(prevState => ({
      selectedOptions: prevState.selectedOptions.concat(newOption),
    }));
  };

  render() {
    const { selectedOptions, isModalVisible, isPopoverOpen } = this.state;

    const comboBox = (
      <EuiComboBox
        placeholder="Select or create options"
        options={this.options}
        selectedOptions={selectedOptions}
        onChange={this.onChange}
        onCreateOption={this.onCreateOption}
      />
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
              <EuiModalHeaderTitle>Combo box in a modal</EuiModalHeaderTitle>
            </EuiModalHeader>

            <EuiModalBody>{comboBox}</EuiModalBody>
          </EuiModal>
        </EuiOverlayMask>
      );
    }

    return (
      <Fragment>
        <EuiFormRow
          label="Combo box"
          helpText="This combo box is inside of a form row">
          {comboBox}
        </EuiFormRow>

        <EuiSpacer />

        <EuiPopover
          id="popover"
          ownFocus
          button={button}
          isOpen={isPopoverOpen}
          closePopover={this.closePopover}>
          <div style={{ width: '300px' }}>{comboBox}</div>
        </EuiPopover>

        <EuiSpacer size="m" />

        <EuiButton onClick={this.showModal}>Show modal</EuiButton>

        {modal}
      </Fragment>
    );
  }
}
