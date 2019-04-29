
import React, {
  Component,
} from 'react';

import {
  EuiPopover,
  EuiFilterGroup,
  EuiFilterButton,
  EuiIcon,
  EuiSpacer,
} from '../../../../src/components';

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isPopoverOpen: false,
      isFilterOn: false,
      isOnFilterOn: false,
      isOffFilterOn: false,
    };
  }

  toggleFilter = () => {
    this.setState(prevState => ({
      isFilterOn: !prevState.isFilterOn,
    }));
  }

  toggleOnFilter = () => {
    this.setState(prevState => ({
      isOnFilterOn: !prevState.isOnFilterOn,
      isOffFilterOn: prevState.isOffFilterOn && !prevState.isOnFilterOn ? false : prevState.isOffFilterOn,
    }));
  }

  toggleOffFilter = () => {
    this.setState(prevState => ({
      isOffFilterOn: !prevState.isOffFilterOn,
      isOnFilterOn: prevState.isOnFilterOn && !prevState.isOffFilterOn ? false : prevState.isOnFilterOn,
    }));
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

  render() {

    const button = (
      <EuiFilterButton
        iconType="arrowDown"
        onClick={this.onButtonClick.bind(this)}
        isSelected={this.state.isPopoverOpen}
        numFilters={12}
        hasActiveFilters={true}
        numActiveFilters={2}
      >
        Composers
      </EuiFilterButton>
    );

    return (
      <EuiFilterGroup fullWidth={true}>
        <EuiFilterButton grow={false} hasActiveFilters={this.state.isFilterOn} onClick={this.toggleFilter}>
          Filter
        </EuiFilterButton>
        <EuiFilterButton withNext grow={false} hasActiveFilters={this.state.isOnFilterOn} onClick={this.toggleOnFilter}>
          On
        </EuiFilterButton>
        <EuiFilterButton grow={false} hasActiveFilters={this.state.isOffFilterOn} onClick={this.toggleOffFilter}>
          Off
        </EuiFilterButton>
        <EuiPopover
          id="popover"
          ownFocus
          button={button}
          isOpen={this.state.isPopoverOpen}
          closePopover={this.closePopover.bind(this)}
          panelPaddingSize="none"
          withTitle
        >
          <div className="euiFilterSelect__note">
            <div className="euiFilterSelect__noteContent">
              <EuiIcon type="minusInCircle" />
              <EuiSpacer size="xs" />
              <p>No filters found</p>
            </div>
          </div>
        </EuiPopover>
        <EuiFilterButton numFilters={12} hasActiveFilters={this.state.isFilterOn} onClick={this.toggleFilter}>
          Filter with a very long name
        </EuiFilterButton>
      </EuiFilterGroup>
    );
  }
}
