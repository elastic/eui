import React, { Component, Fragment } from 'react';
import {
  EuiPopover,
  EuiPopoverTitle,
  // EuiPopoverFooter,
  EuiButton,
} from '../../../../src/components';

import { EuiSelectable } from '../../../../src/components/selectable';

export default class extends Component {
  constructor(props) {
    super(props);

    this.options = [
      {
        label: 'Titan',
        'data-test-subj': 'titanOption',
      },
      {
        label: 'Enceladus is disabled',
        disabled: true,
      },
      {
        label: 'Mimas',
      },
      {
        label: 'Dione',
      },
      {
        label: 'Iapetus',
        checked: 'on',
      },
      {
        label: 'Phoebe',
      },
      {
        label: 'Rhea',
      },
      {
        label:
          'Pandora is one of Saturn\'s moons, named for a Titaness of Greek mythology',
      },
      {
        label: 'Tethys',
      },
      {
        label: 'Hyperion',
      },
    ];

    this.state = {
      selectedOptions: [this.options[4]],
      isPopoverOpen: false,
    };
  }

  onButtonClick() {
    this.setState({
      isPopoverOpen: !this.state.isPopoverOpen,
    });
  }

  closePopover() {
    this.setState({
      isPopoverOpen: false,
    });
  }

  onChange = selectedOptions => {
    this.setState({
      selectedOptions,
      isPopoverOpen: false,
    });
  };

  render() {
    const { selectedOptions, isPopoverOpen } = this.state;

    const button = (
      <EuiButton
        iconType="arrowDown"
        iconSide="right"
        onClick={this.onButtonClick.bind(this)}
      >
        Show popover
      </EuiButton>
    );

    return (
      <EuiPopover
        id="popover"
        panelPaddingSize="none"
        button={button}
        isOpen={isPopoverOpen}
        closePopover={this.closePopover.bind(this)}
      >
        <EuiSelectable
          searchable
          searchProps={{
            placeholder: 'Filter list',
            compressed: true,
          }}
          options={this.options}
          selectedOptions={selectedOptions}
          singleSelection
          style={{ width: 300 }}
          onChange={this.onChange}
        >
          {(search, list) => (
            <Fragment>
              <EuiPopoverTitle>{search}</EuiPopoverTitle>
              {list}
              <EuiPopoverTitle>
                <EuiButton size="s" fullWidth>
                  Manage this list
                </EuiButton>
              </EuiPopoverTitle>
            </Fragment>
          )}
        </EuiSelectable>
      </EuiPopover>
    );
  }
}
