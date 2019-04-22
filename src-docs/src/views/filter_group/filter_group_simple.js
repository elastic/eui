
import React, {
  Component,
} from 'react';

import {
  EuiFilterGroup,
  EuiFilterButton,
} from '../../../../src/components';

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
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

  render() {
    return (
      <EuiFilterGroup style={{ maxWidth: 200 }}>
        <EuiFilterButton hasActiveFilters={this.state.isFilterOn} onClick={this.toggleFilter}>
          Single filter
        </EuiFilterButton>
        <EuiFilterButton noDivider grow={false} hasActiveFilters={this.state.isOnFilterOn} onClick={this.toggleOnFilter}>
          On
        </EuiFilterButton>
        <EuiFilterButton grow={false} hasActiveFilters={this.state.isOffFilterOn} onClick={this.toggleOffFilter}>
          Off
        </EuiFilterButton>
      </EuiFilterGroup>
    );
  }
}
