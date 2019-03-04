import React, { Component, Fragment } from 'react';
// @ts-ignore
import {
  EuiPopover,
  EuiPopoverTitle,
  EuiPopoverFooter,
  EuiButton,
} from '../../../../src/components';

import { EuiSelectable } from '../../../../src/components/selectable';

export default class extends Component {
  // @ts-ignore
  constructor(props) {
    super(props);
    // @ts-ignore
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
      // @ts-ignore
      selectedOptions: [this.options[4]],
      isPopoverOpen: false,
    };
  }

  onButtonClick() {
    this.setState({
      // @ts-ignore
      isPopoverOpen: !this.state.isPopoverOpen,
    });
  }

  closePopover() {
    this.setState({
      isPopoverOpen: false,
    });
  }
  // @ts-ignore
  onChange = selectedOptions => {
    this.setState({
      selectedOptions,
      isPopoverOpen: false,
    });
  };

  render() {
    // @ts-ignore
    const { selectedOptions, isPopoverOpen } = this.state;

    const button = (
      <EuiButton
        iconType="arrowDown"
        iconSide="right"
        onClick={this.onButtonClick.bind(this)}>
        Show popover
      </EuiButton>
    );

    return (
      <EuiPopover
        id="popover"
        panelPaddingSize="none"
        button={button}
        isOpen={isPopoverOpen}
        closePopover={this.closePopover.bind(this)}>
        <EuiSelectable
          searchable
          searchProps={{
            placeholder: 'Filter list',
            compressed: true,
          }}
          // @ts-ignore
          options={this.options}
          selectedOptions={selectedOptions}
          singleSelection
          style={{ width: 300 }}
          // @ts-ignore
          onChange={this.onChange}>
          {(search: React.ReactNode, list: React.ReactNode) => (
            <Fragment>
              <EuiPopoverTitle>{search}</EuiPopoverTitle>
              {list}
              <EuiPopoverFooter>
                <EuiButton size="s" fullWidth>
                  Manage this list
                </EuiButton>
              </EuiPopoverFooter>
            </Fragment>
          )}
        </EuiSelectable>
      </EuiPopover>
    );
  }
}
