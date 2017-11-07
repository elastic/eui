import React, {
  Component,
} from 'react';

import {
  EuiIcon,
  EuiSideNav,
  EuiSideNavItem,
  EuiSideNavTitle,
  EuiFlexGroup,
  EuiFlexItem,
} from '../../../../src/components';

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isSideNavOpenOnMobile: false,
    };
  }

  toggleOpenOnMobile = () => {
    this.setState({
      isSideNavOpenOnMobile: !this.state.isSideNavOpenOnMobile,
    });
  };

  render() {
    return (
      <EuiSideNav
        mobileTitle="Navigate within $APP_NAME"
        toggleOpenOnMobile={this.toggleOpenOnMobile}
        isOpenOnMobile={this.state.isSideNavOpenOnMobile}
        style={{ width: 192 }}
      >

        <EuiSideNavTitle>
          Kibana
        </EuiSideNavTitle>
        <EuiSideNavItem>
          <button>
            Advanced settings
          </button>
        </EuiSideNavItem>

        <EuiSideNavItem isSelected>
          <button>
            Index Patterns
          </button>
        </EuiSideNavItem>

        <EuiSideNavItem>
          <button>
            Saved Objects
          </button>
        </EuiSideNavItem>

        <EuiSideNavItem>
          <button>
            Reporting
          </button>
        </EuiSideNavItem>

      </EuiSideNav>
    );
  }
}
